# Raginii Uplopwar - Official Website

<div align="center">

![Build Status](https://img.shields.io/badge/build-passing-brightgreen)
![License](https://img.shields.io/badge/license-MIT-blue)
![PageSpeed](https://img.shields.io/badge/PageSpeed-90%2B-success)
![Deployment](https://img.shields.io/badge/deployment-GitHub%20Pages-blue)

**Master of East-West Fusion Healing | Vastu Consultant | Spiritual Guide**

[Live Website](https://raginiiuplopwar.com) • [Documentation](docs/) • [Deployment Guide](docs/DEPLOYMENT.md)

</div>

---

## 📖 About

Official website for **Raginii Uplopwar** - a renowned Vastu consultant, spiritual guide, and published author with over 20 years of experience transforming lives through East-West fusion healing methods.

### ✨ Features

- 🎨 **Modern, Professional Design** - Clean, elegant interface
- 📱 **Mobile-First Responsive** - Perfect on all devices (320px - 1920px+)
- ⚡ **Blazing Fast** - 90+ PageSpeed score, <2s load time
- 🔒 **Secure** - HTTPS enabled, security headers configured
- ♿ **Accessible** - WCAG compliant, keyboard navigation
- 🌐 **SEO Optimized** - Meta tags, Open Graph, structured data
- 🎭 **Interactive Components** - Neon effects, smooth animations
- 📦 **Optimized Assets** - Minified CSS/JS, lazy-loaded images

---

## 🚀 Live Demo

**Visit**: [https://raginiiuplopwar.com](https://raginiiuplopwar.com)

### Performance Metrics

| Metric | Score | Status |
|--------|-------|--------|
| **Mobile PageSpeed** | 90+ | ✅ Excellent |
| **Desktop PageSpeed** | 95+ | ✅ Excellent |
| **First Contentful Paint** | <1.5s | ✅ Fast |
| **Largest Contentful Paint** | <2.5s | ✅ Fast |
| **Total Blocking Time** | <200ms | ✅ Fast |
| **Cumulative Layout Shift** | <0.1 | ✅ Stable |

---

## 🛠️ Tech Stack

### Frontend
- **HTML5** - Semantic markup
- **CSS3** - Modern styling with CSS variables
- **JavaScript (ES6+)** - Vanilla JS, no frameworks
- **Font Awesome** - Icon library
- **Google Fonts** - Inter & Playfair Display

### Build Tools
- **Node.js** - Build automation
- **Custom Scripts** - CSS/JS minification
- **GitHub Actions** - Auto-deployment

### Hosting & Deployment
- **GitHub Pages** - Static site hosting
- **Custom Domain** - raginiiuplopwar.com
- **Cloudflare DNS** - Fast, secure DNS
- **Free SSL** - HTTPS encryption

---

## 📂 Project Structure

```
raginiiuplopwar/
├── README.md                 # You are here!
├── LICENSE                   # MIT License
├── package.json              # Dependencies & scripts
├── .gitignore               # Git ignore rules
├── .editorconfig            # Code formatting
│
├── .github/                 # GitHub-specific files
│   └── workflows/
│       └── deploy.yml       # Auto-deployment
│
├── docs/                    # Documentation
│   ├── DEPLOYMENT.md        # Deployment guide
│   ├── SETUP.md            # Setup instructions
│   ├── PERFORMANCE.md      # Performance optimization
│   └── CHANGELOG.md        # Version history
│
├── scripts/                 # Build scripts
│   ├── build.js            # Main build script
│   ├── build-production.js # Production minification
│   └── optimize-performance.js # HTML optimization
│
├── components/              # Reusable components
│   ├── navbar.js           # Navigation bar
│   ├── footer.js           # Footer
│   ├── neon-logo.js        # Animated logo
│   └── neon-button.js      # Interactive buttons
│
├── css/                     # Stylesheets
│   └── styles.css          # Main stylesheet
│
├── js/                      # JavaScript
│   └── main.js             # Main application logic
│
├── images/                  # Image assets
│   └── ...
│
├── *.html                   # Page templates
│   ├── index.html          # Homepage
│   ├── about.html          # About page
│   ├── services.html       # Services
│   ├── books.html          # Published books
│   ├── programs.html       # Programs
│   ├── events.html         # Events
│   └── contact.html        # Contact form
│
└── dist/                    # Production build (auto-generated)
```

---

## 🏃 Quick Start

### Prerequisites

- **Node.js** 14+ and npm
- **Git**
- A code editor (VS Code recommended)

### Installation

```bash
# Clone the repository
git clone https://github.com/arvrin/raginiiuplopwar.git

# Navigate to project directory
cd raginiiuplopwar

# Install dependencies
npm install

# Start development server
npm start
```

The site will open at `http://localhost:3000`

---

## 📜 Available Scripts

### Development

```bash
npm start              # Start local development server
```

### Production Build

```bash
npm run build:prod     # Build optimized production files
npm run optimize       # Optimize HTML files only
npm run minify         # Minify CSS/JS only
```

### Deployment

```bash
npm run deploy         # Build and deploy to GitHub Pages
npm run deploy:preview # Deploy preview (Netlify)
```

### Quick Deploy

```bash
./scripts/deploy-github-final.sh   # One-command deployment
```

---

## 🌐 Deployment

The website is automatically deployed to GitHub Pages on every push to the `main` branch.

### Manual Deployment

```bash
# Build production files
npm run build:prod

# Deploy to GitHub Pages
git subtree push --prefix dist origin gh-pages
```

### Automatic Deployment

GitHub Actions automatically:
1. Builds the site on push to `main`
2. Optimizes all assets
3. Deploys to `gh-pages` branch
4. Site goes live in ~30 seconds

See [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md) for detailed instructions.

---

## 📱 Pages

- **Home** (`index.html`) - Landing page with hero section
- **About** (`about.html`) - Biography and expertise
- **Services** (`services.html`) - Healing services offered
- **Books** (`books.html`) - Published works (6 books)
- **Programs** (`programs.html`) - Transformation programs
- **Events** (`events.html`) - Upcoming events and workshops
- **Contact** (`contact.html`) - Contact form and details

---

## 🎨 Key Features

### Neon Logo Effect
Authentic neon sign flickering effect with customizable intensity and timing.

### Interactive Buttons
Hover effects with divine energy glow, supporting multiple color schemes (Rose Gold, Mystic Teal).

### Responsive Navigation
Mobile-first navigation with smooth transitions and dropdown menus.

### Performance Optimized
- Minified CSS (34% size reduction)
- Minified JavaScript (42% size reduction)
- Lazy-loaded images
- Deferred script loading
- Critical CSS inlined
- GZIP compression enabled

### SEO Optimized
- Semantic HTML5
- Meta tags for all pages
- Open Graph tags
- Twitter Card tags
- Structured data (JSON-LD)
- Sitemap and robots.txt

---

## 🔧 Configuration

### Custom Domain

To use your own domain:

1. Update `dist/CNAME` file
2. Configure DNS records (see [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md))
3. Enable HTTPS in GitHub Pages settings

### Build Settings

Edit `package.json` scripts to customize build process:

```json
{
  "scripts": {
    "build:prod": "node scripts/optimize-performance.js && node scripts/build-production.js"
  }
}
```

---

## 📊 Performance Optimization

### Before Optimization
- Mobile PageSpeed: 72
- Total Size: 265KB
- Load Time: ~3.5s

### After Optimization
- Mobile PageSpeed: **90+** ⚡
- Total Size: **54KB** (with GZIP)
- Load Time: **<2s** ⚡

**Improvements:**
- 🔥 **25% faster** load time
- 🔥 **79% smaller** file size
- 🔥 **+18 points** PageSpeed score

See [docs/PERFORMANCE.md](docs/PERFORMANCE.md) for details.

---

## 🤝 Contributing

Contributions are welcome! Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

### Development Workflow

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👤 Author

**Raginii Uplopwar**
- Website: [raginiiuplopwar.com](https://raginiiuplopwar.com)
- Facebook: [@Vastu-Consultant-Ragini-Uplopwar](https://www.facebook.com/p/Vastu-Consultant-Ragini-Uplopwar-100068360500001/)
- Instagram: [@uplopwar.raginii](https://www.instagram.com/uplopwar.raginii/)
- YouTube: [Raginii Uplopwar](https://www.youtube.com/channel/UC68h2GuqkD2kGiysiRlWpvw)

**Website Development**
- Built by: [Freaking Minds](https://freakingminds.in)
- Contact: goodmantechco@gmail.com

---

## 🙏 Acknowledgments

- **Font Awesome** - Icons
- **Google Fonts** - Typography
- **GitHub Pages** - Hosting
- **Netlify** - Preview deployments (legacy)

---

## 📞 Support

For issues or questions:

1. Check [docs/](docs/) for documentation
2. Open an [issue](https://github.com/arvrin/raginiiuplopwar/issues)
3. Contact: goodmantechco@gmail.com

---

## 📈 Project Stats

![GitHub repo size](https://img.shields.io/github/repo-size/arvrin/raginiiuplopwar)
![GitHub last commit](https://img.shields.io/github/last-commit/arvrin/raginiiuplopwar)
![GitHub issues](https://img.shields.io/github/issues/arvrin/raginiiuplopwar)

---

<div align="center">

**Made with ❤️ for spiritual transformation and holistic healing**

⭐ Star this repo if you find it useful!

[Report Bug](https://github.com/arvrin/raginiiuplopwar/issues) • [Request Feature](https://github.com/arvrin/raginiiuplopwar/issues)

</div>
