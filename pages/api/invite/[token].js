import mongoose from 'mongoose';
import { serialize } from 'cookie';
import Invite from '../../../models/Invite'; // Adjust path if needed. 

export default async function handler(req, res) {
    if (req.method !== 'GET') {
        res.status(405).json({ error: 'Method not allowed' });
        return;
    }

    const { token } = req.query;

    try {
        // Ensure DB connection
        if (mongoose.connection.readyState !== 1) {
            await mongoose.connect(process.env.MONGODB_URI);
        }

        const invite = await Invite.findOne({ token });

        if (!invite) {
            return res.status(403).json({ error: 'Token not found' });
        }

        const cookieToken = req.cookies.invite_token;

        // Logic matched from server.js
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
        const cookie = serialize('invite_token', token, {
            httpOnly: true,
            maxAge: 30 * 24 * 60 * 60 * 1000,
            path: '/',
        });
        res.setHeader('Set-Cookie', cookie);

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
}
