# Vercel Deployment Guide

This guide will help you deploy both the frontend and backend of the Healthcare Portal to Vercel.

## Prerequisites

1. Install Vercel CLI globally:

   ```bash
   npm install -g vercel
   ```

2. Login to Vercel:
   ```bash
   vercel login
   ```

## Deployment Options

### Option 1: Deploy as Monorepo (Recommended)

Deploy both frontend and backend together from the root directory:

```bash
vercel
```

### Option 2: Deploy Separately

#### Deploy Backend

1. Navigate to backend directory:

   ```bash
   cd backend
   vercel
   ```

2. Set environment variables in Vercel dashboard:
   - `MONGODB_URI`: Your MongoDB connection string
   - `JWT_SECRET`: Your JWT secret key
   - `FRONTEND_URL`: Your frontend URL (after deploying frontend)

#### Deploy Frontend

1. Navigate to frontend directory:

   ```bash
   cd frontend
   vercel
   ```

2. Set environment variables in Vercel dashboard:
   - `VITE_API_URL`: Your backend API URL (from backend deployment)

## Environment Variables Setup

### Backend Environment Variables

Go to your Vercel project settings and add:

```
MONGODB_URI=mongodb+srv://root:root@backend.wr7hftb.mongodb.net/healthcare-portal?retryWrites=true&w=majority
JWT_SECRET=healthcare_portal_super_secret_key_2024_change_in_production
FRONTEND_URL=https://your-frontend-url.vercel.app
NODE_ENV=production
```

### Frontend Environment Variables

Go to your Vercel project settings and add:

```
VITE_API_URL=https://your-backend-url.vercel.app/api
```

## GitHub Integration (Recommended)

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "Add New Project"
3. Import your GitHub repository: `HCL-Project-Final`
4. Configure the project:

### For Backend:

- **Framework Preset**: Other
- **Root Directory**: `backend`
- **Build Command**: (leave empty)
- **Output Directory**: (leave empty)
- **Install Command**: `npm install`

### For Frontend:

- **Framework Preset**: Vite
- **Root Directory**: `frontend`
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

5. Add environment variables as mentioned above
6. Click "Deploy"

## Post-Deployment Steps

1. After backend deployment, copy the backend URL
2. Update frontend environment variable `VITE_API_URL` with the backend URL
3. Redeploy frontend if needed
4. Update backend environment variable `FRONTEND_URL` with the frontend URL
5. Test all functionality

## Vercel CLI Commands

- Deploy to production: `vercel --prod`
- Deploy to preview: `vercel`
- Check deployment status: `vercel ls`
- View logs: `vercel logs [deployment-url]`
- Remove deployment: `vercel rm [deployment-name]`

## Important Notes

1. **MongoDB Atlas**: Ensure your MongoDB Atlas cluster allows connections from anywhere (0.0.0.0/0) or add Vercel's IP addresses to the whitelist
2. **CORS**: The backend is configured to accept requests from your frontend URL
3. **Environment Variables**: Never commit `.env` files. Always set them in Vercel dashboard
4. **Build Time**: First deployment might take a few minutes
5. **Automatic Deployments**: Once connected to GitHub, Vercel will automatically deploy on every push to main branch

## Troubleshooting

### Backend Issues

- Check Vercel logs: `vercel logs [backend-url]`
- Verify MongoDB connection string
- Ensure all environment variables are set correctly

### Frontend Issues

- Verify `VITE_API_URL` points to correct backend URL
- Check browser console for CORS errors
- Ensure backend is deployed and running

### CORS Errors

- Verify `FRONTEND_URL` is set in backend environment variables
- Check that frontend URL matches exactly (including https://)

## Testing Deployment

After deployment, test these endpoints:

1. Backend health check: `https://your-backend-url.vercel.app/`
2. Frontend: `https://your-frontend-url.vercel.app/`
3. API test: `https://your-backend-url.vercel.app/api/auth/test`

## Production Checklist

- [ ] Backend deployed successfully
- [ ] Frontend deployed successfully
- [ ] Environment variables configured
- [ ] MongoDB connection working
- [ ] CORS configured correctly
- [ ] All API endpoints working
- [ ] Authentication working
- [ ] Test user registration and login
- [ ] Test all major features

## Support

For issues with Vercel deployment, check:

- [Vercel Documentation](https://vercel.com/docs)
- [Vercel Community](https://github.com/vercel/vercel/discussions)
