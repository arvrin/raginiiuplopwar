#!/usr/bin/env node

/**
 * Script to add SEO meta tags to remaining HTML files
 */

const fs = require('fs');
const path = require('path');

const pages = {
    'services.html': {
        title: 'Services - Vastu, Energy Healing & Life Transformation | Raginii Uplopwar',
        description: 'Professional Vastu consultation, energy healing, life transformation, and business harmony services. Combining traditional Indian wisdom with modern Western methods.',
        url: 'https://raginiiuplopwar.com/services.html'
    },
    'events.html': {
        title: 'Upcoming Events & Programs | Raginii Uplopwar',
        description: 'Join Raginii Uplopwar for transformative meditation programs, healing workshops, and spiritual events. Online and in-person sessions available.',
        url: 'https://raginiiuplopwar.com/events.html'
    },
    'contact.html': {
        title: 'Contact Raginii Uplopwar - Book Your Consultation',
        description: 'Get in touch with Raginii Uplopwar for professional Vastu consultation, energy healing, and spiritual guidance. Book your free consultation today.',
        url: 'https://raginiiuplopwar.com/contact.html'
    },
    'books.html': {
        title: 'Books by Raginii Uplopwar - Healing & Transformation',
        description: 'Explore published books by Raginii Uplopwar on Vastu, energy healing, spiritual guidance, and life transformation through East-West fusion methods.',
        url: 'https://raginiiuplopwar.com/books.html'
    },
    'programs.html': {
        title: 'Programs & Courses | Raginii Uplopwar',
        description: 'Join transformative programs and courses by Raginii Uplopwar. Learn Vastu, energy healing, meditation, and spiritual practices for complete life transformation.',
        url: 'https://raginiiuplopwar.com/programs.html'
    }
};

function addMetaTags(filename, pageData) {
    const filePath = path.join(__dirname, filename);

    if (!fs.existsSync(filePath)) {
        console.log(`⚠️  ${filename} not found, skipping...`);
        return;
    }

    let html = fs.readFileSync(filePath, 'utf8');

    // Check if meta tags already exist
    if (html.includes('og:title')) {
        console.log(`✅ ${filename} already has meta tags`);
        return;
    }

    const metaTags = `
    <meta name="description" content="${pageData.description}">

    <!-- Canonical URL -->
    <link rel="canonical" href="${pageData.url}">

    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="website">
    <meta property="og:url" content="${pageData.url}">
    <meta property="og:title" content="${pageData.title}">
    <meta property="og:description" content="${pageData.description}">
    <meta property="og:image" content="https://raginiiuplopwar.com/images/og-image.jpg">

    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${pageData.title}">
    <meta name="twitter:description" content="${pageData.description}">
    <meta name="twitter:image" content="https://raginiiuplopwar.com/images/og-image.jpg">
`;

    // Find the title tag and insert meta tags after it
    const titleRegex = /(<title>.*?<\/title>)/;
    if (titleRegex.test(html)) {
        html = html.replace(titleRegex, `$1${metaTags}`);
        fs.writeFileSync(filePath, html, 'utf8');
        console.log(`✅ Added meta tags to ${filename}`);
    } else {
        console.log(`❌ Could not find <title> tag in ${filename}`);
    }
}

console.log('🚀 Adding SEO meta tags to HTML files...\n');

Object.entries(pages).forEach(([filename, pageData]) => {
    addMetaTags(filename, pageData);
});

console.log('\n✨ Meta tags update complete!');
