# Deploy to Vercel via GitHub Integration

This is the easiest way to deploy your Healthcare Portal to Vercel with automatic deployments on every push.

## Step-by-Step Guide

### 1. Push Your Code to GitHub

Make sure your code is pushed to the `HCL-Project-Final` repository:

```bash
git add .
git commit -m "Add Vercel deployment configuration"
git push origin main
```

### 2. Deploy Backend

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click **"Add New..."** → **"Project"**
3. Click **"Import Git Repository"**
4. Select your **HCL-Project-Final** repository
5. Configure the backend project:

   **Project Settings:**

   - **Project Name**: `healthcare-portal-backend` (or your choice)
   - **Framework Preset**: Other
   - **Root Directory**: Click "Edit" and select `backend`
   - **Build Command**: Leave empty
   - **Output Directory**: Leave empty
   - **Install Command**: `npm install`

6. Click **"Environment Variables"** and add:

   ```
   MONGODB_URI=mongodb+srv://root:root@backend.wr7hftb.mongodb.net/healthcare-portal?retryWrites=true&w=majority
   JWT_SECRET=healthcare_portal_super_secret_key_2024_change_in_production
   NODE_ENV=production
   ```

7. Click **"Deploy"**
8. Wait for deployment to complete
9. **Copy the deployment URL** (e.g., `https://healthcare-portal-backend.vercel.app`)

### 3. Deploy Frontend

1. Go back to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click **"Add New..."** → **"Project"**
3. Click **"Import Git Repository"**
4. Select your **HCL-Project-Final** repository again
5. Configure the frontend project:

   **Project Settings:**

   - **Project Name**: `healthcare-portal-frontend` (or your choice)
   - **Framework Preset**: Vite
   - **Root Directory**: Click "Edit" and select `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

6. Click **"Environment Variables"** and add:

   ```
   VITE_API_URL=https://healthcare-portal-backend.vercel.app/api
   ```

   (Replace with your actual backend URL from step 2.9)

7. Click **"Deploy"**
8. Wait for deployment to complete
9. **Copy the deployment URL** (e.g., `https://healthcare-portal-frontend.vercel.app`)

### 4. Update Backend CORS Settings

1. Go to your backend project in Vercel Dashboard
2. Go to **Settings** → **Environment Variables**
3. Add a new variable:

   ```
   FRONTEND_URL=https://healthcare-portal-frontend.vercel.app
   ```

   (Replace with your actual frontend URL from step 3.9)

4. Go to **Deployments** tab
5. Click the three dots on the latest deployment
6. Click **"Redeploy"** to apply the new environment variable

### 5. Configure MongoDB Atlas

1. Go to [MongoDB Atlas](https://cloud.mongodb.com/)
2. Select your cluster
3. Click **"Network Access"** in the left sidebar
4. Click **"Add IP Address"**
5. Click **"Allow Access from Anywhere"** (0.0.0.0/0)
6. Click **"Confirm"**

### 6. Test Your Deployment

1. Open your frontend URL: `https://healthcare-portal-frontend.vercel.app`
2. Try to register a new user
3. Try to login
4. Test all major features

## Automatic Deployments

Now, every time you push to your GitHub repository:

- Vercel will automatically deploy both frontend and backend
- You'll get a preview URL for each deployment
- Production deployments happen on pushes to the main branch

## Managing Deployments

### View Deployments

- Go to Vercel Dashboard
- Select your project
- View all deployments in the **Deployments** tab

### Rollback

- Go to a previous deployment
- Click **"Promote to Production"**

### Environment Variables

- Go to **Settings** → **Environment Variables**
- Add, edit, or delete variables
- Redeploy to apply changes

## Custom Domain (Optional)

1. Go to your project in Vercel Dashboard
2. Go to **Settings** → **Domains**
3. Add your custom domain
4. Follow the DNS configuration instructions
5. Update environment variables with new domain

## Troubleshooting

### Backend not connecting to MongoDB

- Check MongoDB Atlas Network Access settings
- Verify MONGODB_URI in environment variables
- Check Vercel logs for connection errors

### Frontend can't reach backend

- Verify VITE_API_URL in frontend environment variables
- Check CORS settings in backend
- Verify FRONTEND_URL in backend environment variables

### Build failures

- Check build logs in Vercel Dashboard
- Verify all dependencies are in package.json
- Check for syntax errors

### CORS errors

- Ensure FRONTEND_URL matches your frontend domain exactly
- Include https:// in the URL
- Redeploy backend after updating FRONTEND_URL

## Quick Reference

**Backend URL**: `https://healthcare-portal-backend.vercel.app`
**Frontend URL**: `https://healthcare-portal-frontend.vercel.app`

**Backend Environment Variables:**

- MONGODB_URI
- JWT_SECRET
- FRONTEND_URL
- NODE_ENV

**Frontend Environment Variables:**

- VITE_API_URL

## Support

- [Vercel Documentation](https://vercel.com/docs)
- [Vercel Support](https://vercel.com/support)
- [GitHub Issues](https://github.com/vercel/vercel/issues)
