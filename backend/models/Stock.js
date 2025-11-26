import mongoose from 'mongoose';

const stockSchema = new mongoose.Schema({
    symbol: {
        type: String,
        required: true,
        unique: true,
        uppercase: true
    },
    company: {
        type: String,
        required: true
    },
    sector: {
        type: String,
        enum: ['technology', 'healthcare', 'consumer', 'industrial', 'energy', 'other'],
        default: 'other'
    },
    price: {
        type: Number,
        required: true
    },
    change: {
        type: Number,
        default: 0
    },
    marketCap: String,
    volume: String,
    debtRatio: {
        type: Number,
        default: 0
    },
    liquidAssetsRatio: {
        type: Number,
        default: 0
    },
    receivablesRatio: {
        type: Number,
        default: 0
    },
    interestIncome: {
        type: Number,
        default: 0
    },
    prohibitedActivities: {
        type: Boolean,
        default: false
    },
    isCompliant: {
        type: Boolean,
        default: false
    },
    complianceScore: {
        type: Number,
        min: 0,
        max: 100,
        default: 0
    },
    issues: [String],
    isMock: {
        type: Boolean,
        default: false
    },
    lastUpdated: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

// Index for faster queries
stockSchema.index({ symbol: 1 });
stockSchema.index({ isCompliant: 1, complianceScore: -1 });
stockSchema.index({ sector: 1 });

export default mongoose.model('Stock', stockSchema);
