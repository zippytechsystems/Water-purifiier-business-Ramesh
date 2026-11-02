# Priya's AquaFresh – Lasya Water Purifier Sales & Services

> **Pure Water. Healthy Life. | స్వచ్ఛమైన నీరు. ఆరోగ్యకరమైన జీవితం.**  
> Official Commercial Website & Service Management Portal for **Priya's AquaFresh – Lasya Water Purifier Sales & Services**, located on Khilashapur Road, Raghunathpally, Jangaon District, Telangana, India.

---

## 🏢 Business Details & Verified Credentials

| Parameter | Business Detail |
| :--- | :--- |
| **Brand Name** | Priya's AquaFresh (ప్రియాస్ ఆక్వాఫ్రెష్) |
| **Business Title** | Lasya Water Purifier Sales & Services (లాస్య వాటర్ సేల్స్ & సర్వీసెస్) |
| **Proprietor / Contact** | Ramesh Kumar |
| **Calling Helpline** | `+91 90143 57848` |
| **WhatsApp Business** | `+91 91828 57848` ([wa.me/9182857848](https://wa.me/9182857848)) |
| **GSTIN Registration** | `36ETWPA6540J1Z7` |
| **Physical Location** | Khilashapur Road, Village & Mandal Raghunathpally, District Jangaon, Telangana 506244 |
| **GPS Coordinates** | `17.764960183188055, 79.25625657517365` |
| **Working Hours** | Monday – Sunday: 8:00 AM – 9:00 PM |

---

## 🌟 Key Platform Features

1. **Bilingual Experience (English & Telugu)**:
   - Instant language toggle in the navigation bar.
   - Natural Telugu business copy preserved directly from the supplied posters: *"మీ ఇంట్లో తాగునీరు నిజంగా శుభ్రమైనదేనా?"* & *"లాస్య వాటర్ ప్యూరిఫైయర్ స్వచ్ఛమైన నీటికి... నమ్మకమైన ఎంపిక"*.
2. **Direct WhatsApp Business Integration**:
   - **Product Sales ("Sell")**: Every water purifier, fridge, washing machine, cooler, and AC spare part has a direct WhatsApp enquiry button with pre-filled product name and category details.
   - **Service Booking ("Booking")**: Customers get a unique reference ID (e.g., `LWP-2026-XXXX`) and a 1-click button to send the full appointment details directly to `9182857848` for instant technician dispatch.
   - **Spare Parts Direct Enquiry**: 1-click check for membranes, filters, pumps, and motors.
3. **Official Media & Assets**:
   - **Promotional Video**: Embedded responsive HTML5 player with showroom presenter, audio mute control, and optimized video playback (`/videos/promotional-video.mp4`).
   - **Photo Gallery**: Extracted video frames showcasing water dispenser purity tests, showroom displays, AC spare parts shelves, and appliances.
4. **Service Booking Engine**:
   - Interactive booking form with multi-point validation (Name, 10-digit mobile, address, village, service type, product, problem description, date, and time slot).
   - LocalStorage and relational database integration with instant receipt generation.
5. **Admin Operations Dashboard**:
   - Protected login portal (Demo: `admin` / `admin123`).
   - Live KPI counters: Total Bookings, New Unassigned, In Progress, Completed, Total Enquiries.
   - Live booking status updates (`New`, `Contacted`, `Confirmed`, `Assigned`, `In Progress`, `Completed`, `Cancelled`).
   - Technician Assignment modal.
   - One-click Technician Job Sheet printing.
   - One-click CSV Export for bookkeeping.
   - Direct WhatsApp customer reply from the dashboard.
6. **Local SEO Optimization**:
   - Complete Schema.org `HomeGoodsStore` JSON-LD structured data with coordinates, opening hours, GST, and phone numbers.
   - Dynamic meta tags, OpenGraph social sharing preview, `robots.txt`, and `sitemap.xml`.
7. **Relational Database Architecture**:
   - Production-ready MySQL schema in `/database/schema.sql` covering admin authentication, products, categories, bookings, enquiries, and reporting views.

---

## 📂 Project Structure

```
├── database/
│   └── schema.sql                # Complete MySQL relational database schema & seed data
├── public/
│   ├── favicon.svg
│   ├── robots.txt                # Search engine crawler directives
│   ├── sitemap.xml               # Complete XML sitemap
│   ├── images/
│   │   ├── brand/                # Brand posters, logos & badges
│   │   ├── gallery/              # Showroom & video frames
│   │   └── products/             # Water purifiers, fridges, washing machines, coolers, AC spares
│   └── videos/
│       └── promotional-video.mp4 # Supplied client promotional video
├── src/
│   ├── components/
│   │   ├── Header.tsx            # Sticky header with bilingual toggle & WhatsApp CTA
│   │   ├── Footer.tsx            # Corporate footer with GST, directions & disclaimers
│   │   └── FloatingActions.tsx   # Floating animated WhatsApp & Call buttons
│   ├── context/
│   │   └── LanguageContext.tsx   # English / Telugu state management
│   ├── data/
│   │   └── mockData.ts           # Authentic business catalogue, services, and initial seed bookings
│   ├── pages/
│   │   ├── HomePage.tsx          # 10 comprehensive sections (Hero, Highlights, Video, Map, etc.)
│   │   ├── AboutPage.tsx         # Business mission and local presence
│   │   ├── WaterPurifiersPage.tsx# Dedicated RO, UV, Domestic & Commercial catalogue
│   │   ├── AppliancesPage.tsx    # Fridges, washing machines, coolers, AC spares
│   │   ├── ServicesPage.tsx      # All 8 installation, repair, and AMC services
│   │   ├── ServiceBookingPage.tsx# Interactive booking form with reference generation
│   │   ├── SparePartsPage.tsx    # Filter candles, membranes, pumps, and motors
│   │   ├── GalleryPage.tsx       # Showroom photo gallery with lightbox preview
│   │   ├── ContactPage.tsx       # Store info, enquiry form, and embedded Google Map
│   │   ├── PrivacyPolicyPage.tsx # Data privacy & customer ethics
│   │   └── AdminDashboardPage.tsx# Protected administrative portal
│   ├── services/
│   │   └── storageService.ts     # Persistent storage and API endpoints
│   ├── types/
│   │   └── index.ts              # TypeScript type definitions
│   ├── utils/
│   │   └── whatsapp.ts           # WhatsApp Business deep-link generators
│   ├── App.tsx                   # Main routing & layout controller
│   ├── main.tsx
│   └── index.css                 # Tailwind CSS v4 & custom aquatic animations
├── package.json
├── tsconfig.json
└── vite.config.ts
```

---

## 🚀 Running the Project Locally

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start the development server**:
   ```bash
   npm run dev
   ```
   Open your browser at `http://localhost:5173/`.

3. **Build for production**:
   ```bash
   npm run build
   ```
   The production-ready assets will be generated in the `dist/` directory.

---

## 🔒 Admin Portal Credentials

- **URL**: Click **"Admin"** in the top navigation strip or go to `http://localhost:5173/#admin`
- **Username**: `admin`
- **Password**: `admin123` (or `ramesh9014`)

---

## 🌐 Production Deployment Guide

### Option A: Hostinger / Shared Hosting / cPanel
1. Run `npm run build` locally.
2. Upload the contents of the `dist/` folder into your `public_html/` directory on Hostinger.
3. Import `database/schema.sql` into your Hostinger phpMyAdmin / MySQL database.
4. Set up an `.htaccess` file in `public_html` for single-page routing:
   ```apache
   <IfModule mod_rewrite.c>
     RewriteEngine On
     RewriteBase /
     RewriteRule ^index\.html$ - [L]
     RewriteCond %{REQUEST_FILENAME} !-f
     RewriteCond %{REQUEST_FILENAME} !-d
     RewriteRule . /index.html [L]
   </IfModule>
   ```

### Option B: Vercel / Netlify
1. Connect your Git repository.
2. Build Command: `npm run build`
3. Output Directory: `dist`
4. The site will deploy instantly with HTTPS enabled.
