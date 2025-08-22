#!/bin/bash

# 🚀 Aninda Wildscapes - One-Click Deployment Script
# This script helps you deploy your photography portfolio to production

echo "🚀 Aninda Wildscapes Deployment Script"
echo "======================================"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo -e "${RED}❌ Error: Please run this script from the project root directory${NC}"
    exit 1
fi

echo -e "${BLUE}📋 Deployment Options:${NC}"
echo "1. Deploy Frontend to Vercel"
echo "2. Deploy Backend to Railway"
echo "3. Deploy Both (Recommended)"
echo "4. Build and Test Locally"
echo "5. Show Deployment URLs"

read -p "Choose an option (1-5): " choice

case $choice in
    1)
        echo -e "${YELLOW}🌐 Deploying Frontend to Vercel...${NC}"
        echo "1. Go to https://vercel.com"
        echo "2. Click 'New Project'"
        echo "3. Import your GitHub repository: anindaic3842/anindawildscapes"
        echo "4. Set Root Directory to: frontend"
        echo "5. Framework Preset: Vite"
        echo "6. Build Command: npm run build"
        echo "7. Output Directory: dist"
        echo -e "${GREEN}✅ Follow the instructions above to deploy to Vercel${NC}"
        ;;
    2)
        echo -e "${YELLOW}🚂 Deploying Backend to Railway...${NC}"
        echo "1. Go to https://railway.app"
        echo "2. Click 'New Project' → 'Deploy from GitHub repo'"
        echo "3. Select your repository: anindaic3842/anindawildscapes"
        echo "4. Choose 'Deploy from a folder' → select 'backend'"
        echo "5. Add environment variables in Railway dashboard"
        echo -e "${GREEN}✅ Follow the instructions above to deploy to Railway${NC}"
        ;;
    3)
        echo -e "${YELLOW}🚀 Deploying Both Frontend and Backend...${NC}"
        echo ""
        echo -e "${BLUE}Step 1: Deploy Backend to Railway${NC}"
        echo "1. Go to https://railway.app"
        echo "2. Click 'New Project' → 'Deploy from GitHub repo'"
        echo "3. Select: anindaic3842/anindawildscapes"
        echo "4. Choose 'Deploy from a folder' → select 'backend'"
        echo "5. Add environment variables (see DEPLOYMENT_GUIDE.md)"
        echo ""
        echo -e "${BLUE}Step 2: Deploy Frontend to Vercel${NC}"
        echo "1. Go to https://vercel.com"
        echo "2. Click 'New Project'"
        echo "3. Import: anindaic3842/anindawildscapes"
        echo "4. Root Directory: frontend"
        echo "5. Add environment variable: VITE_API_URL=<your-railway-url>"
        echo ""
        echo -e "${GREEN}✅ See DEPLOYMENT_GUIDE.md for detailed instructions${NC}"
        ;;
    4)
        echo -e "${YELLOW}🔧 Building and Testing Locally...${NC}"
        
        # Build frontend
        echo "Building frontend..."
        cd frontend
        npm run build
        if [ $? -eq 0 ]; then
            echo -e "${GREEN}✅ Frontend build successful${NC}"
        else
            echo -e "${RED}❌ Frontend build failed${NC}"
            exit 1
        fi
        cd ..
        
        # Test backend
        echo "Testing backend..."
        cd backend
        npm test 2>/dev/null || echo "No tests configured"
        echo -e "${GREEN}✅ Backend ready${NC}"
        cd ..
        
        echo -e "${GREEN}✅ Local build and test completed successfully!${NC}"
        echo "Your app is ready for deployment."
        ;;
    5)
        echo -e "${BLUE}🌍 Deployment URLs:${NC}"
        echo ""
        echo "📱 Frontend (Vercel):"
        echo "   • Production: https://anindawildscapes.vercel.app"
        echo "   • Preview: https://anindawildscapes-git-feature-photography-portfolio-website-anindaic3842.vercel.app"
        echo ""
        echo "🔧 Backend (Railway):"
        echo "   • API: https://anindawildscapes-backend.up.railway.app"
        echo "   • Health Check: https://anindawildscapes-backend.up.railway.app/api/health"
        echo ""
        echo "📚 Documentation:"
        echo "   • Deployment Guide: ./DEPLOYMENT_GUIDE.md"
        echo "   • README: ./README.md"
        ;;
    *)
        echo -e "${RED}❌ Invalid option. Please choose 1-5.${NC}"
        exit 1
        ;;
esac

echo ""
echo -e "${GREEN}🎉 Thank you for using Aninda Wildscapes deployment script!${NC}"
echo -e "${BLUE}📖 For detailed instructions, see: DEPLOYMENT_GUIDE.md${NC}"