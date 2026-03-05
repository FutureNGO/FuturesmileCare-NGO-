# CareerHub Complete Setup Guide

This is a full-stack career portal with React frontend and Node.js/Supabase backend.

## 📋 Prerequisites

- Node.js 18+ installed
- A Supabase account (free tier available at https://supabase.com)
- Two terminals open

---

## 🚀 Step 1: Set Up Supabase Database

### 1.1 Create a Supabase Project
1. Go to https://app.supabase.com and sign in
2. Click "New Project"
3. Choose a project name (e.g., "CareerHub")
4. Set a secure database password
5. Select your region (closest to you)
6. Wait for the project to be created (2-3 minutes)

### 1.2 Add Database Tables
1. In your Supabase dashboard, go to **SQL Editor**
2. Click **New Query**
3. Copy and paste the entire content from `CAREER_API_README.md` (the SQL schema section)
4. Click **Run** to create the tables and seed initial jobs
5. Verify tables are created: Go to **Table Editor** and you should see `jobs`, `applications`, and `subscribers` tables

### 1.3 Get Your API Credentials
1. In Supabase dashboard, go to **Settings → API**
2. Copy these two values:
   - **Project URL** (the API Key section URL)
   - **anon key** (public key for client-side access)

---

## ⚙️ Step 2: Configure Environment Variables

### 2.1 Update Backend `.env` file
Open `.env` in the project root and fill in:

```
SUPABASE_URL=your_project_url_here
SUPABASE_ANON_KEY=your_anon_key_here
PORT=5000
CLIENT_URL=http://localhost:8082
```

### 2.2 Frontend `.env.local` is already configured
It points to `http://localhost:5000/api`, which is correct.

---

## 🏃 Step 3: Run Both Servers

### Terminal 1: Start Backend API Server
```bash
cd path/to/figma-to-react-magic-main
node server.js
```

You should see:
```
🚀 CareerHub API → http://localhost:5000
   ✅ Supabase (PostgreSQL) connected

   GET  /api/jobs           — list & filter jobs
   POST /api/apply          — submit application
   POST /api/subscribe      — subscribe alerts
   ...
```

### Terminal 2: Start Frontend Dev Server
```bash
cd path/to/figma-to-react-magic-main
npm run dev
```

You should see:
```
  VITE v5.4.19  ready in 502 ms

  ➜  Local:   http://localhost:8082/
```

---

## 🧪 Step 4: Test the Career Page

1. **Open the app**: Navigate to `http://localhost:8082/`
2. **Click "Career" in navbar** to go to `/career` page
3. **Test these features**:
   - View job listings (from Supabase)
   - Filter by category
   - Search jobs
   - Apply for a job
   - Subscribe to alerts

---

## 📡 API Endpoints

All endpoints require the backend server running on `http://localhost:5000`:

### GET `/api/jobs`
Fetch jobs with filters

**Query Parameters:**
- `category` - Filter by job category
- `search` - Search by title, company, or location
- `type` - Filter by job type (Full-time, Contract, etc.)
- `location` - Filter by location

**Example:**
```
http://localhost:5000/api/jobs?category=Development&search=React
```

### GET `/api/categories`
Get all job categories with job counts

### POST `/api/apply`
Submit a job application

**Request Body:**
```json
{
  "jobId": 1,
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "555-1234",
  "coverLetter": "I'm interested..."
}
```

### POST `/api/subscribe`
Subscribe to job alerts

**Request Body:**
```json
{
  "email": "user@example.com"
}
```

---

## 🔗 Frontend & Backend Connection

The frontend connects to backend via:

**File:** `src/api/careerApi.js`

```javascript
const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
```

This uses the environment variable `VITE_API_URL` from `.env.local`.

---

## 🛠️ Troubleshooting

### "Cannot connect to Supabase"
- Check `SUPABASE_URL` and `SUPABASE_ANON_KEY` in `.env`
- Verify Supabase project is active
- Check internet connection

### "Backend server not responding"
- Ensure `node server.js` is running in Terminal 1
- Check if port 5000 is not in use: `netstat -an | grep 5000`
- Check backend console for errors

### "Jobs not loading in frontend"
- Open browser DevTools → Network tab
- Check if requests to `http://localhost:5000/api/jobs` return data
- Check browser console for errors
- Verify `.env.local` has correct `VITE_API_URL`

### "Database tables not found"
- Re-run the SQL schema in Supabase SQL Editor
- Check Table Editor in Supabase for table existence
- Verify `is_active = true` for jobs

---

## 📦 Production Deployment

### Build Frontend
```bash
npm run build
```
Output will be in `dist/` folder. Deploy this to Vercel, Netlify, etc.

### Deploy Backend
Deploy `server.js` to a Node.js hosting platform:
- **Options**: Railway, Render, Heroku, AWS Lambda, etc.
- **Environment variables**: Set `SUPABASE_URL`, `SUPABASE_ANON_KEY`, `PORT`, `CLIENT_URL`

### Update Frontend API URL
Set `VITE_API_URL` in your deployment environment to your backend URL:
```
https://your-backend-api.com/api
```

---

## 📝 Project Structure

```
.
├── server.js                    # Backend API (Node.js + Supabase)
├── .env                         # Supabase credentials (keep secret!)
├── .env.local                   # Frontend API URL
├── src/
│   ├── pages/Career.tsx         # Career page component
│   ├── api/careerApi.js         # Frontend API client
│   ├── components/
│   │   ├── Navbar.tsx           # Navigation (shared)
│   │   └── Footer.tsx           # Footer (shared)
│   └── App.tsx                  # Main app with routes
└── CAREER_API_README.md         # SQL schema
```

---

## ✨ Features Implemented

✅ Job listings from Supabase PostgreSQL  
✅ Filter by category, search, type, location  
✅ Job application form with validation  
✅ Email subscription for job alerts  
✅ Error handling and loading states  
✅ Shared Navbar/Footer across routes  
✅ Dark luxury theme design  
✅ Responsive mobile layout  

---

## 🎯 Next Steps

1. ✅ Set up Supabase project
2. ✅ Fill in `.env` with credentials
3. ✅ Run `node server.js`
4. ✅ Run `npm run dev`
5. ✅ Test Career page functionality
6. 🚀 Deploy to production

---

**Need help?** Check the browser console (DevTools) and backend terminal for error messages.
