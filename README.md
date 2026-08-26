# SlaySkin ✨ AI-Powered Non-Medicated Skincare & Routine Matcher

![SlaySkin Banner](https://images.unsplash.com/photo-1556228720-195a672e8a03?w=1200&auto=format&fit=crop&q=80)

> **SlaySkin** is a skincare diagnostic and product-matching web application featuring an interactive pink aesthetic, computer-vision ML skin analysis, diagnostic quiz, and direct multi-retailer links (Amazon, Nykaa, Sephora, Ulta, YesStyle) for gentle, non-medicated daily essentials.

---

## 🌟 Key Features

### 1. 💖 Dreamy Interactive Pink Aesthetic
- Soft pastel blush & rose gold glassmorphism UI.
- Interactive glowing particle & sparkle canvas background that reacts to mouse movement.
- Smooth animations, micro-interactions, and celebratory confetti effects.

### 2. 📸 Computer-Vision Skin Scanner (Live Camera + Upload)
- Real-time webcam face scanner with oval alignment guide & scan-line animation.
- File upload support (JPG, PNG, WEBP) & pre-calibrated sample face profiles.
- Pixel-level ML metric extraction:
  - **Redness / Erythema Index** (identifies sensitivity/inflammation)
  - **Specular Shine / Sebum Index** (identifies oily T-zones)
  - **Texture Variance** (evaluates pores, roughness, and smoothness)
  - **Radiance Score** (measures natural skin glow)

### 3. 📝 60-Second Diagnostic Skincare Quiz
- Multi-step interactive assessment covering:
  - Midday skin feel (Oily, Combination, Dry, Sensitive, Normal)
  - Top concerns (Acne, Hyperpigmentation / Dark Spots, Dullness, Large Pores, Dehydration, Redness, Fine Lines)
  - Daily sun exposure & lifestyle
  - Routine complexity (Minimalist, Balanced, K-Beauty 6-step)
  - Budget preference & favorite shopping stores

### 4. 📊 Comprehensive SlaySkin Glow Report
- **Overall Slay Score (0-100)** with biological estimated skin age.
- 6-dimension breakdown: Hydration, Texture, Oil Balance, Pore Clarity, Barrier Health, Radiance.
- Clinically-backed **Hero Active Ingredients** tailored to your profile (Niacinamide, Hyaluronic Acid, Centella, Vitamin C, etc.).
- **Ingredients to Avoid / Limit** (pore-clogging comedogenic oils, high fragrance).
- **One-Click Downloadable PDF Glow Card** powered by jsPDF & html2canvas.

### 5. 🛍️ Curated Non-Medicated Product Database & Multi-Store Links
- 100% gentle over-the-counter daily products (Facewashes, Vitamin Serums, Barrier Moisturizers, Sunscreens, Toners) across CeraVe, The Ordinary, Minimalist, COSRX, Beauty of Joseon, Paula's Choice, Neutrogena, Cetaphil, etc.
- Smart Match % badge + "Why it matches your skin" explanations.
- Direct clickable buy/reference links for:
  - 🛒 **Amazon**
  - 🛍️ **Nykaa**
  - 💄 **Sephora**
  - 🏪 **Ulta Beauty**
  - 🌸 **YesStyle**
  - 🌐 **Official Brand Sites**

### 6. 🧴 Step-by-Step AM / PM Routine Builder
- Morning (AM) and Evening (PM) timeline view with application order and pro-tips.
- Interactive step-by-step checklist to track your daily skincare habits.

### 7. 🔬 Ingredient Safety & Comedogenic Scanner
- Paste ingredients from any bottle to scan comedogenic ratings (0 to 5), irritation index, and active benefits.

### 8. 👤 User Authentication & Guest Profiles
- Login, Sign Up, or Instant 1-Click Guest Mode with local storage persistence.

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- npm or yarn

### Installation

```bash
# Clone repository
git clone https://github.com/RidhimaSharma11404/SlaySkin-.git
cd SlaySkin-

# Install dependencies
npm install

# Start development server
npm run dev
```

The application will run at `http://localhost:5173`.

### Production Build

```bash
npm run build
```

---

## 🛠️ Built With

- **React 19** - Modern UI library
- **Vite 8** - Ultra-fast build tool
- **Tailwind CSS v4** - Utility-first styling with custom glassmorphism
- **Lucide React** - High-quality skincare & UI icons
- **Canvas-Confetti** - Celebratory animations
- **jsPDF & html2canvas** - Client-side PDF Glow Card generator
- **HTML5 Canvas & WebRTC** - Live computer-vision face scanning

---

## 📄 Medical Disclaimer
SlaySkin provides cosmetic, over-the-counter skincare reference matching powered by machine learning and does not replace medical dermatological diagnosis or prescription treatments.
