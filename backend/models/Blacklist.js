import mongoose from 'mongoose';

const blacklistSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ['BDS', 'ETHICAL'],
        required: true
    },
    symbol: {
        type: String,
        required: true,
        uppercase: true
    },
    company: {
        type: String,
        default: ''
    },
    reason: {
        type: String,
        required: true
    },
    category: {
        type: String,
        enum: ['tech', 'defense', 'consumer', 'travel', 'energy', 'pharma', 'machinery', 'media', 'other'],
        default: 'other'
    },
    source: {
        type: String,
        default: 'BDS Movement'
    },
    dateAdded: {
        type: Date,
        default: Date.now
    },
    lastVerified: {
        type: Date,
        default: Date.now
    },
    active: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

// Compound index for efficient lookups
blacklistSchema.index({ type: 1, symbol: 1 }, { unique: true });
blacklistSchema.index({ active: 1 });

export default mongoose.model('Blacklist', blacklistSchema);
