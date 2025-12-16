import mongoose from 'mongoose';
import Invite from '@/models/Invite';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        res.status(405).json({ error: 'Method not allowed' });
        return;
    }

    const { token, name, message } = req.body;

    try {
        // Ensure DB connection
        if (mongoose.connection.readyState !== 1) {
            await mongoose.connect(process.env.MONGODB_URI);
        }

        const invite = await Invite.findOne({ token });

        if (!invite) {
            res.status(404).json({ error: 'Invite not found' });
            return;
        }

        invite.blessings.push({ name, message });
        await invite.save();

        res.status(200).json({ success: true });
    } catch (error) {
        console.error('Error adding blessing:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}