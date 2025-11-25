# 🚀 Deploying to Render.com (Free & No Credit Card)

## 1. Sign Up
Go to [https://dashboard.render.com/register](https://dashboard.render.com/register) and sign up (you can use your GitHub account).

## 2. Create New Web Service
1. Click **"New +"** and select **"Web Service"**.
2. Click **"Build and deploy from a Git repository"**.
3. Connect your GitHub account if asked.
4. Select your repository: `halal-stocks-screener`.

## 3. Configure Service
Render will auto-detect the settings from `render.yaml`, but verify these:
- **Name:** `halal-stocks-api`
- **Region:** Any (e.g., Ohio or Frankfurt)
- **Branch:** `master` (or `main`)
- **Root Directory:** `.` (leave empty)
- **Runtime:** `Node`
- **Build Command:** `cd backend && npm install`
- **Start Command:** `cd backend && npm start`

## 4. Add Environment Variables (IMPORTANT)
Scroll down to **"Environment Variables"** and click **"Add Environment Variable"** for each of these:

| Key | Value |
|-----|-------|
| `FINNHUB_API_KEY` | `d4ivv2hr01queuakrd5gd4ivv2hr01queuakrd60` |
| `MONGODB_URI` | `mongodb+srv://mfmqazi_db_user:3nbRpCxvJQS9SMK0@cluster0.17odlwh.mongodb.net/halal-stocks?retryWrites=true&w=majority` |
| `JWT_SECRET` | `halal_stocks_super_secret_jwt_key_2025_production` |
| `NODE_ENV` | `production` |

## 5. Deploy
Click **"Create Web Service"**. Render will start building your app. It might take 2-3 minutes.

## 6. Connect Frontend
1. Once deployed, copy the URL from the top left (e.g., `https://halal-stocks-api.onrender.com`).
2. Open `app.js` in VS Code.
3. Update `API_BASE_URL`:
   ```javascript
   const API_BASE_URL = 'https://halal-stocks-api.onrender.com/api';
   ```
4. Push changes to GitHub.
