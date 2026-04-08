import { useState, useEffect } from "react";

export default function HeroSection({ theme, year, onNavigate }) {
  const [imgLoaded, setImgLoaded] = useState(false);

  // Reset skeleton on month change
  useEffect(() => setImgLoaded(false), [theme.img]);

  return (
    <div className="cal-hero">
      {/* Spiral binding */}
      <div className="cal-spiral" aria-hidden="true">
        {Array.from({ length: 16 }).map((_, i) => (
          <div key={i} className="spiral-ring" />
        ))}
      </div>

      {/* Image skeleton shimmer */}
      {!imgLoaded && <div className="img-skeleton" aria-hidden="true" />}

      <img
        key={theme.img}
        src={theme.img}
        alt={`${theme.label} scenery`}
        className={`cal-hero-img ${imgLoaded ? "loaded" : "loading"}`}
        onLoad={() => setImgLoaded(true)}
      />
      <div className="cal-hero-overlay" />

      {/* Nav buttons */}
      <div className="cal-hero-nav">
        <button
          className="nav-btn"
          onClick={() => onNavigate(-1)}
          aria-label="Previous month"
        >
          ‹
        </button>
        <button
          className="nav-btn"
          onClick={() => onNavigate(1)}
          aria-label="Next month"
        >
          ›
        </button>
      </div>

      {/* Month / Year title */}
      <div className="cal-hero-title">
        <div className="cal-hero-year">{year}</div>
        <div className="cal-hero-month">{theme.label}</div>
      </div>
    </div>
  );
}
