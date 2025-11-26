import express from 'express';
import Stock from '../models/Stock.js';
import finnhubService from '../services/finnhubService.js';

const router = express.Router();

// GET /api/stocks - Get all compliant stocks
router.get('/', async (req, res) => {
    try {
        const { sector, sortBy, page = 1, limit = 100 } = req.query;

        // Build query
        let query = { isCompliant: true };
        if (sector && sector !== 'all') {
            query.sector = sector;
        }

        // Build sort
        let sort = {};
        switch (sortBy) {
            case 'score':
                sort = { complianceScore: -1 };
                break;
            case 'performance':
                sort = { change: -1 };
                break;
            case 'market-cap':
                sort = { marketCap: -1 };
                break;
            default:
                sort = { complianceScore: -1 };
        }

        // Execute query with pagination
        const stocks = await Stock.find(query)
            .sort(sort)
            .limit(parseInt(limit))
            .skip((parseInt(page) - 1) * parseInt(limit));

        const total = await Stock.countDocuments(query);

        res.json({
            stocks,
            pagination: {
                page: parseInt(page),
                limit: parseInt(limit),
                total,
                pages: Math.ceil(total / parseInt(limit))
            }
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// GET /api/stocks/:symbol - Get specific stock
router.get('/:symbol', async (req, res) => {
    try {
        const { symbol } = req.params;

        console.log(`📊 Fetching stock data for: ${symbol}`);

        // Try to get from database first
        let stock = await Stock.findOne({ symbol: symbol.toUpperCase() });

        // If not in database or outdated (> 1 hour), fetch from Finnhub
        if (!stock || (Date.now() - stock.lastUpdated > 3600000)) {
            console.log(`🔄 Fetching fresh data from Finnhub for ${symbol}`);

            const stockData = await finnhubService.getStockData(symbol.toUpperCase());

            if (!stockData) {
                console.error(`❌ Finnhub returned no data for ${symbol}`);
                return res.status(404).json({
                    error: 'Stock not found',
                    message: `Unable to fetch data for symbol: ${symbol}. Please verify the symbol is correct.`,
                    symbol: symbol.toUpperCase()
                });
            }

            const screenedData = finnhubService.screenStock(stockData);

            // Update or create in database
            stock = await Stock.findOneAndUpdate(
                { symbol: symbol.toUpperCase() },
                { ...screenedData, lastUpdated: Date.now() },
                { upsert: true, new: true }
            );

            console.log(`✅ Successfully fetched and screened ${symbol}`);
        } else {
            console.log(`📦 Using cached data for ${symbol}`);
        }

        res.json(stock);
    } catch (error) {
        console.error(`💥 Error in /api/stocks/${req.params.symbol}:`, error.message);
        res.status(500).json({
            error: 'Internal server error',
            message: error.message,
            symbol: req.params.symbol
        });
    }
});

// POST /api/stocks/refresh - Manually refresh stock data
router.post('/refresh/:symbol', async (req, res) => {
    try {
        const { symbol } = req.params;

        const stockData = await finnhubService.getStockData(symbol.toUpperCase());

        if (!stockData) {
            return res.status(404).json({ error: 'Stock not found' });
        }

        const screenedData = finnhubService.screenStock(stockData);

        const stock = await Stock.findOneAndUpdate(
            { symbol: symbol.toUpperCase() },
            { ...screenedData, lastUpdated: Date.now() },
            { upsert: true, new: true }
        );

        res.json({ message: 'Stock refreshed successfully', stock });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// GET /api/stocks/search/:query - Search stocks
router.get('/search/:query', async (req, res) => {
    try {
        const { query } = req.params;

        const stocks = await Stock.find({
            $or: [
                { symbol: { $regex: query, $options: 'i' } },
                { company: { $regex: query, $options: 'i' } }
            ]
        }).limit(10);

        res.json(stocks);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;
