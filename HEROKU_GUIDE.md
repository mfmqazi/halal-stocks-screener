# ☁️ Heroku Deployment Guide (Backend)

Since GitHub only hosts the "face" of your website, we need Heroku to host the "brain" (the server).

## 1. Install Heroku CLI
Download and install the [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli).

## 2. Login and Create App
Run these commands in your terminal:

```bash
# Login to Heroku
heroku login

# Create a new app (give it a unique name)
heroku create my-halal-stocks-api
```

## 3. Set Your Secrets (IMPORTANT)
This is how we securely give Heroku your passwords without putting them on GitHub.

```bash
# Set Finnhub API Key
heroku config:set FINNHUB_API_KEY=d4ivv2hr01queuakrd5gd4ivv2hr01queuakrd60

# Set MongoDB Connection (The one we just tested)
heroku config:set MONGODB_URI="mongodb+srv://mfmqazi_db_user:3nbRpCxvJQS9SMK0@cluster0.17odlwh.mongodb.net/halal-stocks?retryWrites=true&w=majority"

# Set JWT Secret (for logins)
heroku config:set JWT_SECRET=your_super_secret_jwt_key_change_this

# Set Environment
heroku config:set NODE_ENV=production
```

## 4. Deploy the Backend
Push the `backend` folder to Heroku:

```bash
git subtree push --prefix backend heroku main
```

## 5. Connect Frontend to Backend
Once Heroku gives you your URL (e.g., `https://my-halal-stocks-api.herokuapp.com`), update your `app.js` file:

```javascript
// In app.js
const API_BASE_URL = 'https://my-halal-stocks-api.herokuapp.com/api';
```

Then push those changes to GitHub, and your site is live!
