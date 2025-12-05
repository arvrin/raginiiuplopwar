#!/usr/bin/env node

/**
 * Production Build Script - Minifies JS, CSS, and HTML
 * Creates optimized production-ready files
 */

const fs = require('fs');
const path = require('path');
const { minify } = require('terser');
const postcss = require('postcss');
const cssnano = require('cssnano');
const { minify: minifyHtml } = require('html-minifier-terser');

// Build configuration
const config = {
  sourceDir: path.join(__dirname, '..'),
  distDir: path.join(__dirname, '..', 'dist'),

  // Files to process
  jsFiles: [
    'js/main.js',
    'components/navbar.js',
    'components/footer.js',
    'components/neon-button.js',
    'components/neon-logo.js'
  ],

  cssFiles: [
    'css/styles.css',
    'components/neon-button.css',
    'components/neon-logo.css'
  ],

  htmlFiles: [
    'index.html',
    'about.html',
    'services.html',
    'books.html',
    'programs.html',
    'events.html',
    'event-meditation-program.html',
    'contact.html'
  ]
};

// Ensure dist directory exists
if (!fs.existsSync(config.distDir)) {
  fs.mkdirSync(config.distDir, { recursive: true });
}

console.log('🚀 Starting production build...\n');

// ============================================================================
// JavaScript Minification
// ============================================================================
async function minifyJavaScript() {
  console.log('📦 Minifying JavaScript files...');

  for (const jsFile of config.jsFiles) {
    const sourcePath = path.join(config.sourceDir, jsFile);
    const distPath = path.join(config.distDir, jsFile);

    if (!fs.existsSync(sourcePath)) {
      console.log(`   ⚠️  Skipping ${jsFile} (not found)`);
      continue;
    }

    // Ensure output directory exists
    const distDirPath = path.dirname(distPath);
    if (!fs.existsSync(distDirPath)) {
      fs.mkdirSync(distDirPath, { recursive: true });
    }

    const code = fs.readFileSync(sourcePath, 'utf8');

    try {
      const result = await minify(code, {
        compress: {
          dead_code: true,
          drop_console: false, // Keep console.error for debugging
          drop_debugger: true,
          passes: 2
        },
        mangle: {
          toplevel: false  // Don't mangle top-level to avoid conflicts
        },
        format: {
          comments: false
        },
        sourceMap: {
          filename: path.basename(jsFile),
          url: path.basename(jsFile) + '.map'
        }
      });

      // Write minified file
      fs.writeFileSync(distPath, result.code, 'utf8');

      // Write source map
      if (result.map) {
        fs.writeFileSync(distPath + '.map', result.map, 'utf8');
      }

      const originalSize = Buffer.byteLength(code, 'utf8');
      const minifiedSize = Buffer.byteLength(result.code, 'utf8');
      const savings = ((1 - minifiedSize / originalSize) * 100).toFixed(1);

      console.log(`   ✅ ${jsFile}: ${formatBytes(originalSize)} → ${formatBytes(minifiedSize)} (${savings}% smaller)`);
    } catch (error) {
      console.error(`   ❌ Error minifying ${jsFile}:`, error.message);
    }
  }
  console.log('');
}

