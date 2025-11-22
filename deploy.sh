#!/bin/bash

echo "🚀 Healthcare Portal - Vercel Deployment Script"
echo "================================================"
echo ""

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null
then
    echo "❌ Vercel CLI is not installed."
    echo "📦 Installing Vercel CLI..."
    npm install -g vercel
fi

echo "✅ Vercel CLI is ready"
echo ""

# Login to Vercel
echo "🔐 Logging in to Vercel..."
vercel login

echo ""
echo "Choose deployment option:"
echo "1. Deploy Backend only"
echo "2. Deploy Frontend only"
echo "3. Deploy Both (Recommended)"
echo ""
read -p "Enter your choice (1-3): " choice

case $choice in
  1)
    echo ""
    echo "📦 Deploying Backend..."
    cd backend
    vercel --prod
    cd ..
    echo "✅ Backend deployed!"
    ;;
  2)
    echo ""
    echo "📦 Deploying Frontend..."
    cd frontend
    vercel --prod
    cd ..
    echo "✅ Frontend deployed!"
    ;;
  3)
    echo ""
    echo "📦 Deploying Backend..."
    cd backend
    vercel --prod
    BACKEND_URL=$(vercel ls --prod | grep -o 'https://[^ ]*' | head -1)
    cd ..

    echo ""
    echo "✅ Backend deployed at: $BACKEND_URL"
    echo ""
    echo "⚠️  IMPORTANT: Update frontend/.env.production with:"
    echo "VITE_API_URL=$BACKEND_URL/api"
    echo ""
    read -p "Press Enter after updating the environment variable..."

    echo ""
    echo "📦 Deploying Frontend..."
    cd frontend
    vercel --prod
    FRONTEND_URL=$(vercel ls --prod | grep -o 'https://[^ ]*' | head -1)
    cd ..

    echo ""
    echo "✅ Frontend deployed at: $FRONTEND_URL"
    echo ""
    echo "⚠️  IMPORTANT: Update backend environment variables in Vercel dashboard:"
    echo "FRONTEND_URL=$FRONTEND_URL"
    ;;
  *)
    echo "❌ Invalid choice"
    exit 1
    ;;
esac

echo ""
echo "================================================"
echo "🎉 Deployment Complete!"
echo "================================================"
echo ""
echo "📝 Next Steps:"
echo "1. Go to Vercel Dashboard: https://vercel.com/dashboard"
echo "2. Configure environment variables for both projects"
echo "3. Test your deployed applications"
echo ""
echo "📚 For detailed instructions, see VERCEL_DEPLOYMENT.md"
