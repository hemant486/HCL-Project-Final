# 🎯 Quick Reference Card

## 🚀 Deploy in 3 Steps

### 1️⃣ Push to GitHub

```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```

### 2️⃣ Deploy Backend

- Go to: https://vercel.com/new
- Import: `HCL-Project-Final`
- Root: `backend`
- Add env vars (see below)
- Deploy & copy URL

### 3️⃣ Deploy Frontend

- Go to: https://vercel.com/new
- Import: `HCL-Project-Final` (again)
- Root: `frontend`
- Framework: `Vite`
- Add env var: `VITE_API_URL=[backend-url]/api`
- Deploy

## 🔑 Environment Variables

### Backend

```
MONGODB_URI=mongodb+srv://root:root@backend.wr7hftb.mongodb.net/healthcare-portal?retryWrites=true&w=majority
JWT_SECRET=healthcare_portal_super_secret_key_2024_change_in_production
NODE_ENV=production
FRONTEND_URL=[your-frontend-url]
```

### Frontend

```
VITE_API_URL=[your-backend-url]/api
```

## 📁 Files Created

```
✅ vercel.json                    # Root config
✅ backend/vercel.json            # Backend config
✅ frontend/vercel.json           # Frontend config
✅ .vercelignore                  # Ignore file
✅ deploy.sh                      # CLI script
✅ DEPLOY_NOW.md                  # Quick guide ⭐
✅ VERCEL_GITHUB_SETUP.md         # Detailed guide
✅ DEPLOYMENT_CHECKLIST.md        # Checklist
✅ DEPLOYMENT_SUMMARY.md          # Summary
```

## 🔗 Important Links

- **Vercel Dashboard**: https://vercel.com/dashboard
- **MongoDB Atlas**: https://cloud.mongodb.com/
- **GitHub Repo**: HCL-Project-Final

## ⚡ CLI Alternative

```bash
./deploy.sh
```

## 📝 Post-Deployment

1. ✅ Add `FRONTEND_URL` to backend env vars
2. ✅ Redeploy backend
3. ✅ Configure MongoDB Network Access (0.0.0.0/0)
4. ✅ Test the application

## 🆘 Troubleshooting

| Issue              | Solution                             |
| ------------------ | ------------------------------------ |
| CORS error         | Add FRONTEND_URL to backend env vars |
| MongoDB connection | Allow 0.0.0.0/0 in Network Access    |
| Build fails        | Check Vercel logs                    |
| 404 errors         | Check vercel.json routing            |

## 📚 Need More Help?

→ **Start here**: `DEPLOY_NOW.md`
→ **Detailed steps**: `VERCEL_GITHUB_SETUP.md`
→ **Full docs**: `VERCEL_DEPLOYMENT.md`

---

**Your Deployment URLs:**

Backend: **************\_\_\_**************

Frontend: **************\_\_\_**************
