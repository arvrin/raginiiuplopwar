#!/bin/bash

# GitHub Pages Deployment Script
# Completely free hosting alternative to Netlify

echo "🚀 Deploying to GitHub Pages..."

# Build production files
echo "📦 Building production files..."
npm run build:prod

# Initialize git if not already
if [ ! -d .git ]; then
    echo "📂 Initializing git repository..."
    git init
    git add .
    git commit -m "Initial commit"
fi

# Add GitHub remote (replace with your repo URL)
echo "🔗 Setting up GitHub remote..."
# git remote add origin https://github.com/yourusername/raginiiuplopwar.git

# Deploy dist folder to gh-pages branch
echo "🌐 Deploying to GitHub Pages..."
git subtree push --prefix dist origin gh-pages

echo "✅ Deployment complete!"
echo "📍 Your site will be live at: https://yourusername.github.io/raginiiuplopwar/"
echo ""
echo "Note: Configure custom domain in GitHub repo settings"
