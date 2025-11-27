import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import rateLimit from 'express-rate-limit';
import stockRoutes from './routes/stocks.js';
import authRoutes from './routes/auth.js';
import watchlistRoutes from './routes/watchlist.js';
import testRoutes from './routes/test.js';
import adminRoutes from './routes/admin.js';
import { connectDB } from './config/database.js';
import { startCronJobs } from './jobs/cronJobs.js';
import blacklistService from './services/blacklistService.js';

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB (optional for testing)
connectDB().then(async () => {
    // Initialize blacklist from database or hardcoded values
    await blacklistService.initializeFromHardcoded();
    await blacklistService.refreshCache();
    console.log('✅ Blacklist service initialized');
}).catch(err => {
    console.log('⚠️  Continuing without MongoDB. User features will be limited.');
});

// Trust proxy - required for Render and other reverse proxies
app.set('trust proxy', 1);

// Middleware
app.use(cors({
    origin: process.env.ALLOWED_ORIGINS?.split(',') || '*',
    credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rate limiting
const limiter = rateLimit({
    windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000, // 15 minutes
    max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100,
    message: 'Too many requests from this IP, please try again later.'
});

app.use('/api/', limiter);

// Routes
app.use('/api/stocks', stockRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/watchlist', watchlistRoutes);
app.use('/api/test', testRoutes); // Test routes (no database required)
app.use('/api/admin', adminRoutes); // Admin routes for blacklist management

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({
        status: 'OK',
        message: 'Halal Stocks API is running',
        timestamp: new Date().toISOString()
    });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        error: 'Something went wrong!',
        message: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`📊 Environment: ${process.env.NODE_ENV}`);

    // Start cron jobs for daily updates
    if (process.env.NODE_ENV === 'production') {
        startCronJobs();
        console.log('⏰ Cron jobs started for daily stock updates');
    }
});

export default app;
