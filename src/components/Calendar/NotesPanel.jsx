import { useState, useEffect } from "react";
import { formatRange, formatDateShort } from "../../constants";

export default function NotesPanel({
  theme,
  year, month,
  rangeStart, rangeEnd,
  onClearSelection,
  notes, onSaveNote,
  darkMode,
}) {
  const monthKey = `${year}-${month}`;
  const rangeKey = rangeStart && rangeEnd
    ? `range-${rangeStart.toDateString()}-${rangeEnd.toDateString()}`
    : null;

  const [activeTab, setActiveTab] = useState("month");
  const [draft, setDraft] = useState("");
  const [saved, setSaved] = useState(false);

  // Switch to range tab automatically when range is selected
  useEffect(() => {
    if (rangeKey) setActiveTab(rangeKey);
    else setActiveTab("month");
  }, [rangeKey]);

  // Sync draft with stored note for active tab
  useEffect(() => {
    const key = activeTab === "month" ? monthKey : activeTab;
    setDraft(notes[key] || "");
    setSaved(false);
  }, [activeTab, monthKey, notes]);

  function handleSave() {
    const key = activeTab === "month" ? monthKey : activeTab;
    onSaveNote(key, draft);
    setSaved(true);
    setTimeout(() => setSaved(false), 1800);
  }

  // Collect saved notes for chip display
  const savedEntries = Object.entries(notes)
    .filter(([, v]) => v && v.trim())
    .slice(0, 5);

  const rangeLabel = rangeStart && rangeEnd
    ? formatRange(rangeStart, rangeEnd)
    : rangeStart
    ? `From ${formatDateShort(rangeStart)} — pick end date`
    : null;

  return (
    <div className="cal-panel">
      {/* ── Range display panel ─────────────────────────────────────── */}
      <div className="range-panel">
        <div className="range-panel-inner">
          {rangeLabel ? (
            <>
              <div className="range-label-row">
                <span className="range-icon">📌</span>
                <div>
                  <div className="range-title">Selected Range</div>
                  <div className="range-value">{rangeLabel}</div>
                </div>
              </div>
              <button
                className="clear-btn"
                onClick={onClearSelection}
                aria-label="Clear selection"
              >
                ✕ Clear
              </button>
            </>
          ) : (
            <div className="range-empty">
              <span className="range-icon muted">🖱</span>
              <span className="range-hint">Drag across dates to select a range</span>
            </div>
          )}
        </div>
      </div>

      {/* ── Notes section ────────────────────────────────────────────── */}
      <div className="cal-notes">
        <div className="notes-header">
          <span className="notes-label">Notes</span>
          <div className="tab-bar">
            <button
              className={`tab-btn ${activeTab === "month" ? "active" : ""}`}
              onClick={() => setActiveTab("month")}
            >
              Month
            </button>
            {rangeKey && (
              <button
                className={`tab-btn ${activeTab === rangeKey ? "active" : ""}`}
                onClick={() => setActiveTab(rangeKey)}
              >
                Range
              </button>
            )}
          </div>
        </div>

        {/* Saved chips */}
        {savedEntries.length > 0 && (
          <div className="note-chips">
            {savedEntries.map(([k, v]) => (
              <button
                key={k}
                className="note-chip"
                title={v}
                onClick={() => setActiveTab(k)}
              >
                {v.slice(0, 20)}{v.length > 20 ? "…" : ""}
              </button>
            ))}
          </div>
        )}

        <textarea
          className="notes-textarea"
          placeholder={
            activeTab === "month"
              ? `Plans for ${theme.label}…`
              : `Notes for ${rangeLabel}…`
          }
          value={draft}
          onChange={(e) => { setDraft(e.target.value); setSaved(false); }}
          rows={4}
        />

        <div className="notes-footer">
          <span className="char-count">{draft.length} chars</span>
          <button
            className={`save-btn ${saved ? "saved" : ""}`}
            onClick={handleSave}
            disabled={saved}
          >
            {saved ? "✓ Saved!" : "Save note"}
          </button>
        </div>
      </div>
    </div>
  );
}
