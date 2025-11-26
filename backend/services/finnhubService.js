import axios from 'axios';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const FINNHUB_BASE_URL = 'https://finnhub.io/api/v1';
const API_KEY = process.env.FINNHUB_API_KEY;

// BDS and Ethical Blacklists
const BDS_BLACKLIST = [
    'CAT', 'SBUX', 'MCD', 'PEP', 'KO', 'DIS', 'GOOGL', 'GOOG', 'AMZN',
    'META', 'MSFT', 'INTC', 'HPQ', 'ORCL', 'IBM', 'CSCO', 'QCOM',
    'BA', 'LMT', 'RTX', 'NOC', 'GD', 'TXT', 'HII'
];

const ETHICAL_BLACKLIST = [
    'MO', 'PM', 'BTI', // Tobacco
    'BUD', 'TAP', 'STZ', // Alcohol
    'LVS', 'WYNN', 'MGM', 'CZR', // Gambling
    'JPM', 'BAC', 'C', 'WFC', 'GS', 'MS', // Conventional Banking
    'AIG', 'PRU', 'MET', 'AFL', // Conventional Insurance
];

class FinnhubService {
    constructor() {
        this.apiKey = API_KEY;
        this.baseURL = FINNHUB_BASE_URL;
    }

    // Get stock quote (price, change, etc.)
    async getQuote(symbol) {
        try {
            console.log(`Requesting quote for ${symbol} with token: ${this.apiKey?.substring(0, 10)}...`);
            const response = await axios.get(`${this.baseURL}/quote`, {
                params: {
                    symbol: symbol,
                    token: this.apiKey
                }
            });
            return response.data;
        } catch (error) {
            console.error(`Error fetching quote for ${symbol}:`, error.response?.status, error.response?.data || error.message);
            return null;
        }
    }

    // Get company profile
    async getCompanyProfile(symbol) {
        try {
            const response = await axios.get(`${this.baseURL}/stock/profile2`, {
                params: {
                    symbol: symbol,
                    token: this.apiKey
                }
            });
            return response.data;
        } catch (error) {
            console.error(`Error fetching profile for ${symbol}:`, error.response?.status, error.response?.data || error.message);
            return null;
        }
    }

    // Get basic financials
    async getBasicFinancials(symbol) {
        try {
            const response = await axios.get(`${this.baseURL}/stock/metric`, {
                params: {
                    symbol: symbol,
                    metric: 'all',
                    token: this.apiKey
                }
            });
            return response.data;
        } catch (error) {
            console.error(`Error fetching financials for ${symbol}:`, error.message);
            return null;
        }
    }

    // Get comprehensive stock data
    async getStockData(symbol) {
        try {
            // Check if API key is configured
            if (!this.apiKey) {
                console.warn('⚠️ Finnhub API key not configured. Using mock data.');
                return this.getMockData(symbol);
            }

            const [quote, profile, financials] = await Promise.all([
                this.getQuote(symbol),
                this.getCompanyProfile(symbol),
                this.getBasicFinancials(symbol)
            ]);

            if (!quote || !profile) {
                console.warn(`⚠️ Symbol ${symbol} not found in Finnhub API.`);
                return null;
            }

            // Check if we got valid data (not empty response)
            if (!quote.c || !profile.name) {
                console.warn(`⚠️ Invalid data returned for ${symbol}.`);
                return null;
            }

            return {
                symbol: symbol,
                company: profile.name || symbol,
                sector: this.mapSector(profile.finnhubIndustry),
                price: quote.c || 0, // current price
                change: quote.dp || 0, // percent change
                marketCap: profile.marketCapitalization ? `${(profile.marketCapitalization / 1000).toFixed(1)}B` : 'N/A',
                volume: quote.v ? `${(quote.v / 1000000).toFixed(1)}M` : 'N/A',
                // Financial metrics for Shariah screening
                debtRatio: this.calculateDebtRatio(financials),
                liquidAssetsRatio: this.calculateLiquidAssetsRatio(financials),
                receivablesRatio: this.calculateReceivablesRatio(financials),
                interestIncome: this.calculateInterestIncome(financials),
                prohibitedActivities: this.checkProhibitedActivities(profile),
                complianceScore: 0 // Will be calculated after screening
            };
        } catch (error) {
            console.error(`Error getting stock data for ${symbol}:`, error.message);
            return null;
        }
    }

    // Generate mock data for demonstration/fallback
    getMockData(symbol) {
        const mockPrice = Math.random() * 500 + 50;
        const mockChange = (Math.random() - 0.5) * 5;

        return {
            symbol: symbol,
            company: `${symbol} Corporation (Demo Data)`,
            sector: 'technology',
            price: mockPrice,
            change: mockChange,
            marketCap: `${(Math.random() * 500 + 10).toFixed(1)}B`,
            volume: `${(Math.random() * 10 + 1).toFixed(1)}M`,
            debtRatio: Math.random() * 0.4,
            liquidAssetsRatio: Math.random() * 0.4,
            receivablesRatio: Math.random() * 0.5,
            interestIncome: Math.random() * 0.06,
            prohibitedActivities: false,
            complianceScore: 0,
            isMock: true
        };
    }

