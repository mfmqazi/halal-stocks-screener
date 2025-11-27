// API Configuration
const API_BASE_URL = 'https://halal-stocks-screener-2.onrender.com/api';

// BDS List - Companies to exclude (supporting Israeli occupation/genocide)
// Source: BDS Movement (bdsmovement.net) - Updated 2024/2025
// Includes consumer boycott targets, divestment targets, and companies with significant Israeli ties
const BDS_BLACKLIST = [
    // Tech & Cloud Services
    'GOOGL', 'GOOG',  // Google - Project Nimbus, R&D in Israel
    'AMZN',           // Amazon - Cloud services to Israeli military
    'META',           // Meta/Facebook
    'MSFT',           // Microsoft
    'INTC',           // Intel - Major investments in Israel
    'DELL',           // Dell - Supplies to Israeli military
    'HPQ', 'HPE',     // HP - Systems for movement restrictions
    'ORCL',           // Oracle
    'IBM',            // IBM
    'CSCO',           // Cisco
    'QCOM',           // Qualcomm
    'WIX',            // Wix - Israeli company

    // Defense & Aerospace
    'BA',             // Boeing - Military equipment
    'LMT',            // Lockheed Martin
    'RTX',            // Raytheon
    'NOC',            // Northrop Grumman
    'GD',             // General Dynamics
    'TXT',            // Textron
    'HII',            // Huntington Ingalls
    'PLTR',           // Palantir - Surveillance tech to Israeli military
    'ESLT',           // Elbit Systems - Israeli defense

    // Heavy Machinery & Construction
    'CAT',            // Caterpillar - Bulldozers for demolitions
    'GE',             // General Electric - Projects in occupied territories

    // Consumer Brands & Food
    'SBUX',           // Starbucks
    'MCD',            // McDonald's - Israeli franchisee supports military
    'PEP',            // PepsiCo - Owns SodaStream
    'KO',             // Coca-Cola - Factory in settlements
    'QSR',            // Restaurant Brands (Burger King)
    'YUM',            // Yum! Brands (Pizza Hut, KFC)
    'PZZA',           // Papa John's
    'PG',             // Procter & Gamble - R&D in Tel Aviv
    'UL',             // Unilever

    // Entertainment & Media
    'DIS',            // Disney

    // Travel & Hospitality
    'ABNB',           // Airbnb - Rentals in settlements
    'BKNG',           // Booking.com - Rentals in settlements
    'EXPE',           // Expedia - Rentals in settlements

    // Energy
    'CVX',            // Chevron - Gas extraction in occupied territories

    // Pharmaceuticals
    'TEVA'            // Teva - Israeli pharmaceutical company
];

// Additional companies with ethical concerns
const ETHICAL_BLACKLIST = [
    'MO', 'PM', 'BTI', // Tobacco
    'BUD', 'TAP', 'STZ', // Alcohol
    'LVS', 'WYNN', 'MGM', 'CZR', // Gambling
    'JPM', 'BAC', 'C', 'WFC', 'GS', 'MS', // Conventional Banking
    'AIG', 'PRU', 'MET', 'AFL' // Conventional Insurance
];

// Utility to escape HTML to prevent injection/display of raw tags
function escapeHTML(str) {
    if (typeof str !== 'string') return str;
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
}


