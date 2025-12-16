require('dotenv').config();
const mongoose = require('mongoose');
const Invite = require('../models/Invite');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/housewarming';

async function cleanup() {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log('Connected to MongoDB');

        // Delete all invites (Fresh Start)
        const result = await Invite.deleteMany({});
        console.log(`Deleted ${result.deletedCount} invites.`);

        console.log('Database cleanup complete.');
        process.exit(0);
    } catch (err) {
        console.error('Cleanup failed:', err);
        process.exit(1);
    }
}

cleanup();
