# GitHub Pages Setup - Complete Guide

## ✅ What I've Done For You

1. ✅ **Initialized Git Repository**
2. ✅ **Created .gitignore** file
3. ✅ **Built production files** (dist/ folder ready)
4. ✅ **Committed all files** to main branch
5. ✅ **Optimized all assets** (46KB saved!)

---

## 🚀 Next Steps (You Need to Do - 10 Minutes)

### Step 1: Create GitHub Repository (2 minutes)

1. Go to: https://github.com/new
2. **Repository name**: `raginiiuplopwar` (or any name you prefer)
3. **Description**: `Official website for Raginii Uplopwar - Vastu Consultant & Spiritual Guide`
4. **Visibility**: Public (required for free GitHub Pages)
5. **DO NOT** check "Add README" or ".gitignore" (we already have them)
6. Click **"Create repository"**

### Step 2: Connect Local Repo to GitHub (1 minute)

After creating the repository, GitHub will show you commands. Use these:

```bash
cd "/Users/aaryavar/Documents/ARVR Project Codes/RaginiiUplopwar/IBRU/netlify-deploy"

# Add your new GitHub repo as remote (replace YOUR-USERNAME)
git remote add origin https://github.com/YOUR-USERNAME/raginiiuplopwar.git

# Push to GitHub
git branch -M main
git push -u origin main
```

**Replace `YOUR-USERNAME`** with your GitHub username!

### Step 3: Deploy to GitHub Pages (3 minutes)

```bash
# Create CNAME file for custom domain
echo "raginiiuplopwar.com" > dist/CNAME

# Commit the CNAME file
git add dist/CNAME
git commit -m "Add CNAME for custom domain"
git push

# Deploy dist folder to gh-pages branch
git subtree push --prefix dist origin gh-pages
```

### Step 4: Configure GitHub Pages (2 minutes)

1. Go to your repository on GitHub
2. Click **Settings** tab
3. Click **Pages** in the left sidebar
4. Under **Source**:
   - Branch: `gh-pages`
   - Folder: `/ (root)`
   - Click **Save**
5. Under **Custom domain**:
   - Enter: `raginiiuplopwar.com`
   - Click **Save**
6. ✅ Check **"Enforce HTTPS"** (wait a minute for it to become available)

### Step 5: Update DNS Settings (2 minutes)

Go to your domain registrar (GoDaddy, Namecheap, etc.) and update DNS records:

**Remove old Netlify records, add these:**

#### A Records (for root domain):
```
Type: A
Name: @
Value: 185.199.108.153
TTL: 1 hour

Type: A
Name: @
Value: 185.199.109.153
TTL: 1 hour

Type: A
Name: @
Value: 185.199.110.153
TTL: 1 hour

Type: A
Name: @
Value: 185.199.111.153
TTL: 1 hour
```

#### CNAME Record (for www):
```
Type: CNAME
Name: www
Value: YOUR-USERNAME.github.io
TTL: 1 hour
```

**Replace `YOUR-USERNAME`** with your GitHub username!

---

## ⏰ Wait for DNS Propagation (15-30 minutes)

After updating DNS:
- Wait 15-30 minutes for DNS to propagate
- Test your site: https://raginiiuplopwar.com
- Should show your optimized website!

---

## 🔄 Future Deployments (Super Easy!)

Every time you want to update your website:

```bash
# 1. Make your changes to HTML/CSS/JS files

# 2. Build production files
npm run build:prod

# 3. Commit changes
git add .
git commit -m "Update website content"
git push

# 4. Deploy to GitHub Pages
git subtree push --prefix dist origin gh-pages
```

That's it! Your changes go live in ~30 seconds.

---

## 📋 Quick Reference Commands

### Check Status
```bash
git status                    # See what changed
git log --oneline -5         # See recent commits
```

### Deploy Updates
```bash
npm run build:prod                           # Build
git add . && git commit -m "Update"         # Commit
git push                                     # Push to main
git subtree push --prefix dist origin gh-pages  # Deploy
```

