# Ishika Photography — Website

> Premium luxury bridal makeup & beauty salon website built with vanilla HTML, CSS & JavaScript.

---

## 📁 Project Structure

```
├── index.html                  ← Main landing page
├── assets/
│   ├── css/
│   │   ├── global.css          ← Master entry (imports all modules)
│   │   ├── variables.css       ← Design tokens & CSS custom properties
│   │   ├── navbar.css
│   │   ├── hero.css
│   │   ├── services.css
│   │   ├── about.css
│   │   ├── gallery.css
│   │   ├── packages.css
│   │   ├── why-us.css
│   │   ├── testimonials.css
│   │   ├── appointment.css
│   │   ├── contact.css
│   │   ├── footer.css
│   │   ├── dark-theme.css
│   │   └── responsive.css
│   ├── js/
│   │   ├── main.js             ← ES Module entry point
│   │   ├── utils.js
│   │   ├── theme.js
│   │   ├── navbar.js
│   │   ├── animations.js
│   │   ├── testimonials.js
│   │   ├── lightbox.js
│   │   ├── form.js
│   │   └── interactions.js
│   └── images/
│       ├── hero/
│       ├── services/
│       ├── gallery/
│       ├── why-us/
│       └── instagram/
└── README.md
```

## 🛠 Tech Stack

| Layer     | Tech                              |
|-----------|-----------------------------------|
| Structure | Semantic HTML5                    |
| Styling   | Vanilla CSS (15 modular files)    |
| Logic     | Vanilla JS ES6 Modules           |
| Icons     | Lucide Icons (CDN)               |
| Fonts     | Playfair Display + Poppins (Google Fonts) |

## 🎨 Features

- ✅ Fully responsive (mobile → desktop)
- ✅ Dark / Light mode toggle with localStorage
- ✅ Scroll-reveal animations (IntersectionObserver)
- ✅ Gallery lightbox
- ✅ Testimonials slider with auto-advance
- ✅ Scroll progress indicator
- ✅ Back-to-top button
- ✅ SEO optimized (meta tags, structured data, semantic HTML)
- ✅ WhatsApp booking integration
- ✅ Premium luxury design aesthetic

## 🚀 How to Run

1. Open `index.html` in any modern browser.
2. Or use a local server:
   ```bash
   npx serve .
   ```

---

## 🔮 Future Roadmap

### Phase 1: Data-Driven Architecture (CMS-Ready)

Convert all repeating content (Services, Packages, Testimonials, Why Choose Us) from hardcoded HTML into a central `data.json` file with JavaScript renderers.

**Architecture:**
```
Present:   Website → fetch('data.json')      → Render content
Future:    Website → fetch('api.cms.io/...')  → Same render code
```

**Files to create:**
- `assets/data/data.json` — Central content store (prices, images, text)
- `assets/js/renderers.js` — Plugin modules that read JSON & inject HTML

**Benefits:**
- Change prices, images, text without touching HTML
- Non-developers can edit `data.json` safely
- 1-line change to migrate to any Headless CMS (Strapi, Sanity, Contentful)
- JSON is universal — works with every backend

**`data.json` structure preview:**
```json
{
  "services": [
    {
      "id": "bridal",
      "title": "Bridal Makeup",
      "badge": "BRIDAL",
      "price": "Starting From ₹XXXX",
      "image": "assets/images/services/bridal.png",
      "description": "Premium HD bridal makeup for your special day."
    }
  ],
  "packages": [
    {
      "name": "Gold",
      "price": "Rs. XXXX",
      "featured": true,
      "badge": "Most Popular",
      "features": ["Bridal Makeup", "Luxury Hairstyle", "Premium Products"]
    }
  ],
  "testimonials": [...],
  "whyChooseUs": [...]
}
```

### Phase 2: Full CMS Integration
- Connect to a headless CMS (Strapi / Sanity)
- Admin panel for live content updates
- Image upload via CMS dashboard

### Phase 3: Multi-Page Expansion
- Individual service pages
- Blog / beauty tips section
- Online booking system with calendar
