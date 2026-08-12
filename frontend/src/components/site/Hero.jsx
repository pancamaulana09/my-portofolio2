import { lazy, Suspense, useEffect, useState } from 'react';

const Character3D = lazy(() => import('./Character3D'));

function useCityClock(timeZone) {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), 30_000);
    return () => window.clearInterval(id);
  }, []);

  try {
    const parts = new Intl.DateTimeFormat('en-GB', {
      timeZone,
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    }).formatToParts(now);
    const hour = parts.find((part) => part.type === 'hour')?.value ?? '00';
    const minute = parts.find((part) => part.type === 'minute')?.value ?? '00';
    return `${hour}:${minute}`;
  } catch {
    return '00:00';
  }
}

export default function Hero() {
  const surabayaTime = useCityClock('Asia/Jakarta');

  return (
    <section className="x-hero" data-testid="hero-section">
      <div className="x-hero-noise" aria-hidden="true" />
      <div className="x-hero-grain" aria-hidden="true" />
      <div className="x-hero-grid" aria-hidden="true" />

      <div className="x-hero-topline x-label">
        <span><i className="x-hero-signal" aria-hidden="true" /> Independent creative practice</span>
        <span>SBY, ID · {surabayaTime}</span>
      </div>

      <div className="x-hero-3d" data-testid="hero-3d-layer" aria-hidden="true">
        <Suspense fallback={null}>
          <Character3D />
        </Suspense>
      </div>

      <div className="x-hero-copy">
        <p className="x-hero-eyebrow x-label">Panca Maulana — Creative web developer</p>
        <h1 className="x-hero-title" data-testid="hero-giant">
          <span>Digital work</span>
          <span>with a pulse.</span>
        </h1>
        <p className="x-hero-summary">
          I design and build expressive web experiences, product systems, and interactive tools — from the first idea through the final deploy.
        </p>
        <a className="x-hero-cta" href="#selected-work" data-cursor="project">
          <span>Explore selected work</span>
          <span aria-hidden="true">↓</span>
        </a>
      </div>

      <div className="x-hero-bottomline x-label">
        <span>Product · Web · 3D</span>
        <span>Available for selected collaborations</span>
      </div>
    </section>
  );
}
