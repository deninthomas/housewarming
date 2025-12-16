const mongoose = require('mongoose');
const Invite = require('../models/Invite');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/housewarming';

async function check() {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    const token = '00Y0Lapxnw';
    const invite = await Invite.findOne({ token });
    console.log('Invite status:', invite);

    process.exit(0);
}

check().catch(console.error);
