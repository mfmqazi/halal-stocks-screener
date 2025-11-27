import Blacklist from '../models/Blacklist.js';

class BlacklistService {
    constructor() {
        this.cache = {
            BDS: new Set(),
            ETHICAL: new Set(),
            lastUpdated: null
        };
    }

    // Initialize blacklist from hardcoded values (fallback)
    async initializeFromHardcoded() {
        const bdsCompanies = [
            // Tech & Cloud Services
            { symbol: 'GOOGL', company: 'Alphabet Inc.', reason: 'Project Nimbus, R&D in Israel', category: 'tech' },
            { symbol: 'GOOG', company: 'Alphabet Inc.', reason: 'Project Nimbus, R&D in Israel', category: 'tech' },
            { symbol: 'AMZN', company: 'Amazon.com Inc.', reason: 'Cloud services to Israeli military', category: 'tech' },
            { symbol: 'META', company: 'Meta Platforms Inc.', reason: 'Support for Israeli operations', category: 'tech' },
            { symbol: 'MSFT', company: 'Microsoft Corporation', reason: 'Significant Israeli operations', category: 'tech' },
            { symbol: 'INTC', company: 'Intel Corporation', reason: 'Major investments in Israel', category: 'tech' },
            { symbol: 'DELL', company: 'Dell Technologies', reason: 'Supplies to Israeli military', category: 'tech' },
            { symbol: 'HPQ', company: 'HP Inc.', reason: 'Systems for movement restrictions', category: 'tech' },
            { symbol: 'HPE', company: 'Hewlett Packard Enterprise', reason: 'Systems for movement restrictions', category: 'tech' },
            { symbol: 'ORCL', company: 'Oracle Corporation', reason: 'Israeli operations', category: 'tech' },
            { symbol: 'IBM', company: 'IBM', reason: 'Israeli operations', category: 'tech' },
            { symbol: 'CSCO', company: 'Cisco Systems', reason: 'Israeli operations', category: 'tech' },
            { symbol: 'QCOM', company: 'Qualcomm Inc.', reason: 'Israeli operations', category: 'tech' },
            { symbol: 'WIX', company: 'Wix.com Ltd.', reason: 'Israeli company', category: 'tech' },

            // Defense & Aerospace
            { symbol: 'BA', company: 'Boeing Company', reason: 'Military equipment supplier', category: 'defense' },
            { symbol: 'LMT', company: 'Lockheed Martin', reason: 'Military equipment supplier', category: 'defense' },
            { symbol: 'RTX', company: 'Raytheon Technologies', reason: 'Military equipment supplier', category: 'defense' },
            { symbol: 'NOC', company: 'Northrop Grumman', reason: 'Military equipment supplier', category: 'defense' },
            { symbol: 'GD', company: 'General Dynamics', reason: 'Military equipment supplier', category: 'defense' },
            { symbol: 'TXT', company: 'Textron Inc.', reason: 'Military equipment supplier', category: 'defense' },
            { symbol: 'HII', company: 'Huntington Ingalls', reason: 'Military equipment supplier', category: 'defense' },
            { symbol: 'PLTR', company: 'Palantir Technologies', reason: 'Surveillance tech to Israeli military', category: 'defense' },
            { symbol: 'ESLT', company: 'Elbit Systems', reason: 'Israeli defense company', category: 'defense' },

            // Heavy Machinery & Construction
            { symbol: 'CAT', company: 'Caterpillar Inc.', reason: 'Bulldozers for demolitions', category: 'machinery' },
            { symbol: 'GE', company: 'General Electric', reason: 'Projects in occupied territories', category: 'machinery' },

            // Consumer Brands & Food
            { symbol: 'SBUX', company: 'Starbucks Corporation', reason: 'Support for Israeli operations', category: 'consumer' },
            { symbol: 'MCD', company: 'McDonald\'s Corporation', reason: 'Israeli franchisee supports military', category: 'consumer' },
            { symbol: 'PEP', company: 'PepsiCo Inc.', reason: 'Owns SodaStream', category: 'consumer' },
            { symbol: 'KO', company: 'Coca-Cola Company', reason: 'Factory in settlements', category: 'consumer' },
            { symbol: 'QSR', company: 'Restaurant Brands Intl', reason: 'Israeli franchisee supports military', category: 'consumer' },
            { symbol: 'YUM', company: 'Yum! Brands', reason: 'Israeli operations', category: 'consumer' },
            { symbol: 'PZZA', company: 'Papa John\'s', reason: 'Israeli operations', category: 'consumer' },
            { symbol: 'PG', company: 'Procter & Gamble', reason: 'R&D in Tel Aviv', category: 'consumer' },
            { symbol: 'UL', company: 'Unilever PLC', reason: 'Israeli operations', category: 'consumer' },

            // Entertainment & Media
            { symbol: 'DIS', company: 'Walt Disney Company', reason: 'Investments and ties to Israel', category: 'media' },

            // Travel & Hospitality
            { symbol: 'ABNB', company: 'Airbnb Inc.', reason: 'Rentals in settlements', category: 'travel' },
            { symbol: 'BKNG', company: 'Booking Holdings', reason: 'Rentals in settlements', category: 'travel' },
            { symbol: 'EXPE', company: 'Expedia Group', reason: 'Rentals in settlements', category: 'travel' },

            // Energy
            { symbol: 'CVX', company: 'Chevron Corporation', reason: 'Gas extraction in occupied territories', category: 'energy' },

            // Pharmaceuticals
            { symbol: 'TEVA', company: 'Teva Pharmaceutical', reason: 'Israeli pharmaceutical company', category: 'pharma' }
        ];

        const ethicalCompanies = [
            { symbol: 'MO', company: 'Altria Group', reason: 'Tobacco', category: 'consumer' },
            { symbol: 'PM', company: 'Philip Morris Intl', reason: 'Tobacco', category: 'consumer' },
            { symbol: 'BTI', company: 'British American Tobacco', reason: 'Tobacco', category: 'consumer' },
            { symbol: 'BUD', company: 'Anheuser-Busch InBev', reason: 'Alcohol', category: 'consumer' },
            { symbol: 'TAP', company: 'Molson Coors', reason: 'Alcohol', category: 'consumer' },
            { symbol: 'STZ', company: 'Constellation Brands', reason: 'Alcohol', category: 'consumer' },
            { symbol: 'LVS', company: 'Las Vegas Sands', reason: 'Gambling', category: 'consumer' },
            { symbol: 'WYNN', company: 'Wynn Resorts', reason: 'Gambling', category: 'consumer' },
            { symbol: 'MGM', company: 'MGM Resorts', reason: 'Gambling', category: 'consumer' },
            { symbol: 'CZR', company: 'Caesars Entertainment', reason: 'Gambling', category: 'consumer' },
            { symbol: 'JPM', company: 'JPMorgan Chase', reason: 'Conventional Banking', category: 'other' },
            { symbol: 'BAC', company: 'Bank of America', reason: 'Conventional Banking', category: 'other' },
            { symbol: 'C', company: 'Citigroup Inc.', reason: 'Conventional Banking', category: 'other' },
            { symbol: 'WFC', company: 'Wells Fargo', reason: 'Conventional Banking', category: 'other' },
            { symbol: 'GS', company: 'Goldman Sachs', reason: 'Conventional Banking', category: 'other' },
            { symbol: 'MS', company: 'Morgan Stanley', reason: 'Conventional Banking', category: 'other' },
            { symbol: 'AIG', company: 'AIG', reason: 'Conventional Insurance', category: 'other' },
            { symbol: 'PRU', company: 'Prudential Financial', reason: 'Conventional Insurance', category: 'other' },
            { symbol: 'MET', company: 'MetLife Inc.', reason: 'Conventional Insurance', category: 'other' },
            { symbol: 'AFL', company: 'Aflac Inc.', reason: 'Conventional Insurance', category: 'other' }
        ];

        try {
            // Insert BDS companies
            for (const company of bdsCompanies) {
                await Blacklist.findOneAndUpdate(
                    { type: 'BDS', symbol: company.symbol },
                    {
                        ...company,
                        type: 'BDS',
                        source: 'BDS Movement',
                        lastVerified: new Date(),
                        active: true
                    },
                    { upsert: true, new: true }
                );
            }

            // Insert ethical companies
            for (const company of ethicalCompanies) {
                await Blacklist.findOneAndUpdate(
                    { type: 'ETHICAL', symbol: company.symbol },
                    {
                        ...company,
                        type: 'ETHICAL',
                        source: 'Islamic Finance Standards',
                        lastVerified: new Date(),
                        active: true
                    },
                    { upsert: true, new: true }
                );
            }

            console.log('✅ Blacklist initialized from hardcoded values');
            await this.refreshCache();
        } catch (error) {
            console.error('❌ Error initializing blacklist:', error.message);
        }
    }