const STOCK_DATABASE = [
    {
        symbol: 'AMD',
        company: 'Advanced Micro Devices',
        sector: 'technology',
        price: 142.18,
        change: 3.45,
        marketCap: '229B',
        volume: '38.7M',
        debtRatio: 0.12,
        liquidAssetsRatio: 0.25,
        receivablesRatio: 0.20,
        interestIncome: 0.01,
        prohibitedActivities: false,
        complianceScore: 94
    },
    {
        symbol: 'TSM',
        company: 'Taiwan Semiconductor',
        sector: 'technology',
        price: 145.67,
        change: 2.89,
        marketCap: '755B',
        volume: '12.3M',
        debtRatio: 0.18,
        liquidAssetsRatio: 0.22,
        receivablesRatio: 0.16,
        interestIncome: 0.02,
        prohibitedActivities: false,
        complianceScore: 93
    },
    {
        symbol: 'ADBE',
        company: 'Adobe Inc.',
        sector: 'technology',
        price: 562.34,
        change: 5.12,
        marketCap: '256B',
        volume: '2.8M',
        debtRatio: 0.22,
        liquidAssetsRatio: 0.29,
        receivablesRatio: 0.24,
        interestIncome: 0.02,
        prohibitedActivities: false,
        complianceScore: 91
    },
    {
        symbol: 'CRM',
        company: 'Salesforce Inc.',
        sector: 'technology',
        price: 267.89,
        change: 4.23,
        marketCap: '264B',
        volume: '5.6M',
        debtRatio: 0.19,
        liquidAssetsRatio: 0.27,
        receivablesRatio: 0.21,
        interestIncome: 0.01,
        prohibitedActivities: false,
        complianceScore: 92
    },
    {
        symbol: 'SHOP',
        company: 'Shopify Inc.',
        sector: 'technology',
        price: 78.45,
        change: 1.89,
        marketCap: '98B',
        volume: '8.9M',
        debtRatio: 0.08,
        liquidAssetsRatio: 0.31,
        receivablesRatio: 0.14,
        interestIncome: 0.01,
        prohibitedActivities: false,
        complianceScore: 96
    },
    {
        symbol: 'SNOW',
        company: 'Snowflake Inc.',
        sector: 'technology',
        price: 189.23,
        change: 6.78,
        marketCap: '60B',
        volume: '4.2M',
        debtRatio: 0.05,
        liquidAssetsRatio: 0.28,
        receivablesRatio: 0.19,
        interestIncome: 0.01,
        prohibitedActivities: false,
        complianceScore: 97
    },
    {
        symbol: 'AVGO',
        company: 'Broadcom Inc.',
        sector: 'technology',
        price: 892.45,
        change: 3.67,
        marketCap: '412B',
        volume: '2.1M',
        debtRatio: 0.31,
        liquidAssetsRatio: 0.18,
        receivablesRatio: 0.22,
        interestIncome: 0.02,
        prohibitedActivities: false,
        complianceScore: 88
    },
    {
        symbol: 'ASML',
        company: 'ASML Holding',
        sector: 'technology',
        price: 678.34,
        change: 4.12,
        marketCap: '278B',
        volume: '1.8M',
        debtRatio: 0.16,
        liquidAssetsRatio: 0.24,
        receivablesRatio: 0.19,
        interestIncome: 0.01,
        prohibitedActivities: false,
        complianceScore: 93
    },
    {
        symbol: 'AMAT',
        company: 'Applied Materials',
        sector: 'technology',
        price: 167.89,
        change: 2.45,
        marketCap: '145B',
        volume: '6.7M',
        debtRatio: 0.14,
        liquidAssetsRatio: 0.26,
        receivablesRatio: 0.21,
        interestIncome: 0.01,
        prohibitedActivities: false,
        complianceScore: 94
    },
    {
        symbol: 'LRCX',
        company: 'Lam Research',
        sector: 'technology',
        price: 745.23,
        change: 3.89,
        marketCap: '102B',
        volume: '1.4M',
        debtRatio: 0.19,
        liquidAssetsRatio: 0.28,
        receivablesRatio: 0.18,
        interestIncome: 0.01,
        prohibitedActivities: false,
        complianceScore: 92
    },
    {
        symbol: 'KLAC',
        company: 'KLA Corporation',
        sector: 'technology',
        price: 567.45,
        change: 2.78,
        marketCap: '78B',
        volume: '1.2M',
        debtRatio: 0.21,
        liquidAssetsRatio: 0.25,
        receivablesRatio: 0.20,
        interestIncome: 0.02,
        prohibitedActivities: false,
        complianceScore: 91
    },
    {
        symbol: 'SNPS',
        company: 'Synopsys Inc.',
        sector: 'technology',
        price: 489.12,
        change: 3.34,
        marketCap: '75B',
        volume: '1.1M',
        debtRatio: 0.11,
        liquidAssetsRatio: 0.29,
        receivablesRatio: 0.23,
        interestIncome: 0.01,
        prohibitedActivities: false,
        complianceScore: 95
    },
    {
        symbol: 'CDNS',
        company: 'Cadence Design Systems',
        sector: 'technology',
        price: 267.89,
        change: 2.56,
        marketCap: '73B',
        volume: '1.8M',
        debtRatio: 0.09,
        liquidAssetsRatio: 0.27,
        receivablesRatio: 0.21,
        interestIncome: 0.01,
        prohibitedActivities: false,
        complianceScore: 96
    },
    {
        symbol: 'MRVL',
        company: 'Marvell Technology',
        sector: 'technology',
        price: 67.45,
        change: 4.23,
        marketCap: '58B',
        volume: '8.9M',
        debtRatio: 0.13,
        liquidAssetsRatio: 0.30,
        receivablesRatio: 0.17,
        interestIncome: 0.01,
        prohibitedActivities: false,
        complianceScore: 94
    },
    {
        symbol: 'NXPI',
        company: 'NXP Semiconductors',
        sector: 'technology',
        price: 234.56,
        change: 1.89,
        marketCap: '61B',
        volume: '2.3M',
        debtRatio: 0.22,
        liquidAssetsRatio: 0.21,
        receivablesRatio: 0.24,
        interestIncome: 0.02,
        prohibitedActivities: false,
        complianceScore: 90
    },
    {
        symbol: 'MCHP',
        company: 'Microchip Technology',
        sector: 'technology',
        price: 89.34,
        change: 1.45,
        marketCap: '49B',
        volume: '3.4M',
        debtRatio: 0.24,
        liquidAssetsRatio: 0.19,
        receivablesRatio: 0.22,
        interestIncome: 0.02,
        prohibitedActivities: false,
        complianceScore: 89
    },
    {
        symbol: 'ON',
        company: 'ON Semiconductor',
        sector: 'technology',
        price: 78.23,
        change: 2.67,
        marketCap: '34B',
        volume: '5.6M',
        debtRatio: 0.18,
        liquidAssetsRatio: 0.23,
        receivablesRatio: 0.20,
        interestIncome: 0.01,
        prohibitedActivities: false,
        complianceScore: 92
    },
    {
        symbol: 'PANW',
        company: 'Palo Alto Networks',
        sector: 'technology',
        price: 289.45,
        change: 5.34,
        marketCap: '91B',
        volume: '4.2M',
        debtRatio: 0.16,
        liquidAssetsRatio: 0.32,
        receivablesRatio: 0.19,
        interestIncome: 0.01,
        prohibitedActivities: false,
        complianceScore: 93
    },
    {
        symbol: 'CRWD',
        company: 'CrowdStrike Holdings',
        sector: 'technology',
        price: 234.67,
        change: 6.12,
        marketCap: '56B',
        volume: '3.8M',
        debtRatio: 0.07,
        liquidAssetsRatio: 0.31,
        receivablesRatio: 0.16,
        interestIncome: 0.01,
        prohibitedActivities: false,
        complianceScore: 97
    },
    {
        symbol: 'FTNT',
        company: 'Fortinet Inc.',
        sector: 'technology',
        price: 67.89,
        change: 3.45,
        marketCap: '53B',
        volume: '4.1M',
        debtRatio: 0.05,
        liquidAssetsRatio: 0.29,
        receivablesRatio: 0.18,
        interestIncome: 0.01,
        prohibitedActivities: false,
        complianceScore: 97
    },
    {
        symbol: 'NET',
        company: 'Cloudflare Inc.',
        sector: 'technology',
        price: 89.23,
        change: 4.78,
        marketCap: '29B',
        volume: '5.2M',
        debtRatio: 0.06,
        liquidAssetsRatio: 0.30,
        receivablesRatio: 0.15,
        interestIncome: 0.01,
        prohibitedActivities: false,
        complianceScore: 96
    },
    {
        symbol: 'DDOG',
        company: 'Datadog Inc.',
        sector: 'technology',
        price: 112.45,
        change: 3.89,
        marketCap: '36B',
        volume: '3.7M',
        debtRatio: 0.04,
        liquidAssetsRatio: 0.32,
        receivablesRatio: 0.14,
        interestIncome: 0.01,
        prohibitedActivities: false,
        complianceScore: 98
    },
    {
        symbol: 'ZS',
        company: 'Zscaler Inc.',
        sector: 'technology',
        price: 178.90,
        change: 5.23,
        marketCap: '26B',
        volume: '2.9M',
        debtRatio: 0.03,
        liquidAssetsRatio: 0.31,
        receivablesRatio: 0.13,
        interestIncome: 0.01,
        prohibitedActivities: false,
        complianceScore: 98
    },
    {
        symbol: 'WDAY',
        company: 'Workday Inc.',
        sector: 'technology',
        price: 234.56,
        change: 2.89,
        marketCap: '60B',
        volume: '2.4M',
        debtRatio: 0.08,
        liquidAssetsRatio: 0.28,
        receivablesRatio: 0.17,
        interestIncome: 0.01,
        prohibitedActivities: false,
        complianceScore: 95
    },
    {
        symbol: 'TEAM',
        company: 'Atlassian Corporation',
        sector: 'technology',
        price: 189.34,
        change: 3.12,
        marketCap: '49B',
        volume: '1.9M',
        debtRatio: 0.10,
        liquidAssetsRatio: 0.30,
        receivablesRatio: 0.16,
        interestIncome: 0.01,
        prohibitedActivities: false,
        complianceScore: 95
    },
    {
        symbol: 'SPOT',
        company: 'Spotify Technology',
        sector: 'technology',
        price: 267.89,
        change: 4.56,
        marketCap: '52B',
        volume: '2.8M',
        debtRatio: 0.12,
        liquidAssetsRatio: 0.27,
        receivablesRatio: 0.19,
        interestIncome: 0.01,
        prohibitedActivities: false,
        complianceScore: 94
    },
    {
        symbol: 'SQ',
        company: 'Block Inc.',
        sector: 'technology',
        price: 67.45,
        change: 2.34,
        marketCap: '42B',
        volume: '12.3M',
        debtRatio: 0.15,
        liquidAssetsRatio: 0.26,
        receivablesRatio: 0.20,
        interestIncome: 0.02,
        prohibitedActivities: false,
        complianceScore: 92
    },
    {
        symbol: 'RBLX',
        company: 'Roblox Corporation',
        sector: 'technology',
        price: 45.67,
        change: 5.89,
        marketCap: '28B',
        volume: '18.4M',
        debtRatio: 0.09,
        liquidAssetsRatio: 0.32,
        receivablesRatio: 0.12,
        interestIncome: 0.01,
        prohibitedActivities: false,
        complianceScore: 96
    },

    // Healthcare Sector
    {
        symbol: 'JNJ',
        company: 'Johnson & Johnson',
        sector: 'healthcare',
        price: 156.78,
        change: 1.23,
        marketCap: '385B',
        volume: '7.8M',
        debtRatio: 0.21,
        liquidAssetsRatio: 0.24,
        receivablesRatio: 0.18,
        interestIncome: 0.02,
        prohibitedActivities: false,
        complianceScore: 90
    },
    {
        symbol: 'UNH',
        company: 'UnitedHealth Group',
        sector: 'healthcare',
        price: 524.67,
        change: 3.45,
        marketCap: '492B',
        volume: '3.2M',
        debtRatio: 0.29,
        liquidAssetsRatio: 0.19,
        receivablesRatio: 0.22,
        interestIncome: 0.03,
        prohibitedActivities: false,
        complianceScore: 88
    },
    {
        symbol: 'PFE',
        company: 'Pfizer Inc.',
        sector: 'healthcare',
        price: 28.45,
        change: -0.34,
        marketCap: '160B',
        volume: '42.1M',
        debtRatio: 0.26,
        liquidAssetsRatio: 0.28,
        receivablesRatio: 0.20,
        interestIncome: 0.02,
        prohibitedActivities: false,
        complianceScore: 89
    },
    {
        symbol: 'ABBV',
        company: 'AbbVie Inc.',
        sector: 'healthcare',
        price: 167.89,
        change: 2.12,
        marketCap: '296B',
        volume: '6.7M',
        debtRatio: 0.31,
        liquidAssetsRatio: 0.15,
        receivablesRatio: 0.19,
        interestIncome: 0.02,
        prohibitedActivities: false,
        complianceScore: 87
    },
    {
        symbol: 'TMO',
        company: 'Thermo Fisher Scientific',
        sector: 'healthcare',
        price: 545.23,
        change: 4.56,
        marketCap: '213B',
        volume: '1.8M',
        debtRatio: 0.24,
        liquidAssetsRatio: 0.21,
        receivablesRatio: 0.23,
        interestIncome: 0.02,
        prohibitedActivities: false,
        complianceScore: 90
    },
    {
        symbol: 'LLY',
        company: 'Eli Lilly and Company',
        sector: 'healthcare',
        price: 567.89,
        change: 5.67,
        marketCap: '538B',
        volume: '3.4M',
        debtRatio: 0.28,
        liquidAssetsRatio: 0.17,
        receivablesRatio: 0.21,
        interestIncome: 0.02,
        prohibitedActivities: false,
        complianceScore: 88
    },
    {
        symbol: 'MRK',
        company: 'Merck & Co.',
        sector: 'healthcare',
        price: 112.34,
        change: 1.89,
        marketCap: '284B',
        volume: '8.9M',
        debtRatio: 0.25,
        liquidAssetsRatio: 0.22,
        receivablesRatio: 0.19,
        interestIncome: 0.02,
        prohibitedActivities: false,
        complianceScore: 89
    },
    {
        symbol: 'AMGN',
        company: 'Amgen Inc.',
        sector: 'healthcare',
        price: 289.45,
        change: 2.34,
        marketCap: '156B',
        volume: '2.7M',
        debtRatio: 0.32,
        liquidAssetsRatio: 0.16,
        receivablesRatio: 0.20,
        interestIncome: 0.03,
        prohibitedActivities: false,
        complianceScore: 86
    },
    {
        symbol: 'GILD',
        company: 'Gilead Sciences',
        sector: 'healthcare',
        price: 78.90,
        change: 1.45,
        marketCap: '99B',
        volume: '6.8M',
        debtRatio: 0.27,
        liquidAssetsRatio: 0.23,
        receivablesRatio: 0.18,
        interestIncome: 0.02,
        prohibitedActivities: false,
        complianceScore: 88
    },
    {
        symbol: 'REGN',
        company: 'Regeneron Pharmaceuticals',
        sector: 'healthcare',
        price: 867.45,
        change: 3.78,
        marketCap: '94B',
        volume: '0.8M',
        debtRatio: 0.14,
        liquidAssetsRatio: 0.29,
        receivablesRatio: 0.17,
        interestIncome: 0.01,
        prohibitedActivities: false,
        complianceScore: 94
    },
    {
        symbol: 'VRTX',
        company: 'Vertex Pharmaceuticals',
        sector: 'healthcare',
        price: 412.67,
        change: 4.23,
        marketCap: '106B',
        volume: '1.5M',
        debtRatio: 0.08,
        liquidAssetsRatio: 0.31,
        receivablesRatio: 0.14,
        interestIncome: 0.01,
        prohibitedActivities: false,
        complianceScore: 96
    },
    {
        symbol: 'BIIB',
        company: 'Biogen Inc.',
        sector: 'healthcare',
        price: 234.56,
        change: 2.89,
        marketCap: '34B',
        volume: '1.2M',
        debtRatio: 0.23,
        liquidAssetsRatio: 0.26,
        receivablesRatio: 0.19,
        interestIncome: 0.02,
        prohibitedActivities: false,
        complianceScore: 90
    },
    {
        symbol: 'ISRG',
        company: 'Intuitive Surgical',
        sector: 'healthcare',
        price: 389.23,
        change: 3.45,
        marketCap: '139B',
        volume: '1.4M',
        debtRatio: 0.06,
        liquidAssetsRatio: 0.32,
        receivablesRatio: 0.15,
        interestIncome: 0.01,
        prohibitedActivities: false,
        complianceScore: 97
    },
    {
        symbol: 'DXCM',
        company: 'DexCom Inc.',
        sector: 'healthcare',
        price: 112.45,
        change: 5.12,
        marketCap: '44B',
        volume: '3.2M',
        debtRatio: 0.11,
        liquidAssetsRatio: 0.28,
        receivablesRatio: 0.18,
        interestIncome: 0.01,
        prohibitedActivities: false,
        complianceScore: 94
    },
    {
        symbol: 'IDXX',
        company: 'IDEXX Laboratories',
        sector: 'healthcare',
        price: 489.67,
        change: 2.67,
        marketCap: '40B',
        volume: '0.6M',
        debtRatio: 0.19,
        liquidAssetsRatio: 0.24,
        receivablesRatio: 0.21,
        interestIncome: 0.01,
        prohibitedActivities: false,
        complianceScore: 91
    },
    {
        symbol: 'ILMN',
        company: 'Illumina Inc.',
        sector: 'healthcare',
        price: 134.56,
        change: 1.89,
        marketCap: '21B',
        volume: '1.8M',
        debtRatio: 0.17,
        liquidAssetsRatio: 0.27,
        receivablesRatio: 0.20,
        interestIncome: 0.01,
        prohibitedActivities: false,
        complianceScore: 92
    },
    {
        symbol: 'ALGN',
        company: 'Align Technology',
        sector: 'healthcare',
        price: 267.89,
        change: 3.34,
        marketCap: '21B',
        volume: '1.1M',
        debtRatio: 0.13,
        liquidAssetsRatio: 0.30,
        receivablesRatio: 0.16,
        interestIncome: 0.01,
        prohibitedActivities: false,
        complianceScore: 94
    },
    {
        symbol: 'MRNA',
        company: 'Moderna Inc.',
        sector: 'healthcare',
        price: 89.45,
        change: 4.56,
        marketCap: '35B',
        volume: '8.7M',
        debtRatio: 0.05,
        liquidAssetsRatio: 0.33,
        receivablesRatio: 0.12,
        interestIncome: 0.01,
        prohibitedActivities: false,
        complianceScore: 98
    },
    {
        symbol: 'BNTX',
        company: 'BioNTech SE',
        sector: 'healthcare',
        price: 112.34,
        change: 3.78,
        marketCap: '27B',
        volume: '2.4M',
        debtRatio: 0.04,
        liquidAssetsRatio: 0.32,
        receivablesRatio: 0.11,
        interestIncome: 0.01,
        prohibitedActivities: false,
        complianceScore: 98
    },
    {
        symbol: 'EXAS',
        company: 'Exact Sciences',
        sector: 'healthcare',
        price: 67.89,
        change: 2.45,
        marketCap: '12B',
        volume: '2.1M',
        debtRatio: 0.16,
        liquidAssetsRatio: 0.29,
        receivablesRatio: 0.19,
        interestIncome: 0.01,
        prohibitedActivities: false,
        complianceScore: 93
    },

    // Consumer Sector
    {
        symbol: 'PG',
        company: 'Procter & Gamble',
        sector: 'consumer',
        price: 156.34,
        change: 1.45,
        marketCap: '371B',
        volume: '7.2M',
        debtRatio: 0.27,
        liquidAssetsRatio: 0.18,
        receivablesRatio: 0.16,
        interestIncome: 0.02,
        prohibitedActivities: false,
        complianceScore: 88
    },
    {
        symbol: 'COST',
        company: 'Costco Wholesale',
        sector: 'consumer',
        price: 678.90,
        change: 5.67,
        marketCap: '301B',
        volume: '2.1M',
        debtRatio: 0.19,
        liquidAssetsRatio: 0.14,
        receivablesRatio: 0.08,
        interestIncome: 0.01,
        prohibitedActivities: false,
        complianceScore: 92
    },
    {
        symbol: 'NKE',
        company: 'Nike Inc.',
        sector: 'consumer',
        price: 98.45,
        change: 2.34,
        marketCap: '152B',
        volume: '8.9M',
        debtRatio: 0.23,
        liquidAssetsRatio: 0.26,
        receivablesRatio: 0.21,
        interestIncome: 0.01,
        prohibitedActivities: false,
        complianceScore: 90
    },
    {
        symbol: 'HD',
        company: 'Home Depot',
        sector: 'consumer',
        price: 345.67,
        change: 3.21,
        marketCap: '352B',
        volume: '3.4M',
        debtRatio: 0.32,
        liquidAssetsRatio: 0.12,
        receivablesRatio: 0.15,
        interestIncome: 0.02,
        prohibitedActivities: false,
        complianceScore: 86
    },
    {
        symbol: 'TGT',
        company: 'Target Corporation',
        sector: 'consumer',
        price: 142.89,
        change: 1.78,
        marketCap: '66B',
        volume: '4.5M',
        debtRatio: 0.28,
        liquidAssetsRatio: 0.16,
        receivablesRatio: 0.12,
        interestIncome: 0.02,
        prohibitedActivities: false,
        complianceScore: 88
    },
    {
        symbol: 'WMT',
        company: 'Walmart Inc.',
        sector: 'consumer',
        price: 167.89,
        change: 2.12,
        marketCap: '456B',
        volume: '8.3M',
        debtRatio: 0.30,
        liquidAssetsRatio: 0.13,
        receivablesRatio: 0.14,
        interestIncome: 0.02,
        prohibitedActivities: false,
        complianceScore: 87
    },
    {
        symbol: 'LOW',
        company: 'Lowes Companies',
        sector: 'consumer',
        price: 234.56,
        change: 2.89,
        marketCap: '145B',
        volume: '3.7M',
        debtRatio: 0.31,
        liquidAssetsRatio: 0.11,
        receivablesRatio: 0.13,
        interestIncome: 0.02,
        prohibitedActivities: false,
        complianceScore: 86
    },
    {
        symbol: 'BKNG',
        company: 'Booking Holdings',
        sector: 'consumer',
        price: 3456.78,
        change: 4.23,
        marketCap: '128B',
        volume: '0.4M',
        debtRatio: 0.26,
        liquidAssetsRatio: 0.20,
        receivablesRatio: 0.17,
        interestIncome: 0.02,
        prohibitedActivities: false,
        complianceScore: 89
    },
    {
        symbol: 'ABNB',
        company: 'Airbnb Inc.',
        sector: 'consumer',
        price: 134.56,
        change: 3.67,
        marketCap: '86B',
        volume: '5.2M',
        debtRatio: 0.12,
        liquidAssetsRatio: 0.32,
        receivablesRatio: 0.09,
        interestIncome: 0.01,
        prohibitedActivities: false,
        complianceScore: 95
    },
    {
        symbol: 'LULU',
        company: 'Lululemon Athletica',
        sector: 'consumer',
        price: 389.45,
        change: 4.12,
        marketCap: '49B',
        volume: '1.8M',
        debtRatio: 0.08,
        liquidAssetsRatio: 0.28,
        receivablesRatio: 0.11,
        interestIncome: 0.01,
        prohibitedActivities: false,
        complianceScore: 96
    },
    {
        symbol: 'ULTA',
        company: 'Ulta Beauty',
        sector: 'consumer',
        price: 456.78,
        change: 2.89,
        marketCap: '23B',
        volume: '0.9M',
        debtRatio: 0.15,
        liquidAssetsRatio: 0.19,
        receivablesRatio: 0.08,
        interestIncome: 0.01,
        prohibitedActivities: false,
        complianceScore: 93
    },
    {
        symbol: 'ROST',
        company: 'Ross Stores',
        sector: 'consumer',
        price: 134.23,
        change: 1.67,
        marketCap: '46B',
        volume: '2.3M',
        debtRatio: 0.21,
        liquidAssetsRatio: 0.15,
        receivablesRatio: 0.07,
        interestIncome: 0.01,
        prohibitedActivities: false,
        complianceScore: 91
    },
    {
        symbol: 'DG',
        company: 'Dollar General',
        sector: 'consumer',
        price: 145.67,
        change: 2.34,
        marketCap: '33B',
        volume: '2.8M',
        debtRatio: 0.29,
        liquidAssetsRatio: 0.12,
        receivablesRatio: 0.09,
        interestIncome: 0.02,
        prohibitedActivities: false,
        complianceScore: 87
    },
    {
        symbol: 'DLTR',
        company: 'Dollar Tree',
        sector: 'consumer',
        price: 112.34,
        change: 1.89,
        marketCap: '25B',
        volume: '2.1M',
        debtRatio: 0.32,
        liquidAssetsRatio: 0.10,
        receivablesRatio: 0.08,
        interestIncome: 0.02,
        prohibitedActivities: false,
        complianceScore: 85
    },
    {
        symbol: 'TSLA',
        company: 'Tesla Inc.',
        sector: 'consumer',
        price: 234.56,
        change: 6.78,
        marketCap: '745B',
        volume: '112.4M',
        debtRatio: 0.14,
        liquidAssetsRatio: 0.21,
        receivablesRatio: 0.13,
        interestIncome: 0.01,
        prohibitedActivities: false,
        complianceScore: 94
    },
    {
        symbol: 'F',
        company: 'Ford Motor Company',
        sector: 'consumer',
        price: 12.34,
        change: 1.45,
        marketCap: '49B',
        volume: '67.8M',
        debtRatio: 0.32,
        liquidAssetsRatio: 0.18,
        receivablesRatio: 0.25,
        interestIncome: 0.03,
        prohibitedActivities: false,
        complianceScore: 85
    },
    {
        symbol: 'GM',
        company: 'General Motors',
        sector: 'consumer',
        price: 38.45,
        change: 2.12,
        marketCap: '52B',
        volume: '23.4M',
        debtRatio: 0.31,
        liquidAssetsRatio: 0.17,
        receivablesRatio: 0.24,
        interestIncome: 0.03,
        prohibitedActivities: false,
        complianceScore: 85
    },
    {
        symbol: 'RIVN',
        company: 'Rivian Automotive',
        sector: 'consumer',
        price: 14.56,
        change: 5.67,
        marketCap: '14B',
        volume: '45.6M',
        debtRatio: 0.09,
        liquidAssetsRatio: 0.32,
        receivablesRatio: 0.08,
        interestIncome: 0.01,
        prohibitedActivities: false,
        complianceScore: 96
    },
    {
        symbol: 'LCID',
        company: 'Lucid Group',
        sector: 'consumer',
        price: 3.45,
        change: 4.23,
        marketCap: '7B',
        volume: '78.9M',
        debtRatio: 0.07,
        liquidAssetsRatio: 0.31,
        receivablesRatio: 0.06,
        interestIncome: 0.01,
        prohibitedActivities: false,
        complianceScore: 97
    },

    // Industrial Sector
    {
        symbol: 'HON',
        company: 'Honeywell International',
        sector: 'industrial',
        price: 198.45,
        change: 2.34,
        marketCap: '132B',
        volume: '2.8M',
        debtRatio: 0.29,
        liquidAssetsRatio: 0.20,
        receivablesRatio: 0.24,
        interestIncome: 0.02,
        prohibitedActivities: false,
        complianceScore: 87
    },
    {
        symbol: 'UPS',
        company: 'United Parcel Service',
        sector: 'industrial',
        price: 156.78,
        change: 1.89,
        marketCap: '135B',
        volume: '3.2M',
        debtRatio: 0.30,
        liquidAssetsRatio: 0.15,
        receivablesRatio: 0.19,
        interestIncome: 0.02,
        prohibitedActivities: false,
        complianceScore: 86
    },
    {
        symbol: 'DE',
        company: 'Deere & Company',
        sector: 'industrial',
        price: 389.45,
        change: 2.67,
        marketCap: '112B',
        volume: '1.9M',
        debtRatio: 0.28,
        liquidAssetsRatio: 0.17,
        receivablesRatio: 0.26,
        interestIncome: 0.02,
        prohibitedActivities: false,
        complianceScore: 87
    },
    {
        symbol: 'EMR',
        company: 'Emerson Electric',
        sector: 'industrial',
        price: 98.67,
        change: 1.45,
        marketCap: '58B',
        volume: '3.4M',
        debtRatio: 0.27,
        liquidAssetsRatio: 0.19,
        receivablesRatio: 0.23,
        interestIncome: 0.02,
        prohibitedActivities: false,
        complianceScore: 88
    },
    {
        symbol: 'ETN',
        company: 'Eaton Corporation',
        sector: 'industrial',
        price: 267.89,
        change: 2.89,
        marketCap: '106B',
        volume: '2.1M',
        debtRatio: 0.25,
        liquidAssetsRatio: 0.18,
        receivablesRatio: 0.22,
        interestIncome: 0.02,
        prohibitedActivities: false,
        complianceScore: 89
    },
    {
        symbol: 'ITW',
        company: 'Illinois Tool Works',
        sector: 'industrial',
        price: 245.67,
        change: 1.78,
        marketCap: '76B',
        volume: '1.2M',
        debtRatio: 0.26,
        liquidAssetsRatio: 0.16,
        receivablesRatio: 0.21,
        interestIncome: 0.02,
        prohibitedActivities: false,
        complianceScore: 88
    },
    {
        symbol: 'PH',
        company: 'Parker-Hannifin',
        sector: 'industrial',
        price: 478.90,
        change: 2.45,
        marketCap: '61B',
        volume: '0.8M',
        debtRatio: 0.24,
        liquidAssetsRatio: 0.17,
        receivablesRatio: 0.23,
        interestIncome: 0.02,
        prohibitedActivities: false,
        complianceScore: 89
    },
    {
        symbol: 'ROK',
        company: 'Rockwell Automation',
        sector: 'industrial',
        price: 289.34,
        change: 1.89,
        marketCap: '33B',
        volume: '0.9M',
        debtRatio: 0.22,
        liquidAssetsRatio: 0.19,
        receivablesRatio: 0.20,
        interestIncome: 0.02,
        prohibitedActivities: false,
        complianceScore: 90
    },
    {
        symbol: 'FDX',
        company: 'FedEx Corporation',
        sector: 'industrial',
        price: 267.45,
        change: 2.12,
        marketCap: '68B',
        volume: '2.3M',
        debtRatio: 0.31,
        liquidAssetsRatio: 0.14,
        receivablesRatio: 0.21,
        interestIncome: 0.02,
        prohibitedActivities: false,
        complianceScore: 86
    },
    {
        symbol: 'WM',
        company: 'Waste Management',
        sector: 'industrial',
        price: 189.67,
        change: 1.56,
        marketCap: '78B',
        volume: '1.8M',
        debtRatio: 0.30,
        liquidAssetsRatio: 0.13,
        receivablesRatio: 0.18,
        interestIncome: 0.02,
        prohibitedActivities: false,
        complianceScore: 87
    },

    // Energy Sector
    {
        symbol: 'NEE',
        company: 'NextEra Energy',
        sector: 'energy',
        price: 67.89,
        change: 1.45,
        marketCap: '134B',
        volume: '8.9M',
        debtRatio: 0.32,
        liquidAssetsRatio: 0.11,
        receivablesRatio: 0.15,
        interestIncome: 0.02,
        prohibitedActivities: false,
        complianceScore: 85
    },
    {
        symbol: 'ENPH',
        company: 'Enphase Energy',
        sector: 'energy',
        price: 112.45,
        change: 4.56,
        marketCap: '15B',
        volume: '5.6M',
        debtRatio: 0.11,
        liquidAssetsRatio: 0.29,
        receivablesRatio: 0.17,
        interestIncome: 0.01,
        prohibitedActivities: false,
        complianceScore: 94
    },
    {
        symbol: 'SEDG',
        company: 'SolarEdge Technologies',
        sector: 'energy',
        price: 67.34,
        change: 3.89,
        marketCap: '4B',
        volume: '3.4M',
        debtRatio: 0.14,
        liquidAssetsRatio: 0.27,
        receivablesRatio: 0.19,
        interestIncome: 0.01,
        prohibitedActivities: false,
        complianceScore: 93
    },
    {
        symbol: 'FSLR',
        company: 'First Solar',
        sector: 'energy',
        price: 189.45,
        change: 2.78,
        marketCap: '20B',
        volume: '2.1M',
        debtRatio: 0.09,
        liquidAssetsRatio: 0.31,
        receivablesRatio: 0.14,
        interestIncome: 0.01,
        prohibitedActivities: false,
        complianceScore: 96
    },
    {
        symbol: 'RUN',
        company: 'Sunrun Inc.',
        sector: 'energy',
        price: 14.56,
        change: 3.45,
        marketCap: '3B',
        volume: '8.7M',
        debtRatio: 0.28,
        liquidAssetsRatio: 0.16,
        receivablesRatio: 0.12,
        interestIncome: 0.02,
        prohibitedActivities: false,
        complianceScore: 87
    },
    {
        symbol: 'PLUG',
        company: 'Plug Power',
        sector: 'energy',
        price: 3.45,
        change: 5.67,
        marketCap: '2B',
        volume: '45.6M',
        debtRatio: 0.19,
        liquidAssetsRatio: 0.28,
        receivablesRatio: 0.13,
        interestIncome: 0.01,
        prohibitedActivities: false,
        complianceScore: 91
    },
    {
        symbol: 'BE',
        company: 'Bloom Energy',
        sector: 'energy',
        price: 12.34,
        change: 4.23,
        marketCap: '3B',
        volume: '12.3M',
        debtRatio: 0.22,
        liquidAssetsRatio: 0.24,
        receivablesRatio: 0.18,
        interestIncome: 0.01,
        prohibitedActivities: false,
        complianceScore: 90
    },
    {
        symbol: 'CHPT',
        company: 'ChargePoint Holdings',
        sector: 'energy',
        price: 1.89,
        change: 6.78,
        marketCap: '1B',
        volume: '23.4M',
        debtRatio: 0.08,
        liquidAssetsRatio: 0.32,
        receivablesRatio: 0.11,
        interestIncome: 0.01,
        prohibitedActivities: false,
        complianceScore: 96
    },
    {
        symbol: 'BLNK',
        company: 'Blink Charging',
        sector: 'energy',
        price: 2.34,
        change: 5.89,
        marketCap: '0.5B',
        volume: '18.9M',
        debtRatio: 0.06,
        liquidAssetsRatio: 0.31,
        receivablesRatio: 0.09,
        interestIncome: 0.01,
        prohibitedActivities: false,
        complianceScore: 97
    },
    {
        symbol: 'NOVA',
        company: 'Sunnova Energy',
        sector: 'energy',
        price: 5.67,
        change: 4.12,
        marketCap: '1B',
        volume: '6.7M',
        debtRatio: 0.29,
        liquidAssetsRatio: 0.15,
        receivablesRatio: 0.14,
        interestIncome: 0.02,
        prohibitedActivities: false,
        complianceScore: 87
    }
];

