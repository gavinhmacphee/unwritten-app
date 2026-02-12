# Unwritten — Ship Guide

## What you're deploying
A journaling app where parents write one line a day about their kids. Free app, monetized through printed photo books. Email auth, photo uploads, streak tracking, timeline view. Built with React + Supabase.

---

## STEP 1: Create Supabase Project (10 minutes)

1. Go to [supabase.com](https://supabase.com) and sign up / sign in
2. Click **"New Project"**
3. Name it `unwritten`
4. Set a database password (save this somewhere)
5. Choose a region closest to you (e.g., US East)
6. Click **Create new project** — wait ~2 minutes for it to spin up

### Run the database schema
1. In your Supabase dashboard, go to **SQL Editor** (left sidebar)
2. Click **"New Query"**
3. Copy-paste the ENTIRE contents of `supabase-schema.sql` into the editor
4. Click **"Run"** (or Cmd+Enter)
5. You should see "Success. No rows returned" — that's correct

### Get your API keys
1. Go to **Settings → API** (left sidebar → gear icon → API)
2. Copy two values:
   - **Project URL** (looks like `https://abcdefg.supabase.co`)
   - **anon public** key (the long string under "Project API keys")

### Configure Auth
1. Go to **Authentication → URL Configuration**
2. Set **Site URL** to `http://localhost:3000` for now (you'll update this after deploy)
3. Under **Redirect URLs**, add: `http://localhost:3000`

---

## STEP 2: Set Up the Code (5 minutes)

### Option A: If you have Node.js installed
```bash
# 1. Copy this entire unwritten-app folder to your computer
# 2. Open terminal in that folder
# 3. Install dependencies
npm install

# 4. Create .env file
cp .env.example .env

# 5. Edit .env and paste your Supabase URL and anon key
#    VITE_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
#    VITE_SUPABASE_ANON_KEY=your_anon_key_here

# 6. Run it locally
npm run dev

# 7. Open http://localhost:3000
```

### Option B: If you DON'T have Node.js
1. Install Node.js from [nodejs.org](https://nodejs.org) (LTS version)
2. Then follow Option A above

---

## STEP 3: Deploy to Vercel (5 minutes)

### First time setup
1. Go to [vercel.com](https://vercel.com) and sign up with GitHub
2. Push your code to a GitHub repo:
```bash
# In the unwritten-app folder:
git init
git add .
git commit -m "Unwritten v1.0"

# Create a repo on github.com, then:
git remote add origin https://github.com/YOUR_USERNAME/unwritten-app.git
git branch -M main
git push -u origin main
```

3. Back in Vercel, click **"Add New" → "Project"**
4. Import your `unwritten-app` repo
5. **IMPORTANT**: Add environment variables before deploying:
   - Click **"Environment Variables"**
   - Add `VITE_SUPABASE_URL` = your Supabase project URL
   - Add `VITE_SUPABASE_ANON_KEY` = your Supabase anon key
6. Click **Deploy**

### After deploy
1. Vercel gives you a URL like `https://unwritten-app.vercel.app`
2. Go back to **Supabase → Authentication → URL Configuration**
3. Update **Site URL** to your Vercel URL
4. Add your Vercel URL to **Redirect URLs**

---

## STEP 4: Custom Domain (Optional)

If you buy a domain (e.g., unwrittenapp.com):
1. In Vercel, go to your project → **Settings → Domains**
2. Add your domain
3. Follow Vercel's DNS instructions
4. Update the Supabase Site URL and Redirect URLs to match

---

## STEP 5: Test It

1. Open your deployed URL on your phone
2. Create an account
3. Add your first child
4. Write your first entry
5. Add a photo
6. Check the timeline
7. **Add to Home Screen** (this makes it feel like a real app):
   - iPhone: Share → Add to Home Screen
   - Android: Menu → Add to Home Screen

---

## File Structure
```
unwritten-app/
├── index.html              ← HTML entry point with PWA meta tags
├── package.json            ← Dependencies
├── vite.config.js          ← Build config
├── .env.example            ← Template for environment variables
├── supabase-schema.sql     ← Database schema (run in Supabase SQL Editor)
└── src/
    ├── main.jsx            ← React entry point
    ├── index.css           ← All styles
    ├── App.jsx             ← All components and app logic
    └── lib/
        ├── supabase.js     ← Supabase client
        └── prompts.js      ← Daily journal prompts
```

---

## Troubleshooting

**"Invalid login credentials"**
- Make sure you confirmed your email (check inbox/spam for Supabase confirmation email)

**Photos not uploading**
- Check that the storage bucket was created: Supabase → Storage → should see "photos" bucket
- If not, re-run the schema SQL

**"relation does not exist" error**
- The schema SQL didn't run properly. Go to SQL Editor and run it again.

**App won't load on Vercel**
- Check that environment variables are set in Vercel project settings
- Redeploy after adding env vars (Vercel → Deployments → Redeploy)
