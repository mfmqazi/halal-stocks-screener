import express from 'express';
import blacklistService from '../services/blacklistService.js';
import Blacklist from '../models/Blacklist.js';

const router = express.Router();

// GET /api/admin/blacklist - Get all blacklisted companies
router.get('/blacklist', async (req, res) => {
    try {
        const { type, active } = req.query;

        let query = {};
        if (type) query.type = type.toUpperCase();
        if (active !== undefined) query.active = active === 'true';

        const blacklists = await Blacklist.find(query).sort({ type: 1, symbol: 1 });

        res.json({
            total: blacklists.length,
            blacklists
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// POST /api/admin/blacklist/refresh - Manually refresh blacklist cache
router.post('/blacklist/refresh', async (req, res) => {
    try {
        await blacklistService.refreshCache();
        const stats = blacklistService.getAllBlacklisted();

        res.json({
            success: true,
            message: 'Blacklist cache refreshed',
            stats: {
                BDS: stats.BDS.length,
                ETHICAL: stats.ETHICAL.length,
                lastUpdated: blacklistService.cache.lastUpdated
            }
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// POST /api/admin/blacklist/initialize - Re-initialize from hardcoded values
router.post('/blacklist/initialize', async (req, res) => {
    try {
        await blacklistService.initializeFromHardcoded();
        const stats = blacklistService.getAllBlacklisted();

        res.json({
            success: true,
            message: 'Blacklist initialized from hardcoded values',
            stats: {
                BDS: stats.BDS.length,
                ETHICAL: stats.ETHICAL.length
            }
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// POST /api/admin/blacklist - Add a new company to blacklist
router.post('/blacklist', async (req, res) => {
    try {
        const { type, symbol, reason, category } = req.body;

        if (!type || !symbol || !reason) {
            return res.status(400).json({ error: 'Type, symbol, and reason are required' });
        }

        const blacklist = await Blacklist.findOneAndUpdate(
            { type: type.toUpperCase(), symbol: symbol.toUpperCase() },
            {
                type: type.toUpperCase(),
                symbol: symbol.toUpperCase(),
                reason,
                category: category || 'other',
                lastVerified: new Date(),
                active: true
            },
            { upsert: true, new: true }
        );

        await blacklistService.refreshCache();

        res.json({
            success: true,
            message: 'Company added to blacklist',
            blacklist
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// DELETE /api/admin/blacklist/:symbol - Remove a company from blacklist
router.delete('/blacklist/:symbol', async (req, res) => {
    try {
        const { symbol } = req.params;
        const { type } = req.query;

        let query = { symbol: symbol.toUpperCase() };
        if (type) query.type = type.toUpperCase();

        const result = await Blacklist.updateMany(query, { active: false });

        await blacklistService.refreshCache();

        res.json({
            success: true,
            message: `Deactivated ${result.modifiedCount} entries for ${symbol}`
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;
