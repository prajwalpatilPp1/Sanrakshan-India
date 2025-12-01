/**
 * Automated Image Optimization Script
 * 
 * This script will:
 * 1. Find all large images (>500KB)
 * 2. Create optimized versions
 * 3. Generate a report
 * 
 * Requirements:
 * npm install sharp fs-extra
 * 
 * Usage:
 * node optimize-images.js
 */

const fs = require('fs-extra');
const path = require('path');
const sharp = require('sharp');

// Configuration
const CONFIG = {
    inputDir: './img',
    outputDir: './img-optimized',
    minSizeKB: 500, // Only optimize files larger than 500KB
    quality: 80, // JPEG quality (1-100)
    webpQuality: 80, // WebP quality
    maxWidth: 1920, // Max width for images
    maxHeight: 1080, // Max height for images
};

// Statistics
const stats = {
    totalFiles: 0,
    optimizedFiles: 0,
    skippedFiles: 0,
    originalSize: 0,
    optimizedSize: 0,
    errors: []
};

/**
 * Get all image files recursively
 */
async function getImageFiles(dir) {
    const files = [];
    const items = await fs.readdir(dir, { withFileTypes: true });
    
    for (const item of items) {
        const fullPath = path.join(dir, item.name);
        
        if (item.isDirectory()) {
            files.push(...await getImageFiles(fullPath));
        } else if (/\.(jpg|jpeg|png)$/i.test(item.name)) {
            files.push(fullPath);
        }
    }
    
    return files;
}

/**
 * Optimize a single image
 */
async function optimizeImage(inputPath) {
    try {
        const fileStats = await fs.stat(inputPath);
        const fileSizeKB = fileStats.size / 1024;
        
        stats.totalFiles++;
        stats.originalSize += fileStats.size;
        
        // Skip if file is already small
        if (fileSizeKB < CONFIG.minSizeKB) {
            stats.skippedFiles++;
            console.log(`⏭️  Skipped (already small): ${inputPath}`);
            return;
        }
        
        // Create output path
        const relativePath = path.relative(CONFIG.inputDir, inputPath);
        const outputPath = path.join(CONFIG.outputDir, relativePath);
        await fs.ensureDir(path.dirname(outputPath));
        
        // Load and optimize image
        const image = sharp(inputPath);
        const metadata = await image.metadata();
        
        // Resize if too large
        if (metadata.width > CONFIG.maxWidth || metadata.height > CONFIG.maxHeight) {
            image.resize(CONFIG.maxWidth, CONFIG.maxHeight, {
                fit: 'inside',
                withoutEnlargement: true
            });
        }
        
        // Optimize based on format
        if (metadata.format === 'jpeg' || metadata.format === 'jpg') {
            await image
                .jpeg({ quality: CONFIG.quality, progressive: true })
                .toFile(outputPath);
        } else if (metadata.format === 'png') {
            await image
                .png({ quality: CONFIG.quality, compressionLevel: 9 })
                .toFile(outputPath);
        }
        
        // Also create WebP version
        const webpPath = outputPath.replace(/\.(jpg|jpeg|png)$/i, '.webp');
        await sharp(inputPath)
            .resize(CONFIG.maxWidth, CONFIG.maxHeight, {
                fit: 'inside',
                withoutEnlargement: true
            })
            .webp({ quality: CONFIG.webpQuality })
            .toFile(webpPath);
        
        // Get optimized size
        const optimizedStats = await fs.stat(outputPath);
        stats.optimizedSize += optimizedStats.size;
        stats.optimizedFiles++;
        
        const savedKB = (fileStats.size - optimizedStats.size) / 1024;
        const savedPercent = ((savedKB / fileSizeKB) * 100).toFixed(1);
        
        console.log(`✅ Optimized: ${relativePath}`);
        console.log(`   Original: ${fileSizeKB.toFixed(2)} KB → Optimized: ${(optimizedStats.size / 1024).toFixed(2)} KB`);
        console.log(`   Saved: ${savedKB.toFixed(2)} KB (${savedPercent}%)`);
        console.log(`   WebP: ${webpPath}`);
        
    } catch (error) {
        stats.errors.push({ file: inputPath, error: error.message });
        console.error(`❌ Error optimizing ${inputPath}:`, error.message);
    }
}

/**
 * Main function
 */
async function main() {
    console.log('🚀 Starting Image Optimization...\n');
    console.log(`📁 Input Directory: ${CONFIG.inputDir}`);
    console.log(`📁 Output Directory: ${CONFIG.outputDir}`);
    console.log(`📏 Min Size: ${CONFIG.minSizeKB} KB`);
    console.log(`🎨 Quality: ${CONFIG.quality}%`);
    console.log(`📐 Max Dimensions: ${CONFIG.maxWidth}x${CONFIG.maxHeight}\n`);
    
    // Create output directory
    await fs.ensureDir(CONFIG.outputDir);
    
    // Get all image files
    console.log('🔍 Finding images...\n');
    const imageFiles = await getImageFiles(CONFIG.inputDir);
    console.log(`Found ${imageFiles.length} images\n`);
    
    // Optimize each image
    for (const file of imageFiles) {
        await optimizeImage(file);
    }
    
    // Print summary
    console.log('\n' + '='.repeat(60));
    console.log('📊 OPTIMIZATION SUMMARY');
    console.log('='.repeat(60));
    console.log(`Total Files: ${stats.totalFiles}`);
    console.log(`Optimized: ${stats.optimizedFiles}`);
    console.log(`Skipped: ${stats.skippedFiles}`);
    console.log(`Errors: ${stats.errors.length}`);
    console.log('');
    console.log(`Original Size: ${(stats.originalSize / 1024 / 1024).toFixed(2)} MB`);
    console.log(`Optimized Size: ${(stats.optimizedSize / 1024 / 1024).toFixed(2)} MB`);
    console.log(`Saved: ${((stats.originalSize - stats.optimizedSize) / 1024 / 1024).toFixed(2)} MB`);
    console.log(`Reduction: ${(((stats.originalSize - stats.optimizedSize) / stats.originalSize) * 100).toFixed(1)}%`);
    console.log('='.repeat(60));
    
    if (stats.errors.length > 0) {
        console.log('\n❌ Errors:');
        stats.errors.forEach(err => {
            console.log(`   ${err.file}: ${err.error}`);
        });
    }
    
    console.log('\n✅ Optimization complete!');
    console.log(`📁 Optimized images saved to: ${CONFIG.outputDir}`);
    console.log('\n💡 Next steps:');
    console.log('   1. Review the optimized images');
    console.log('   2. Replace original images with optimized versions');
    console.log('   3. Use WebP versions for better performance');
}

// Run the script
main().catch(console.error);
