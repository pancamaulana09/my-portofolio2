import React, { useRef, useMemo, useState, useEffect, useCallback } from 'react';
import { useScroll, useMotionValueEvent, useReducedMotion } from 'framer-motion';

const IMG_SRC = '/assets/reveal-ride.jpg';

function mulberry32(seed) {
  return function random() {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let value = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    value = (value + Math.imul(value ^ (value >>> 7), 61 | value)) ^ value;
    return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
  };
}

const CURVE = [
  [0, 0.05], [0.04, 0.1], [0.1, 0.2], [0.21, 0.3], [0.36, 0.4],
  [0.5, 0.5], [0.68, 0.6], [0.8, 0.7], [0.92, 0.8], [1, 0.9],
];

function thresholdFor(share) {
  for (let index = 1; index < CURVE.length; index += 1) {
    if (share <= CURVE[index][0]) {
      const [previousShare, previousThreshold] = CURVE[index - 1];
      const [nextShare, nextThreshold] = CURVE[index];
      return previousThreshold + ((share - previousShare) / (nextShare - previousShare)) * (nextThreshold - previousThreshold);
    }
  }
  return 0.9;
}

const ASSEMBLED_AT = 0.94;
const easeOut = (value) => 1 - Math.pow(1 - value, 3);

function buildTiles(columns, rows) {
  const random = mulberry32(2026);
  const total = columns * rows;
  const order = [...Array(total).keys()];

  for (let index = total - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(random() * (index + 1));
    [order[index], order[swapIndex]] = [order[swapIndex], order[index]];
  }

  return order.map((cell, rank) => ({
    col: cell % columns,
    row: Math.floor(cell / columns),
    threshold: thresholdFor((rank + 1) / total),
    offsetX: (random() - 0.5) * 0.8,
    offsetY: (random() - 0.5) * 0.8,
    rotation: (random() - 0.5) * 26,
  }));
}

export default function MosaicReveal() {
  const sectionRef = useRef(null);
  const frameRef = useRef(null);
  const completeImageRef = useRef(null);
  const tileElementsRef = useRef([]);
  const reduceMotion = useReducedMotion();
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 640px)');
    const syncViewport = () => setIsSmallScreen(mediaQuery.matches);
    syncViewport();
    mediaQuery.addEventListener('change', syncViewport);
    return () => mediaQuery.removeEventListener('change', syncViewport);
  }, []);

  const columns = isSmallScreen ? 6 : 8;
  const rows = isSmallScreen ? 9 : 12;
  const tiles = useMemo(() => buildTiles(columns, rows), [columns, rows]);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end end'] });

  const updateMosaic = useCallback((progress) => {
    const frame = frameRef.current;
    if (!frame) return;

    const frameWidth = frame.clientWidth;
    const frameHeight = frame.clientHeight;

    tiles.forEach((tile, index) => {
      const element = tileElementsRef.current[index];
      if (!element) return;

      if (progress < tile.threshold) {
        element.style.visibility = 'hidden';
        return;
      }

      const localProgress = Math.min(1, (progress - tile.threshold) / Math.max(0.06, ASSEMBLED_AT - tile.threshold));
      const easedProgress = easeOut(localProgress);
      const remainingProgress = 1 - easedProgress;

      element.style.visibility = 'visible';
      element.style.opacity = (0.3 + 0.7 * easedProgress).toFixed(3);
      element.style.transform = `translate3d(${(tile.offsetX * frameWidth * remainingProgress).toFixed(1)}px, ${(tile.offsetY * frameHeight * remainingProgress).toFixed(1)}px, 0) rotate(${(tile.rotation * remainingProgress).toFixed(2)}deg) scale(${(1 + 0.14 * remainingProgress).toFixed(3)})`;
      element.style.filter = remainingProgress < 0.01 ? 'none' : `blur(${(7 * remainingProgress).toFixed(1)}px)`;
    });

    if (completeImageRef.current) {
      completeImageRef.current.style.opacity = progress >= ASSEMBLED_AT ? '1' : '0';
    }
  }, [tiles]);

  useMotionValueEvent(scrollYProgress, 'change', updateMosaic);
  useEffect(() => {
    updateMosaic(scrollYProgress.get());
  }, [scrollYProgress, updateMosaic]);

  if (reduceMotion) {
    return (
      <section ref={sectionRef} className="x-mosaic x-mosaic--reduced" data-testid="mosaic-section" aria-label="Off the desk image">
        <div className="x-mosaic-stick">
          <img className="x-mosaic-reduced-image" src={IMG_SRC} alt="Ride log — handlebar view" decoding="async" />
        </div>
      </section>
    );
  }

  return (
    <section ref={sectionRef} className="x-mosaic" data-testid="mosaic-section" aria-label="Off the desk animated image">
      <div className="x-mosaic-stick">
        <div className="x-mosaic-frame x-mosaic-frame--solo" ref={frameRef} data-testid="mosaic-frame">
          {tiles.map((tile, index) => (
            <div
              key={index}
              ref={(element) => { tileElementsRef.current[index] = element; }}
              className="x-mosaic-tile"
              style={{
                left: `${(tile.col / columns) * 100}%`,
                top: `${(tile.row / rows) * 100}%`,
                width: `${100 / columns}%`,
                height: `${100 / rows}%`,
                backgroundImage: `url(${IMG_SRC})`,
                backgroundSize: `${columns * 100}% ${rows * 100}%`,
                backgroundPosition: `${(tile.col / (columns - 1)) * 100}% ${(tile.row / (rows - 1)) * 100}%`,
                visibility: 'hidden',
              }}
            />
          ))}
          <img
            ref={completeImageRef}
            className="x-mosaic-full"
            src={IMG_SRC}
            alt="Ride log — handlebar view"
            draggable={false}
            decoding="async"
          />
        </div>
      </div>
    </section>
  );
}
