require('dotenv').config();
const express = require('express');
const next = require('next');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const Invite = require('./models/Invite');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const PORT = process.env.PORT || 3001;
const MONGODB_URI = process.env.MONGODB_URI;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

// Connect to MongoDB
mongoose.connect(MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

app.prepare().then(() => {
  const server = express();

  server.use(express.json());
  server.use(cookieParser());

  // API Route: Admin Login
  server.post('/api/admin/login', (req, res) => {
    const { password } = req.body;
    if (password === ADMIN_PASSWORD) {
      // Set secure httpOnly cookie
      res.cookie('admin_token', 'authenticated', {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000 // 1 day
      });
      return res.json({ success: true });
    }
    return res.status(401).json({ success: false, message: 'Invalid password' });
  });

  // API Route: Admin Logout
  server.post('/api/admin/logout', (req, res) => {
    res.clearCookie('admin_token');
    return res.json({ success: true });
  });

  // API Route: Validate Invite (with Re-entry Logic)
  server.get('/api/invite/:token', async (req, res) => {
    try {
      const { token } = req.params;
      const invite = await Invite.findOne({ token });

      if (!invite) {
        return res.status(403).json({ error: 'Token not found' });
      }

      const cookieToken = req.cookies.invite_token;

      // If already used
      if (invite.isUsed) {
        // Allow if cookie matches the token OR if multi-device access is allowed
        if (cookieToken === token || invite.allowMultipleDevices) {
          return res.json({
            name: invite.guestName,
            customGreeting: invite.customGreeting,
            message: 'Welcome back!',
            blessings: invite.blessings
          });
        }
        // Deny otherwise
        return res.status(403).json({ error: 'Token already used' });
      }

      if (invite.expiresAt && new Date() > invite.expiresAt) {
        return res.status(403).json({ error: 'Token expired' });
      }

      // Mark as used
      invite.isUsed = true;
      await invite.save();

      // Set cookie for re-entry (30 days)
      res.cookie('invite_token', token, {
        httpOnly: true,
        maxAge: 30 * 24 * 60 * 60 * 1000
      });

      return res.json({
        name: invite.guestName,
        customGreeting: invite.customGreeting,
        message: 'Invite valid',
        blessings: invite.blessings
      });
    } catch (error) {
      console.error('Error validating invite:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  });

  // API Route: Generate Invite (Protected)
  server.post('/api/invite/generate', async (req, res) => {
    try {
      // Check for admin cookie
      if (!req.cookies.admin_token) {
        return res.status(401).json({ error: 'Unauthorized' });
      }

      const { guestName, customGreeting, allowMultipleDevices } = req.body;
      if (!guestName) return res.status(400).json({ error: 'Guest name required' });

      const token = require('nanoid').nanoid(10);
      const invite = await Invite.create({
        token,
        guestName,
        customGreeting,
        allowMultipleDevices: !!allowMultipleDevices,
        expiresAt: new Date('2025-12-31T23:59:59') // Default expiry
      });

      return res.json({ token, guestName });
    } catch (error) {
      console.error('Error generating invite:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  });

  // API Route: Add Blessing
  server.post('/api/blessing', async (req, res) => {
    try {
      const { token, name, message } = req.body;
      const invite = await Invite.findOne({ token });

      if (!invite) return res.status(404).json({ error: 'Invite not found' });

      invite.blessings.push({ name, message });
      await invite.save();

      return res.json({ success: true });
    } catch (error) {
      console.error('Error adding blessing:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  });

  // API Route: Toggle Multi-Device Access
  server.put('/api/admin/invite/:token/toggle-multidevice', async (req, res) => {
    try {
      // Check for admin cookie
      if (!req.cookies.admin_token) {
        return res.status(401).json({ error: 'Unauthorized' });
      }

      const { token } = req.params;
      const { allow } = req.body; // Expect boolean

      const invite = await Invite.findOne({ token });
      if (!invite) return res.status(404).json({ error: 'Invite not found' });

      invite.allowMultipleDevices = !!allow;
      await invite.save();

      return res.json({ success: true, allowMultipleDevices: invite.allowMultipleDevices });
    } catch (error) {
      console.error('Error toggling multi-device:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  });

  // API Route: Get All Invites (Admin)
  server.get('/api/admin/invites', async (req, res) => {
    try {
      if (!req.cookies.admin_token) {
        return res.status(401).json({ error: 'Unauthorized' });
      }
      const invites = await Invite.find().sort({ _id: -1 }); // Newest first
      res.json(invites);
    } catch (error) {
      console.error('Error fetching invites:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  // Handle all other routes with Next.js
  server.all('*', (req, res) => {
    return handle(req, res);
  });

  server.listen(PORT, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${PORT}`);
  });
});
