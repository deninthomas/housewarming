import mongoose from 'mongoose';
import Invite from '@/models/Invite';

export default async function handler(req, res) {
    if (req.method !== 'DELETE') {
        res.status(405).json({ message: 'Method Not Allowed' });
        return;
    }

    // Check for admin cookie
    const adminToken = req.cookies.admin_token;
    if (!adminToken) {
        res.status(401).json({ error: 'Unauthorized' });
        return;
    }

    const { token } = req.query;

    try {
        // Ensure DB connection
        if (mongoose.connection.readyState !== 1) {
            await mongoose.connect(process.env.MONGODB_URI);
        }

        const deletedInvite = await Invite.findOneAndDelete({ token });

        if (!deletedInvite) {
            res.status(404).json({ message: 'Invite not found' });
            return;
        }

        res.status(200).json({ message: 'Invite deleted successfully' });
    } catch (error) {
        console.error('Error deleting invite:', error);
        res.status(500).json({ message: 'Server Error' });
    }
}
