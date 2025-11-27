import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Stock from './models/Stock.js';

dotenv.config();

async function clearCachedStocks() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ Connected to MongoDB');

        // Delete all cached stocks to force fresh fetch
        const deleteAll = await Stock.deleteMany({});
        console.log(`🗑️  Deleted ${deleteAll.deletedCount} cached stocks`);

        console.log('✅ Cache cleared successfully');
        process.exit(0);
    } catch (error) {
        console.error('❌ Error:', error.message);
        process.exit(1);
    }
}

clearCachedStocks();
