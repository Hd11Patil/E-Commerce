# Nykaa Fashion Clone — React App

A pixel-faithful React clone of the Nykaa Fashion homepage.

## Features
- Sticky navbar with search, wishlist & cart
- Auto-sliding hero banner with animated discount display
- Horizontally scrollable category strip
- Trending Summer Picks grid
- Promo banners (Free Shipping, Returns, Luxury)
- Product grid with wishlist toggle
- Brand pills strip
- Newsletter footer with payment icons

## Project Structure
```
nykaa-fashion/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Topbar.js / .css
│   │   ├── Navbar.js / .css
│   │   ├── HeroBanner.js / .css
│   │   ├── CategoryStrip.js / .css
│   │   ├── TrendingSection.js / .css
│   │   ├── PromoBanner.js / .css
│   │   ├── ProductGrid.js / .css
│   │   ├── BrandStrip.js / .css
│   │   └── Footer.js / .css
│   ├── App.js
│   ├── App.css
│   ├── index.js
│   └── index.css
└── package.json
```

## Getting Started

### Prerequisites
- Node.js 16+ installed
- npm or yarn

### Installation & Run

```bash
# 1. Unzip the downloaded file
unzip nykaa-fashion.zip
cd nykaa-fashion

# 2. Install dependencies
npm install

# 3. Start the development server
npm start
```

The app will open at **http://localhost:3000**

### Build for Production
```bash
npm run build
```

## Tech Stack
- React 18
- Plain CSS (component-scoped)
- Google Fonts: Playfair Display + DM Sans
- No external UI libraries