// Shariah Compliance Screening
function checkShariahCompliance(stock) {
    const issues = [];

    // Check debt ratio (should be < 33%)
    if (stock.debtRatio > 0.33) {
        issues.push('Debt ratio exceeds 33%');
    }

    // Check liquid assets ratio (should be < 33%)
    if (stock.liquidAssetsRatio > 0.33) {
        issues.push('Liquid assets ratio exceeds 33%');
    }

    // Check receivables ratio (should be < 49%)
    if (stock.receivablesRatio > 0.49) {
        issues.push('Receivables ratio exceeds 49%');
    }

    // Check interest income (should be < 5%)
    if (stock.interestIncome > 0.05) {
        issues.push('Interest income exceeds 5%');
    }

    // Check prohibited activities
    if (stock.prohibitedActivities) {
        issues.push('Involved in prohibited activities');
    }

    return {
        compliant: issues.length === 0,
        issues: issues
    };
}

// Ethical Screening
function checkEthicalCompliance(stock) {
    const issues = [];

    // Check BDS blacklist
    if (BDS_BLACKLIST.includes(stock.symbol)) {
        issues.push('Company supports Israeli occupation/genocide in Palestine');
    }

    // Check ethical blacklist
    if (ETHICAL_BLACKLIST.includes(stock.symbol)) {
        issues.push('Company involved in unethical activities');
    }

    return {
        compliant: issues.length === 0,
        issues: issues
    };
}

