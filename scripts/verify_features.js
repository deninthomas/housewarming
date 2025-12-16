const fetch = require('node-fetch');

const BASE_URL = 'https://housewarming-eight.vercel.app';

async function verify() {
    try {
        // 1. Generate Invite
        console.log('Generating invite for Vishal...');
        const genRes = await fetch(`${BASE_URL}/api/invite/generate`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ guestName: 'Vishal Test' })
        });
        const genData = await genRes.json();
        console.log('Generate Response:', genData);

        if (!genData.token) throw new Error('Failed to generate token');
        const token = genData.token;

        // 2. Submit Blessing
        console.log('Submitting blessing...');
        const blessRes = await fetch(`${BASE_URL}/api/blessing`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                token,
                name: 'Friend',
                message: 'Best wishes for your new home!'
            })
        });
        const blessData = await blessRes.json();
        console.log('Blessing Response:', blessData);

        if (!blessData.success) throw new Error('Failed to submit blessing');

        console.log('Verification Successful!');
    } catch (err) {
        console.error('Verification Failed:', err);
        process.exit(1);
    }
}

verify();
