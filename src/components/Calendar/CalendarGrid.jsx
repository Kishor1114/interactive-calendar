import { useRef, useCallback } from "react";
import {
  WEEK_DAYS, HOLIDAYS,
  getDaysInMonth, getFirstDayOfMonth,
  sameDay, isBetween,
} from "../../constants";

export default function CalendarGrid({
  year, month, theme,
  rangeStart, rangeEnd,
  onRangeChange,
  notes,
  darkMode,
}) {
  const today = new Date();
  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);

  // ── Drag state (refs to avoid re-render overhead) ─────────────────────────
  const isDragging = useRef(false);
  const dragStartDay = useRef(null);

  function dateOf(day) {
    return new Date(year, month, day);
  }

  // ── Pointer handlers (works for mouse AND touch) ───────────────────────────
  const handlePointerDown = useCallback((day) => {
    isDragging.current = true;
    dragStartDay.current = day;
    onRangeChange(dateOf(day), null); // start fresh
  }, [year, month]); // eslint-disable-line

  const handlePointerEnter = useCallback((day) => {
    if (!isDragging.current) return;
    const start = dateOf(dragStartDay.current);
    const end = dateOf(day);
    onRangeChange(
      start <= end ? start : end,
      start <= end ? end : start
    );
  }, [year, month]); // eslint-disable-line

  const handlePointerUp = useCallback((day) => {
    if (!isDragging.current) return;
    isDragging.current = false;
    const start = dateOf(dragStartDay.current);
    const end = dateOf(day);
    if (sameDay(start, end)) {
      // Single tap — keep as start, wait for second tap (fallback UX)
      onRangeChange(start, null);
    } else {
      onRangeChange(
        start <= end ? start : end,
        start <= end ? end : start
      );
    }
  }, [year, month]); // eslint-disable-line

  // Build cell array
  const cells = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  function getDayClasses(day) {
    if (!day) return "cal-day empty";
    const d = dateOf(day);
    const col = (firstDay + day - 1) % 7;
    const isWeekend = col >= 5;
    const isToday = sameDay(d, today);
    const isStart = sameDay(d, rangeStart);
    const isEnd = sameDay(d, rangeEnd);
    const inRange = isBetween(d, rangeStart, rangeEnd);
    const hk = `${month + 1}-${day}`;
    const isHoliday = !!HOLIDAYS[hk];
    const noteKey = `${year}-${month}-${day}`;
    const hasNote = !!(notes[noteKey]);

    let cls = "cal-day";
    if (isWeekend) cls += " weekend";
    if (isToday && !isStart && !isEnd) cls += " today";
    if (isStart) cls += " range-start";
    if (isEnd && !isStart) cls += " range-end";
    if (inRange) cls += " in-range";
    if (isHoliday) cls += " holiday-day";
    if (hasNote) cls += " has-note";
    return cls;
  }

  return (
    <div className="cal-grid-section">
      {/* Day name headers */}
      <div className="cal-daynames">
        {WEEK_DAYS.map((d, i) => (
          <div key={d} className={`cal-dayname${i >= 5 ? " weekend" : ""}`}>
            {d}
          </div>
        ))}
      </div>

      {/* Day cells */}
      <div
        className="cal-days"
        onMouseLeave={() => { isDragging.current = false; }}
      >
        {cells.map((day, i) => {
          if (!day) return <div key={`e-${i}`} className="cal-day empty" />;
          const hk = `${month + 1}-${day}`;
          const holiday = HOLIDAYS[hk];

          return (
            <div
              key={day}
              className={getDayClasses(day)}
              title={holiday || undefined}
              /* Drag/click handlers */
              onMouseDown={() => handlePointerDown(day)}
              onMouseEnter={() => handlePointerEnter(day)}
              onMouseUp={() => handlePointerUp(day)}
              /* Touch support */
              onTouchStart={() => handlePointerDown(day)}
              onTouchEnd={() => handlePointerUp(day)}
              /* Keyboard */
              tabIndex={0}
              role="button"
              aria-label={`${theme.label} ${day}${holiday ? `, ${holiday}` : ""}`}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") handlePointerDown(day);
              }}
            >
              {day}
            </div>
          );
        })}
      </div>
    </div>
  );
}
