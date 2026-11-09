# MicroFree – Image to PDF Converter

> A modern, ultra-fast, 100% client-side **Image to PDF Converter** web application built under the **MicroFree** brand. Converts JPG, PNG, and WebP pictures into a single cohesive PDF document entirely inside the user's browser with zero file uploads, zero server processing, and zero privacy risks.

---

## 🌟 Key Highlights & Capabilities

- **100% Client-Side Privacy**: All image manipulation, Canvas rendering, and PDF compilation take place inside the user's browser using HTML5 Canvas and `pdf-lib`. No files are ever sent over the network to any server.
- **Multiple Formats Supported**: Full support for JPG, JPEG, PNG (including transparency preservation or custom background fill), and modern WebP.
- **Multi-Image Drag-and-Drop**: Upload single or multiple images via intuitive drag-and-drop or file browser.
- **Visual Image Management**:
  - Live thumbnails with instant 90° clockwise rotation (`0°`, `90°`, `180°`, `270°`).
  - Drag-and-drop page reordering with clear `Page 1`, `Page 2`, ... indicators.
  - Move Up / Move Down buttons for mobile accessibility.
  - One-click "Rotate All" and "Sort A–Z / Z–A" batch controls.
  - Full-resolution Lightbox modal for zooming and reviewing individual images.
- **Granular PDF Layout Controls**:
  - **Page Sizes**: A4 (Standard), A3, US Letter, US Legal, and **Original Dimensions** (dynamically matches the exact aspect ratio and pixels of each image).
  - **Orientation**: Portrait, Landscape, and **Auto (Smart)** (matches the orientation of each image automatically).
  - **Image Fitting**: Fit to Page (Contain), Fill Page (Cover), and Original 1:1 Scale.
  - **Margins**: None (0 pt), Small (18 pt / ~6 mm), Medium (36 pt / ~13 mm), Large (54 pt / ~19 mm).
  - **Page Background Color**: Pure White, Warm Cream, Cool Slate, Dark Slate, or any custom color via native color picker.
  - **Image Quality**: Original (Lossless), High Quality (~92%), Balanced (~80%), Small File Draft (~60%).
  - **Customizable Output Filename**: Custom text field with automatic `.pdf` sanitization.
- **Instant Download & Preview**:
  - One-click Download PDF button.
  - Interactive PDF Preview modal with embedded document viewer before or after downloading.
  - Celebratory confetti feedback upon successful conversion.
  - Automatic memory cleanup of Blob URLs to prevent memory leaks.
- **Google AdSense Ready**: Dedicated, compliant ad containers that automatically collapse cleanly when ads are not configured.
- **SEO Optimized**: Fully semantic HTML5, Open Graph tags, Twitter Card metadata, and `WebApplication` schema.org JSON-LD structured data.

---

## 🛠️ Technology Stack

