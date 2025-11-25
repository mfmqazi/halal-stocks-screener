import express from 'express';
import User from '../models/User.js';
import { authenticateToken } from './auth.js';

const router = express.Router();

// All watchlist routes require authentication
router.use(authenticateToken);

// GET /api/watchlist - Get user's watchlist
router.get('/', async (req, res) => {
    try {
        const user = await User.findById(req.userId).populate('watchlist');
        res.json({ watchlist: user.watchlist });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// POST /api/watchlist/:symbol - Add stock to watchlist
router.post('/:symbol', async (req, res) => {
    try {
        const { symbol } = req.params;

        const user = await User.findById(req.userId);

        if (user.watchlist.includes(symbol.toUpperCase())) {
            return res.status(400).json({ error: 'Stock already in watchlist' });
        }

        user.watchlist.push(symbol.toUpperCase());
        await user.save();

        res.json({ message: 'Stock added to watchlist', watchlist: user.watchlist });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// DELETE /api/watchlist/:symbol - Remove stock from watchlist
router.delete('/:symbol', async (req, res) => {
    try {
        const { symbol } = req.params;

        const user = await User.findById(req.userId);
        user.watchlist = user.watchlist.filter(s => s !== symbol.toUpperCase());
        await user.save();

        res.json({ message: 'Stock removed from watchlist', watchlist: user.watchlist });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// POST /api/watchlist/alerts - Create price alert
router.post('/alerts', async (req, res) => {
    try {
        const { symbol, type, value } = req.body;

        const user = await User.findById(req.userId);
        user.alerts.push({ symbol: symbol.toUpperCase(), type, value, active: true });
        await user.save();

        res.json({ message: 'Alert created', alerts: user.alerts });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// GET /api/watchlist/alerts - Get user's alerts
router.get('/alerts', async (req, res) => {
    try {
        const user = await User.findById(req.userId);
        res.json({ alerts: user.alerts });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;
