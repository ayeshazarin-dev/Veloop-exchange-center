# VELOOP Rewards — Exchange Center (UI Redesign)

A complete frontend redesign of the **VELOOP Rewards Exchange Center** built with React 19, Vite, Lucide Icons, and Framer Motion. 

This project transforms the exchange experience into a premium, modern, reward-focused **Reward Conversion Vault**, adhering strictly to platform reward conversion logic while avoiding crypto trading/DeFi patterns.

---

## 🌟 Project Overview

The Exchange Center allows VELOOP Rewards users to convert their earned **Gems** into **VEs** (VELOOP virtual reward currency) through predefined conversion opportunities.

### Key Highlights
- 💎 **Reward Conversion Concept**: Engineered specifically as a gamified reward vault rather than a crypto swap/DeFi interface.
- ⚡ **Real-time Balance & State Management**: Deducts Gems and adds VEs dynamically upon user confirmation with double-conversion prevention.
- 🎨 **Premium Aesthetic**: Deep navy dark mode (`#161827`), glassmorphism, Framer Motion animations, and custom visual reward indicators.
- 📱 **Fully Responsive Layout**: Smooth, adaptive display across mobile (320px+), tablet, laptop, and 4K displays (1920px+).

---

## 🚀 Features

1. **Hero Header (`ExchangeHero`)**
   - Premium headline, subtitle, and trust badges (*Secure conversion*, *Reward focused*, *Instant balance update*).
   - Animated 3D-styled Gem $\rightarrow$ VE reward orbital visual using Framer Motion.

2. **User Balance Overview (`BalanceOverview`)**
   - Live displays for **Available Gems**, **Available VEs**, and **Total Successful Conversions**.
   - Interactive `ⓘ` info triggers and tooltips explaining how rewards work.

3. **Exchange Cards & Vault (`ExchangeCard`)**
   - Clear conversion rates (e.g. 28 Gems $\rightarrow$ 151 VEs, 39 Gems $\rightarrow$ 230 VEs).
   - **Insufficient Gems Handler**: Dynamically calculates missing Gems and presents an *"Earn More Gems"* CTA with warning badges.

4. **Confirmation Modal (`ExchangeModal`)**
   - Displays exact Gems to deduct, VEs to receive, and calculated post-conversion balances.
   - Closed via overlay click, Close button, or `Escape` keyboard key.

5. **Celebration Success Modal (`ConversionSuccess`)**
   - Spring checkmark animation, celebratory burst, and converted summary.

6. **Recent Conversions Activity (`ExchangeHistory`)**
   - Compact history list featuring timestamp badges and status indicators (`Completed`, `Pending`, `Failed`).

7. **How Exchange Works Walkthrough (`HowExchangeWorks`)**
   - 5-step visual process: `01 Earn Gems` $\rightarrow$ `02 Choose Conversion` $\rightarrow$ `03 Review Exchange` $\rightarrow$ `04 Confirm` $\rightarrow$ `05 Receive VEs`.

8. **Fallback States & Demo Controls**
   - Custom VELOOP-themed animated loader (`ExchangeLoader`).
   - Friendly empty state and error retry handlers.
   - Interactive preview toolbar to test Empty & Error states on the fly.

---

## 📐 Component Architecture

```
src/
├── components/
│   └── exchange/
│       ├── ExchangeHero.jsx       # Hero header & orbital visual
│       ├── BalanceOverview.jsx    # User balance cards & info triggers
│       ├── ExchangeCard.jsx       # Conversion option card & insufficient state
│       ├── ExchangeModal.jsx      # Confirmation modal with balance projection
│       ├── ConversionSuccess.jsx  # Celebratory success modal
│       ├── ExchangeHistory.jsx    # Recent activity list
│       ├── ExchangeRules.jsx      # Platform rules & terms
│       ├── HowExchangeWorks.jsx   # 5-step visual walkthrough
│       ├── ExchangeLoader.jsx     # Custom animated vault loader
│       └── InfoModal.jsx          # Interactive reward explanation modal
├── pages/
│   └── ExchangeCenter/
│       ├── ExchangeCenter.jsx     # Main orchestrator page
│       └── ExchangeCenter.module.css # CSS module design system
├── data/
│   └── exchangeData.js            # Predefined exchange rates & rules
├── styles/
│   └── global.css                 # Base theme styles
└── main.jsx                       # Application entry point
```

---

## 🛠️ Technology Stack

- **Core**: React 19, Vite 7
- **Styling**: CSS Modules (`.module.css`), Bootstrap 5 CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Typography**: Space Grotesk & DM Sans (via Google Fonts)

---

## 💻 Local Development Setup

### Prerequisites
- Node.js 18+ and npm installed.

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/your-username/veloop-exchange-center.git

# 2. Navigate to project directory
cd veloop-exchange-center

# 3. Install dependencies
npm install

# 4. Start local development server
npm run dev
```

The application will be accessible at `http://localhost:5173`.

---

## 📦 Build & Deployment

### Production Build

```bash
# Build for production
npm run build
```

This compiles optimized assets into the `dist/` directory.

### Preview Build Locally

```bash
npm run preview
```

### Deployment (Vercel / Netlify)
- **Vercel**: Import the GitHub repository on Vercel. Framework preset: `Vite`. Build command: `npm run build`. Output directory: `dist`.
- **Netlify**: Import repository, set build command `npm run build` and publish directory `dist`.

---

## 📄 License
This project is developed for the VELOOP Rewards Exchange Center UI Redesign.
