import mongoose from 'mongoose';
import Invite from '@/models/Invite';

export default async function handler(req, res) {
    if (req.method !== 'PUT') {
        res.status(405).json({ error: 'Method not allowed' });
        return;
    }

    // Check for admin cookie
    const adminToken = req.cookies.admin_token;
    if (!adminToken) {
        res.status(401).json({ error: 'Unauthorized' });
        return;
    }

    const { token } = req.query;
    const { allow } = req.body; // Expect boolean

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

        invite.allowMultipleDevices = !!allow;
        await invite.save();

        res.status(200).json({ success: true, allowMultipleDevices: invite.allowMultipleDevices });
    } catch (error) {
        console.error('Error toggling multi-device:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}
