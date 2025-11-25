import cron from 'node-cron';
import Stock from '../models/Stock.js';
import finnhubService from '../services/finnhubService.js';

// List of major stocks to track
const TRACKED_SYMBOLS = [
    // Technology
    'AAPL', 'NVDA', 'AMD', 'TSM', 'ADBE', 'CRM', 'SHOP', 'SNOW', 'AVGO', 'ASML',
    'AMAT', 'LRCX', 'KLAC', 'SNPS', 'CDNS', 'MRVL', 'NXPI', 'MCHP', 'ON',
    'PANW', 'CRWD', 'FTNT', 'NET', 'DDOG', 'ZS', 'WDAY', 'TEAM', 'SPOT', 'SQ', 'RBLX',
    // Healthcare
    'JNJ', 'UNH', 'PFE', 'ABBV', 'TMO', 'LLY', 'MRK', 'AMGN', 'GILD', 'REGN',
    'VRTX', 'BIIB', 'ISRG', 'DXCM', 'IDXX', 'ILMN', 'ALGN', 'MRNA', 'BNTX', 'EXAS',
    // Consumer
    'PG', 'COST', 'NKE', 'HD', 'TGT', 'WMT', 'LOW', 'BKNG', 'ABNB', 'LULU',
    'ULTA', 'ROST', 'DG', 'DLTR', 'TSLA', 'F', 'GM', 'RIVN', 'LCID',
    // Industrial
    'HON', 'UPS', 'DE', 'EMR', 'ETN', 'ITW', 'PH', 'ROK', 'FDX', 'WM',
    // Energy
    'NEE', 'ENPH', 'SEDG', 'FSLR', 'RUN', 'PLUG', 'BE', 'CHPT', 'BLNK', 'NOVA'
];

// Update all tracked stocks
async function updateAllStocks() {
    console.log('🔄 Starting daily stock update...');

    try {
        const results = await finnhubService.getMultipleStocks(TRACKED_SYMBOLS, 1200); // 1.2s delay between requests

        for (const stockData of results) {
            await Stock.findOneAndUpdate(
                { symbol: stockData.symbol },
                { ...stockData, lastUpdated: Date.now() },
                { upsert: true }
            );
        }

        console.log(`✅ Updated ${results.length} stocks successfully`);
    } catch (error) {
        console.error('❌ Error updating stocks:', error.message);
    }
}

// Start cron jobs
export function startCronJobs() {
    // Update stocks daily at 6 PM EST (after market close)
    cron.schedule('0 18 * * 1-5', async () => {
        console.log('⏰ Running scheduled stock update...');
        await updateAllStocks();
    }, {
        timezone: "America/New_York"
    });

    // Clean up old data weekly (Sunday at 2 AM)
    cron.schedule('0 2 * * 0', async () => {
        console.log('🧹 Cleaning up old stock data...');
        try {
            const oneWeekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
            const result = await Stock.deleteMany({
                lastUpdated: { $lt: oneWeekAgo },
                isCompliant: false
            });
            console.log(`✅ Deleted ${result.deletedCount} old non-compliant stocks`);
        } catch (error) {
            console.error('❌ Error cleaning up data:', error.message);
        }
    });

    console.log('✅ Cron jobs scheduled successfully');
}

// Manual update function (can be called via API or CLI)
export async function manualUpdate() {
    await updateAllStocks();
}
