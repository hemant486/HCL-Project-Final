# 🏗️ Vercel Deployment Architecture

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                         GitHub                               │
│                  HCL-Project-Final Repo                      │
└────────────────────┬────────────────────────────────────────┘
                     │
                     │ Push to main
                     │
        ┌────────────┴────────────┐
        │                         │
        ▼                         ▼
┌───────────────┐         ┌───────────────┐
│    Vercel     │         │    Vercel     │
│   Backend     │         │   Frontend    │
│   Project     │         │   Project     │
└───────┬───────┘         └───────┬───────┘
        │                         │
        │ Serverless              │ Static
        │ Functions               │ Hosting
        │                         │
        ▼                         ▼
┌───────────────┐         ┌───────────────┐
│   Backend     │◄────────┤   Frontend    │
│   API         │  CORS   │   React App   │
│               │         │               │
│ /api/auth     │         │ Vite Build    │
│ /api/health   │         │ Tailwind CSS  │
│ /api/...      │         │ React Router  │
└───────┬───────┘         └───────────────┘
        │
        │ MongoDB
        │ Connection
        │
        ▼
┌───────────────┐
│  MongoDB      │
│  Atlas        │
│               │
│ Healthcare    │
│ Portal DB     │
└───────────────┘
```

## Deployment Flow

```
1. Developer pushes code to GitHub
   │
   ├─► Vercel detects push
   │
   ├─► Backend Build Process:
   │   ├─ Install dependencies (npm install)
   │   ├─ Load environment variables
   │   ├─ Create serverless functions
   │   └─ Deploy to Vercel Edge Network
   │
   └─► Frontend Build Process:
       ├─ Install dependencies (npm install)
       ├─ Build with Vite (npm run build)
       ├─ Optimize assets
       └─ Deploy to Vercel CDN
```

## Request Flow

```
User Browser
    │
    │ HTTPS Request
    │
    ▼
Vercel CDN (Frontend)
    │
    │ Serves React App
    │
    ▼
React Application
    │
    │ API Calls (axios)
    │
    ▼
Vercel Serverless (Backend)
    │
    │ JWT Authentication
    │ Route Handling
    │
    ▼
MongoDB Atlas
    │
    │ Data Operations
    │
    ▼
Response to User
```

## File Structure on Vercel

### Backend Deployment

```
backend/
├── server.js           → Serverless Function Entry
├── routes/            → API Route Handlers
├── models/            → MongoDB Models
├── middleware/        → Auth & Error Handling
├── config/            → Database Config
└── node_modules/      → Dependencies
```

### Frontend Deployment

```
frontend/dist/         → Built Static Files
├── index.html        → Entry Point
├── assets/           → JS, CSS, Images
│   ├── index-[hash].js
│   └── index-[hash].css
└── [other assets]
```

## Environment Variables Flow

```
Vercel Dashboard
    │
    │ Environment Variables
    │
    ├─► Backend
    │   ├─ MONGODB_URI
    │   ├─ JWT_SECRET
    │   ├─ FRONTEND_URL
    │   └─ NODE_ENV
    │
    └─► Frontend
        └─ VITE_API_URL
```

## Security Architecture

```
┌─────────────────────────────────────────┐
│         Security Layers                  │
├─────────────────────────────────────────┤
│ 1. HTTPS/TLS (Vercel)                   │
│ 2. CORS (Backend Middleware)            │
│ 3. JWT Authentication                    │
│ 4. Password Hashing (bcrypt)            │
│ 5. MongoDB Atlas Network Access          │
│ 6. Environment Variables (Vercel)       │
└─────────────────────────────────────────┘
```

## Scaling & Performance

```
Frontend (Vercel CDN)
├─ Global Edge Network
├─ Automatic Caching
├─ Instant Rollbacks
└─ Preview Deployments

Backend (Vercel Serverless)
├─ Auto-scaling
├─ Cold Start Optimization
├─ Regional Deployment
└─ Function Logs
```

## Monitoring & Logs

```
Vercel Dashboard
    │
    ├─► Deployments
    │   ├─ Build Logs
    │   ├─ Function Logs
    │   └─ Error Tracking
    │
    ├─► Analytics
    │   ├─ Page Views
    │   ├─ Performance Metrics
    │   └─ Web Vitals
    │
    └─► Monitoring
        ├─ Uptime
        ├─ Response Times
        └─ Error Rates
```

## Continuous Deployment

```
Git Push
    │
    ▼
GitHub Webhook
    │
    ▼
Vercel Build
    │
    ├─► Success → Deploy to Production
    │
    └─► Failure → Notify & Keep Previous Version
```

## Rollback Strategy

```
Issue Detected
    │
    ▼
Vercel Dashboard
    │
    ├─► View Previous Deployments
    │
    ├─► Select Working Version
    │
    └─► Promote to Production (Instant)
```

## Cost Structure

```
Vercel Free Tier
├─ Unlimited Deployments
├─ 100GB Bandwidth/month
├─ Serverless Function Execution
└─ Automatic HTTPS

MongoDB Atlas Free Tier
├─ 512MB Storage
├─ Shared Cluster
└─ Network Access Control
```

## Best Practices Implemented

✅ Serverless architecture for auto-scaling
✅ CDN for fast global delivery
✅ Environment-based configuration
✅ Automatic HTTPS/SSL
✅ Git-based deployments
✅ Preview deployments for PRs
✅ Instant rollbacks
✅ Zero-downtime deployments

---

This architecture ensures:

- **High Availability**: Global CDN and serverless functions
- **Scalability**: Auto-scaling based on demand
- **Security**: Multiple layers of protection
- **Performance**: Edge network and optimized builds
- **Developer Experience**: Simple deployment workflow
