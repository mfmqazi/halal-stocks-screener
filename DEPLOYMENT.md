# Halal Stocks - Deployment Guide

## ✅ Completed Tasks

### 1. Fixed Dropdown Color Issue
- Updated CSS for `.filter-select` with proper option styling
- Options now have dark background (`var(--neutral-800)`) with light text
- Hover and selected states have green highlight (`var(--primary-600)`)

### 2. Backend API with Finnhub Integration
Created a complete Node.js/Express backend with:

**Services:**
- `finnhubService.js` - Comprehensive Finnhub API integration
  - Real-time stock quotes
  - Company profiles
  - Financial metrics
  - Shariah compliance calculations
  - BDS/ethical screening
  - Rate limiting (1.2s between requests)

**Models:**
- `Stock.js` - MongoDB schema for stock data
- `User.js` - User authentication with bcrypt

**Routes:**
- `/api/stocks` - Get all compliant stocks (with filtering/sorting/pagination)
- `/api/stocks/:symbol` - Get specific stock (auto-refreshes if > 1 hour old)
- `/api/stocks/refresh/:symbol` - Manual refresh
- `/api/stocks/search/:query` - Search functionality
- `/api/auth/register` - User registration
- `/api/auth/login` - User login with JWT
- `/api/watchlist` - Manage watchlists (protected)
- `/api/watchlist/alerts` - Price alerts (protected)

### 3. Daily Updates with Cron Jobs
- **Daily Update**: 6 PM EST (after market close) - updates all 100+ tracked stocks
- **Weekly Cleanup**: Sunday 2 AM - removes old non-compliant stocks
- Rate-limited batch processing to respect Finnhub API limits

### 4. User Accounts System
- JWT-based authentication
- Password hashing with bcrypt
- Personal watchlists
- Price alerts (above/below/compliance change)
- Email notification preferences

### 5. Git Repository Initialized
- ✅ Git initialized
- ✅ All files committed
- ✅ .gitignore configured
- ✅ README.md created with full documentation

## 🚀 Next Steps to Deploy

### Step 1: Get Finnhub API Key (FREE)
1. Go to https://finnhub.io/
2. Sign up for free account
3. Copy your API key
4. Free tier: 60 calls/minute (sufficient for our needs)

### Step 2: Set Up MongoDB
**Option A: Local (Development)**
```bash
# Install MongoDB
# Windows: Download from mongodb.com
# Mac: brew install mongodb-community
# Linux: sudo apt-get install mongodb

# Start MongoDB
mongod
```

**Option B: MongoDB Atlas (Production - FREE)**
1. Go to https://www.mongodb.com/cloud/atlas
2. Create free cluster (M0 Sandbox)
3. Get connection string
4. Use in `.env` file

### Step 3: Configure Backend
```bash
cd backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Edit .env with your credentials:
# FINNHUB_API_KEY=your_key_here
# MONGODB_URI=your_mongodb_connection_string
# JWT_SECRET=your_random_secret_key

# Start development server
npm run dev
```

Server will run on http://localhost:5000

### Step 4: Update Frontend API URL
Edit `app.js` and add at the top:
```javascript
const API_BASE_URL = 'http://localhost:5000/api'; // Development
// const API_BASE_URL = 'https://your-heroku-app.herokuapp.com/api'; // Production
```

Then update all API calls to use this base URL.

### Step 5: Create GitHub Repository
```bash
# Create new repository on GitHub.com
# Then link it:
git remote add origin https://github.com/YOUR_USERNAME/halal-stocks.git
git branch -M main
git push -u origin main
```

### Step 6: Deploy Backend to Heroku (FREE)
```bash
# Install Heroku CLI
# Download from: https://devcenter.heroku.com/articles/heroku-cli

# Login
heroku login

# Create app
heroku create halal-stocks-api

# Add MongoDB Atlas addon (or use your Atlas connection)
heroku addons:create mongolab:sandbox

# Set environment variables
heroku config:set FINNHUB_API_KEY=your_key
heroku config:set JWT_SECRET=your_secret
heroku config:set NODE_ENV=production

# Deploy
git subtree push --prefix backend heroku main

# Or create separate repo for backend
```

### Step 7: Deploy Frontend to GitHub Pages (FREE)
1. Go to your GitHub repository
2. Settings → Pages
3. Source: Deploy from branch
4. Branch: main, folder: / (root)
5. Save

Your site will be live at: `https://YOUR_USERNAME.github.io/halal-stocks/`

### Step 8: Update Frontend with Production API
Once backend is deployed, update `app.js`:
```javascript
const API_BASE_URL = 'https://halal-stocks-api.herokuapp.com/api';
```

Commit and push to update GitHub Pages.

## 📊 Testing the Application

### Test Backend Locally
```bash
# Health check
curl http://localhost:5000/api/health

# Get stocks
curl http://localhost:5000/api/stocks

# Get specific stock
curl http://localhost:5000/api/stocks/AAPL

# Register user
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123","name":"Test User"}'
```

### Test Frontend
1. Open `index.html` in browser
2. Check dropdown colors are visible
3. Test stock search
4. View top 100 stocks
5. Test filtering and sorting

## 🔧 Troubleshooting

### Backend won't start
- Check MongoDB is running
- Verify `.env` file exists with correct values
- Check Node.js version (need 18+)

### API calls failing
- Check CORS settings in `server.js`
- Verify Finnhub API key is valid
- Check rate limits (60 calls/minute on free tier)

### Frontend not connecting to backend
- Check API_BASE_URL is correct
- Verify backend is running
- Check browser console for CORS errors

## 💰 Cost Breakdown (All FREE!)

- **Finnhub API**: FREE (60 calls/min)
- **MongoDB Atlas**: FREE (M0 Sandbox, 512MB)
- **Heroku**: FREE (Eco dyno, sleeps after 30 min inactivity)
- **GitHub Pages**: FREE (unlimited static hosting)

**Total Monthly Cost: $0** 🎉

## 📝 Important Notes

1. **Finnhub Rate Limits**: Free tier = 60 calls/minute
   - Our cron job respects this (1.2s delay between calls)
   - 100 stocks = ~2 minutes to update all

2. **Heroku Free Tier**: 
   - Dyno sleeps after 30 min inactivity
   - First request may be slow (cold start)
   - Consider upgrading for production

3. **Data Accuracy**:
   - Stock prices may have 15-minute delay
   - Financial ratios are estimates
   - Always verify with official sources

4. **Shariah Compliance**:
   - Screening is automated based on AAOIFI standards
   - Always consult qualified Islamic scholars
   - This is for educational purposes only

## 🎯 Future Enhancements

- [ ] Email notifications for price alerts
- [ ] Mobile app (React Native)
- [ ] More detailed financial analysis
- [ ] Historical compliance tracking
- [ ] Portfolio management
- [ ] Social features (share watchlists)
- [ ] Advanced charting
- [ ] News integration

## 📞 Support

If you encounter issues:
1. Check the troubleshooting section
2. Review logs: `heroku logs --tail`
3. Open GitHub issue
4. Email: support@halalstocks.com

---

**Ready to deploy!** Follow the steps above and you'll have a fully functional Halal Stocks screener live on the internet. 🚀
