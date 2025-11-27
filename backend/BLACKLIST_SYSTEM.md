# Dynamic BDS Blacklist System

## Overview
The stock screener now uses a **dynamic, database-driven blacklist system** that can be updated automatically without code changes.

## Features

### ✅ Database-Driven
- Blacklist stored in MongoDB
- Cached in memory for fast lookups
- Automatically initialized from hardcoded values on first run

### ✅ Admin API
Manage the blacklist through REST API endpoints:

#### Get All Blacklisted Companies
```bash
GET /api/admin/blacklist
GET /api/admin/blacklist?type=BDS
GET /api/admin/blacklist?type=ETHICAL
GET /api/admin/blacklist?active=true
```

#### Refresh Cache
```bash
POST /api/admin/blacklist/refresh
```

#### Re-initialize from Hardcoded Values
```bash
POST /api/admin/blacklist/initialize
```

#### Add Company to Blacklist
```bash
POST /api/admin/blacklist
Content-Type: application/json

{
  "type": "BDS",
  "symbol": "EXAMPLE",
  "reason": "Supports Israeli occupation",
  "category": "tech"
}
```

#### Remove Company from Blacklist
```bash
DELETE /api/admin/blacklist/EXAMPLE?type=BDS
```

## How It Works

1. **Initialization**: On server startup, the blacklist is loaded from MongoDB. If empty, it's populated from hardcoded values.

2. **Caching**: The blacklist is cached in memory for fast lookups during stock screening.

3. **Updates**: When you add/remove companies via the API, the cache is automatically refreshed.

4. **Fallback**: If MongoDB is unavailable, the system falls back to hardcoded values.

## Future Enhancements

### Planned Features:
- **Automated Updates**: Scheduled job to fetch latest BDS list from external sources
- **Web UI**: Admin dashboard to manage blacklist visually
- **Audit Log**: Track who added/removed companies and when
- **API Integration**: Connect to BDS Movement API for automatic updates

### To Add Automated Updates:
1. Find a reliable BDS API or data source
2. Update `blacklistService.updateFromSource()` method
3. Add cron job in `backend/jobs/cronJobs.js`
4. Schedule to run weekly/monthly

## Current Blacklist

### BDS Companies (40+)
- Tech: GOOGL, GOOG, AMZN, META, MSFT, INTC, DELL, HPQ, HPE, ORCL, IBM, CSCO, QCOM, WIX
- Defense: BA, LMT, RTX, NOC, GD, TXT, HII, PLTR, ESLT
- Consumer: SBUX, MCD, PEP, KO, QSR, YUM, PZZA, PG, UL
- Travel: ABNB, BKNG, EXPE
- Energy: CVX
- Pharma: TEVA
- Machinery: CAT, GE
- Media: DIS

### Ethical Blacklist (20+)
- Tobacco: MO, PM, BTI
- Alcohol: BUD, TAP, STZ
- Gambling: LVS, WYNN, MGM, CZR
- Banking: JPM, BAC, C, WFC, GS, MS
- Insurance: AIG, PRU, MET, AFL

## Testing

Test the API endpoints:
```bash
# Get all BDS companies
curl https://halal-stocks-screener-2.onrender.com/api/admin/blacklist?type=BDS

# Refresh cache
curl -X POST https://halal-stocks-screener-2.onrender.com/api/admin/blacklist/refresh

# Add a new company
curl -X POST https://halal-stocks-screener-2.onrender.com/api/admin/blacklist \
  -H "Content-Type: application/json" \
  -d '{"type":"BDS","symbol":"TEST","reason":"Test company","category":"tech"}'
```

## Source
BDS list compiled from: https://bdsmovement.net (Updated 2024/2025)
