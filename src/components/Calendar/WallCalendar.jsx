import { useState, useCallback } from "react";
import { MONTH_THEMES } from "../../constants";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import HeroSection from "./HeroSection";
import CalendarGrid from "./CalendarGrid";
import NotesPanel from "./NotesPanel";
import "./calendar.css";

export default function WallCalendar() {
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());
  const [rangeStart, setRangeStart] = useState(null);
  const [rangeEnd, setRangeEnd] = useState(null);
  const [flipping, setFlipping] = useState(false);
  const [flipDir, setFlipDir] = useState("next");
  const [darkMode, setDarkMode] = useState(false);

  // ── Persistent notes via localStorage ─────────────────────────────────────
  const [notes, setNotes] = useLocalStorage("chronicle-calendar-notes", {});

  const theme = MONTH_THEMES[month];

  // ── Navigation with flip animation ────────────────────────────────────────
  const navigate = useCallback((dir) => {
    setFlipDir(dir === 1 ? "next" : "prev");
    setFlipping(true);
    setTimeout(() => {
      setMonth((m) => {
        const nm = m + dir;
        if (nm > 11) { setYear((y) => y + 1); return 0; }
        if (nm < 0)  { setYear((y) => y - 1); return 11; }
        return nm;
      });
      setRangeStart(null);
      setRangeEnd(null);
      setFlipping(false);
    }, 380);
  }, []);

  // ── Range change from CalendarGrid ────────────────────────────────────────
  const handleRangeChange = useCallback((start, end) => {
    setRangeStart(start);
    setRangeEnd(end);
  }, []);

  // ── Clear selection ────────────────────────────────────────────────────────
  const handleClearSelection = useCallback(() => {
    setRangeStart(null);
    setRangeEnd(null);
  }, []);

  // ── Save note ─────────────────────────────────────────────────────────────
  const handleSaveNote = useCallback((key, value) => {
    setNotes((prev) => ({ ...prev, [key]: value }));
  }, [setNotes]);

  return (
    <div className={`cal-root ${darkMode ? "dark" : ""}`} style={{ "--accent": theme.accent, "--light": theme.light }}>
      {/* ── Top bar ─────────────────────────────────────────────────────── */}
      <div className="cal-wrapper">
        <div className="cal-topbar">
          <span className="cal-logo">📅 Chronicle</span>
          <div className="topbar-actions">
            <button
              className="icon-btn"
              title={darkMode ? "Switch to light mode" : "Switch to dark mode"}
              onClick={() => setDarkMode((d) => !d)}
              aria-label="Toggle dark mode"
            >
              {darkMode ? "☀️" : "🌙"}
            </button>
            <button
              className="icon-btn"
              title="Jump to today"
              onClick={() => { setYear(today.getFullYear()); setMonth(today.getMonth()); }}
              aria-label="Jump to today"
            >
              ⌂
            </button>
          </div>
        </div>

        {/* ── Main card ───────────────────────────────────────────────────── */}
        <div className={`cal-card ${flipping ? `flip-${flipDir}` : ""}`}>
          <HeroSection
            theme={theme}
            year={year}
            onNavigate={navigate}
          />

          <div className="cal-right">
            <CalendarGrid
              year={year}
              month={month}
              theme={theme}
              rangeStart={rangeStart}
              rangeEnd={rangeEnd}
              onRangeChange={handleRangeChange}
              notes={notes}
              darkMode={darkMode}
            />
            <NotesPanel
              theme={theme}
              year={year}
              month={month}
              rangeStart={rangeStart}
              rangeEnd={rangeEnd}
              onClearSelection={handleClearSelection}
              notes={notes}
              onSaveNote={handleSaveNote}
              darkMode={darkMode}
            />
          </div>
        </div>

        <p className="cal-footer">
          Drag across dates to select a range • Notes auto-saved to browser
        </p>
      </div>
    </div>
  );
}
