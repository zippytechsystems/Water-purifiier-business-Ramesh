# Priya's AquaFresh – Hostinger Hosting & MySQL Database Setup Guide

> **Live Production Stack:** Apache + PHP 8.x + MySQL / MariaDB + React (Vite PWA)  
> **Physical Business Location:** Khilashapur Road, Raghunathpally, Jangaon, Telangana  
> **Direct Helpline:** `+91 90143 57848` | **WhatsApp:** `+91 91828 57848`

---

## 🗄️ Step 1: Create Hostinger MySQL Database

1. Log into your **Hostinger hPanel** ([hpanel.hostinger.com](https://hpanel.hostinger.com)).
2. Go to **Databases** &rarr; **Management**.
3. Under **Create a New MySQL Database And Database User**, enter:
   - **MySQL Database Name**: e.g., `u123456789_aquafresh`
   - **MySQL Username**: e.g., `u123456789_admin`
   - **Password**: Enter a secure password (e.g., `PriyaWater@2026!`)
4. Click **Create**.
5. Note down the **Database Name**, **Username**, and **Password**.

---

## 📥 Step 2: Import Database Schema into phpMyAdmin

1. On the same **Databases** screen, find your newly created database in the list.
2. Click **Enter phpMyAdmin**.
3. In phpMyAdmin, click on your database name in the left sidebar.
4. Click the **Import** tab at the top.
5. Click **Choose File** and select:
   ```
   database/schema.sql
   ```
6. Click **Go** / **Import** at the bottom.
7. The following 7 tables and 1 reporting view will be instantly created:
   - `admin_users`
   - `product_categories`
   - `products`
   - `services`
   - `service_bookings`
   - `customer_enquiries`
   - `customer_reviews` (with seed 5-star ratings)
   - `spare_parts`
   - `v_dashboard_kpis` (reporting view)

---

## ⚙️ Step 3: Configure Database Connection in `api/config.php`

Open `public/api/config.php` (or `dist/api/config.php` after build) and update lines 24–28 with your Hostinger database details:

```php
$DB_HOST = 'localhost';             // In Hostinger, always 'localhost'
$DB_PORT = '3306';
$DB_NAME = 'u123456789_aquafresh';  // Your Hostinger Database Name
$DB_USER = 'u123456789_admin';      // Your Hostinger Database Username
$DB_PASS = 'PriyaWater@2026!';      // Your Database Password
```

---

## 🚀 Step 4: Build & Upload to Hostinger `public_html/`

1. Build the production package locally:
   ```bash
   npm run build
   ```
2. Open **Hostinger hPanel** &rarr; **File Manager** (or connect via FileZilla / FTP).
3. Open the `public_html/` directory of your website.
4. Upload all files and folders located inside the local `dist/` directory directly into `public_html/`:
   ```
   public_html/
   ├── .htaccess               (Apache rewrites, GZIP compression & caching)
   ├── manifest.webmanifest    (PWA mobile app install manifest)
   ├── sw.js                   (Service worker for fast caching & offline)
   ├── favicon.svg
   ├── robots.txt
   ├── sitemap.xml
   ├── index.html
   ├── assets/                 (Compiled JS & CSS bundles)
   ├── api/                    (PHP REST API endpoints)
   │   ├── config.php
   │   ├── bookings.php
   │   ├── enquiries.php
   │   ├── reviews.php
   │   └── health.php
   ├── images/                 (Brand logos, posters & showroom photos)
   └── videos/                 (Official promotional showroom video)
   ```

---

## 🌐 Step 5: Domain & SSL Setup on Hostinger

1. In Hostinger hPanel, go to **Websites** &rarr; Select your site &rarr; **Domain Names**.
2. If using an external domain registrar (GoDaddy, Namecheap), set Hostinger nameservers:
   - `ns1.dns-parking.com`
   - `ns2.dns-parking.com`
3. In hPanel, go to **Security** &rarr; **SSL**.
4. Click **Install SSL** (Hostinger provides free lifetime Let's Encrypt SSL).
5. Ensure **Force HTTPS** is enabled.

---

## 🩺 Step 6: Test & Verify Live System Health

Open your browser and navigate to:
```
https://yourdomain.com/api/health.php
```

You should see a clean JSON response:
```json
{
  "status": "ok",
  "message": "Hostinger MySQL database connected and operational",
  "data": {
    "app": "Priya's AquaFresh – Lasya Water Purifier",
    "db_connected": true,
    "db_tables": [
      "admin_users",
      "customer_enquiries",
      "customer_reviews",
      "product_categories",
      "products",
      "service_bookings",
      "services",
      "spare_parts"
    ]
  }
}
```

---

## 📱 Cross-Device PWA Installation Verification

- **Android (Chrome / Edge)**: Tap **"Install App"** in the navigation bar &rarr; click **"Install Now"** &rarr; the app icon appears on your home screen.
- **iPhone / iPad (Safari)**: Tap **"Install App"** &rarr; follow the visual guide (Tap Share &rarr; "Add to Home Screen" &rarr; Add).
- **Desktop (Windows / Mac)**: Click **"Install App"** or the browser address bar install badge &rarr; launches as a desktop app window.
