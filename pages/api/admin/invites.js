import mongoose from 'mongoose';
import Invite from '@/models/Invite';

export default async function handler(req, res) {
    if (req.method !== 'GET') {
        res.status(405).json({ error: 'Method not allowed' });
        return;
    }

    // Check for admin cookie
    const adminToken = req.cookies.admin_token;
    if (!adminToken) {
        res.status(401).json({ error: 'Unauthorized' });
        return;
    }

    try {
        // Ensure DB connection
        if (mongoose.connection.readyState !== 1) {
            await mongoose.connect(process.env.MONGODB_URI);
        }

        const invites = await Invite.find().sort({ _id: -1 }); // Newest first
        res.status(200).json(invites);
    } catch (error) {
        console.error('Error fetching invites:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}