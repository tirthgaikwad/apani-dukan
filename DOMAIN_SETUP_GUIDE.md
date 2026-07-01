# Domain Configuration Guide for apanidukanakole.com

## ✅ Code Changes Completed

The following updates have been made to ensure the website works correctly with the domain `apanidukanakole.com`:

### 1. **SEO & Metadata Updates**
- ✅ Added canonical URL support pointing to `https://apanidukanakole.com`
- ✅ Updated Open Graph meta tags with domain URL
- ✅ Added Twitter Card meta tags with domain URL
- ✅ Enhanced Local Business Schema with site URL
- ✅ Added proper image URLs for social sharing

### 2. **Routing & Redirects**
- ✅ Created `public/_redirects` for Netlify deployment
- ✅ Created `vercel.json` for Vercel deployment
- ✅ Configured SPA routing to handle all paths correctly
- ✅ Added HTTPS redirect rules
- ✅ Added www to non-www redirect rules

### 3. **SEO Files**
- ✅ Created `robots.txt` with sitemap reference
- ✅ Updated `index.html` with proper meta tags
- ✅ Added DNS prefetch for performance

### 4. **Security Headers**
- ✅ Added X-Content-Type-Options
- ✅ Added X-Frame-Options
- ✅ Added X-XSS-Protection

---

## 🔧 Required Actions at Hosting Provider

To make `apanidukanakole.com` work, you need to configure the following at your **domain registrar** and **hosting provider**:

### Step 1: DNS Configuration (at Domain Registrar)

If using **Netlify**:
```
Type: A
Name: @
Value: 75.2.60.5

Type: CNAME
Name: www
Value: [your-site-name].netlify.app
```

If using **Vercel**:
```
Type: A
Name: @
Value: 76.76.21.21

Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

If using **Cloudflare Pages**:
```
Type: CNAME
Name: @
Value: [your-project].pages.dev

Type: CNAME
Name: www
Value: [your-project].pages.dev
```

### Step 2: SSL Certificate
- Enable automatic SSL/TLS certificate at your hosting provider
- Most providers (Netlify, Vercel, Cloudflare) provide free SSL certificates automatically

### Step 3: Custom Domain Setup
1. Go to your hosting provider dashboard
2. Navigate to "Domain Settings" or "Custom Domains"
3. Add `apanidukanakole.com` as a custom domain
4. Follow the provider's verification process
5. Enable "Force HTTPS" option

### Step 4: Verify Domain Propagation
After DNS configuration, wait 24-48 hours for DNS propagation. Check status at:
- https://dnschecker.org
- https://www.whatsmydns.net

---

## 🧪 Testing Checklist

Once DNS is configured, test the following:

- [ ] `http://apanidukanakole.com` → redirects to `https://apanidukanakole.com`
- [ ] `http://www.apanidukanakole.com` → redirects to `https://apanidukanakole.com`
- [ ] `https://www.apanidukanakole.com` → redirects to `https://apanidukanakole.com`
- [ ] `https://apanidukanakole.com` → loads correctly
- [ ] All internal routes work (e.g., `/diwali`, `/contact`)
- [ ] SSL certificate is valid (green padlock in browser)
- [ ] Social sharing shows correct preview (test on Facebook Debugger, Twitter Card Validator)

---

## 📝 Common Issues & Solutions

### Issue: "This site can't be reached"
**Solution**: DNS not configured or not propagated yet. Wait 24-48 hours or check DNS settings.

### Issue: "Not Secure" warning
**Solution**: SSL certificate not installed. Enable SSL at hosting provider.

### Issue: 404 errors on page refresh
**Solution**: SPA routing not configured. The `_redirects` and `vercel.json` files should fix this.

### Issue: www version not redirecting
**Solution**: Add CNAME record for `www` subdomain and enable redirect at hosting provider.

---

## 🚀 Deployment Commands

### For Netlify:
```bash
npm run build
netlify deploy --prod
```

### For Vercel:
```bash
npm run build
vercel --prod
```

### For Cloudflare Pages:
```bash
npm run build
# Then connect your GitHub repo to Cloudflare Pages
```

---

## 📞 Need Help?

If you're still experiencing issues after following this guide:

1. **Check DNS**: Use `nslookup apanidukanakole.com` in terminal
2. **Check SSL**: Visit https://www.ssllabs.com/ssltest/
3. **Check Headers**: Use browser DevTools → Network tab
4. **Contact Support**: Reach out to your hosting provider's support team

---

**Note**: The code is now fully configured for the domain. The remaining steps must be completed at your hosting provider and domain registrar.
