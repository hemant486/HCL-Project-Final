# 🚀 Quick Deploy to Vercel

## Fastest Way: GitHub Integration (Recommended)

### 1. Push to GitHub

```bash
git add .
git commit -m "Ready for Vercel deployment"
git push origin main
```

### 2. Deploy Backend

1. Go to https://vercel.com/new
2. Import `HCL-Project-Final` repository
3. **Root Directory**: `backend`
4. Add environment variables:
   - `MONGODB_URI`: `mongodb+srv://root:root@backend.wr7hftb.mongodb.net/healthcare-portal?retryWrites=true&w=majority`
   - `JWT_SECRET`: `healthcare_portal_super_secret_key_2024_change_in_production`
   - `NODE_ENV`: `production`
5. Click Deploy
6. **Copy the backend URL**

### 3. Deploy Frontend

1. Go to https://vercel.com/new
2. Import `HCL-Project-Final` repository again
3. **Root Directory**: `frontend`
4. **Framework**: Vite
5. Add environment variable:
   - `VITE_API_URL`: `[YOUR_BACKEND_URL]/api`
6. Click Deploy
7. **Copy the frontend URL**

### 4. Update Backend

1. Go to backend project settings
2. Add environment variable:
   - `FRONTEND_URL`: `[YOUR_FRONTEND_URL]`
3. Redeploy

### 5. Configure MongoDB

1. Go to MongoDB Atlas
2. Network Access → Add IP Address
3. Allow Access from Anywhere (0.0.0.0/0)

### 6. Test

Visit your frontend URL and test the application!

---

## Alternative: CLI Deployment

```bash
# Install Vercel CLI
npm install -g vercel

# Run deployment script
./deploy.sh
```

---

## Need Help?

- **Detailed Guide**: See `VERCEL_GITHUB_SETUP.md`
- **Checklist**: See `DEPLOYMENT_CHECKLIST.md`
- **Full Documentation**: See `VERCEL_DEPLOYMENT.md`

---

## Your URLs (fill in after deployment)

- **Backend**: ************\_\_\_************
- **Frontend**: ************\_\_\_************