// ============================================================================
// CSS Minification
// ============================================================================
async function minifyCSS() {
  console.log('🎨 Minifying CSS files...');

  for (const cssFile of config.cssFiles) {
    const sourcePath = path.join(config.sourceDir, cssFile);
    const distPath = path.join(config.distDir, cssFile);

    if (!fs.existsSync(sourcePath)) {
      console.log(`   ⚠️  Skipping ${cssFile} (not found)`);
      continue;
    }

    // Ensure output directory exists
    const distDirPath = path.dirname(distPath);
    if (!fs.existsSync(distDirPath)) {
      fs.mkdirSync(distDirPath, { recursive: true });
    }

    const css = fs.readFileSync(sourcePath, 'utf8');

    try {
      const result = await postcss([
        cssnano({
          preset: ['default', {
            discardComments: { removeAll: true },
            normalizeWhitespace: true,
            minifyFontValues: true,
            minifySelectors: true
          }]
        })
      ]).process(css, { from: sourcePath, to: distPath });

      fs.writeFileSync(distPath, result.css, 'utf8');

      if (result.map) {
        fs.writeFileSync(distPath + '.map', result.map.toString(), 'utf8');
      }

      const originalSize = Buffer.byteLength(css, 'utf8');
      const minifiedSize = Buffer.byteLength(result.css, 'utf8');
      const savings = ((1 - minifiedSize / originalSize) * 100).toFixed(1);

      console.log(`   ✅ ${cssFile}: ${formatBytes(originalSize)} → ${formatBytes(minifiedSize)} (${savings}% smaller)`);
    } catch (error) {
      console.error(`   ❌ Error minifying ${cssFile}:`, error.message);
    }
  }
  console.log('');
}

// ============================================================================
// HTML Minification
// ============================================================================
async function minifyHTML() {
  console.log('📄 Minifying HTML files...');

  for (const htmlFile of config.htmlFiles) {
    const sourcePath = path.join(config.sourceDir, htmlFile);
    const distPath = path.join(config.distDir, htmlFile);

    if (!fs.existsSync(sourcePath)) {
      console.log(`   ⚠️  Skipping ${htmlFile} (not found)`);
      continue;
    }

    const html = fs.readFileSync(sourcePath, 'utf8');

    try {
      const result = await minifyHtml(html, {
        collapseWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        useShortDoctype: true,
        minifyCSS: true,
        minifyJS: true
      });

      fs.writeFileSync(distPath, result, 'utf8');

      const originalSize = Buffer.byteLength(html, 'utf8');
      const minifiedSize = Buffer.byteLength(result, 'utf8');
      const savings = ((1 - minifiedSize / originalSize) * 100).toFixed(1);

      console.log(`   ✅ ${htmlFile}: ${formatBytes(originalSize)} → ${formatBytes(minifiedSize)} (${savings}% smaller)`);
    } catch (error) {
      console.error(`   ❌ Error minifying ${htmlFile}:`, error.message);
    }
  }
  console.log('');
}

// ============================================================================
// Copy Static Assets
// ============================================================================
function copyStaticAssets() {
  console.log('📁 Copying static assets...');

  const assetDirs = ['images', 'fonts'];

  for (const dir of assetDirs) {
    const sourceDir = path.join(config.sourceDir, dir);
    const distDir = path.join(config.distDir, dir);

    if (fs.existsSync(sourceDir)) {
      copyRecursive(sourceDir, distDir);
      console.log(`   ✅ Copied ${dir}/`);
    }
  }

  // Copy root files
  const rootFiles = ['netlify.toml', 'favicon.ico', '_redirects'];

  for (const file of rootFiles) {
    const sourcePath = path.join(config.sourceDir, file);
    const distPath = path.join(config.distDir, file);

    if (fs.existsSync(sourcePath)) {
      fs.copyFileSync(sourcePath, distPath);
      console.log(`   ✅ Copied ${file}`);
    }
  }

  console.log('');
}

// ============================================================================
// Helper Functions
// ============================================================================
function copyRecursive(src, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }

  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      copyRecursive(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

function formatBytes(bytes) {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
}

// ============================================================================
// Run Build
// ============================================================================
async function build() {
  const startTime = Date.now();

  try {
    await minifyJavaScript();
    await minifyCSS();
    await minifyHTML();
    copyStaticAssets();

    const buildTime = ((Date.now() - startTime) / 1000).toFixed(2);

    console.log('✨ Build complete!\n');
    console.log(`📦 Output directory: ${config.distDir}`);
    console.log(`⏱️  Build time: ${buildTime}s`);
    console.log('\n🚀 Ready for production deployment!');
  } catch (error) {
    console.error('\n❌ Build failed:', error);
    process.exit(1);
  }
}

// Run the build
build();
