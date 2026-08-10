import React, { useRef, useMemo, useState, useEffect, useCallback } from 'react';
import { useScroll, useMotionValueEvent, useReducedMotion } from 'framer-motion';
import { useSectionStatus } from '../../../lib/statusBus';

const IMG_SRC = '/assets/reveal-ride.jpg';
const WORDS = ['PIECES', 'BECOME', 'PRODUCTS', '—', 'SCROLL', 'TO', 'ASSEMBLE'];

// Deterministic RNG so the mosaic is stable across renders
function mulberry32(seed) {
  return function () {
    seed |= 0; seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Reveal-count curve from the spec: fraction of tiles q -> scroll threshold t
const CURVE = [
  [0, 0.05], [0.04, 0.1], [0.1, 0.2], [0.21, 0.3], [0.36, 0.4],
  [0.5, 0.5], [0.68, 0.6], [0.8, 0.7], [0.92, 0.8], [1, 0.9],
];
function thresholdFor(q) {
  for (let i = 1; i < CURVE.length; i++) {
    if (q <= CURVE[i][0]) {
      const [q0, t0] = CURVE[i - 1];
      const [q1, t1] = CURVE[i];
      return t0 + ((q - q0) / (q1 - q0)) * (t1 - t0);
    }
  }
  return 0.9;
}

const ASSEMBLED_AT = 0.94; // every tile is pixel-perfect by here; image holds after
const easeOut = (x) => 1 - Math.pow(1 - x, 3);

function buildTiles(cols, rows) {
  const rand = mulberry32(2026);
  const total = cols * rows;
  const order = [...Array(total).keys()];
  for (let i = total - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [order[i], order[j]] = [order[j], order[i]];
  }
  return order.map((cell, rank) => ({
    col: cell % cols,
    row: Math.floor(cell / cols),
    t: thresholdFor((rank + 1) / total),
    fx: (rand() - 0.5) * 0.8,
    fy: (rand() - 0.5) * 0.8,
    rot: (rand() - 0.5) * 26,
  }));
}

export default function MosaicReveal() {
  const secRef = useRef(null);
  const frameRef = useRef(null);
  const fullRef = useRef(null);
  const pctRef = useRef(null);
  const tileEls = useRef([]);
  const reduce = useReducedMotion();
  useSectionStatus(secRef, WORDS);

  const [small, setSmall] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 640px)');
    const update = () => setSmall(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  const cols = small ? 6 : 8;
  const rows = small ? 9 : 12;
  const tiles = useMemo(() => buildTiles(cols, rows), [cols, rows]);

  const { scrollYProgress } = useScroll({ target: secRef, offset: ['start start', 'end end'] });

  const update = useCallback(
    (p) => {
      const frame = frameRef.current;
      if (!frame) return;
      const W = frame.clientWidth;
      const H = frame.clientHeight;
      for (let i = 0; i < tiles.length; i++) {
        const el = tileEls.current[i];
        if (!el) continue;
        const cfg = tiles[i];
        if (p < cfg.t) {
          el.style.visibility = 'hidden';
          continue;
        }
        const lp = Math.min(1, (p - cfg.t) / Math.max(0.06, ASSEMBLED_AT - cfg.t));
        const e = easeOut(lp);
        const inv = 1 - e;
        el.style.visibility = 'visible';
        el.style.opacity = (0.3 + 0.7 * e).toFixed(3);
        el.style.transform = `translate3d(${(cfg.fx * W * inv).toFixed(1)}px, ${(cfg.fy * H * inv).toFixed(1)}px, 0) rotate(${(cfg.rot * inv).toFixed(2)}deg) scale(${(1 + 0.14 * inv).toFixed(3)})`;
        el.style.filter = inv < 0.01 ? 'none' : `blur(${(7 * inv).toFixed(1)}px)`;
      }
      // seamless hold: swap to the solid image once fully assembled
      if (fullRef.current) fullRef.current.style.opacity = p >= ASSEMBLED_AT ? '1' : '0';
      if (pctRef.current) pctRef.current.textContent = `${String(Math.min(100, Math.round(p * 100))).padStart(3, '0')}%`;
    },
    [tiles]
  );

  useMotionValueEvent(scrollYProgress, 'change', update);
  useEffect(() => {
    update(scrollYProgress.get());
  }, [update, scrollYProgress]);

  if (reduce) {
    return (
      <section ref={secRef} className="x-sec-dark x-pad flex justify-center" data-testid="mosaic-section">
        <img src={IMG_SRC} alt="Off the desk — ride log" style={{ maxHeight: '80vh' }} />
      </section>
    );
  }

  return (
    <section ref={secRef} className="x-mosaic" data-testid="mosaic-section">
      <div className="x-mosaic-stick">
        <div className="x-mosaic-inner">
          <div className="x-mosaic-copy">
            <div className="x-label text-[#8f8f8a] mb-4">( Fragment ) — Off the desk</div>
            <h2 className="x-mosaic-title">
              Pieces become<br />products<span className="x-blog-dot">.</span>
            </h2>
            <p className="x-mosaic-desc">
              Every build — like every ride — starts scattered. Keep scrolling and watch the fragments find their place.
            </p>
            <div className="x-mosaic-meter x-label">
              <span>Assembly</span>
              <span className="x-blog-lime" ref={pctRef} data-testid="mosaic-progress">000%</span>
            </div>
          </div>

          <div className="x-mosaic-frame" ref={frameRef} data-testid="mosaic-frame">
            {tiles.map((cfg, i) => (
              <div
                key={i}
                ref={(el) => (tileEls.current[i] = el)}
                className="x-mosaic-tile"
                style={{
                  left: `${(cfg.col / cols) * 100}%`,
                  top: `${(cfg.row / rows) * 100}%`,
                  width: `${100 / cols}%`,
                  height: `${100 / rows}%`,
                  backgroundImage: `url(${IMG_SRC})`,
                  backgroundSize: `${cols * 100}% ${rows * 100}%`,
                  backgroundPosition: `${(cfg.col / (cols - 1)) * 100}% ${(cfg.row / (rows - 1)) * 100}%`,
                  visibility: 'hidden',
                }}
              />
            ))}
            <img ref={fullRef} className="x-mosaic-full" src={IMG_SRC} alt="Ride log — handlebar view" draggable={false} />
          </div>
        </div>
      </div>
    </section>
  );
}
