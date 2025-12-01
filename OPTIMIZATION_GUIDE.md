# Website Performance Optimization Guide

## 🎯 Current Status
- **Total Image Size:** 670.66 MB
- **Number of Images:** 302 files
- **Estimated Load Time:** 8-10 seconds

## 🚀 Target Goals
- **Total Image Size:** ~150 MB (77% reduction)
- **Estimated Load Time:** 2-3 seconds (70% faster)

---

## 📋 STEP-BY-STEP OPTIMIZATION PLAN

### Phase 1: Image Compression (CRITICAL - Do This First!)

#### A. Large JPG/PNG Files (Priority: HIGH)
**Files to compress immediately:**
```
img/whatwedo/Copy of Copy of SBDS4400.JPG (>5MB)
img/whatwedo/Copy of Copy of SBDS4340.JPG (>5MB)
img/whatwedo/Copy of Copy of SBDS4339.JPG (>5MB)
img/whatwedo/Copy of Copy of SBDS4315.JPG (>5MB)
img/gallery/DSC_5190 (1).JPG (>5MB)
img/gallery/DSC_5159.JPG (>5MB)
img/gallery/Home Page(2).jpg (>5MB)
```

**Tools to Use:**
1. **Online (Free):**
   - TinyPNG: https://tinypng.com/ (Best for PNG/JPG)
   - Squoosh: https://squoosh.app/ (Google's tool, supports WebP)
   - Compressor.io: https://compressor.io/

2. **Desktop (Free):**
   - ImageOptim (Mac): https://imageoptim.com/
   - FileOptimizer (Windows): https://sourceforge.net/projects/nikkhokkho/

**Steps:**
1. Backup your img folder first!
2. Upload images to TinyPNG (max 20 at a time)
3. Download compressed versions
4. Replace original files
5. Target: Reduce each 5MB+ image to under 500KB

#### B. PDF Files (Priority: HIGH)
**Large PDFs to compress:**
```
img/newsletter/June Newsletter 2025.pdf (85.96 MB!)
img/newsletter/May Newsletter 2025.pdf (79.51 MB!)
img/annual-reports/Annual Report of Sanrakshan 2024 - 25.pdf (50.48 MB!)
```

**Tools:**
- Adobe Acrobat (Reduce File Size)
- SmallPDF: https://smallpdf.com/compress-pdf
- iLovePDF: https://www.ilovepdf.com/compress_pdf

**Target:** Reduce each PDF to under 5 MB

---

### Phase 2: Implement Lazy Loading (DONE ✅)

**What I've Done:**
- Created `js/lazy-load.js` script
- Added `loading="lazy"` to gallery images
- Browser will load images only when user scrolls to them

**Next Steps:**
1. Add lazy loading to ALL pages (index.html, about.html, etc.)
2. Add the script to all HTML files:
```html
<script src="js/lazy-load.js"></script>
```

---

### Phase 3: Convert to WebP Format (Optional but Recommended)

**Why WebP?**
- 25-35% smaller than JPG
- Better quality at smaller sizes
- Supported by all modern browsers

**How to Convert:**
1. Use Squoosh.app
2. Or use command line:
```bash
# Install cwebp (WebP converter)
# Then convert:
cwebp -q 80 input.jpg -o output.webp
```

**Implementation:**
```html
<picture>
  <source srcset="image.webp" type="image/webp">
  <img src="image.jpg" alt="Fallback" loading="lazy">
</picture>
```

---

### Phase 4: CSS Optimization

#### A. Minify CSS Files
**Tools:**
- CSS Minifier: https://cssminifier.com/
- Or use build tools (Gulp, Webpack)

**Files to minify:**
- whatwedo-enhancements.css (69.82 KB)
- index.css (59.85 KB)
- All other CSS files

**Target:** Reduce total CSS from 450KB to ~200KB

#### B. Remove Unused CSS
**Tool:** PurgeCSS
```bash
npm install -g purgecss
purgecss --css css/*.css --content *.html --output css/optimized/
```

---

### Phase 5: Add Caching Headers

**Create `.htaccess` file in root:**
```apache
# Enable compression
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css text/javascript application/javascript
</IfModule>

# Browser caching
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType image/jpg "access plus 1 year"
  ExpiresByType image/jpeg "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType image/webp "access plus 1 year"
  ExpiresByType text/css "access plus 1 month"
  ExpiresByType application/javascript "access plus 1 month"
</IfModule>
```

---

## 📊 QUICK WINS (Do These Today!)

### 1. Compress Top 20 Largest Images
Run this command to find them:
```bash
Get-ChildItem -Path "img" -Recurse -File | Sort-Object Length -Descending | Select-Object -First 20 FullName, @{Name="Size(MB)";Expression={[math]::Round($_.Length/1MB,2)}}
```

### 2. Add Lazy Loading to Index Page
Add to all `<img>` tags:
```html
<img src="..." alt="..." loading="lazy">
```

### 3. Compress PDFs
- Upload to SmallPDF
- Download compressed versions
- Replace originals

---

## 🎯 PRIORITY ORDER

**Week 1 (Critical):**
1. ✅ Implement lazy loading (DONE)
2. Compress top 20 largest images
3. Compress all PDF files
4. Add lazy loading to all pages

**Week 2 (Important):**
5. Compress remaining images
6. Minify CSS files
7. Add caching headers

**Week 3 (Nice to Have):**
8. Convert images to WebP
9. Remove unused CSS
10. Optimize JavaScript

---

## 📈 EXPECTED RESULTS

**After Week 1:**
- Load time: 8-10s → 4-5s (50% faster)
- Image size: 670MB → 300MB (55% reduction)

**After Week 2:**
- Load time: 4-5s → 2-3s (70% faster)
- Total size: 300MB → 150MB (77% reduction)

**After Week 3:**
- Load time: 2-3s → 1-2s (85% faster)
- Perfect performance scores!

---

## 🛠️ AUTOMATED SCRIPT (Optional)

I can create a Node.js script to:
- Automatically compress all images
- Convert to WebP
- Generate optimized versions

Would you like me to create this?

---

## 📞 NEED HELP?

If you need assistance with any step, just ask! I can:
- Create automation scripts
- Help with specific image optimization
- Implement advanced caching strategies
- Set up a CDN for faster delivery

---

## ✅ CHECKLIST

- [ ] Backup img folder
- [ ] Compress top 20 images
- [ ] Compress all PDFs
- [ ] Add lazy loading to all pages
- [ ] Minify CSS files
- [ ] Add caching headers
- [ ] Test website speed
- [ ] Convert to WebP (optional)
- [ ] Remove unused CSS (optional)

---

**Remember:** Start with image compression - it will give you the biggest performance boost!