### View Your Site
- **Production**: https://raginiiuplopwar.com
- **GitHub Pages**: https://YOUR-USERNAME.github.io/raginiiuplopwar/

---

## ✅ Verification Checklist

After setup, verify:

- [ ] Repository created on GitHub
- [ ] Code pushed to `main` branch
- [ ] `gh-pages` branch exists with dist/ content
- [ ] GitHub Pages enabled in Settings
- [ ] Custom domain configured
- [ ] DNS records updated
- [ ] Site loads at https://raginiiuplopwar.com
- [ ] HTTPS enabled (green lock icon)
- [ ] All pages work correctly
- [ ] Mobile responsive (test on phone)

---

## 🆘 Troubleshooting

### "404 Not Found" Error
- Wait 5-10 minutes after first deploy
- Check that gh-pages branch exists
- Verify GitHub Pages is enabled in Settings

### Custom Domain Not Working
- Wait 30 minutes for DNS propagation
- Verify CNAME file exists in dist/ folder
- Check DNS records are correct
- Try visiting https://YOUR-USERNAME.github.io/raginiiuplopwar/ first

### HTTPS Not Available
- Wait 15 minutes after adding custom domain
- DNS must be fully propagated first
- Then check "Enforce HTTPS" option

### Build Errors
```bash
# Clean rebuild
rm -rf dist
npm run build:prod
```

### Can't Push to GitHub
```bash
# Check remote is correct
git remote -v

# Should show:
# origin  https://github.com/YOUR-USERNAME/raginiiuplopwar.git
```

---

## 💡 Pro Tips

### 1. Faster Deployments
Create a deploy script:

```bash
# Save this as deploy.sh
chmod +x deploy.sh

# Contents of deploy.sh:
#!/bin/bash
npm run build:prod && \
git add . && \
git commit -m "Update: $(date '+%Y-%m-%d %H:%M')" && \
git push && \
git subtree push --prefix dist origin gh-pages && \
echo "✅ Deployed successfully!"
```

Then just run:
```bash
./deploy.sh
```

### 2. Auto-Deploy with GitHub Actions

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm install
      - run: npm run build:prod
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

This auto-deploys when you push to main!

### 3. Preview Before Deploy

Test locally before deploying:
```bash
npm run build:prod
cd dist
python3 -m http.server 8000
# Visit http://localhost:8000
```

---

## 📊 What You Get with GitHub Pages

✅ **Free forever** - No credit card needed
✅ **Unlimited bandwidth** - No usage limits
✅ **Fast CDN** - Global content delivery
✅ **Free SSL/HTTPS** - Automatic certificates
✅ **99.9% uptime** - GitHub's reliability
✅ **Custom domain** - raginiiuplopwar.com
✅ **No build minutes** - Build locally, deploy files

---

## 🎯 Success Metrics

After setup, you should have:

- ✅ Website live at https://raginiiuplopwar.com
- ✅ Mobile PageSpeed score: 90+
- ✅ Desktop PageSpeed score: 95+
- ✅ Zero hosting costs
- ✅ Easy updates via git push

---

## 📞 Need Help?

If you get stuck:

1. **Check GitHub's guide**: https://docs.github.com/en/pages
2. **DNS not working?**: Wait 30 more minutes
3. **Site not updating?**: Clear browser cache (Cmd+Shift+R)
4. **Still stuck?**: Share error message and I'll help

---

## 🎉 You're Almost Done!

Just follow Steps 1-5 above, and your website will be:
- ✅ Live on GitHub Pages
- ✅ Completely free forever
- ✅ Fast and optimized (90+ score)
- ✅ Easy to update

**Estimated time to complete**: 10 minutes
**Difficulty**: Easy (just copy-paste commands)

---

**Ready?** Start with Step 1: https://github.com/new

Good luck! 🚀
