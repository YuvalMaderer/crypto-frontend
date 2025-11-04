# Backend Integration Guide

This document explains where to connect your MongoDB backend with Node.js + Mongoose.

## 🔐 Authentication Endpoints

### Signup (`src/pages/Signup.tsx`)
**Location:** Line 35-50  
**Endpoint needed:** `POST /api/auth/signup`

```javascript
// Expected request body:
{
  name: string,
  email: string,
  password: string
}

// Expected response:
{
  success: boolean,
  token?: string,  // JWT token
  userId?: string
}
```

### Login (`src/pages/Login.tsx`)
**Location:** Line 23-38  
**Endpoint needed:** `POST /api/auth/login`

```javascript
// Expected request body:
{
  email: string,
  password: string
}

// Expected response:
{
  success: boolean,
  token: string,  // JWT token
  user: {
    id: string,
    name: string,
    email: string
  }
}
```

---

## 🎯 User Preferences

### Save Onboarding Preferences (`src/pages/Onboarding.tsx`)
**Location:** Line 57-70  
**Endpoint needed:** `POST /api/user/preferences`

```javascript
// Expected request headers:
{
  Authorization: `Bearer ${token}`
}

// Expected request body:
{
  cryptoAssets: string[],      // e.g., ["Bitcoin (BTC)", "Ethereum (ETH)"]
  investorType: string,         // "hodler" | "trader" | "nft"
  contentTypes: string[]        // e.g., ["Market News", "Price Charts"]
}

// Expected response:
{
  success: boolean,
  preferences: object
}
```

---

## 👍 Feedback/Voting System

### Submit User Feedback (`src/pages/Dashboard.tsx`)
**Location:** Line 36-50  
**Endpoint needed:** `POST /api/feedback`

```javascript
// Expected request headers:
{
  Authorization: `Bearer ${token}`
}

// Expected request body:
{
  section: string,        // "news" | "prices" | "ai" | "meme"
  vote: string,           // "up" | "down"
  timestamp: Date
}

// Expected response:
{
  success: boolean
}

// MongoDB schema suggestion:
{
  userId: ObjectId,
  section: String,
  vote: String,
  timestamp: Date,
  // Optional: add context like which specific news/coin was shown
  context: Object
}
```

---

## 📊 Dashboard Data Endpoints (Optional)

These are currently using mock data. You can optionally create backend endpoints to:

### Get Personalized News
**Endpoint:** `GET /api/dashboard/news`
- Fetch from CryptoPanic API based on user preferences
- Filter by user's `cryptoAssets`

### Get Coin Prices
**Endpoint:** `GET /api/dashboard/prices`
- Fetch from CoinGecko API
- Filter by user's `cryptoAssets`

### Get AI Insight
**Endpoint:** `GET /api/dashboard/ai-insight`
- Use OpenRouter or Hugging Face API
- Generate personalized insight based on user's `investorType` and `cryptoAssets`

### Get Daily Meme
**Endpoint:** `GET /api/dashboard/meme`
- Scrape Reddit or use static JSON
- Return random meme URL

---

## 🗄️ Suggested MongoDB Schemas

### User Schema
```javascript
{
  name: String,
  email: String (unique, required),
  password: String (hashed),
  createdAt: Date,
  preferences: {
    cryptoAssets: [String],
    investorType: String,
    contentTypes: [String]
  }
}
```

### Feedback Schema
```javascript
{
  userId: ObjectId,
  section: String,
  vote: String,
  timestamp: Date,
  context: Object  // Optional: store what was shown to the user
}
```

---

## 🔑 JWT Token Storage

The frontend expects JWT tokens to be stored in `localStorage`:

```javascript
// After successful login/signup:
localStorage.setItem('token', data.token);

// For authenticated requests:
const token = localStorage.getItem('token');
headers: { Authorization: `Bearer ${token}` }

// On logout:
localStorage.removeItem('token');
```

---

## 🎨 Frontend API Integration Pattern

Replace mock data sections with real API calls following this pattern:

```javascript
// Example for Dashboard news section:
useEffect(() => {
  const fetchNews = async () => {
    const token = localStorage.getItem('token');
    const response = await fetch('/api/dashboard/news', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    const data = await response.json();
    setNewsData(data.news);
  };
  
  fetchNews();
}, []);
```

---

## ✅ Testing Checklist

- [ ] User can signup with name, email, password
- [ ] User can login and receive JWT token
- [ ] Token is stored in localStorage
- [ ] Onboarding preferences are saved to database
- [ ] User preferences are linked to their userId
- [ ] Feedback votes are recorded with userId
- [ ] Protected routes check for valid JWT token
- [ ] Logout clears token from localStorage

---

## 🚀 Quick Start Steps

1. Set up MongoDB connection in your Node.js backend
2. Create User and Feedback models with Mongoose
3. Implement authentication endpoints (signup/login) with bcrypt + JWT
4. Implement preferences endpoint
5. Implement feedback endpoint
6. Test each endpoint with Postman/Thunder Client
7. Update frontend API URLs to point to your backend
8. Test full user flow: signup → onboarding → dashboard → voting

---

Good luck with your backend integration! 🎉
