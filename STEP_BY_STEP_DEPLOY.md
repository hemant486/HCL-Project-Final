# 🚀 Step-by-Step Vercel Deployment Guide

## Current Status

- Repository: https://github.com/hemant486/demo.git
- Branch: main
- Files ready: ✅ All Vercel configuration files created

---

## STEP 1: Push Code to GitHub (5 minutes)

### 1.1 Add All Files

```bash
git add .
```

### 1.2 Commit Changes

```bash
git commit -m "Add Vercel deployment configuration"
```

### 1.3 Push to GitHub

```bash
git push origin main
```

**✅ Checkpoint:** Visit https://github.com/hemant486/demo to verify files are pushed

---

## STEP 2: Deploy Backend to Vercel (10 minutes)

### 2.1 Go to Vercel

Open: https://vercel.com/new

### 2.2 Import Repository

1. Click **"Import Git Repository"**
2. If not connected, click **"Connect GitHub Account"**
3. Authorize Vercel to access your GitHub
4. Search for **"demo"** repository
5. Click **"Import"**

### 2.3 Configure Backend Project

**Project Name:** `healthcare-portal-backend` (or your choice)

**Framework Preset:** Select **"Other"**

**Root Directory:**

- Click **"Edit"** button
- Select **"backend"** folder
- Click **"Continue"**

**Build Settings:**

- Build Command: (leave empty)
- Output Directory: (leave empty)
- Install Command: `npm install`

### 2.4 Add Environment Variables

Click **"Environment Variables"** section and add these **ONE BY ONE**:

**Variable 1:**

- Name: `MONGODB_URI`
- Value: `mongodb+srv://root:root@backend.wr7hftb.mongodb.net/healthcare-portal?retryWrites=true&w=majority`

**Variable 2:**

- Name: `JWT_SECRET`
- Value: `healthcare_portal_super_secret_key_2024_change_in_production`

**Variable 3:**

- Name: `NODE_ENV`
- Value: `production`

### 2.5 Deploy

1. Click **"Deploy"** button
2. Wait 2-3 minutes for deployment
3. You'll see "Congratulations!" when done

### 2.6 Copy Backend URL

1. Click **"Visit"** or copy the URL shown
2. It will look like: `https://healthcare-portal-backend-xxx.vercel.app`
3. **SAVE THIS URL** - you'll need it for frontend!

**✅ Checkpoint:** Visit your backend URL - you should see: `{"message":"Healthcare Portal API"}`

---

## STEP 3: Deploy Frontend to Vercel (10 minutes)

### 3.1 Go to Vercel Again

Open: https://vercel.com/new

### 3.2 Import Same Repository

1. Click **"Import Git Repository"**
2. Search for **"demo"** repository again
3. Click **"Import"**

### 3.3 Configure Frontend Project

**Project Name:** `healthcare-portal-frontend` (or your choice)

**Framework Preset:** Select **"Vite"**

**Root Directory:**

- Click **"Edit"** button
- Select **"frontend"** folder
- Click **"Continue"**

**Build Settings:**

- Build Command: `npm run build`
- Output Directory: `dist`
- Install Command: `npm install`

### 3.4 Add Environment Variable

Click **"Environment Variables"** section:

**Variable:**

- Name: `VITE_API_URL`
- Value: `https://healthcare-portal-backend-xxx.vercel.app/api`
  (Replace with YOUR backend URL from Step 2.6 + `/api`)

### 3.5 Deploy

1. Click **"Deploy"** button
2. Wait 2-3 minutes for deployment
3. You'll see "Congratulations!" when done

### 3.6 Copy Frontend URL

1. Click **"Visit"** or copy the URL shown
2. It will look like: `https://healthcare-portal-frontend-xxx.vercel.app`
3. **SAVE THIS URL** - you'll need it for backend!

**✅ Checkpoint:** Visit your frontend URL - you should see the Healthcare Portal homepage

---

## STEP 4: Update Backend with Frontend URL (5 minutes)

### 4.1 Go to Backend Project

1. Go to https://vercel.com/dashboard
2. Click on your **backend project** (healthcare-portal-backend)

### 4.2 Add Frontend URL

1. Click **"Settings"** tab
2. Click **"Environment Variables"** in left sidebar
3. Click **"Add New"** button
4. Add:
   - Name: `FRONTEND_URL`
   - Value: `https://healthcare-portal-frontend-xxx.vercel.app`
     (Your frontend URL from Step 3.6)
5. Click **"Save"**

### 4.3 Redeploy Backend