// Combined screening
function screenStock(stock) {
    const shariahCheck = checkShariahCompliance(stock);
    const ethicalCheck = checkEthicalCompliance(stock);

    return {
        symbol: stock.symbol,
        company: stock.company,
        shariahCompliant: shariahCheck.compliant,
        ethicallyCompliant: ethicalCheck.compliant,
        overallCompliant: shariahCheck.compliant && ethicalCheck.compliant,
        issues: [...shariahCheck.issues, ...ethicalCheck.issues],
        complianceScore: stock.complianceScore,
        details: stock
    };
}

// Get top 100 compliant stocks
function getTop100Stocks(sector = 'all', sortBy = 'score') {
    let stocks = [...STOCK_DATABASE];

    // Filter out non-compliant stocks
    stocks = stocks.filter(stock => {
        const result = screenStock(stock);
        return result.overallCompliant;
    });

    // Filter by sector
    if (sector !== 'all') {
        stocks = stocks.filter(stock => stock.sector === sector);
    }

    // Sort stocks
    stocks.sort((a, b) => {
        switch (sortBy) {
            case 'score':
                return b.complianceScore - a.complianceScore;
            case 'performance':
                return b.change - a.change;
            case 'market-cap':
                return parseFloat(b.marketCap) - parseFloat(a.marketCap);
            case 'volume':
                return parseFloat(b.volume) - parseFloat(a.volume);
            default:
                return b.complianceScore - a.complianceScore;
        }
    });

    return stocks.slice(0, 100);
}

