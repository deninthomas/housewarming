require('dotenv').config();
const fetch = require('node-fetch');

const BASE_URL = 'http://localhost:3000';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

async function verify() {
    try {
        console.log('--- Starting Verification ---');

        // 1. Admin Login (Failure)
        console.log('1. Testing Admin Login (Failure)...');
        const failLogin = await fetch(`${BASE_URL}/api/admin/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ password: 'wrong' })
        });
        if (failLogin.status !== 401) throw new Error('Admin login should fail with wrong password');
        console.log('   Passed.');

        // 2. Admin Login (Success)
        console.log('2. Testing Admin Login (Success)...');
        const successLogin = await fetch(`${BASE_URL}/api/admin/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ password: ADMIN_PASSWORD })
        });
        if (!successLogin.ok) throw new Error('Admin login failed with correct password');
        const adminCookie = successLogin.headers.get('set-cookie');
        if (!adminCookie) throw new Error('Admin cookie not set');
        console.log('   Passed.');

        // 3. Generate Invite (with Custom Greeting)
        console.log('3. Testing Invite Generation...');
        const genRes = await fetch(`${BASE_URL}/api/invite/generate`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Cookie': adminCookie
            },
            body: JSON.stringify({ guestName: 'Deployment Test', customGreeting: 'Special Welcome' })
        });
        const genData = await genRes.json();
        if (!genData.token) throw new Error('Failed to generate token');
        const token = genData.token;
        console.log('   Passed. Token:', token);

        // 4. First Access (Should succeed and set cookie)
        console.log('4. Testing First Access...');
        const firstAccess = await fetch(`${BASE_URL}/api/invite/${token}`);
        if (!firstAccess.ok) throw new Error('First access failed');
        const inviteCookie = firstAccess.headers.get('set-cookie');
        if (!inviteCookie) throw new Error('Invite cookie not set on first access');
        const firstData = await firstAccess.json();
        if (firstData.customGreeting !== 'Special Welcome') throw new Error('Custom greeting not returned');
        console.log('   Passed.');

        // 5. Second Access (With Cookie - Should succeed)
        console.log('5. Testing Second Access (With Cookie)...');
        const secondAccess = await fetch(`${BASE_URL}/api/invite/${token}`, {
            headers: { 'Cookie': inviteCookie }
        });
        if (!secondAccess.ok) throw new Error('Second access with cookie failed');
        const secondData = await secondAccess.json();
        if (secondData.message !== 'Welcome back!') throw new Error('Expected "Welcome back!" message');
        console.log('   Passed.');

        // 6. Third Access (Without Cookie - Should fail)
        console.log('6. Testing Third Access (Without Cookie)...');
        const thirdAccess = await fetch(`${BASE_URL}/api/invite/${token}`);
        if (thirdAccess.status !== 403) throw new Error('Third access without cookie should be 403');
        console.log('   Passed.');

        console.log('--- Verification Successful! ---');
    } catch (err) {
        console.error('Verification Failed:', err);
        process.exit(1);
    }
}

verify();
