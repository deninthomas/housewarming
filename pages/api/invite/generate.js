import mongoose from 'mongoose';
import { nanoid } from 'nanoid';
import Invite from '@/models/Invite';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        res.status(405).json({ error: 'Method not allowed' });
        return;
    }

    // Check for admin cookie
    const adminToken = req.cookies.admin_token;
    if (!adminToken) {
        res.status(401).json({ error: 'Unauthorized' });
        return;
    }

    const { guestName, customGreeting, allowMultipleDevices } = req.body;
    if (!guestName) {
        res.status(400).json({ error: 'Guest name required' });
        return;
    }

    try {
        // Ensure DB connection
        if (mongoose.connection.readyState !== 1) {
            await mongoose.connect(process.env.MONGODB_URI);
        }

        const token = nanoid(10);
        const invite = await Invite.create({
            token,
            guestName,
            customGreeting,
            allowMultipleDevices: !!allowMultipleDevices,
            expiresAt: new Date('2025-12-31T23:59:59') // Default expiry
        });

        res.status(200).json({ token, guestName });
    } catch (error) {
        console.error('Error generating invite:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}