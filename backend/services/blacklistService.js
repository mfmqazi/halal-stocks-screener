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
            { symbol: 'GOOGL', reason: 'Project Nimbus, R&D in Israel', category: 'tech' },
            { symbol: 'GOOG', reason: 'Project Nimbus, R&D in Israel', category: 'tech' },
            { symbol: 'AMZN', reason: 'Cloud services to Israeli military', category: 'tech' },
            { symbol: 'META', reason: 'Support for Israeli operations', category: 'tech' },
            { symbol: 'MSFT', reason: 'Significant Israeli operations', category: 'tech' },
            { symbol: 'INTC', reason: 'Major investments in Israel', category: 'tech' },
            { symbol: 'DELL', reason: 'Supplies to Israeli military', category: 'tech' },
            { symbol: 'HPQ', reason: 'Systems for movement restrictions', category: 'tech' },
            { symbol: 'HPE', reason: 'Systems for movement restrictions', category: 'tech' },
            { symbol: 'ORCL', reason: 'Israeli operations', category: 'tech' },
            { symbol: 'IBM', reason: 'Israeli operations', category: 'tech' },
            { symbol: 'CSCO', reason: 'Israeli operations', category: 'tech' },
            { symbol: 'QCOM', reason: 'Israeli operations', category: 'tech' },
            { symbol: 'WIX', reason: 'Israeli company', category: 'tech' },

            // Defense & Aerospace
            { symbol: 'BA', reason: 'Military equipment supplier', category: 'defense' },
            { symbol: 'LMT', reason: 'Military equipment supplier', category: 'defense' },
            { symbol: 'RTX', reason: 'Military equipment supplier', category: 'defense' },
            { symbol: 'NOC', reason: 'Military equipment supplier', category: 'defense' },
            { symbol: 'GD', reason: 'Military equipment supplier', category: 'defense' },
            { symbol: 'TXT', reason: 'Military equipment supplier', category: 'defense' },
            { symbol: 'HII', reason: 'Military equipment supplier', category: 'defense' },
            { symbol: 'PLTR', reason: 'Surveillance tech to Israeli military', category: 'defense' },
            { symbol: 'ESLT', reason: 'Israeli defense company', category: 'defense' },

            // Heavy Machinery & Construction
            { symbol: 'CAT', reason: 'Bulldozers for demolitions', category: 'machinery' },
            { symbol: 'GE', reason: 'Projects in occupied territories', category: 'machinery' },

            // Consumer Brands & Food
            { symbol: 'SBUX', reason: 'Support for Israeli operations', category: 'consumer' },
            { symbol: 'MCD', reason: 'Israeli franchisee supports military', category: 'consumer' },
            { symbol: 'PEP', reason: 'Owns SodaStream', category: 'consumer' },
            { symbol: 'KO', reason: 'Factory in settlements', category: 'consumer' },
            { symbol: 'QSR', reason: 'Israeli franchisee supports military', category: 'consumer' },
            { symbol: 'YUM', reason: 'Israeli operations', category: 'consumer' },
            { symbol: 'PZZA', reason: 'Israeli operations', category: 'consumer' },
            { symbol: 'PG', reason: 'R&D in Tel Aviv', category: 'consumer' },
            { symbol: 'UL', reason: 'Israeli operations', category: 'consumer' },

            // Entertainment & Media
            { symbol: 'DIS', reason: 'Investments and ties to Israel', category: 'media' },

            // Travel & Hospitality
            { symbol: 'ABNB', reason: 'Rentals in settlements', category: 'travel' },
            { symbol: 'BKNG', reason: 'Rentals in settlements', category: 'travel' },
            { symbol: 'EXPE', reason: 'Rentals in settlements', category: 'travel' },

            // Energy
            { symbol: 'CVX', reason: 'Gas extraction in occupied territories', category: 'energy' },

            // Pharmaceuticals
            { symbol: 'TEVA', reason: 'Israeli pharmaceutical company', category: 'pharma' }
        ];

        const ethicalCompanies = [
            { symbol: 'MO', reason: 'Tobacco', category: 'consumer' },
            { symbol: 'PM', reason: 'Tobacco', category: 'consumer' },
            { symbol: 'BTI', reason: 'Tobacco', category: 'consumer' },
            { symbol: 'BUD', reason: 'Alcohol', category: 'consumer' },
            { symbol: 'TAP', reason: 'Alcohol', category: 'consumer' },
            { symbol: 'STZ', reason: 'Alcohol', category: 'consumer' },
            { symbol: 'LVS', reason: 'Gambling', category: 'consumer' },
            { symbol: 'WYNN', reason: 'Gambling', category: 'consumer' },
            { symbol: 'MGM', reason: 'Gambling', category: 'consumer' },
            { symbol: 'CZR', reason: 'Gambling', category: 'consumer' },
            { symbol: 'JPM', reason: 'Conventional Banking', category: 'other' },
            { symbol: 'BAC', reason: 'Conventional Banking', category: 'other' },
            { symbol: 'C', reason: 'Conventional Banking', category: 'other' },
            { symbol: 'WFC', reason: 'Conventional Banking', category: 'other' },
            { symbol: 'GS', reason: 'Conventional Banking', category: 'other' },
            { symbol: 'MS', reason: 'Conventional Banking', category: 'other' },
            { symbol: 'AIG', reason: 'Conventional Insurance', category: 'other' },
            { symbol: 'PRU', reason: 'Conventional Insurance', category: 'other' },
            { symbol: 'MET', reason: 'Conventional Insurance', category: 'other' },
            { symbol: 'AFL', reason: 'Conventional Insurance', category: 'other' }
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
