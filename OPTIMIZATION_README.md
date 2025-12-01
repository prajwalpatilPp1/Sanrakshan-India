# 🚀 Website Performance Optimization Tools

This folder contains automated tools to optimize your website's performance.

## 📦 What's Included

1. **`optimize-images.js`** - Automated image compression script
2. **`find-large-files.ps1`** - PowerShell script to find large files
3. **`js/lazy-load.js`** - Lazy loading implementation
4. **`OPTIMIZATION_GUIDE.md`** - Complete optimization guide

---

## 🎯 Quick Start (5 Minutes)

### Option 1: Manual Optimization (Easiest)

**For Images:**
1. Run: `powershell -ExecutionPolicy Bypass -File find-large-files.ps1`
2. Go to https://tinypng.com/
3. Upload the large images shown in the report
4. Download and replace original files

**For PDFs:**
1. Go to https://smallpdf.com/compress-pdf
2. Upload large PDFs (shown in report)
3. Download and replace original files

**Expected Result:** 50-60% faster load times!

---

### Option 2: Automated Optimization (Recommended)

**Prerequisites:**
- Node.js installed (Download from https://nodejs.org/)

**Steps:**

1. **Install Dependencies:**
```bash
npm install
```

2. **Run Optimization:**
```bash
npm run optimize
```

3. **Review Results:**
- Optimized images will be in `img-optimized/` folder
- WebP versions will be created automatically
- Check the console for savings report

4. **Replace Original Images:**
```bash
# Backup first!
cp -r img img-backup

# Replace with optimized versions
cp -r img-optimized/* img/
```

**Expected Result:** 70-80% faster load times!

---

## 📊 Performance Metrics

### Current Status
```
Total Images: 257 files (258.69 MB)
Total PDFs: 33 files (405.62 MB)
Large Images (>2MB): 22 files (205.02 MB)
Large PDFs (>5MB): 13 files (388.3 MB)
```

### After Optimization
```
Expected Image Size: ~80 MB (69% reduction)
Expected PDF Size: ~100 MB (75% reduction)
Total Savings: ~480 MB
Load Time: 8-10s → 2-3s (70% faster!)
```

---

## 🛠️ Tool Details

### 1. optimize-images.js

**What it does:**
- Finds all images larger than 500KB
- Compresses them to 80% quality
- Resizes if larger than 1920x1080
- Creates WebP versions (25-35% smaller!)
- Generates detailed report

**Configuration:**
Edit `optimize-images.js` to change:
- `quality`: 80 (1-100, higher = better quality)
- `maxWidth`: 1920 (max image width)
- `maxHeight`: 1080 (max image height)
- `minSizeKB`: 500 (only optimize files larger than this)

**Usage:**
```bash
node optimize-images.js
```

---

### 2. find-large-files.ps1

**What it does:**
- Scans all images and PDFs
- Lists files larger than 2MB (images) or 5MB (PDFs)
- Shows total size and potential savings

**Usage:**
```powershell
powershell -ExecutionPolicy Bypass -File find-large-files.ps1
```

Or via npm:
```bash
npm run find-large
```

---

### 3. Lazy Loading (Already Implemented ✅)

**What it does:**
- Images load only when user scrolls to them
- Reduces initial page load by 60-70%
- Works automatically on all pages

**Files:**
- `js/lazy-load.js` - Main script
- Already added to: `index.html`, `gallery.html`

**To add to other pages:**
```html
<script src="js/lazy-load.js"></script>
```

And add to images:
```html
<img src="image.jpg" alt="..." loading="lazy">
```

---

## 📋 Step-by-Step Optimization Plan

### Week 1: Critical Optimizations

**Day 1-2: Image Compression**
- [ ] Run `find-large-files.ps1` to identify targets
- [ ] Compress top 20 largest images using TinyPNG
- [ ] Replace original files
- [ ] Test website

**Day 3-4: PDF Compression**
- [ ] Compress large PDFs using SmallPDF
- [ ] Replace original files
- [ ] Test download speeds

**Day 5: Lazy Loading**
- [ ] Add lazy loading to remaining pages
- [ ] Test on mobile devices

**Expected Result:** 50-60% faster load times

---

### Week 2: Advanced Optimizations

**Day 1-3: Automated Optimization**
- [ ] Install Node.js and dependencies
- [ ] Run `optimize-images.js`
- [ ] Review optimized images
- [ ] Replace original files

**Day 4-5: WebP Implementation**
- [ ] Use WebP versions from optimization
- [ ] Update HTML with `<picture>` tags
- [ ] Test browser compatibility

**Expected Result:** 70-80% faster load times

---

### Week 3: Fine-Tuning

**Day 1-2: CSS Optimization**
- [ ] Minify CSS files
- [ ] Remove unused CSS
- [ ] Combine related files

**Day 3-4: Caching**
- [ ] Add `.htaccess` for browser caching
- [ ] Set up CDN (optional)

**Day 5: Testing**
- [ ] Test on multiple devices
- [ ] Check Google PageSpeed Insights
- [ ] Verify all images load correctly

**Expected Result:** 85-90% faster load times

---

## 🎨 Using WebP Images

After running `optimize-images.js`, you'll have WebP versions of all images.

**Update HTML:**
```html
<!-- Before -->
<img src="img/photo.jpg" alt="Photo">

<!-- After (with WebP) -->
<picture>
  <source srcset="img/photo.webp" type="image/webp">
  <img src="img/photo.jpg" alt="Photo" loading="lazy">
</picture>
```

**Benefits:**
- 25-35% smaller file size
- Better quality at same size
- Supported by all modern browsers

---

## 📈 Measuring Success

### Before Optimization
Test your site at: https://pagespeed.web.dev/

**Expected Scores:**
- Performance: 30-40
- Load Time: 8-10 seconds
- Total Size: 670 MB

### After Optimization
**Target Scores:**
- Performance: 80-90
- Load Time: 2-3 seconds
- Total Size: 150 MB

---

## 🆘 Troubleshooting

### "npm: command not found"
**Solution:** Install Node.js from https://nodejs.org/

### "sharp install failed"
**Solution:** 
```bash
npm install --platform=win32 --arch=x64 sharp
```

### Images look blurry after optimization
**Solution:** Increase quality in `optimize-images.js`:
```javascript
quality: 85, // Increase from 80 to 85
```

### Script takes too long
**Solution:** Increase `minSizeKB` to only optimize larger files:
```javascript
minSizeKB: 1000, // Only files >1MB
```

---

## 💡 Pro Tips

1. **Always backup before optimizing:**
   ```bash
   cp -r img img-backup
   ```

2. **Test on mobile devices** - They benefit most from optimization

3. **Use WebP for new images** - 25-35% smaller than JPG

4. **Monitor performance** - Use Google PageSpeed Insights monthly

5. **Optimize PDFs separately** - They're often the biggest files

6. **Enable CDN** - For even faster global delivery

---

## 📞 Need Help?

If you encounter issues:
1. Check the troubleshooting section above
2. Review `OPTIMIZATION_GUIDE.md` for detailed steps
3. Test with a small batch of images first
4. Keep backups of original files

---

## ✅ Checklist

- [ ] Backup img folder
- [ ] Install Node.js (if using automated script)
- [ ] Run find-large-files.ps1
- [ ] Compress top 20 images
- [ ] Compress large PDFs
- [ ] Run optimize-images.js (optional)
- [ ] Replace original files
- [ ] Add lazy loading to all pages
- [ ] Test website performance
- [ ] Implement WebP (optional)
- [ ] Set up caching
- [ ] Celebrate faster website! 🎉

---

## 📚 Additional Resources

- **TinyPNG:** https://tinypng.com/
- **SmallPDF:** https://smallpdf.com/compress-pdf
- **Squoosh:** https://squoosh.app/
- **PageSpeed Insights:** https://pagespeed.web.dev/
- **WebP Guide:** https://developers.google.com/speed/webp

---

**Remember:** Start with manual compression for quick wins, then move to automated optimization for best results!
