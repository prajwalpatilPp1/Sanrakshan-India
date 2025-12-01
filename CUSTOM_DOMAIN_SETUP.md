# 🌐 Custom Domain Setup Guide

## Your Recommended Domain: **sanrakshanindia.org**

---

## 📋 **COMPLETE SETUP CHECKLIST**

### **Phase 1: Purchase Domain (15 minutes)**

- [ ] Choose domain registrar (Namecheap recommended)
- [ ] Search for: sanrakshanindia.org
- [ ] Purchase domain (~$12/year)
- [ ] Complete registration
- [ ] Verify email

### **Phase 2: Configure DNS (5 minutes)**

- [ ] Login to domain registrar
- [ ] Go to DNS settings
- [ ] Add A records (4 records)
- [ ] Add CNAME record
- [ ] Save changes

### **Phase 3: Configure GitHub (2 minutes)**

- [ ] Go to GitHub Pages settings
- [ ] Add custom domain
- [ ] Wait for DNS check
- [ ] Enable HTTPS

### **Phase 4: Wait & Verify (24-48 hours)**

- [ ] Wait for DNS propagation
- [ ] Test domain access
- [ ] Verify HTTPS works
- [ ] Update all links

---

## 🛒 **STEP 1: BUY YOUR DOMAIN**

### **Recommended: Namecheap**

1. **Go to:** https://www.namecheap.com/

2. **Search for:** `sanrakshanindia.org`

3. **Add to cart** (~$12/year)

4. **At checkout:**
   - Enable "WhoisGuard" (FREE - protects your privacy)
   - Disable other upsells (not needed)
   - Complete purchase

5. **Verify your email** (check spam folder)

### **Alternative: GoDaddy**

1. **Go to:** https://www.godaddy.com/
2. Search and purchase domain
3. Cost: ~$15/year

### **Alternative: Hostinger (India)**

1. **Go to:** https://www.hostinger.in/
2. Search and purchase domain
3. Cost: ~₹799/year

---

## ⚙️ **STEP 2: CONFIGURE DNS RECORDS**

### **For Namecheap:**

1. **Login to Namecheap**

2. **Go to:** Domain List → Manage → Advanced DNS

3. **Delete existing records** (if any)

4. **Add these records:**

#### **A Records (Add 4):**

```
Type: A Record
Host: @
Value: 185.199.108.153
TTL: Automatic
```

```
Type: A Record
Host: @
Value: 185.199.109.153
TTL: Automatic
```

```
Type: A Record
Host: @
Value: 185.199.110.153
TTL: Automatic
```

```
Type: A Record
Host: @
Value: 185.199.111.153
TTL: Automatic
```

#### **CNAME Record:**

```
Type: CNAME Record
Host: www
Value: prajwalpatilpp1.github.io.
TTL: Automatic
```

**Important:** Note the dot (.) at the end of the CNAME value!

5. **Save all changes**

### **For GoDaddy:**

1. Login → My Products → DNS
2. Add same records as above
3. For Host, use "@" for root domain
4. Save changes

### **For Other Registrars:**

Same records, but interface may differ slightly.

---

## 🔧 **STEP 3: CONFIGURE GITHUB PAGES**

1. **Go to:** https://github.com/prajwalpatilPp1/Sanrakshan-India/settings/pages

2. **Under "Custom domain":**
   - Enter: `sanrakshanindia.org`
   - Click "Save"

3. **Wait for DNS check:**
   - GitHub will verify DNS records
   - This may take a few minutes
   - You'll see a green checkmark when ready

4. **Enable HTTPS:**
   - Wait 24 hours after DNS propagation
   - Check "Enforce HTTPS"
   - Click "Save"

---

## ⏰ **STEP 4: WAIT FOR DNS PROPAGATION**

### **Timeline:**

- **Minimum:** 1-2 hours
- **Average:** 4-6 hours
- **Maximum:** 24-48 hours

### **Check Propagation Status:**

Visit: https://www.whatsmydns.net/

- Enter: `sanrakshanindia.org`
- Check if A records show GitHub IPs
- Green checkmarks = propagated

### **During This Time:**

- ✅ Your GitHub Pages site still works
- ✅ Old URL still accessible
- ⏳ New domain gradually becomes available
- ⏳ HTTPS not yet available

---

## ✅ **STEP 5: VERIFY SETUP**

### **After 24-48 hours:**

1. **Test your domain:**
   ```
   http://sanrakshanindia.org
   https://sanrakshanindia.org
   http://www.sanrakshanindia.org
   https://www.sanrakshanindia.org
   ```

2. **All should redirect to:**
   ```
   https://sanrakshanindia.org
   ```

3. **Check HTTPS:**
   - Look for padlock icon in browser
   - Certificate should be valid
   - No security warnings

4. **Test all pages:**
   - Home page
   - Gallery
   - Contact
   - All links work

---

## 🔄 **STEP 6: UPDATE YOUR LINKS**

### **Update these places:**

- [ ] Business cards
- [ ] Email signatures
- [ ] Social media profiles
- [ ] Google My Business
- [ ] Donor communications
- [ ] Printed materials
- [ ] Partner websites

### **Old URL still works:**