// UI Functions
let currentPage = 1;
const stocksPerPage = 10;
let currentStocks = [];

function displayStocks(page = 1) {
    const sector = document.getElementById('sector-filter').value;
    const sortBy = document.getElementById('sort-filter').value;

    currentStocks = getTop100Stocks(sector, sortBy);
    const totalPages = Math.ceil(currentStocks.length / stocksPerPage);

    const startIndex = (page - 1) * stocksPerPage;
    const endIndex = startIndex + stocksPerPage;
    const pageStocks = currentStocks.slice(startIndex, endIndex);

    const tbody = document.getElementById('stocks-table-body');
    tbody.innerHTML = '';

    pageStocks.forEach((stock, index) => {
        const rank = startIndex + index + 1;
        const changeClass = stock.change >= 0 ? 'positive' : 'negative';
        const changeSymbol = stock.change >= 0 ? '+' : '';
        const scoreClass = stock.complianceScore >= 90 ? 'excellent' : 'good';

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${rank}</td>
            <td><span class="stock-symbol">${stock.symbol}</span></td>
            <td><span class="stock-company">${stock.company}</span></td>
            <td>${stock.sector.charAt(0).toUpperCase() + stock.sector.slice(1)}</td>
            <td>$${stock.price.toFixed(2)}</td>
            <td class="stock-change ${changeClass}">${changeSymbol}${stock.change.toFixed(2)}%</td>
            <td>$${stock.marketCap}</td>
            <td><span class="compliance-score ${scoreClass}">${stock.complianceScore}/100</span></td>
            <td><button class="btn btn-view" onclick="viewStockDetails('${stock.symbol}')">View</button></td>
        `;
        tbody.appendChild(row);
    });

    // Update pagination
    document.getElementById('current-page').textContent = page;
    document.getElementById('total-pages').textContent = totalPages;
    document.getElementById('prev-page').disabled = page === 1;
    document.getElementById('next-page').disabled = page === totalPages;

    currentPage = page;
}

function changePage(direction) {
    const newPage = currentPage + direction;
    const totalPages = Math.ceil(currentStocks.length / stocksPerPage);

    if (newPage >= 1 && newPage <= totalPages) {
        displayStocks(newPage);
        scrollToSection('top-stocks');
    }
}

async function searchStock() {
    const searchInput = document.getElementById('stock-search');
    const symbol = searchInput.value.trim().toUpperCase();

    if (!symbol) {
        alert('Please enter a stock or ETF symbol');
        return;
    }

    // Show loading state
    const resultDiv = document.getElementById('stock-result');
    resultDiv.classList.remove('hidden');
    resultDiv.innerHTML = `
        <div style="text-align: center; padding: var(--spacing-xl); color: var(--neutral-400);">
            <div style="font-size: 2rem; margin-bottom: var(--spacing-md);">⏳</div>
            <div>Analyzing ${symbol}...</div>
        </div>
    `;

    try {
        // Fetch stock data from backend API
        const response = await fetch(`${API_BASE_URL}/stocks/${symbol}`);

        if (!response.ok) {
            // Try to get error message from response
            const errorData = await response.json().catch(() => ({}));
            const errorMessage = errorData.message || `Failed to fetch data for ${symbol}`;
            throw new Error(errorMessage);
        }

        const result = await response.json();
        displayStockResult(result);
    } catch (error) {
        console.error('Error fetching stock data:', error);
        resultDiv.innerHTML = `
            <div style="text-align: center; padding: var(--spacing-xl); color: var(--error);">
                <div style="font-size: 2rem; margin-bottom: var(--spacing-md);">❌</div>
                <div style="font-size: 1.25rem; margin-bottom: var(--spacing-sm);">Unable to fetch data for ${symbol}</div>
                <div style="color: var(--neutral-400); font-size: 0.875rem; margin-bottom: var(--spacing-md);">
                    ${error.message}
                </div>
                <div style="color: var(--neutral-500); font-size: 0.75rem);">
                    Tip: Make sure you're entering a valid stock or ETF ticker symbol (e.g., AAPL, TSLA, SPY)
                </div>
            </div>
        `;
    }
}


function displayStockResult(stock) {
    const resultDiv = document.getElementById('stock-result');
    resultDiv.classList.remove('hidden');

    // Map backend response to expected format
    const result = {
        symbol: escapeHTML(stock.symbol),
        company: escapeHTML(stock.company),
        overallCompliant: stock.isCompliant,
        shariahCompliant: stock.isCompliant,
        complianceScore: stock.complianceScore,
        issues: stock.issues || [],
        isMock: stock.isMock,
        details: {
            price: stock.price,
            change: stock.change,
            marketCap: stock.marketCap,
            debtRatio: stock.debtRatio,
            liquidAssetsRatio: stock.liquidAssetsRatio,
            receivablesRatio: stock.receivablesRatio,
            interestIncome: stock.interestIncome
        }
    };

    const statusColor = result.overallCompliant ? 'var(--success)' : 'var(--error)';
    const statusText = result.overallCompliant ? '✓ HALAL - Compliant' : '✗ NOT COMPLIANT';

    let issuesHTML = '';

    if (result.issues.length > 0) {
        issuesHTML = `
        <div style="margin-top: var(--spacing-lg); padding: var(--spacing-lg); background: rgba(239, 68, 68, 0.1); border: 1px solid rgba(239, 68, 68, 0.3); border-radius: var(--radius-lg);">
                <h4 style="color: var(--error); margin-bottom: var(--spacing-sm);">Compliance Issues:</h4>
                <ul style="margin-left: var(--spacing-lg); color: var(--neutral-300);">
                    ${result.issues.map(issue => `<li>${escapeHTML(issue)}</li>`).join('')}
                </ul>
            </div>
        `;
    }

    resultDiv.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: var(--spacing-lg);">
            <div>
                <h3 style="font-family: var(--font-display); font-size: 2rem; margin-bottom: var(--spacing-sm); display: flex; align-items: center; gap: var(--spacing-sm);">
                    ${result.symbol}
                    ${result.isMock ? '<span style="font-size: 0.75rem; background: var(--warning); color: black; padding: 2px 8px; border-radius: 4px; font-weight: bold;">DEMO DATA</span>' : ''}
                </h3>
                <p style="color: var(--neutral-400); font-size: 1.125rem;">${result.company}</p>
                ${result.isMock ? '<p style="color: var(--warning); font-size: 0.875rem; margin-top: 4px;">⚠️ Backend API key missing. Showing demo data.</p>' : ''}
            </div>
            <div style="text-align: right;">
                <div style="font-size: 1.5rem; font-weight: 700; color: ${statusColor}; margin-bottom: var(--spacing-sm);">
                    ${statusText}
                </div>
                <div style="color: var(--neutral-400);">Score: ${result.complianceScore}/100</div>
            </div>
        </div>
        
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: var(--spacing-lg); margin-bottom: var(--spacing-lg);">
            <div>
                <div style="color: var(--neutral-500); font-size: 0.875rem; margin-bottom: var(--spacing-xs);">Price</div>
                <div style="font-size: 1.5rem; font-weight: 700;">$${result.details.price.toFixed(2)}</div>
            </div>
            <div>
                <div style="color: var(--neutral-500); font-size: 0.875rem; margin-bottom: var(--spacing-xs);">Change</div>
                <div style="font-size: 1.5rem; font-weight: 700; color: ${result.details.change >= 0 ? 'var(--success)' : 'var(--error)'};">
                    ${result.details.change >= 0 ? '+' : ''}${result.details.change.toFixed(2)}%
                </div>
            </div>
            <div>
                <div style="color: var(--neutral-500); font-size: 0.875rem; margin-bottom: var(--spacing-xs);">Market Cap</div>
                <div style="font-size: 1.5rem; font-weight: 700;">$${result.details.marketCap || 'N/A'}</div>
            </div>
        </div>
        
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: var(--spacing-lg); margin-bottom: var(--spacing-lg);">
            <div>
                <h4 style="margin-bottom: var(--spacing-md); color: var(--primary-400);">Shariah Metrics</h4>
                <div style="display: flex; flex-direction: column; gap: var(--spacing-sm);">
                    <div style="display: flex; justify-content: space-between;">
                        <span style="color: var(--neutral-400);">Debt Ratio:</span>
                        <span style="color: ${result.details.debtRatio <= 0.33 ? 'var(--success)' : 'var(--error)'};">
                            ${(result.details.debtRatio * 100).toFixed(1)}%
                        </span>
                    </div>
                    <div style="display: flex; justify-content: space-between;">
                        <span style="color: var(--neutral-400);">Liquid Assets:</span>
                        <span style="color: ${result.details.liquidAssetsRatio <= 0.33 ? 'var(--success)' : 'var(--error)'};">
                            ${(result.details.liquidAssetsRatio * 100).toFixed(1)}%
                        </span>
                    </div>
                    <div style="display: flex; justify-content: space-between;">
                        <span style="color: var(--neutral-400);">Receivables:</span>
                        <span style="color: ${result.details.receivablesRatio <= 0.49 ? 'var(--success)' : 'var(--error)'};">
                            ${(result.details.receivablesRatio * 100).toFixed(1)}%
                        </span>
                    </div>
                    <div style="display: flex; justify-content: space-between;">
                        <span style="color: var(--neutral-400);">Interest Income:</span>
                        <span style="color: ${result.details.interestIncome <= 0.05 ? 'var(--success)' : 'var(--error)'};">
                            ${(result.details.interestIncome * 100).toFixed(1)}%
                        </span>
                    </div>
                </div>
            </div>
            <div>
                <h4 style="margin-bottom: var(--spacing-md); color: var(--primary-400);">Ethical Screening</h4>
                <div style="display: flex; flex-direction: column; gap: var(--spacing-sm);">
                    <div style="display: flex; justify-content: space-between;">
                        <span style="color: var(--neutral-400);">BDS Compliant:</span>
                        <span style="color: ${!BDS_BLACKLIST.includes(result.symbol) ? 'var(--success)' : 'var(--error)'};">
                            ${!BDS_BLACKLIST.includes(result.symbol) ? '✓ Yes' : '✗ No'}
                        </span>
                    </div>
                    <div style="display: flex; justify-content: space-between;">
                        <span style="color: var(--neutral-400);">Ethical Business:</span>
                        <span style="color: ${!ETHICAL_BLACKLIST.includes(result.symbol) ? 'var(--success)' : 'var(--error)'};">
                            ${!ETHICAL_BLACKLIST.includes(result.symbol) ? '✓ Yes' : '✗ No'}
                        </span>
                    </div>
                    <div style="display: flex; justify-content: space-between;">
                        <span style="color: var(--neutral-400);">Shariah Compliant:</span>
                        <span style="color: ${result.shariahCompliant ? 'var(--success)' : 'var(--error)'};">
                            ${result.shariahCompliant ? '✓ Yes' : '✗ No'}
                        </span>
                    </div>
                </div>
            </div>
        </div>
        
        ${issuesHTML}
    `;

    resultDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function viewStockDetails(symbol) {
    const stock = currentStocks.find(s => s.symbol === symbol);
    if (stock) {
        const result = screenStock(stock);

        const modal = document.getElementById('stock-modal');
        const modalBody = document.getElementById('modal-body');

        const statusColor = result.overallCompliant ? 'var(--success)' : 'var(--error)';
        const statusText = result.overallCompliant ? '✓ HALAL - Compliant' : '✗ NOT COMPLIANT';

        modalBody.innerHTML = `
        <div style="margin-bottom: var(--spacing-xl);">
                <h2 style="font-family: var(--font-display); font-size: 2rem; margin-bottom: var(--spacing-sm);">
                    ${result.symbol}
                </h2>
                <p style="color: var(--neutral-400); font-size: 1.125rem; margin-bottom: var(--spacing-lg);">${result.company}</p>
                <div style="font-size: 1.5rem; font-weight: 700; color: ${statusColor};">
                    ${statusText}
                </div>
            </div>
            
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: var(--spacing-lg); margin-bottom: var(--spacing-xl);">
                <div style="background: rgba(255, 255, 255, 0.05); padding: var(--spacing-lg); border-radius: var(--radius-lg);">
                    <div style="color: var(--neutral-500); font-size: 0.875rem; margin-bottom: var(--spacing-xs);">Price</div>
                    <div style="font-size: 1.5rem; font-weight: 700;">$${result.details.price.toFixed(2)}</div>
                </div>
                <div style="background: rgba(255, 255, 255, 0.05); padding: var(--spacing-lg); border-radius: var(--radius-lg);">
                    <div style="color: var(--neutral-500); font-size: 0.875rem; margin-bottom: var(--spacing-xs);">Change</div>
                    <div style="font-size: 1.5rem; font-weight: 700; color: ${result.details.change >= 0 ? 'var(--success)' : 'var(--error)'};">
                        ${result.details.change >= 0 ? '+' : ''}${result.details.change.toFixed(2)}%
                    </div>
                </div>
                <div style="background: rgba(255, 255, 255, 0.05); padding: var(--spacing-lg); border-radius: var(--radius-lg);">
                    <div style="color: var(--neutral-500); font-size: 0.875rem; margin-bottom: var(--spacing-xs);">Market Cap</div>
                    <div style="font-size: 1.25rem; font-weight: 700;">$${result.details.marketCap}</div>
                </div>
                <div style="background: rgba(255, 255, 255, 0.05); padding: var(--spacing-lg); border-radius: var(--radius-lg);">
                    <div style="color: var(--neutral-500); font-size: 0.875rem; margin-bottom: var(--spacing-xs);">Score</div>
                    <div style="font-size: 1.5rem; font-weight: 700; color: var(--primary-400);">${result.complianceScore}/100</div>
                </div>
            </div>
            
            <h3 style="margin-bottom: var(--spacing-md); color: var(--primary-400);">Detailed Analysis</h3>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: var(--spacing-xl);">
                <div>
                    <h4 style="margin-bottom: var(--spacing-md);">Shariah Compliance</h4>
                    <div style="display: flex; flex-direction: column; gap: var(--spacing-md);">
                        <div>
                            <div style="display: flex; justify-content: space-between; margin-bottom: var(--spacing-xs);">
                                <span style="color: var(--neutral-400);">Debt Ratio</span>
                                <span style="color: ${result.details.debtRatio <= 0.33 ? 'var(--success)' : 'var(--error)'};">
                                    ${(result.details.debtRatio * 100).toFixed(1)}%
                                </span>
                            </div>
                            <div style="background: rgba(255, 255, 255, 0.1); height: 8px; border-radius: var(--radius-full); overflow: hidden;">
                                <div style="background: ${result.details.debtRatio <= 0.33 ? 'var(--success)' : 'var(--error)'}; width: ${(result.details.debtRatio * 100).toFixed(1)}%; height: 100%;"></div>
                            </div>
                            <div style="font-size: 0.75rem; color: var(--neutral-500); margin-top: var(--spacing-xs);">Limit: 33%</div>
                        </div>
                        
                        <div>
                            <div style="display: flex; justify-content: space-between; margin-bottom: var(--spacing-xs);">
                                <span style="color: var(--neutral-400);">Liquid Assets</span>
                                <span style="color: ${result.details.liquidAssetsRatio <= 0.33 ? 'var(--success)' : 'var(--error)'};">
                                    ${(result.details.liquidAssetsRatio * 100).toFixed(1)}%
                                </span>
                            </div>
                            <div style="background: rgba(255, 255, 255, 0.1); height: 8px; border-radius: var(--radius-full); overflow: hidden;">
                                <div style="background: ${result.details.liquidAssetsRatio <= 0.33 ? 'var(--success)' : 'var(--error)'}; width: ${(result.details.liquidAssetsRatio * 100).toFixed(1)}%; height: 100%;"></div>
                            </div>
                            <div style="font-size: 0.75rem; color: var(--neutral-500); margin-top: var(--spacing-xs);">Limit: 33%</div>
                        </div>
                        
                        <div>
                            <div style="display: flex; justify-content: space-between; margin-bottom: var(--spacing-xs);">
                                <span style="color: var(--neutral-400);">Receivables</span>
                                <span style="color: ${result.details.receivablesRatio <= 0.49 ? 'var(--success)' : 'var(--error)'};">
                                    ${(result.details.receivablesRatio * 100).toFixed(1)}%
                                </span>
                            </div>
                            <div style="background: rgba(255, 255, 255, 0.1); height: 8px; border-radius: var(--radius-full); overflow: hidden;">
                                <div style="background: ${result.details.receivablesRatio <= 0.49 ? 'var(--success)' : 'var(--error)'}; width: ${(result.details.receivablesRatio * 100).toFixed(1)}%; height: 100%;"></div>
                            </div>
                            <div style="font-size: 0.75rem; color: var(--neutral-500); margin-top: var(--spacing-xs);">Limit: 49%</div>
                        </div>
                        
                        <div>
                            <div style="display: flex; justify-content: space-between; margin-bottom: var(--spacing-xs);">
                                <span style="color: var(--neutral-400);">Interest Income</span>
                                <span style="color: ${result.details.interestIncome <= 0.05 ? 'var(--success)' : 'var(--error)'};">
                                    ${(result.details.interestIncome * 100).toFixed(1)}%
                                </span>
                            </div>
                            <div style="background: rgba(255, 255, 255, 0.1); height: 8px; border-radius: var(--radius-full); overflow: hidden;">
                                <div style="background: ${result.details.interestIncome <= 0.05 ? 'var(--success)' : 'var(--error)'}; width: ${(result.details.interestIncome * 100).toFixed(1)}%; height: 100%;"></div>
                            </div>
                            <div style="font-size: 0.75rem; color: var(--neutral-500); margin-top: var(--spacing-xs);">Limit: 5%</div>
                        </div>
                    </div>
                </div>
                
                <div>
                    <h4 style="margin-bottom: var(--spacing-md);">Ethical Screening</h4>
                    <div style="display: flex; flex-direction: column; gap: var(--spacing-md);">
                        <div style="background: rgba(255, 255, 255, 0.05); padding: var(--spacing-md); border-radius: var(--radius-lg);">
                            <div style="display: flex; justify-content: space-between; align-items: center;">
                                <span style="color: var(--neutral-300);">BDS Compliant</span>
                                <span style="font-size: 1.5rem; color: ${!BDS_BLACKLIST.includes(result.symbol) ? 'var(--success)' : 'var(--error)'};">
                                    ${!BDS_BLACKLIST.includes(result.symbol) ? '✓' : '✗'}
                                </span>
                            </div>
                            <div style="font-size: 0.75rem; color: var(--neutral-500); margin-top: var(--spacing-xs);">
                                ${!BDS_BLACKLIST.includes(result.symbol) ? 'Not on BDS boycott list' : 'On BDS boycott list - supports occupation'}
                            </div>
                        </div>
                        
                        <div style="background: rgba(255, 255, 255, 0.05); padding: var(--spacing-md); border-radius: var(--radius-lg);">
                            <div style="display: flex; justify-content: space-between; align-items: center;">
                                <span style="color: var(--neutral-300);">Ethical Business</span>
                                <span style="font-size: 1.5rem; color: ${!ETHICAL_BLACKLIST.includes(result.symbol) ? 'var(--success)' : 'var(--error)'};">
                                    ${!ETHICAL_BLACKLIST.includes(result.symbol) ? '✓' : '✗'}
                                </span>
                            </div>
                            <div style="font-size: 0.75rem; color: var(--neutral-500); margin-top: var(--spacing-xs);">
                                ${!ETHICAL_BLACKLIST.includes(result.symbol) ? 'No involvement in prohibited industries' : 'Involved in prohibited industries'}
                            </div>
                        </div>
                        
                        <div style="background: rgba(255, 255, 255, 0.05); padding: var(--spacing-md); border-radius: var(--radius-lg);">
                            <div style="display: flex; justify-content: space-between; align-items: center;">
                                <span style="color: var(--neutral-300);">Overall Status</span>
                                <span style="font-size: 1.5rem; color: ${result.overallCompliant ? 'var(--success)' : 'var(--error)'};">
                                    ${result.overallCompliant ? '✓' : '✗'}
                                </span>
                            </div>
                            <div style="font-size: 0.75rem; color: var(--neutral-500); margin-top: var(--spacing-xs);">
                                ${result.overallCompliant ? 'Meets all compliance criteria' : 'Does not meet all criteria'}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    `;

        modal.classList.remove('hidden');
    }
}

function closeModal() {
    document.getElementById('stock-modal').classList.add('hidden');
}

function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
    // Initialize stocks table
    displayStocks(1);

    // Initialize BDS Watchlist
    refreshBDSList();

    // Add filter change listeners
    document.getElementById('sector-filter').addEventListener('change', () => displayStocks(1));
    document.getElementById('sort-filter').addEventListener('change', () => displayStocks(1));

    // Add search on Enter key
    document.getElementById('stock-search').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            searchStock();
        }
    });

    // Update last update time
    const now = new Date();
    document.getElementById('last-update').textContent = now.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    });

    // Animate stats on scroll
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateValue('total-stocks', 0, 2847, 2000);
                animateValue('compliant-stocks', 0, 1234, 2000);
                animateValue('ethical-stocks', 0, 892, 2000);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const heroStats = document.querySelector('.hero-stats');
    if (heroStats) {
        observer.observe(heroStats);
    }
});

