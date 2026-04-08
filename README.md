# 📅 Chronicle — Interactive Wall Calendar

> A polished, production-grade interactive wall calendar built for the **TakeUForward Frontend Engineering Challenge**.  
> Designed to feel like a real product — not a coding exercise.

![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react)
![CSS](https://img.shields.io/badge/CSS-Custom%20Design%20System-264de4?style=flat-square&logo=css3)
![No UI Lib](https://img.shields.io/badge/UI%20Library-None-success?style=flat-square)
![localStorage](https://img.shields.io/badge/Persistence-localStorage-orange?style=flat-square)

---

## 🚀 Running Locally

```bash
# 1. Unzip the project and enter the folder
cd chronicle-calendar

# 2. Install dependencies (only needed once)
npm install

# 3. Start the development server
npm start
```

Opens at **http://localhost:3000** automatically.

```bash
# Production build (optional)
npm run build
```

**Requirements:** Node.js v16+ · npm v8+  
Download Node.js: https://nodejs.org (choose the LTS version)

---

## ✨ Features

### Core (Assignment Requirements)
| Feature | Implementation |
|---|---|
| Wall Calendar Aesthetic | Spiral binding, full-bleed hero photography, Playfair Display typography |
| Day Range Selector | Click-and-drag across dates — distinct visual states for start, end, and in-between |
| Notes System | Tabbed notes per month and per selected range, saved as chips for quick access |
| Responsive Design | Desktop side-by-side → tablet stacked → mobile touch-optimized (44px tap targets) |
| localStorage Persistence | All notes survive page refresh via a custom `useLocalStorage` hook |

### Bonus (Going Beyond)
| Feature | Why I Added It |
|---|---|
| **Drag-to-Select** | More natural than two separate clicks — feels like a real calendar product |
| **Flip Animation** | 3D page-turn on month navigation — communicates time moving forward/back |
| **Dynamic Accent Color** | Each month gets its own color scheme — the entire UI reacts to it via CSS variables |
| **Hero Image Skeleton** | Shimmer placeholder while photo loads — eliminates layout shift |
| **Holiday Markers** | Red dot indicators on public holidays — adds real-world utility |
| **Dark Mode** | Full dark theme toggle — a must-have in any modern UI |
| **Jump to Today** | One-click return to current month |
| **Selected Range Panel** | Shows `Jan 5 → Jan 12 (8 days)` with a clear button — explicit UX feedback |
| **Note Chips** | Previews of saved notes — so users know what they've written without switching tabs |

---

## 🗂 Project Structure

```
chronicle-calendar/
├── public/
│   └── index.html
├── src/
│   ├── App.js                          # Entry — renders WallCalendar
│   ├── constants.js                    # Month themes, holidays, date utilities
│   ├── hooks/
│   │   └── useLocalStorage.js          # Custom hook: read on mount, sync on change
│   └── components/
│       └── Calendar/
│           ├── WallCalendar.jsx        # Root — owns all state, composes children
│           ├── HeroSection.jsx         # Hero image, spiral rings, month nav
│           ├── CalendarGrid.jsx        # Day grid, drag selection logic
│           ├── NotesPanel.jsx          # Range display, notes tabs, textarea
│           └── calendar.css            # Full design system (CSS variables)
├── package.json
└── README.md
```

---

## 🧠 Technical Decisions & Why

### Component Architecture
I split the UI into three focused components — `HeroSection`, `CalendarGrid`, and `NotesPanel` — each with a single responsibility. `WallCalendar` is the single source of truth for all state and passes data down via props. This mirrors how real teams structure components: easy to test, easy to hand off.

### Drag Selection (via Pointer Events + Refs)
Drag state is tracked with `useRef` instead of `useState` to avoid re-rendering the entire grid on every mouse-move. Only `onRangeChange` fires when the range meaningfully updates. This keeps drag interaction smooth even on lower-end devices.

### CSS Variables for Theming
Every month has an `--accent` and `--light` color token set on the root element and consumed throughout all child components — no prop drilling required for theming. Switching months updates the entire UI's color scheme in one line.

### useLocalStorage Hook
Rather than scattering `localStorage.getItem` calls, I extracted a reusable `useLocalStorage(key, defaultValue)` hook. It reads from storage on mount and syncs on every change. It silently swallows quota errors so the app never crashes on storage-full devices.

### No External UI Library
Every component, animation, and layout is hand-written CSS. This was intentional — it demonstrates real CSS knowledge rather than the ability to read a component library's docs.

---

## 🛠 Tech Stack

| | Tool |
|---|---|
| Framework | React 18 |
| Styling | Custom CSS with design tokens (no Tailwind, no MUI) |
| Fonts | Playfair Display + DM Sans (Google Fonts) |
| Persistence | `localStorage` via custom hook |
| Images | Unsplash (no API key needed) |
| Build | Create React App |

---

## 📱 Responsive Breakpoints

| Viewport | Layout |
|---|---|
| `> 820px` | Side-by-side: hero image left, calendar + notes right |
| `540px – 820px` | Stacked: hero image top, grid and notes below |
| `< 540px` | Mobile: 40px+ tap targets, optimized font sizes, compact spacing |

---

