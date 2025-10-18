#!/usr/bin/env node

/**
 * Production Build Script
 * Minifies CSS and JS files for optimal performance
 * No external dependencies - uses Node.js built-in modules
 */

const fs = require('fs');
const path = require('path');

// Simple CSS minifier
function minifyCSS(css) {
    return css
        // Remove comments
        .replace(/\/\*[\s\S]*?\*\//g, '')
        // Remove whitespace
        .replace(/\s+/g, ' ')
        // Remove spaces around special characters
        .replace(/\s*([{}:;,>+~])\s*/g, '$1')
        // Remove last semicolon in blocks
        .replace(/;}/g, '}')
        // Remove unnecessary zeros
        .replace(/:0(px|em|rem|%)/g, ':0')
        .replace(/\s+/g, ' ')
        .trim();
}

// Simple JS minifier (basic)
function minifyJS(js) {
    return js
        // Remove single-line comments (but preserve URLs)
        .replace(/(?:^|\s)\/\/(?![^\n]*http).*$/gm, '')
        // Remove multi-line comments
        .replace(/\/\*[\s\S]*?\*\//g, '')
        // Remove console.log statements (already clean, but just in case)
        .replace(/console\.(log|debug|info|warn|error)\([^)]*\);?/g, '')
        // Remove excessive whitespace
        .replace(/\s+/g, ' ')
        // Remove spaces around operators (carefully)
        .replace(/\s*([{}();,:])\s*/g, '$1')
        // Remove spaces after keywords
        .replace(/\s*([=<>!+\-*/%&|^])\s*/g, '$1')
        .trim();
}

// Get all files in directory recursively
function getFiles(dir, ext) {
    let results = [];
    const list = fs.readdirSync(dir);

    list.forEach(file => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);

        if (stat && stat.isDirectory() && !file.includes('node_modules') && !file.includes('dist')) {
            results = results.concat(getFiles(filePath, ext));
        } else if (file.endsWith(ext)) {
            results.push(filePath);
        }
    });

    return results;
}

// Process files
function processFiles() {
    console.log('\n🚀 Starting Production Build...\n');

    const rootDir = __dirname;

    // Create dist directory if it doesn't exist
    const distDir = path.join(rootDir, 'dist');
    if (!fs.existsSync(distDir)) {
        fs.mkdirSync(distDir, { recursive: true });
    }

    let totalSaved = 0;
    let filesProcessed = 0;

    // Process CSS files
    console.log('📄 Minifying CSS files...');
    const cssFiles = getFiles(path.join(rootDir, 'css'), '.css');

    cssFiles.forEach(file => {
        const originalContent = fs.readFileSync(file, 'utf8');
        const minified = minifyCSS(originalContent);

        const originalSize = Buffer.byteLength(originalContent, 'utf8');
        const minifiedSize = Buffer.byteLength(minified, 'utf8');
        const saved = originalSize - minifiedSize;
        const savedPercent = ((saved / originalSize) * 100).toFixed(1);

        // Write to dist
        const relativePath = path.relative(rootDir, file);
        const distPath = path.join(distDir, relativePath);
        const distDirPath = path.dirname(distPath);

        if (!fs.existsSync(distDirPath)) {
            fs.mkdirSync(distDirPath, { recursive: true });
        }

        fs.writeFileSync(distPath, minified, 'utf8');

        console.log(`  ✓ ${path.basename(file)}: ${(originalSize/1024).toFixed(2)}KB → ${(minifiedSize/1024).toFixed(2)}KB (${savedPercent}% smaller)`);

        totalSaved += saved;
        filesProcessed++;
    });

    // Process JS files
    console.log('\n📜 Minifying JavaScript files...');
    const jsFiles = getFiles(path.join(rootDir, 'js'), '.js')
        .concat(getFiles(path.join(rootDir, 'components'), '.js'));

    jsFiles.forEach(file => {
        const originalContent = fs.readFileSync(file, 'utf8');
        const minified = minifyJS(originalContent);

        const originalSize = Buffer.byteLength(originalContent, 'utf8');
        const minifiedSize = Buffer.byteLength(minified, 'utf8');
        const saved = originalSize - minifiedSize;
        const savedPercent = ((saved / originalSize) * 100).toFixed(1);

        // Write to dist
        const relativePath = path.relative(rootDir, file);
        const distPath = path.join(distDir, relativePath);
        const distDirPath = path.dirname(distPath);

        if (!fs.existsSync(distDirPath)) {
            fs.mkdirSync(distDirPath, { recursive: true });
        }

        fs.writeFileSync(distPath, minified, 'utf8');

        console.log(`  ✓ ${path.basename(file)}: ${(originalSize/1024).toFixed(2)}KB → ${(minifiedSize/1024).toFixed(2)}KB (${savedPercent}% smaller)`);

        totalSaved += saved;
        filesProcessed++;
    });

    // Copy HTML files and update references
    console.log('\n📝 Processing HTML files...');
    const htmlFiles = fs.readdirSync(rootDir).filter(f => f.endsWith('.html'));

    htmlFiles.forEach(file => {
        let content = fs.readFileSync(path.join(rootDir, file), 'utf8');

        // Update CSS and JS paths to point to dist
        content = content
            .replace(/href="css\//g, 'href="dist/css/')
            .replace(/src="js\//g, 'src="dist/js/')
            .replace(/src="components\//g, 'src="dist/components/');

        fs.writeFileSync(path.join(distDir, file), content, 'utf8');
        console.log(`  ✓ ${file}`);
    });

    // Summary
    console.log('\n✨ Build Complete!\n');
    console.log(`  Files processed: ${filesProcessed}`);
    console.log(`  Total size reduced: ${(totalSaved/1024).toFixed(2)}KB`);
    console.log(`  Average reduction: ${((totalSaved/(filesProcessed*1024))*100).toFixed(1)}%`);
    console.log(`\n  Production files are in: ./dist/\n`);
}

// Run the build
try {
    processFiles();
} catch (error) {
    console.error('\n❌ Build failed:', error.message);
    process.exit(1);
}