function animateValue(id, start, end, duration) {
    const element = document.getElementById(id);
    const range = end - start;
    const increment = range / (duration / 16);
    let current = start;

    const timer = setInterval(() => {
        current += increment;
        if (current >= end) {
            current = end;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current).toLocaleString();
    }, 16);
}

// Active nav link on scroll
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current} `) {
            link.classList.add('active');
        }
    });
});

// BDS Watchlist Logic
async function refreshBDSList() {
    const tableBody = document.getElementById('bds-table-body');
    if (!tableBody) return;

    tableBody.innerHTML = '<tr><td colspan="4" class="loading-cell">Loading BDS list...</td></tr>';

    try {
        // Try to fetch from backend API first
        const response = await fetch(`${API_BASE_URL}/admin/blacklist?type=BDS&active=true`);

        let bdsList = [];

        if (response.ok) {
            const data = await response.json();
            bdsList = data.blacklists;
        } else {
            // Fallback to local list if API fails
            console.warn('Failed to fetch BDS list from API, using local fallback');
            bdsList = getLocalBDSList();
        }

        displayBDSList(bdsList);
    } catch (error) {
        console.error('Error fetching BDS list:', error);
        // Fallback to local list
        displayBDSList(getLocalBDSList());
    }
}

function getLocalBDSList() {
    // Convert the simple string array to object format for consistency
    // This is a fallback if the API is unreachable
    const companies = [
        { symbol: 'GOOGL', company: 'Alphabet Inc.', category: 'Tech', reason: 'Project Nimbus, R&D in Israel' },
        { symbol: 'AMZN', company: 'Amazon.com Inc.', category: 'Tech', reason: 'Cloud services to Israeli military' },
        { symbol: 'META', company: 'Meta Platforms Inc.', category: 'Tech', reason: 'Support for Israeli operations' },
        { symbol: 'MSFT', company: 'Microsoft Corporation', category: 'Tech', reason: 'Significant Israeli operations' },
        { symbol: 'INTC', company: 'Intel Corporation', category: 'Tech', reason: 'Major investments in Israel' },
        { symbol: 'DELL', company: 'Dell Technologies', category: 'Tech', reason: 'Supplies to Israeli military' },
        { symbol: 'HPQ', company: 'HP Inc.', category: 'Tech', reason: 'Systems for movement restrictions' },
        { symbol: 'ORCL', company: 'Oracle Corporation', category: 'Tech', reason: 'Israeli operations' },
        { symbol: 'IBM', company: 'IBM', category: 'Tech', reason: 'Israeli operations' },
        { symbol: 'CSCO', company: 'Cisco Systems', category: 'Tech', reason: 'Israeli operations' },
        { symbol: 'QCOM', company: 'Qualcomm Inc.', category: 'Tech', reason: 'Israeli operations' },
        { symbol: 'WIX', company: 'Wix.com Ltd.', category: 'Tech', reason: 'Israeli company' },
        { symbol: 'BA', company: 'Boeing Company', category: 'Defense', reason: 'Military equipment supplier' },
        { symbol: 'LMT', company: 'Lockheed Martin', category: 'Defense', reason: 'Military equipment supplier' },
        { symbol: 'RTX', company: 'Raytheon Technologies', category: 'Defense', reason: 'Military equipment supplier' },
        { symbol: 'NOC', company: 'Northrop Grumman', category: 'Defense', reason: 'Military equipment supplier' },
        { symbol: 'GD', company: 'General Dynamics', category: 'Defense', reason: 'Military equipment supplier' },
        { symbol: 'PLTR', company: 'Palantir Technologies', category: 'Defense', reason: 'Surveillance tech to Israeli military' },
        { symbol: 'ESLT', company: 'Elbit Systems', category: 'Defense', reason: 'Israeli defense company' },
        { symbol: 'CAT', company: 'Caterpillar Inc.', category: 'Machinery', reason: 'Bulldozers for demolitions' },
        { symbol: 'GE', company: 'General Electric', category: 'Machinery', reason: 'Projects in occupied territories' },
        { symbol: 'SBUX', company: 'Starbucks Corporation', category: 'Consumer', reason: 'Support for Israeli operations' },
        { symbol: 'MCD', company: 'McDonald\'s Corporation', category: 'Consumer', reason: 'Israeli franchisee supports military' },
        { symbol: 'PEP', company: 'PepsiCo Inc.', category: 'Consumer', reason: 'Owns SodaStream' },
        { symbol: 'KO', company: 'Coca-Cola Company', category: 'Consumer', reason: 'Factory in settlements' },
        { symbol: 'QSR', company: 'Restaurant Brands Intl', category: 'Consumer', reason: 'Israeli franchisee supports military' },
        { symbol: 'YUM', company: 'Yum! Brands', category: 'Consumer', reason: 'Israeli operations' },
        { symbol: 'PZZA', company: 'Papa John\'s', category: 'Consumer', reason: 'Israeli operations' },
        { symbol: 'PG', company: 'Procter & Gamble', category: 'Consumer', reason: 'R&D in Tel Aviv' },
        { symbol: 'UL', company: 'Unilever PLC', category: 'Consumer', reason: 'Israeli operations' },
        { symbol: 'DIS', company: 'Walt Disney Company', category: 'Media', reason: 'Investments and ties to Israel' },
        { symbol: 'ABNB', company: 'Airbnb Inc.', category: 'Travel', reason: 'Rentals in settlements' },
        { symbol: 'BKNG', company: 'Booking Holdings', category: 'Travel', reason: 'Rentals in settlements' },
        { symbol: 'EXPE', company: 'Expedia Group', category: 'Travel', reason: 'Rentals in settlements' },
        { symbol: 'CVX', company: 'Chevron Corporation', category: 'Energy', reason: 'Gas extraction in occupied territories' },
        { symbol: 'TEVA', company: 'Teva Pharmaceutical', category: 'Pharma', reason: 'Israeli pharmaceutical company' }
    ];
    return companies;
}

function displayBDSList(list) {
    const tableBody = document.getElementById('bds-table-body');
    if (!tableBody) return;

    if (!list || list.length === 0) {
        tableBody.innerHTML = '<tr><td colspan="5" class="text-center">No BDS companies found</td></tr>';
        return;
    }

    // Sort by category then symbol
    list.sort((a, b) => {
        if (a.category !== b.category) return a.category.localeCompare(b.category);
        return a.symbol.localeCompare(b.symbol);
    });

    tableBody.innerHTML = list.map(item => `
        <tr class="bds-row">
            <td class="font-medium">${escapeHTML(item.symbol)}</td>
            <td>${escapeHTML(item.company || item.symbol)}</td>
            <td><span class="badge badge-category">${escapeHTML(item.category || 'Other')}</span></td>
            <td>${escapeHTML(item.reason || 'BDS Boycott Target')}</td>
            <td class="text-sm text-gray-500">${escapeHTML(item.source || 'BDS Movement')}</td>
        </tr>
    `).join('');
}
