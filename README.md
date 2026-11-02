# Priya's AquaFresh – Lasya Water Purifier Sales & Services

> **Pure Water. Healthy Life. | స్వచ్ఛమైన నీరు. ఆరోగ్యకరమైన జీవితం.**  
> Official Commercial Website & Direct WhatsApp Business Portal for **Priya's AquaFresh – Lasya Water Purifier Sales & Services**, located on Khilashapur Road, Raghunathpally, Jangaon District, Telangana, India.

---

## 🏢 Business Details & Verified Credentials

| Parameter | Business Detail |
| :--- | :--- |
| **Brand Name** | Priya's AquaFresh (ప్రియాస్ ఆక్వాఫ్రెష్) |
| **Business Title** | Lasya Water Purifier Sales & Services (లాస్య వాటర్ సేల్స్ & సర్వీసెస్) |
| **Proprietor / Contact** | Ramesh Kumar |
| **Calling Hotline** | `+91 90143 57848` (`tel:9014357848`) |
| **WhatsApp Business** | `+91 91828 57848` ([wa.me/9182857848](https://wa.me/9182857848)) |
| **GSTIN Registration** | `36ETWPA6540J1Z7` |
| **Physical Location** | Khilashapur Road, Village & Mandal Raghunathpally, District Jangaon, Telangana 506244 |
| **GPS Coordinates** | `17.764960183188055, 79.25625657517365` |
| **Working Hours** | Monday – Sunday: 8:00 AM – 9:00 PM |

---

## 🌟 Architecture & Core Features

This website is engineered as a **direct WhatsApp enquiry and lead-generation platform** designed for maximum conversion, speed, and reliability:

1. **Direct WhatsApp Business Integration**:
   - **Sales ("Sell")**: Every water purifier, fridge, washing machine, cooler, and AC spare part has a direct WhatsApp enquiry button that pre-fills the exact model name, warranty, and pricing enquiry for `https://wa.me/9182857848`.
   - **Service Booking ("Booking")**: Customers enter their name, 10-digit phone, village, address, service category, product type, problem, and preferred time slot. On submission, the form validates the input, generates a tracking reference (e.g. `LWP-2026-XXXX`), and immediately opens WhatsApp with the structured booking details ready to send.
   - **Spare Parts Enquiries**: 1-click availability check for RO membranes, sediment filters, pumps, and motors.
   - **Contact Form**: Direct pre-filled WhatsApp enquiry for custom customer messages.

2. **Bilingual Experience (English & Telugu)**:
   - Instant language toggle in the navigation bar.
   - Natural Telugu business copy preserved directly from the supplied posters: *"మీ ఇంట్లో తాగునీరు నిజంగా శుభ్రమైనదేనా?"* & *"లాస్య వాటర్ ప్యూరిఫైయర్ స్వచ్ఛమైన నీటికి... నమ్మకమైన ఎంపిక"*.

3. **Official Media & Assets**:
   - **Promotional Video**: Embedded responsive HTML5 player with showroom presenter, audio mute control, and optimized video playback (`/videos/promotional-video.mp4`).
   - **Photo Gallery**: Extracted video frames showcasing water dispenser purity tests, showroom displays, AC spare parts shelves, and appliances.
   - **1-Year Guarantee Badge**: Highlighted across all domestic RO models.

4. **Privacy-First & Zero Maintenance**:
   - No database dependencies or login portals required.
   - No customer data is stored on remote servers; all leads flow straight to the owner's WhatsApp Business app.
   - Extremely fast page load times and zero backend vulnerability attack surfaces.

5. **Local SEO Optimization**:
   - Complete Schema.org `HomeGoodsStore` JSON-LD structured data with coordinates, opening hours, GST, and phone numbers.
   - Dynamic meta tags, OpenGraph social sharing preview, `robots.txt`, and `sitemap.xml`.

6. **Enterprise Architecture Ready**:
   - Includes a complete relational MySQL database schema in `/database/schema.sql` for future enterprise backoffice expansion if needed.

---

## 📂 Project Structure

```
├── database/
│   └── schema.sql                # Production MySQL relational schema (reference)
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
│   │   └── mockData.ts           # Authentic business catalogue, services, and showroom items
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
│   │   └── PrivacyPolicyPage.tsx # Data privacy & customer ethics
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

## 🌐 Hostinger & Web Hosting Deployment Guide

### Option A: Hostinger Shared / Business Web Hosting (Recommended)
1. Run `npm run build` locally.
2. Open Hostinger File Manager or connect via FTP/SFTP.
3. Upload all files from the generated `dist/` directory directly into `public_html/`.
4. Ensure an `.htaccess` file exists in `public_html/` with the following configuration:
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
5. Your website will be live instantly with HTTPS, full SEO, video streaming, and WhatsApp integration!

### Option B: Vercel / Netlify / GitHub Pages
1. Push repository to GitHub.
2. Connect the repository to Vercel or Netlify.
3. Build Command: `npm run build`
4. Output Directory: `dist`
5. The site deploys automatically with a global CDN.