- **Framework**: [React 18](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Bundler & Build Tool**: [Vite 6](https://vitejs.dev/)
- **Styling**: [Tailwind CSS 3](https://tailwindcss.com/)
- **PDF Engine**: [`pdf-lib`](https://pdf-lib.js.org/) (pure client-side PDF document manipulation)
- **Image Processing**: HTML5 Canvas 2D API (for WebP transcoding, rotation, background fills, and quality compression)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Visual Feedback**: `canvas-confetti`

---

## 📁 Project Structure

```text
02-Image-to-PDF/
├── dist/                        # Production build output (static HTML, JS, CSS)
├── public/
│   ├── favicon.svg              # Branded MicroFree PDF vector icon
│   ├── robots.txt               # Web crawler instructions
│   └── sitemap.xml              # Search engine sitemap
├── src/
│   ├── components/
│   │   ├── AdSlot.tsx           # Configurable, policy-compliant AdSense slot
│   │   ├── Footer.tsx           # Navigation links, legal disclaimers, brand info
│   │   ├── Header.tsx           # Responsive sticky header, brand navigation
│   │   ├── ImageGrid.tsx        # Grid container with batch actions (reorder, sort, clear)
│   │   ├── ImagePreview.tsx     # Individual image card (thumbnail, rotation, move controls)
│   │   ├── LegalModal.tsx       # Modals for About, Privacy Policy, Terms, Disclaimer
│   │   ├── LightboxModal.tsx    # Full-screen image zoom viewer
│   │   ├── PdfPreviewModal.tsx  # Embedded in-browser PDF document viewer
│   │   ├── PdfSettings.tsx      # Comprehensive PDF configuration controls
│   │   ├── SEO.tsx              # How-it-works, features grid, FAQ accordion, educational guide
│   │   └── UploadArea.tsx       # Interactive drag-and-drop dropzone
│   ├── config/
│   │   └── adsenseConfig.ts     # Central Google AdSense IDs and enable switch
│   ├── hooks/
│   │   └── useImageFiles.ts     # Hook managing uploaded files, rotations, reordering, memory cleanup
│   ├── pages/
│   │   └── Home.tsx             # Main application page combining workspace and content
│   ├── services/
│   │   ├── imageProcessor.ts    # Canvas-based rotation, WebP transcoding, quality compression
│   │   └── pdfGenerator.ts      # pdf-lib PDF compilation and layout engine
│   ├── types/
│   │   └── image.ts             # TypeScript interfaces for image items and settings
│   ├── utils/
│   │   ├── fileValidation.ts    # MIME type, file extension, and image integrity verification
│   │   └── formatFileSize.ts    # Byte formatting utility (KB, MB, GB)
│   ├── App.tsx                  # Application root layout
│   ├── index.css                # Tailwind directives and custom scrollbar styling
│   └── main.tsx                 # React DOM mount point
├── index.html                   # HTML entry point with SEO meta tags and JSON-LD schema
├── nginx.conf.example           # Production Nginx server block configuration
├── package.json                 # Project dependencies and build scripts
├── postcss.config.js            # PostCSS configuration
├── tailwind.config.js           # Tailwind theme configuration
├── tsconfig.json                # TypeScript compiler configuration
└── vite.config.ts               # Vite bundler configuration with vendor code-splitting
```

---

## 🚀 Getting Started

### 1. Prerequisites
- **Node.js**: v18.0.0 or later (v26 tested)
- **npm**: v9.0.0 or later

### 2. Install Dependencies
```bash
npm install
```

### 3. Development Server
Start the local Vite development server with Hot Module Replacement (HMR):
```bash
npm run dev
```
Open `http://localhost:5173` in your browser.

### 4. Production Build
Compile and bundle the project for static production deployment:
```bash
npm run build
```
The optimized static files are generated in the `dist/` directory.

### 5. Preview Production Build Locally
```bash
npm run preview
```

---

## 🖥️ Mac mini + Nginx + Cloudflare Tunnel Deployment

This application produces pure static HTML, CSS, and JavaScript. It does not require Node.js, Python, or any backend runtime in production.

### Step 1: Nginx Configuration
If you run Homebrew Nginx on your Mac mini:
```bash
brew install nginx
```
Edit your Nginx configuration (e.g., `/opt/homebrew/etc/nginx/servers/microfree.conf` on Apple Silicon or `/usr/local/etc/nginx/servers/microfree.conf` on Intel):

```nginx
server {
    listen 80;
    server_name image-to-pdf.microfree.tools localhost;

    root /Applications/XAMPP/xamppfiles/htdocs/microfree/Utility-Tools/02-Image-to-PDF/dist;
    index index.html;

    gzip on;
    gzip_types text/plain text/css application/javascript application/json image/svg+xml;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location ~* \.(?:css|js|woff2?|svg|png|jpe?g|webp)$ {
        expires 1y;
        add_header Cache-Control "public, max-age=31536000, immutable";
    }
}
```

Reload Nginx:
```bash
sudo nginx -s reload
```

### Step 2: Cloudflare Tunnel Configuration
Expose the local server to your public domain without port forwarding or opening router ports:

1. Install `cloudflared`:
   ```bash
   brew install cloudflared
   ```
2. Authenticate and create a tunnel:
   ```bash
   cloudflared tunnel login
   cloudflared tunnel create microfree-tools
   ```
3. Configure `~/.cloudflared/config.yml`:
   ```yaml
   tunnel: <TUNNEL_UUID>
   credentials-file: /Users/<USER>/.cloudflared/<TUNNEL_UUID>.json

   ingress:
     - hostname: image-to-pdf.microfree.tools
       service: http://localhost:80
     - service: http_status:404
   ```
4. Route DNS and run the tunnel:
   ```bash
   cloudflared tunnel route dns microfree-tools image-to-pdf.microfree.tools
   cloudflared tunnel run microfree-tools
   ```

---

## 💰 Google AdSense Setup Guide

MicroFree is designed to support non-intrusive Google AdSense advertising without hurting conversion usability or violating AdSense Invalid Traffic Policies.

### How to Activate Ads Once Approved:

1. Open `src/config/adsenseConfig.ts`.
2. Set `enabled: true`.
3. Fill in your approved AdSense Publisher ID and Unit IDs:
   ```typescript
   export const ADSENSE_CONFIG: AdSenseConfig = {
     enabled: true,
     publisherId: 'ca-pub-XXXXXXXXXXXXXXXX', // Your publisher ID
     slots: {
       sidebarRight: '1234567890',    // Desktop right sidebar unit
       belowConverter: '2345678901',  // Unit below main converter workspace
       betweenContent: '3456789012',  // Unit between How It Works and FAQ
     },
   };
   ```
4. In `index.html`, uncomment the official Google AdSense script tag:
   ```html
   <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX"
     crossorigin="anonymous"></script>
   ```
5. Rebuild with `npm run build`.

> **Note**: While `enabled: false` (or when slot IDs are left blank), all ad containers automatically collapse so that your site remains clean, with zero empty white blocks and zero fake placeholders.

---

## 🔍 SEO & Web Vitals Optimizations

- **Primary Keyword**: *Image to PDF Converter*
- **Secondary Keywords**: *JPG to PDF converter*, *PNG to PDF converter*, *WebP to PDF*, *Convert images to PDF online*, *Multiple images to PDF*, *Free image to PDF converter*.
- **Semantic Structure**: Proper `<h1>`, `<h2>`, and `<h3>` heading hierarchy throughout the hero, instructions, feature highlights, and FAQ accordion.
- **Structured Data**: Injected JSON-LD `WebApplication` schema with full feature list and pricing specification ($0.00).
- **Social Sharing**: Complete Open Graph (`og:*`) and Twitter Card tags.
- **Search Engine Discovery**: Ready-to-crawl `robots.txt` and `sitemap.xml` included in `public/`.
- **Fast Core Web Vitals**: Zero server latency, instant in-memory client conversions, lazy loading, and asset preloading.

---

## 🧪 Testing Checklist

- [x] **Single Image Conversion**: Successfully converts single JPG, PNG, and WebP images.
- [x] **Multi-Image Conversion**: Combines up to dozens of images into a single multi-page PDF document.
- [x] **WebP Transcoding**: HTML5 Canvas decodes WebP images and transcodes them for `pdf-lib` embedding.
- [x] **Image Rotation**: Rotates images clockwise by 90°, 180°, and 270°; preserves exact rotated dimensions and visual orientation in the final PDF.
- [x] **Drag-and-Drop Reordering**: Interactive reordering updates page sequence accurately.
- [x] **Paper Dimensions**: A4, A3, Letter, Legal, and Original Dimensions adjust target page sizes accurately.
- [x] **Orientations**: Portrait, Landscape, and Auto (aspect-ratio matching).
- [x] **Fitting Options**: Fit to Page (Contain), Fill Page (Cover), and Original 1:1 Scale.
- [x] **Margins**: None, Small, Medium, and Large margins applied accurately.
- [x] **Page Backgrounds**: White, Warm Cream, Cool Slate, Dark Slate, and Custom Hex Colors render cleanly behind transparent PNGs.
- [x] **PDF Download**: Automatically prompts download with user-customized, sanitized `.pdf` filename.
- [x] **In-Browser PDF Preview**: Embedded viewer allows inspection without opening external applications.
- [x] **Mobile Responsiveness**: Clean, touch-friendly UI on smartphones and tablets.
- [x] **Zero Server Uploads**: Verified that zero network requests transmit image payload data.

---

## 📄 License & Attribution

Crafted for **MicroFree Utility Tools**. All code is open for personal, educational, and commercial deployment under the MIT License.

