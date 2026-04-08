# 📅 Chronicle — Interactive Wall Calendar

A polished, production-grade interactive wall calendar built with **React**. Designed for the TakeUForward Frontend Engineering Challenge.

---

## ✨ Features

### Core
- **Wall Calendar Aesthetic** — Spiral binding, full-bleed hero photography per month, Playfair Display typography
- **Drag-to-Select Range** — Click and drag across dates to select a range (also works on touch devices)
- **Selected Range Panel** — Clean display of selected range with day count and a one-click "Clear" button
- **Integrated Notes System** — Tabbed notes for the current month or a selected date range; saved note previews as chips
- **localStorage Persistence** — All notes survive page refresh and browser restarts
- **Fully Responsive** — Side-by-side on desktop → stacked on tablet → touch-optimized on mobile (44px tap targets)

### Standout Polish
- **Flip Animation** — 3D page-turn animation on month navigation
- **Dark / Light Mode** — Full theme toggle, persisted during session
- **Dynamic Accent Color** — Each month has a unique color scheme flowing through the entire UI
- **Image Skeleton Shimmer** — Loading placeholder while hero photo fetches
- **Holiday Markers** — Red dot indicators on public holidays with tooltip on hover
- **Unique Hero Photo Per Month** — 12 curated Unsplash landscape photos
- **"Jump to Today"** — Instantly returns to the current month
- **Note Chips** — Snippets of previously saved notes for quick navigation

---

## 🗂 Project Structure

```
src/
├── App.js
├── constants.js                  # Month themes, holidays, date utils
├── hooks/
│   └── useLocalStorage.js        # Custom hook for localStorage sync
└── components/
    └── Calendar/
        ├── WallCalendar.jsx      # Root orchestrator — state & layout
        ├── HeroSection.jsx       # Hero image, spiral, nav buttons
        ├── CalendarGrid.jsx      # Day grid with drag selection logic
        ├── NotesPanel.jsx        # Range display + notes tabs + textarea
        └── calendar.css          # Full design system (CSS variables, responsive)
```

---

## 🚀 Running Locally

### Prerequisites
- [Node.js](https://nodejs.org/) v16 or higher
- npm (comes with Node.js)

### Steps

```bash
# 1. Clone or download the project
cd chronicle-calendar

# 2. Install dependencies
npm install

# 3. Start the development server
npm start
```

The app opens automatically at **http://localhost:3000**

### Build for production
```bash
npm run build
```
Output goes to the `/build` folder — ready for Netlify / Vercel / GitHub Pages.

---

## 🛠 Tech Stack

| Layer | Choice |
|---|---|
| Framework | React 18 |
| Styling | Custom CSS (CSS variables, no external UI lib) |
| Fonts | Playfair Display + DM Sans (Google Fonts) |
| Persistence | localStorage (via custom `useLocalStorage` hook) |
| Images | Unsplash (no API key required) |
| Build Tool | Create React App |

---

## 🎨 Design Decisions

- **No UI library** — All components are hand-crafted to show CSS mastery
- **CSS Variables** — The `--accent` and `--light` tokens change per month, making theme propagation zero-effort
- **Drag selection uses pointer events + refs** — Avoids unnecessary re-renders during drag; `useRef` tracks drag state, `onRangeChange` fires only on meaningful updates
- **Component split** — `HeroSection`, `CalendarGrid`, and `NotesPanel` are fully decoupled; `WallCalendar` is the single source of truth for state
- **`useLocalStorage` hook** — Handles hydration from storage on mount + sync on every note change; silently swallows storage quota errors

---

## 📱 Responsive Breakpoints

| Breakpoint | Layout |
|---|---|
| > 820px | Side-by-side (hero left, grid+notes right) |
| 540–820px | Stacked (hero top, grid+notes below) |
| < 540px | Mobile-optimized, 40px+ tap targets |

---