    // Refresh in-memory cache from database
    async refreshCache() {
        try {
            const blacklists = await Blacklist.find({ active: true });

            this.cache.BDS.clear();
            this.cache.ETHICAL.clear();

            blacklists.forEach(item => {
                if (item.type === 'BDS') {
                    this.cache.BDS.add(item.symbol);
                } else if (item.type === 'ETHICAL') {
                    this.cache.ETHICAL.add(item.symbol);
                }
            });

            this.cache.lastUpdated = new Date();
            console.log(`✅ Cache refreshed: ${this.cache.BDS.size} BDS, ${this.cache.ETHICAL.size} Ethical`);
        } catch (error) {
            console.error('❌ Error refreshing cache:', error.message);
        }
    }

    // Check if a symbol is blacklisted
    isBlacklisted(symbol, type = null) {
        if (!symbol) return false;

        const upperSymbol = symbol.toUpperCase();

        if (type === 'BDS') {
            return this.cache.BDS.has(upperSymbol);
        } else if (type === 'ETHICAL') {
            return this.cache.ETHICAL.has(upperSymbol);
        } else {
            return this.cache.BDS.has(upperSymbol) || this.cache.ETHICAL.has(upperSymbol);
        }
    }

    // Get blacklist reason
    async getBlacklistReason(symbol) {
        const item = await Blacklist.findOne({ symbol: symbol.toUpperCase(), active: true });
        return item ? item.reason : null;
    }

    // Get all blacklisted symbols
    getAllBlacklisted(type = null) {
        if (type === 'BDS') {
            return Array.from(this.cache.BDS);
        } else if (type === 'ETHICAL') {
            return Array.from(this.cache.ETHICAL);
        } else {
            return {
                BDS: Array.from(this.cache.BDS),
                ETHICAL: Array.from(this.cache.ETHICAL)
            };
        }
    }

    // Manual update endpoint (for future API integration)
    async updateFromSource() {
        console.log('📡 Checking for blacklist updates...');
        // TODO: Implement API call to fetch latest BDS list
        // For now, just refresh from database
        await this.refreshCache();
        return { success: true, message: 'Blacklist updated from database' };
    }
}

export default new BlacklistService();
