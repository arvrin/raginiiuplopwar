#!/usr/bin/env node

/**
 * Performance Optimization Script
 * Adds critical performance optimizations to HTML files
 */

const fs = require('fs');
const path = require('path');

function optimizeHTML(filePath) {
    let html = fs.readFileSync(filePath, 'utf8');
    let modified = false;

    // 1. Add preconnect for external resources
    if (!html.includes('rel="preconnect"')) {
        const preconnects = `
    <!-- Preconnect to external domains -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link rel="preconnect" href="https://cdnjs.cloudflare.com">
    <link rel="dns-prefetch" href="https://www.googletagmanager.com">`;

        html = html.replace(/<head>/i, `<head>${preconnects}`);
        modified = true;
    }

    // 2. Add font-display:swap to Google Fonts
    html = html.replace(/family=([^"&]+)/g, (match) => {
        if (!match.includes('display=swap')) {
            return match + '&display=swap';
        }
        return match;
    });

    // 3. Add async/defer to non-critical scripts
    html = html.replace(/<script src="js\/main\.js"><\/script>/g,
        '<script src="js/main.js" defer></script>');

    html = html.replace(/<script src="components\/([^"]+)"><\/script>/g,
        '<script src="components/$1" defer></script>');

    // 4. Add lazy loading to images (if not already present)
    html = html.replace(/<img ([^>]*?)src="images\/(?!logo|og-image)([^"]+)"([^>]*)>/gi, (match, before, imagePath, after) => {
        if (!match.includes('loading=')) {
            return `<img ${before}src="images/${imagePath}"${after} loading="lazy">`;
        }
        return match;
    });

    // 5. Add meta tags for performance
    if (!html.includes('theme-color')) {
        const metaTags = `
    <!-- Performance & PWA -->
    <meta name="theme-color" content="#0d7377">
    <meta name="mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">`;

        html = html.replace(/<\/head>/i, `${metaTags}\n    </head>`);
        modified = true;
    }

    // 6. Add critical CSS inline (for above-the-fold content)
    const criticalCSS = `
    <style>
        /* Critical CSS - Above the fold */
        *{margin:0;padding:0;box-sizing:border-box}
        body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;-webkit-font-smoothing:antialiased}
        .navbar-professional{position:fixed;top:0;left:0;right:0;z-index:1000;background:rgba(13,115,119,.95);backdrop-filter:blur(20px)}
        .container{max-width:1200px;margin:0 auto;padding:0 1.5rem}
    </style>`;

    if (!html.includes('/* Critical CSS')) {
        html = html.replace(/<\/head>/i, `${criticalCSS}\n    </head>`);
        modified = true;
    }

    // Write back if modified
    if (modified) {
        fs.writeFileSync(filePath, html, 'utf8');
        return true;
    }
    return false;
}

// Main execution
console.log('\n⚡ Optimizing HTML files for performance...\n');

const rootDir = __dirname;
const htmlFiles = fs.readdirSync(rootDir).filter(f => f.endsWith('.html'));

let optimizedCount = 0;

htmlFiles.forEach(file => {
    const filePath = path.join(rootDir, file);
    const wasModified = optimizeHTML(filePath);

    if (wasModified) {
        console.log(`  ✓ Optimized: ${file}`);
        optimizedCount++;
    } else {
        console.log(`  ○ Already optimized: ${file}`);
    }
});

console.log(`\n✨ Performance optimization complete!`);
console.log(`   Files optimized: ${optimizedCount}/${htmlFiles.length}\n`);

// Create .htaccess for Apache servers (if needed)
const htaccessContent = `# Enable GZIP compression
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css text/javascript application/javascript application/json
</IfModule>

# Browser caching
<IfModule mod_expires.c>
    ExpiresActive On
    ExpiresByType image/jpg "access plus 1 year"
    ExpiresByType image/jpeg "access plus 1 year"
    ExpiresByType image/gif "access plus 1 year"
    ExpiresByType image/png "access plus 1 year"
    ExpiresByType image/webp "access plus 1 year"
    ExpiresByType text/css "access plus 1 month"
    ExpiresByType application/javascript "access plus 1 month"
    ExpiresByType application/pdf "access plus 1 month"
    ExpiresByType image/x-icon "access plus 1 year"
</IfModule>

# Security headers
<IfModule mod_headers.c>
    Header set X-Content-Type-Options "nosniff"
    Header set X-Frame-Options "SAMEORIGIN"
    Header set X-XSS-Protection "1; mode=block"
    Header set Referrer-Policy "no-referrer-when-downgrade"
</IfModule>`;

fs.writeFileSync(path.join(rootDir, '.htaccess'), htaccessContent, 'utf8');
console.log('📄 Created .htaccess for server optimizations\n');
