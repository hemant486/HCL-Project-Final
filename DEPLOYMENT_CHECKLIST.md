# Vercel Deployment Checklist

## Pre-Deployment

- [ ] Code is committed and pushed to GitHub repository `HCL-Project-Final`
- [ ] MongoDB Atlas is configured and accessible
- [ ] All environment variables are documented
- [ ] Application works locally

## Backend Deployment

- [ ] Create new Vercel project from GitHub
- [ ] Set Root Directory to `backend`
- [ ] Configure environment variables:
  - [ ] MONGODB_URI
  - [ ] JWT_SECRET
  - [ ] NODE_ENV=production
- [ ] Deploy backend
- [ ] Copy backend URL
- [ ] Test backend endpoint: `https://your-backend.vercel.app/`

## Frontend Deployment

- [ ] Create new Vercel project from GitHub
- [ ] Set Root Directory to `frontend`
- [ ] Set Framework Preset to Vite
- [ ] Configure environment variables:
  - [ ] VITE_API_URL (use backend URL from above)
- [ ] Deploy frontend
- [ ] Copy frontend URL

## Post-Deployment Configuration

- [ ] Add FRONTEND_URL to backend environment variables
- [ ] Redeploy backend
- [ ] Configure MongoDB Atlas Network Access (0.0.0.0/0)
- [ ] Update .env.production files locally (for reference)

## Testing

- [ ] Frontend loads successfully
- [ ] User registration works
- [ ] User login works
- [ ] JWT authentication works
- [ ] All API endpoints respond correctly
- [ ] CORS is configured properly
- [ ] Database operations work
- [ ] Test all major features:
  - [ ] Dashboard
  - [ ] Health Info
  - [ ] Appointments
  - [ ] Medical Records
  - [ ] Goals
  - [ ] Profile
  - [ ] Doctor features (if applicable)

## Final Steps

- [ ] Document deployment URLs
- [ ] Update README.md with live URLs
- [ ] Set up custom domain (optional)
- [ ] Configure production monitoring
- [ ] Set up error tracking (optional)

## Environment Variables Reference

### Backend

```
MONGODB_URI=mongodb+srv://root:root@backend.wr7hftb.mongodb.net/healthcare-portal?retryWrites=true&w=majority
JWT_SECRET=healthcare_portal_super_secret_key_2024_change_in_production
FRONTEND_URL=https://your-frontend.vercel.app
NODE_ENV=production
```

### Frontend

```
VITE_API_URL=https://your-backend.vercel.app/api
```

## Quick Commands

```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy backend
cd backend && vercel --prod

# Deploy frontend
cd frontend && vercel --prod

# View deployments
vercel ls

# View logs
vercel logs [deployment-url]
```

## Deployment URLs

**Backend**: ************\_\_\_************
**Frontend**: ************\_\_\_************

## Notes

- Automatic deployments are enabled via GitHub integration
- Every push to main branch triggers a production deployment
- Pull requests create preview deployments
- Environment variables are managed in Vercel Dashboard
