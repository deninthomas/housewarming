import mongoose from 'mongoose';
import { serialize } from 'cookie';
import Invite from '../../../models/Invite';

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
            res.status(403).json({ error: 'Token not found' });
            return;
        }

        const cookieToken = req.cookies.invite_token;

        // If already used
        if (invite.isUsed) {
            // Allow if cookie matches the token OR if multi-device access is allowed
            if (cookieToken === token || invite.allowMultipleDevices) {
                res.status(200).json({
                    name: invite.guestName,
                    customGreeting: invite.customGreeting,
                    message: 'Welcome back!',
                    blessings: invite.blessings
                });
                return;
            }
            // Deny otherwise
            res.status(403).json({ error: 'Token already used' });
            return;
        }

        if (invite.expiresAt && new Date() > invite.expiresAt) {
            res.status(403).json({ error: 'Token expired' });
            return;
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

        res.status(200).json({
            name: invite.guestName,
            customGreeting: invite.customGreeting,
            message: 'Invite valid',
            blessings: invite.blessings
        });
    } catch (error) {
        console.error('Error validating invite:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}