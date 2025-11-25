import express from 'express';
import finnhubService from '../services/finnhubService.js';

const router = express.Router();

// GET /api/test/stock/:symbol - Test Finnhub API directly (no database)
router.get('/stock/:symbol', async (req, res) => {
    try {
        const { symbol } = req.params;

        console.log(`Testing Finnhub API for ${symbol}...`);
        const stockData = await finnhubService.getStockData(symbol.toUpperCase());

        if (!stockData) {
            return res.status(404).json({ error: 'Stock not found or API error' });
        }

        const screenedData = finnhubService.screenStock(stockData);

        res.json({
            success: true,
            message: 'Finnhub API is working!',
            data: screenedData
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// GET /api/test/health - Simple health check
router.get('/health', (req, res) => {
    res.json({
        status: 'OK',
        message: 'Test endpoint is working',
        finnhubConfigured: !!process.env.FINNHUB_API_KEY,
        timestamp: new Date().toISOString()
    });
});

export default router;