```
https://prajwalpatilpp1.github.io/Sanrakshan-India/
```

This will automatically redirect to your new domain!

---

## 📧 **BONUS: PROFESSIONAL EMAIL**

### **Get email like: info@sanrakshanindia.org**

#### **Option 1: Google Workspace (Recommended)**

- **Cost:** $6/user/month
- **Website:** https://workspace.google.com/
- **Features:**
  - Professional email
  - Gmail interface
  - 30GB storage
  - Google Drive, Docs, etc.

**Setup:**
1. Sign up for Google Workspace
2. Verify domain ownership
3. Add MX records to DNS
4. Create email accounts

#### **Option 2: Zoho Mail (FREE)**

- **Cost:** FREE for up to 5 users
- **Website:** https://www.zoho.com/mail/
- **Features:**
  - Professional email
  - 5GB storage per user
  - Ad-free

**Setup:**
1. Sign up for Zoho Mail
2. Add your domain
3. Add MX records to DNS
4. Create email accounts

#### **Option 3: Namecheap Email**

- **Cost:** $1.18/month
- **Included with domain purchase**
- Basic email hosting

---

## 🎯 **DOMAIN VARIATIONS**

### **What you bought:**
- sanrakshanindia.org (primary)

### **Consider also buying (optional):**
- sanrakshanindia.com (redirect to .org)
- sanrakshan.org (redirect to main)
- sanrakshan.in (redirect to main)

**Why?**
- Protects your brand
- Prevents confusion
- Catches typos
- Cost: ~$12 each/year

---

## 🛡️ **SECURITY & MAINTENANCE**

### **Annual Tasks:**

- [ ] Renew domain (set auto-renew!)
- [ ] Update WHOIS info if needed
- [ ] Check DNS records still correct
- [ ] Verify HTTPS certificate valid

### **Enable Auto-Renew:**

1. Login to registrar
2. Go to domain settings
3. Enable auto-renewal
4. **Never lose your domain!**

### **Privacy Protection:**

- Enable WHOIS privacy (usually free)
- Hides your personal info
- Prevents spam

---

## 🆘 **TROUBLESHOOTING**

### **Domain not working after 48 hours:**

1. **Check DNS records:**
   - Visit whatsmydns.net
   - Verify A records are correct
   - Check CNAME record

2. **Check GitHub Pages:**
   - Verify custom domain is set
   - Look for error messages
   - Try removing and re-adding domain

3. **Clear browser cache:**
   - Press Ctrl+Shift+R
   - Try incognito mode
   - Try different browser

### **HTTPS not available:**

1. **Wait 24 hours** after DNS propagation
2. **Uncheck and recheck** "Enforce HTTPS"
3. **Remove and re-add** custom domain
4. **Wait another hour** and try again

### **www not working:**

1. **Check CNAME record:**
   - Host: www
   - Value: prajwalpatilpp1.github.io.
   - Note the dot at the end!

2. **Wait for propagation**

### **Email not working:**

1. **Check MX records** in DNS
2. **Verify with email provider**
3. **Wait for propagation** (up to 48 hours)

---

## 📊 **COST SUMMARY**

### **Annual Costs:**

| Item | Cost | Required? |
|------|------|-----------|
| Domain (.org) | $12/year | ✅ Yes |
| GitHub Pages Hosting | FREE | ✅ Yes |
| HTTPS Certificate | FREE | ✅ Yes |
| Email (Zoho) | FREE | ⭐ Recommended |
| Email (Google Workspace) | $72/year | Optional |
| Additional domains | $12 each | Optional |

**Minimum Cost:** $12/year (just the domain!)

---

## ✅ **QUICK REFERENCE**

### **Your Domain:**
```
sanrakshanindia.org
```

### **GitHub Pages URL:**
```
https://prajwalpatilpp1.github.io/Sanrakshan-India/
```

### **DNS Records:**

**A Records (4):**
- 185.199.108.153
- 185.199.109.153
- 185.199.110.153
- 185.199.111.153

**CNAME Record:**
- Host: www
- Value: prajwalpatilpp1.github.io.

### **Important Links:**

- **GitHub Pages Settings:** https://github.com/prajwalpatilPp1/Sanrakshan-India/settings/pages
- **DNS Checker:** https://www.whatsmydns.net/
- **SSL Checker:** https://www.ssllabs.com/ssltest/

---

## 🎉 **CONGRATULATIONS!**

Once setup is complete, you'll have:

- ✅ Professional domain: sanrakshanindia.org
- ✅ Secure HTTPS connection
- ✅ Fast, optimized website
- ✅ Professional email (optional)
- ✅ Global accessibility
- ✅ SEO-friendly URL

**Your organization will look more professional and trustworthy!**

---

## 📞 **NEED HELP?**

### **Domain Issues:**
- Contact your registrar's support
- Namecheap: 24/7 live chat
- GoDaddy: Phone support

### **GitHub Pages Issues:**
- GitHub Docs: https://docs.github.com/pages
- GitHub Community: https://github.community/

### **DNS Issues:**
- Check: https://www.whatsmydns.net/
- Wait 48 hours before troubleshooting

---

**Ready to get your custom domain? Start with Step 1!** 🚀