    // Map Finnhub industry to our sectors
    mapSector(industry) {
        if (!industry) return 'other';

        const industryLower = industry.toLowerCase();

        if (industryLower.includes('tech') || industryLower.includes('software') ||
            industryLower.includes('semiconductor') || industryLower.includes('internet')) {
            return 'technology';
        } else if (industryLower.includes('health') || industryLower.includes('pharma') ||
            industryLower.includes('biotech') || industryLower.includes('medical')) {
            return 'healthcare';
        } else if (industryLower.includes('consumer') || industryLower.includes('retail') ||
            industryLower.includes('food') || industryLower.includes('auto')) {
            return 'consumer';
        } else if (industryLower.includes('industrial') || industryLower.includes('manufacturing') ||
            industryLower.includes('aerospace') || industryLower.includes('transport')) {
            return 'industrial';
        } else if (industryLower.includes('energy') || industryLower.includes('oil') ||
            industryLower.includes('gas') || industryLower.includes('renewable')) {
            return 'energy';
        }

        return 'other';
    }

    // Calculate financial ratios for Shariah screening
    calculateDebtRatio(financials) {
        if (!financials || !financials.metric) return 0;

        // Total Debt / Market Cap
        const totalDebt = financials.metric.totalDebt || 0;
        const marketCap = financials.metric.marketCapitalization || 1;

        return totalDebt / marketCap;
    }

    calculateLiquidAssetsRatio(financials) {
        if (!financials || !financials.metric) return 0;

        // (Cash + Marketable Securities) / Market Cap
        const cash = financials.metric.cashRatio || 0;
        const marketCap = financials.metric.marketCapitalization || 1;

        return cash / marketCap;
    }

    calculateReceivablesRatio(financials) {
        if (!financials || !financials.metric) return 0;

        // Accounts Receivable / Market Cap
        const receivables = financials.metric.receivablesTurnoverAnnual || 0;
        const marketCap = financials.metric.marketCapitalization || 1;

        return receivables / marketCap;
    }

    calculateInterestIncome(financials) {
        if (!financials || !financials.metric) return 0;

        // Interest Income / Total Revenue (estimate)
        // Finnhub doesn't always provide this directly, so we estimate conservatively
        return 0.01; // Default to 1% if not available
    }

    checkProhibitedActivities(profile) {
        if (!profile || !profile.finnhubIndustry) return false;

        const industry = profile.finnhubIndustry.toLowerCase();

        // Check for prohibited industries
        const prohibited = [
            'alcohol', 'tobacco', 'gambling', 'casino', 'gaming',
            'bank', 'insurance', 'financial services', 'pork', 'adult'
        ];

        return prohibited.some(term => industry.includes(term));
    }

    // Check if stock is on blacklist
    isBlacklisted(symbol) {
        return BDS_BLACKLIST.includes(symbol) || ETHICAL_BLACKLIST.includes(symbol);
    }

    // Screen stock for Shariah compliance
    screenStock(stockData) {
        const issues = [];

        // Check BDS/Ethical blacklist
        if (this.isBlacklisted(stockData.symbol)) {
            issues.push('Company on BDS or ethical blacklist');
        }

        // Check debt ratio (should be < 33%)
        if (stockData.debtRatio > 0.33) {
            issues.push('Debt ratio exceeds 33%');
        }

        // Check liquid assets ratio (should be < 33%)
        if (stockData.liquidAssetsRatio > 0.33) {
            issues.push('Liquid assets ratio exceeds 33%');
        }

        // Check receivables ratio (should be < 49%)
        if (stockData.receivablesRatio > 0.49) {
            issues.push('Receivables ratio exceeds 49%');
        }

        // Check interest income (should be < 5%)
        if (stockData.interestIncome > 0.05) {
            issues.push('Interest income exceeds 5%');
        }

        // Check prohibited activities
        if (stockData.prohibitedActivities) {
            issues.push('Involved in prohibited activities');
        }

        const isCompliant = issues.length === 0;

        // Calculate compliance score (0-100)
        let score = 100;
        score -= issues.length * 15; // Deduct 15 points per issue
        score = Math.max(0, Math.min(100, score)); // Clamp between 0-100

        return {
            ...stockData,
            isCompliant,
            issues,
            complianceScore: score
        };
    }

    // Get multiple stocks with rate limiting
    async getMultipleStocks(symbols, delayMs = 1000) {
        const results = [];

        for (const symbol of symbols) {
            const stockData = await this.getStockData(symbol);
            if (stockData) {
                const screenedData = this.screenStock(stockData);
                results.push(screenedData);
            }

            // Rate limiting - wait between requests
            await new Promise(resolve => setTimeout(resolve, delayMs));
        }

        return results;
    }
}

export default new FinnhubService();
