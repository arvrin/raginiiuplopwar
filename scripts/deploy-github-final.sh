#!/bin/bash

echo "🚀 GitHub Pages Deployment Script"
echo "=================================="
echo ""

# Check if GitHub remote exists
if ! git remote get-url origin > /dev/null 2>&1; then
    echo "❌ GitHub remote not configured yet!"
    echo ""
    echo "Please run these commands first:"
    echo ""
    echo "git remote add origin https://github.com/YOUR-USERNAME/raginiiuplopwar.git"
    echo "git push -u origin main"
    echo ""
    echo "Replace YOUR-USERNAME with your actual GitHub username."
    exit 1
fi

echo "✅ GitHub remote found"
echo ""

# Build production files
echo "📦 Building production files..."
npm run build:prod

if [ $? -ne 0 ]; then
    echo "❌ Build failed!"
    exit 1
fi

echo ""
echo "✅ Build complete"
echo ""

# Commit any changes
echo "💾 Committing changes..."
git add .
git commit -m "Update: $(date '+%Y-%m-%d %H:%M')" || echo "No changes to commit"
git push origin main

echo ""
echo "✅ Pushed to main branch"
echo ""

# Deploy to GitHub Pages
echo "🌐 Deploying to GitHub Pages..."
git subtree push --prefix dist origin gh-pages

if [ $? -eq 0 ]; then
    echo ""
    echo "════════════════════════════════════════"
    echo "✨ Deployment Complete!"
    echo "════════════════════════════════════════"
    echo ""
    echo "📍 Your site will be live at:"
    echo "   https://raginiiuplopwar.com"
    echo ""
    echo "⏰ Wait 1-2 minutes for changes to appear"
    echo ""
    echo "🔍 Check deployment status:"
    echo "   GitHub repo → Settings → Pages"
    echo ""
else
    echo ""
    echo "❌ Deployment failed!"
    echo "Check the error message above."
fi
