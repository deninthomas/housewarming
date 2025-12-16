import { serialize } from 'cookie';

export default function handler(req, res) {
    if (req.method !== 'POST') {
        res.status(405).json({ success: false, message: 'Method not allowed' });
        return;
    }

    // Clear the cookie
    const cookie = serialize('admin_token', '', {
        httpOnly: true,
        maxAge: 0,
        path: '/',
    });
    res.setHeader('Set-Cookie', cookie);
    res.status(200).json({ success: true });
}