1. Click **"Deployments"** tab
2. Find the latest deployment (top of list)
3. Click the **three dots (...)** on the right
4. Click **"Redeploy"**
5. Click **"Redeploy"** again to confirm
6. Wait 1-2 minutes

**✅ Checkpoint:** Backend now accepts requests from your frontend

---

## STEP 5: Configure MongoDB Atlas (5 minutes)

### 5.1 Go to MongoDB Atlas

Open: https://cloud.mongodb.com/

### 5.2 Login

Use your MongoDB credentials

### 5.3 Select Your Cluster

1. Click on your cluster (should be "backend")
2. Or navigate to your project

### 5.4 Configure Network Access

1. Click **"Network Access"** in left sidebar (under Security)
2. Click **"Add IP Address"** button
3. Click **"Allow Access from Anywhere"**
4. It will show: `0.0.0.0/0`
5. Click **"Confirm"**

**Why?** Vercel serverless functions use dynamic IPs, so we need to allow all IPs.

**✅ Checkpoint:** MongoDB is now accessible from Vercel

---

## STEP 6: Test Your Deployment (10 minutes)

### 6.1 Open Your Frontend

Visit: `https://healthcare-portal-frontend-xxx.vercel.app`

### 6.2 Test Registration

1. Click **"Register"**
2. Fill in the form:
   - Name: Test User
   - Email: test@example.com
   - Password: Test123!
   - Role: Patient
3. Click **"Register"**
4. You should be redirected to dashboard

### 6.3 Test Login

1. Logout if logged in
2. Click **"Login"**
3. Enter:
   - Email: test@example.com
   - Password: Test123!
4. Click **"Login"**
5. You should see the dashboard

### 6.4 Test Features

Try these features:

- ✅ Dashboard loads
- ✅ Health Info page works
- ✅ Appointments page works
- ✅ Goals page works
- ✅ Profile page works

**✅ Checkpoint:** All features working!

---

## STEP 7: Save Your URLs (2 minutes)

### 7.1 Document Your URLs

Create a note with:

```
Backend URL: https://healthcare-portal-backend-xxx.vercel.app
Frontend URL: https://healthcare-portal-frontend-xxx.vercel.app

Backend Dashboard: https://vercel.com/dashboard
MongoDB Atlas: https://cloud.mongodb.com/
```

### 7.2 Update Local .env (Optional)

Update `frontend/.env.production`:

```
VITE_API_URL=https://healthcare-portal-backend-xxx.vercel.app/api
```

---

## 🎉 DEPLOYMENT COMPLETE!

Your Healthcare Portal is now live on Vercel!

### What Happens Now?

**Automatic Deployments:**

- Every time you push to GitHub main branch
- Vercel automatically deploys both frontend and backend
- You get a preview URL for each deployment

**Managing Deployments:**

- View all deployments: https://vercel.com/dashboard
- Rollback if needed: Click deployment → "Promote to Production"
- View logs: Click deployment → "View Function Logs"

---

## 📊 Summary

| Component | URL                                               | Status       |
| --------- | ------------------------------------------------- | ------------ |
| Frontend  | https://healthcare-portal-frontend-xxx.vercel.app | ✅ Live      |
| Backend   | https://healthcare-portal-backend-xxx.vercel.app  | ✅ Live      |
| Database  | MongoDB Atlas                                     | ✅ Connected |

---

## 🔧 Troubleshooting

### Issue: CORS Error

**Solution:**

1. Go to backend project settings
2. Verify `FRONTEND_URL` is set correctly
3. Redeploy backend

### Issue: MongoDB Connection Error

**Solution:**

1. Check MongoDB Atlas Network Access
2. Ensure 0.0.0.0/0 is allowed
3. Verify `MONGODB_URI` in backend env vars

### Issue: Frontend Can't Reach Backend

**Solution:**

1. Check `VITE_API_URL` in frontend env vars
2. Ensure it ends with `/api`
3. Verify backend is deployed and running

### Issue: Build Failed

**Solution:**

1. Check build logs in Vercel dashboard
2. Verify all dependencies in package.json
3. Check for syntax errors

---

## 📞 Need Help?

- **Vercel Docs:** https://vercel.com/docs
- **Vercel Support:** https://vercel.com/support
- **MongoDB Docs:** https://docs.mongodb.com/

---

## 🎯 Next Steps (Optional)

1. **Custom Domain:** Add your own domain in Vercel settings
2. **Monitoring:** Set up error tracking (Sentry, LogRocket)
3. **Analytics:** Enable Vercel Analytics
4. **Security:** Review and update JWT_SECRET
5. **Backup:** Set up MongoDB backups

---

**Congratulations! Your Healthcare Portal is deployed! 🚀**
