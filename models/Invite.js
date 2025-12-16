const mongoose = require('mongoose');

const InviteSchema = new mongoose.Schema({
    token: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    guestName: {
        type: String,
        required: true
    },
    isUsed: {
        type: Boolean,
        default: false
    },
    expiresAt: {
        type: Date
    },
    blessings: [{
        name: String,
        message: String,
        createdAt: { type: Date, default: Date.now }
    }],
    customGreeting: {
        type: String,
        default: ''
    },
    allowMultipleDevices: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.models.Invite || mongoose.model('Invite', InviteSchema);
