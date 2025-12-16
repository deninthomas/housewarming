import { serialize } from 'cookie';

export default function handler(req, res) {
    if (req.method !== 'POST') {
        res.status(405).json({ success: false, message: 'Method not allowed' });
        return;
    }

    const { password } = req.body;

    if (password === process.env.ADMIN_PASSWORD) {
        // Set secure httpOnly cookie
        const cookie = serialize('admin_token', 'authenticated', {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000, // 1 day
            path: '/',
        });
        res.setHeader('Set-Cookie', cookie);
        res.status(200).json({ success: true });
    } else {
        res.status(401).json({ success: false, message: 'Invalid password' });
    }
}