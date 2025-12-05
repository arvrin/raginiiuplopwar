# Changelog - Raginii Uplopwar Website

All notable changes to this project will be documented in this file.

---

## [1.6.0] - 2025-12-04

### Added
- **Observatory Analytics Integration**
  - Added Observatory tracking script to all HTML pages
  - Script: `https://observatory.goodmantech.co/api/pixel/d9e4f15f`
  - Tracks: page views, referrers, Core Web Vitals (LCP, FID, CLS), page load performance, JavaScript errors, scroll depth, clicks, time on page
  - Files updated:
    - `index.html`
    - `about.html`
    - `services.html`
    - `books.html`
    - `contact.html`
    - `programs.html`
    - `events.html`
    - `event-meditation-program.html`

### Fixed
- **About Page Mobile Responsiveness**
  - Fixed "Areas of Expertise" section cards overflowing on mobile devices
  - Replaced inline styles with proper CSS classes for better maintainability
  - Added responsive breakpoints:
    - Desktop (>1024px): 3-column grid
    - Tablet (768-1024px): 2-column grid
    - Mobile (<768px): Single column stack
    - Extra small (<480px): Compact padding and font sizes
  - New CSS classes added: `.expertise-section`, `.expertise-grid`, `.expertise-card`, `.expertise-card-title`, `.expertise-list`

### Changed
- **Build Script Fix**
  - Fixed `scripts/build.js` source directory path (was pointing to scripts folder instead of parent)
  - Changed `sourceDir` from `__dirname` to `path.join(__dirname, '..')`

### Deployment
- **Platform**: Netlify
- **Account**: Goodman Tech (goodmantechco@gmail.com)
- **Site**: eloquent-palmier-69f096
- **URL**: https://raginiiuplopwar.com
- **Deploy ID**: 69318c24e8aec70d2c540ebb

---

## Build Statistics (2025-12-04)

| File Type | Original | Minified | Savings |
|-----------|----------|----------|---------|
| **JavaScript** |
| js/main.js | 31.5 KB | 14.9 KB | 52.9% |
| components/navbar.js | 9.6 KB | 5.5 KB | 42.4% |
| components/footer.js | 7.5 KB | 4.9 KB | 34.2% |
| components/neon-button.js | 6.4 KB | 3 KB | 53.9% |
| components/neon-logo.js | 11.6 KB | 8.2 KB | 29.6% |
| **CSS** |
| css/styles.css | 54.2 KB | 34.4 KB | 36.5% |
| components/neon-button.css | 4.2 KB | 2.7 KB | 36.2% |
| components/neon-logo.css | 8 KB | 4.5 KB | 44.2% |
| **HTML** |
| index.html | 17.7 KB | 13.4 KB | 24.3% |
| about.html | 10.7 KB | 8 KB | 25.4% |
| services.html | 24.7 KB | 17.9 KB | 27.3% |
| books.html | 17.6 KB | 13.4 KB | 23.6% |
| programs.html | 23.6 KB | 16.5 KB | 30.0% |
| events.html | 22.6 KB | 16.1 KB | 28.6% |
| event-meditation-program.html | 16.5 KB | 11.1 KB | 32.5% |
| contact.html | 6.8 KB | 5.4 KB | 20.8% |

---

## Tech Stack

- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Fonts**: Google Fonts (Inter, Playfair Display)
- **Icons**: Font Awesome 6.4
- **Build Tools**: Terser, cssnano, PostCSS, html-minifier-terser
- **Hosting**: Netlify
- **Analytics**: Observatory (goodmantech.co)
