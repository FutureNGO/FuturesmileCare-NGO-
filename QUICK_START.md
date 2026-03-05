# 🚀 Quick Start Reference Card

## 5-Minute Setup Checklist

### Step 1: Create Supabase Project (2 min)
- [ ] Go to https://supabase.com
- [ ] Sign in / Create account
- [ ] Click "New Project"
- [ ] Fill project name (e.g., "CareerHub")
- [ ] Set database password & region
- [ ] Wait for project creation

### Step 2: Set Up Database (1 min)
- [ ] In Supabase, go to SQL Editor
- [ ] Click "New Query"
- [ ] Copy entire content from `DATABASE_SCHEMA.sql`
- [ ] Paste into SQL Editor
- [ ] Click "Run"
- [ ] Wait 10-15 seconds

### Step 3: Get API Credentials (1 min)
- [ ] In Supabase, go to Settings → API
- [ ] Copy **Project URL** (starts with `https://`)
- [ ] Copy **anon key** (the public key)

### Step 4: Configure Environment (30 sec)
- [ ] Open `.env` in project root
- [ ] Paste Supabase URL: `SUPABASE_URL=https://...`
- [ ] Paste Supabase Key: `SUPABASE_ANON_KEY=...`
- [ ] Save file

### Step 5: Start Servers (1 min)

**Terminal 1:**
```bash
node server.js
```
Wait for: `✅ Supabase (PostgreSQL) connected`

**Terminal 2:**
```bash
npm run dev
```
Wait for: `➜  Local:   http://localhost:8080/`

### Step 6: Test It! (30 sec)
- [ ] Open http://localhost:8082 in browser
- [ ] Click "Career" in navbar
- [ ] See jobs loading from database
- [ ] Try applying for a job ✅

---

## 📍 Key Files Location

```
project-root/
├── .env                    ← FILL WITH SUPABASE CREDENTIALS
├── server.js               ← Backend (run: node server.js)
├── src/pages/Career.tsx    ← Career page component
├── src/api/careerApi.js    ← API client
├── DATABASE_SCHEMA.sql     ← Copy this into Supabase SQL Editor
└── SETUP_GUIDE.md          ← Detailed setup instructions
```

---

## 🔐 Supabase Credentials Location

In your Supabase dashboard:
1. Click your project name (top left)
2. Go to **Settings** → **API**
3. Look for:
   - **Project URL** = `SUPABASE_URL`
   - **anon public** = `SUPABASE_ANON_KEY`
   - (Copy the entire URLs/keys, not just parts)

---

## ✅ How to Know It's Working

### Backend Running ✅
```
🚀 CareerHub API → http://localhost:5000
   ✅ Supabase (PostgreSQL) connected
```

### Frontend Running ✅
```
➜  Local:   http://localhost:8082/
```

### Jobs Loading ✅
- Career page shows job cards
- Can click "Apply Now" button
- Can filter by category
- Can search jobs

---

## 🆘 Quick Fixes

| Problem | Fix |
|---------|-----|
| `SUPABASE_URL not defined` | Check `.env` file has correct URL without quotes |
| Port 5000 already in use | `netstat -an` to check, or use different port |
| Jobs not showing | Verify SQL schema ran successfully in Supabase |
| Build error | Run `npm install` then `npm run build` |
| CORS error | Make sure backend is running on port 5000 |

---

## 📞 Important URLs

| Service | URL |
|---------|-----|
| Local Frontend | http://localhost:8082 |
| Local Backend | http://localhost:5000 |
| Career Page | http://localhost:8082/career |
| Supabase Dashboard | https://app.supabase.com |
| API `/jobs` | http://localhost:5000/api/jobs |

---

## ⏱️ Expected Time

- **Supabase Setup**: 2-3 minutes
- **Code Configuration**: 1 minute
- **Starting Servers**: 1 minute
- **Testing**: 1 minute
- **Total**: ~5-10 minutes

---

## 💾 Backup Important Things

```
KEEP SAFE:
✓ SUPABASE_URL from .env
✓ SUPABASE_ANON_KEY from .env
✓ Database name (created in SQL)
✓ Your test data (job IDs, etc.)
```

---

## 🎯 Verification Checklist

- [ ] Backend console shows "Supabase connected"
- [ ] Frontend loads at `http://localhost:8082/`
- [ ] Career page accessible via navbar
- [ ] Job listings display
- [ ] Can apply for job
- [ ] Can subscribe to alerts
- [ ] No errors in browser console

---

**Once all checks pass, Career Page is LIVE! 🎉**

See `SETUP_GUIDE.md` for detailed instructions.
See `COMPLETION_SUMMARY.md` for what was done.
