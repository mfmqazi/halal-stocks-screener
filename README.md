# Halal Stocks - Shariah Compliant Stock Screener

A comprehensive web application for screening stocks based on Shariah compliance and ethical investing principles, with a focus on excluding companies supporting the genocide in Palestine.

## Features

- ✅ **Shariah Compliance Screening** - AAOIFI standards-based screening
- 🚫 **BDS Compliance** - Excludes companies supporting Israeli occupation
- 📊 **Real-time Stock Data** - Powered by Finnhub API
- 📈 **Top 100 Daily Rankings** - Updated automatically after market close
- 👤 **User Accounts** - Personal watchlists and price alerts
- 🔍 **Advanced Filtering** - By sector, compliance score, performance
- 📱 **Responsive Design** - Works on all devices

## Shariah Screening Criteria

### Financial Ratios (AAOIFI Standards)
- Debt Ratio < 33% of market cap
- Liquid Assets < 33% of market cap
- Accounts Receivable < 49% of market cap
- Interest Income < 5% of total revenue

### Prohibited Industries
- Alcohol, tobacco, gambling
- Conventional banking and insurance
- Pork products
- Adult entertainment

### Ethical Screening
- BDS blacklist compliance
- No support for Israeli occupation/genocide
- Fair labor practices
- Environmental responsibility

## Tech Stack

### Frontend
- HTML5, CSS3, JavaScript (Vanilla)
- Modern glassmorphism design
- Responsive and accessible

### Backend
- Node.js + Express
- MongoDB for data storage
- Finnhub API for real-time stock data
- JWT authentication
- Node-cron for scheduled updates

## Installation

### Prerequisites
- Node.js 18+ and npm
- MongoDB (local or Atlas)
- Finnhub API key (free tier available)

### Setup

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/halal-stocks.git
cd halal-stocks
```

2. **Install backend dependencies**
```bash
cd backend
npm install
```

3. **Configure environment variables**
```bash
cp .env.example .env
```

Edit `.env` and add your credentials:
```env
FINNHUB_API_KEY=your_api_key_here
MONGODB_URI=mongodb://localhost:27017/halal-stocks
JWT_SECRET=your_secret_key_here
```

4. **Start MongoDB** (if running locally)
```bash
mongod
```

5. **Run the backend server**
```bash
npm run dev
```

6. **Open the frontend**
Open `index.html` in your browser or use a local server:
```bash
# Using Python
python -m http.server 3000

# Using Node.js http-server
npx http-server -p 3000
```

## API Endpoints

### Stocks
- `GET /api/stocks` - Get all compliant stocks
- `GET /api/stocks/:symbol` - Get specific stock
- `POST /api/stocks/refresh/:symbol` - Refresh stock data
- `GET /api/stocks/search/:query` - Search stocks

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Watchlist (Protected)
- `GET /api/watchlist` - Get user watchlist
- `POST /api/watchlist/:symbol` - Add to watchlist
- `DELETE /api/watchlist/:symbol` - Remove from watchlist
- `POST /api/watchlist/alerts` - Create price alert
- `GET /api/watchlist/alerts` - Get alerts

## Deployment

### Deploy to Heroku

1. **Create Heroku app**
```bash
heroku create halal-stocks-api
```

2. **Add MongoDB Atlas**
```bash
heroku addons:create mongolab:sandbox
```

3. **Set environment variables**
```bash
heroku config:set FINNHUB_API_KEY=your_key
heroku config:set JWT_SECRET=your_secret
heroku config:set NODE_ENV=production
```

4. **Deploy**
```bash
git push heroku main
```

### Deploy Frontend to GitHub Pages

1. **Update API endpoint** in `app.js`:
```javascript
const API_BASE_URL = 'https://your-heroku-app.herokuapp.com/api';
```

2. **Push to GitHub**
```bash
git add .
git commit -m "Deploy to GitHub Pages"
git push origin main
```

3. **Enable GitHub Pages** in repository settings

## Getting Finnhub API Key

1. Visit [Finnhub.io](https://finnhub.io/)
2. Sign up for a free account
3. Get your API key from the dashboard
4. Free tier includes 60 API calls/minute

## Cron Jobs

The application runs automated jobs:

- **Daily Stock Update**: 6 PM EST (after market close)
- **Weekly Cleanup**: Sunday 2 AM (removes old non-compliant stocks)

## Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## Disclaimer

This tool provides information for educational purposes only. Always consult with qualified Islamic scholars and financial advisors before making investment decisions. Stock data is provided by Finnhub and may have delays.

## License

MIT License - see LICENSE file for details

## Support

For issues and questions:
- Open an issue on GitHub
- Email: support@halalstocks.com

## Acknowledgments

- Shariah screening based on AAOIFI standards
- BDS list maintained by BDS Movement
- Stock data provided by Finnhub
- Built with ❤️ for the Muslim community

---

**Free Palestine** 🇵🇸
