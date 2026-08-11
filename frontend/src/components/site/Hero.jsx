import React, { Suspense, lazy, useEffect, useState } from 'react';

// Heavy WebGL scene is code-split so it never blocks first paint.
const Character3D = lazy(() => import('./Character3D'));

// Simple ticking clock formatted like "JKT(ID) 07 51".
function useCityClock(timeZone) {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 30_000);
    return () => clearInterval(id);
  }, []);
  try {
    const parts = new Intl.DateTimeFormat('en-GB', {
      timeZone,
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    }).formatToParts(now);
    const hh = parts.find((p) => p.type === 'hour')?.value ?? '00';
    const mm = parts.find((p) => p.type === 'minute')?.value ?? '00';
    return `${hh} ${mm}`;
  } catch {
    return '00 00';
  }
}

// Editorial blue hero — full-viewport, black-and-white 3D character in the
// centre, pixel-mono typography, no green accents. Vertical page scroll
// always passes through the canvas on mobile (see Character3D).
export default function Hero() {
  const jkt = useCityClock('Asia/Jakarta');
  const ath = useCityClock('Europe/Athens');

  return (
    <section className="x-hero" data-testid="hero-section">
      {/* Ambient overlays — scanlines + grain, cheap and GPU-friendly. */}
      <div className="x-hero-noise" aria-hidden="true" />
      <div className="x-hero-grain" aria-hidden="true" />
      <div className="x-hero-brackets" aria-hidden="true" />

      {/* Top ticker */}
      <div className="x-hero-ticker" data-testid="hero-ticker">
        <span data-testid="hero-studio-mark">
          <span className="x-hero-ticker-dot" aria-hidden="true" />
          PANCA · STUDIO
        </span>
        <span data-testid="hero-clock-jkt">JKT(ID) {jkt}</span>
        <span data-testid="hero-clock-ath">ATH(GR) {ath}</span>
      </div>

      {/* 3D character stage */}
      <div className="x-hero-3d" data-testid="hero-3d-layer">
        <Suspense fallback={null}>
          <Character3D />
        </Suspense>
      </div>

      {/* Giant editorial type overlapping the character */}
      <h1 className="x-hero-giant" data-testid="hero-giant">Panca</h1>
      <div className="x-hero-giant x-hero-giant--sub" aria-hidden="true">M</div>

      {/* Tagline / role / city rows */}
      <div className="x-hero-rows" data-testid="hero-rows">
        <div className="x-hero-row" data-testid="hero-row-role">
          <div>Product · Web · 3D</div>
          <div style={{ opacity: 0.55 }}>Interactive Direction</div>
        </div>
        <div className="x-hero-row" data-testid="hero-row-tagline">
          <div>Design that ships,</div>
          <div>code that performs.</div>
        </div>
        <div className="x-hero-row" data-testid="hero-row-city">
          <div>Jakarta · Remote</div>
          <div style={{ opacity: 0.55 }}>Available Q1 2026</div>
        </div>
      </div>

      {/* Bottom label strip */}
      <div className="x-hero-strip" data-testid="hero-strip">
        <span>SELECTED WORK</span>
        <span>IN NO PARTICULAR ORDER</span>
      </div>
    </section>
  );
}
