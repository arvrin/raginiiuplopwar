#!/bin/bash

# Complete GitHub Pages Setup Script
# Run this AFTER creating your GitHub repository

echo "╔════════════════════════════════════════════════════════╗"
echo "║   GitHub Pages - Complete Setup & Deployment          ║"
echo "╚════════════════════════════════════════════════════════╝"
echo ""

# Step 1: Get GitHub username
echo "📝 Step 1: GitHub Repository Setup"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
read -p "Enter your GitHub username: " GITHUB_USERNAME

if [ -z "$GITHUB_USERNAME" ]; then
    echo "❌ GitHub username is required!"
    exit 1
fi

echo ""
echo "✅ GitHub username: $GITHUB_USERNAME"
echo ""

# Step 2: Check if repo exists
echo "🔍 Step 2: Checking if repository needs to be created"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "Please create a repository on GitHub:"
echo ""
echo "  1. Go to: https://github.com/new"
echo "  2. Repository name: raginiiuplopwar"
echo "  3. Make it PUBLIC (required for free GitHub Pages)"
echo "  4. DO NOT check any boxes (README, .gitignore, etc.)"
echo "  5. Click 'Create repository'"
echo ""
read -p "Have you created the repository? (y/n): " REPO_CREATED

if [ "$REPO_CREATED" != "y" ]; then
    echo ""
    echo "⏸️  Setup paused. Run this script again after creating the repo."
    exit 0
fi

# Step 3: Add GitHub remote
echo ""
echo "🔗 Step 3: Connecting to GitHub"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Remove existing origin if it exists
git remote remove origin 2>/dev/null

# Add new origin
REPO_URL="https://github.com/$GITHUB_USERNAME/raginiiuplopwar.git"
git remote add origin $REPO_URL

if [ $? -eq 0 ]; then
    echo "✅ Connected to: $REPO_URL"
else
    echo "❌ Failed to add remote. Please check your GitHub username."
    exit 1
fi

# Step 4: Push to main branch
echo ""
echo "⬆️  Step 4: Pushing code to GitHub"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

git push -u origin main

if [ $? -ne 0 ]; then
    echo ""
    echo "❌ Failed to push. You may need to authenticate with GitHub."
    echo ""
    echo "Try one of these:"
    echo "  1. Use HTTPS with your GitHub username and Personal Access Token"
    echo "  2. Set up SSH keys: https://docs.github.com/en/authentication/connecting-to-github-with-ssh"
    echo ""
    exit 1
fi

echo ""
echo "✅ Code pushed to main branch"

# Step 5: Deploy to GitHub Pages
echo ""
echo "🌐 Step 5: Deploying to GitHub Pages"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

git subtree push --prefix dist origin gh-pages

if [ $? -ne 0 ]; then
    echo ""
    echo "❌ Deployment failed."
    echo ""
    echo "This might be the first deployment. Try this manual approach:"
    echo ""
    echo "  git subtree split --prefix dist -b gh-pages"
    echo "  git push -f origin gh-pages:gh-pages"
    echo "  git branch -D gh-pages"
    echo ""
    exit 1
fi

# Step 6: Configure GitHub Pages
echo ""
echo "⚙️  Step 6: Configure GitHub Pages"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "Now configure GitHub Pages in your repository:"
echo ""
echo "  1. Go to: https://github.com/$GITHUB_USERNAME/raginiiuplopwar/settings/pages"
echo "  2. Under 'Source':"
echo "     - Branch: gh-pages"
echo "     - Folder: / (root)"
echo "     - Click 'Save'"
echo "  3. Under 'Custom domain':"
echo "     - Enter: raginiiuplopwar.com"
echo "     - Click 'Save'"
echo "  4. Check 'Enforce HTTPS' (after DNS propagates)"
echo ""
read -p "Press Enter when you've completed GitHub Pages configuration..."

# Step 7: DNS Configuration
echo ""
echo "🌐 Step 7: DNS Configuration"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "Update your domain DNS records:"
echo ""
echo "A Records (delete old Netlify records first):"
echo "  Type: A, Name: @, Value: 185.199.108.153"
echo "  Type: A, Name: @, Value: 185.199.109.153"
echo "  Type: A, Name: @, Value: 185.199.110.153"
echo "  Type: A, Name: @, Value: 185.199.111.153"
echo ""
echo "CNAME Record:"
echo "  Type: CNAME, Name: www, Value: $GITHUB_USERNAME.github.io"
echo ""
echo "Save these changes in your domain registrar."
echo ""
read -p "Press Enter when you've updated DNS records..."

# Success!
echo ""
echo "╔════════════════════════════════════════════════════════╗"
echo "║              🎉 SETUP COMPLETE! 🎉                     ║"
echo "╚════════════════════════════════════════════════════════╝"
echo ""
echo "✅ Repository created and configured"
echo "✅ Code pushed to GitHub"
echo "✅ Deployed to GitHub Pages"
echo "✅ DNS configuration instructions provided"
echo ""
echo "📍 Your site will be live at:"
echo "   https://raginiiuplopwar.com"
echo ""
echo "⏰ Wait 20-30 minutes for DNS propagation"
echo ""
echo "🔄 Future deployments:"
echo "   ./deploy-github-final.sh"
echo ""
echo "📊 Check deployment status:"
echo "   https://github.com/$GITHUB_USERNAME/raginiiuplopwar/settings/pages"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
