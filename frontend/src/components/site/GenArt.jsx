import React, { useEffect, useRef } from 'react';

// Static procedural art tiles for the "Generative Code Explorations" grid.
// Each renders once to a canvas — authentic code-generated textures.

function mulberry32(seed) {
  let a = seed >>> 0;
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const RENDERERS = {
  // halftone dot field with drifting density
  dither(ctx, W, H, rnd) {
    ctx.fillStyle = '#0d0d0c';
    ctx.fillRect(0, 0, W, H);
    ctx.fillStyle = '#e6e4de';
    const cell = 7;
    const ox = rnd() * 10;
    for (let y = cell / 2; y < H; y += cell) {
      for (let x = cell / 2; x < W; x += cell) {
        const v =
          0.5 +
          0.5 * Math.sin(x * 0.02 + ox) * Math.cos(y * 0.015 + ox * 2) +
          (rnd() - 0.5) * 0.35;
        const r = Math.max(0, Math.min(cell * 0.48, v * cell * 0.5));
        if (r > 0.4) {
          ctx.beginPath();
          ctx.arc(x, y, r, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    }
  },

  // ASCII density field
  ascii(ctx, W, H, rnd) {
    ctx.fillStyle = '#111110';
    ctx.fillRect(0, 0, W, H);
    const chars = ' .:-=+*#%@';
    ctx.font = '700 11px "Courier Prime", monospace';
    ctx.fillStyle = '#d8d6d0';
    const step = 9;
    const o = rnd() * 6;
    for (let y = step; y < H; y += step) {
      for (let x = 0; x < W; x += step * 0.72) {
        const v =
          0.5 +
          0.45 * Math.sin(x * 0.014 + y * 0.011 + o) * Math.sin(y * 0.021 - o) +
          (rnd() - 0.5) * 0.3;
        const idx = Math.max(0, Math.min(chars.length - 1, Math.floor(v * chars.length)));
        const ch = chars[idx];
        if (ch !== ' ') ctx.fillText(ch, x, y);
      }
    }
  },

  // clustered colored pixel blocks (voxel noise)
  pixels(ctx, W, H, rnd) {
    ctx.fillStyle = '#f0eeea';
    ctx.fillRect(0, 0, W, H);
    const palette = ['#141414', '#1400ff', '#00b84d', '#e8194b', '#f0eeea', '#8db2ff'];
    const cell = 10;
    let hue = 0;
    for (let y = 0; y < H; y += cell) {
      for (let x = 0; x < W; x += cell) {
        if (rnd() > 0.42) {
          hue = rnd() > 0.75 ? Math.floor(rnd() * palette.length) : hue;
          ctx.fillStyle = palette[hue];
          const h = cell * (1 + Math.floor(rnd() * 3));
          ctx.fillRect(x, y, cell - 1, h - 1);
        }
      }
    }
  },

  // warped B/W stripe interference
  waves(ctx, W, H, rnd) {
    ctx.fillStyle = '#0c0c0b';
    ctx.fillRect(0, 0, W, H);
    ctx.fillStyle = '#e8e6e0';
    const o = rnd() * 9;
    for (let x = 0; x < W; x += 2) {
      for (let y = 0; y < H; y += 2) {
        const w =
          Math.sin(y * 0.09 + Math.sin(x * 0.013 + o) * 3.2 + Math.sin(y * 0.004) * 5) > 0.1;
        if (w) ctx.fillRect(x, y, 2, 2);
      }
    }
  },

  // scattered terminal glyph rain
  glyphs(ctx, W, H, rnd) {
    ctx.fillStyle = '#0e0e14';
    ctx.fillRect(0, 0, W, H);
    ctx.font = '700 13px "Courier Prime", monospace';
    const glyphs = '01<>/\\[]{}#*+=-';
    for (let i = 0; i < 900; i++) {
      const x = rnd() * W;
      const y = rnd() * H;
      const d = Math.abs(Math.sin(x * 0.01) * Math.cos(y * 0.008));
      if (rnd() < d) {
        ctx.fillStyle = rnd() > 0.92 ? '#1400ff' : `rgba(220,218,212,${0.25 + d * 0.7})`;
        ctx.fillText(glyphs[Math.floor(rnd() * glyphs.length)], x, y);
      }
    }
  },
};

export default function GenArt({ type = 'dither', seed = 1, ratio = '4 / 3', className = '' }) {
  const ref = useRef(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const W = 560;
    const H = 420;
    canvas.width = W;
    canvas.height = H;
    const ctx = canvas.getContext('2d');
    const rnd = mulberry32(seed * 7919 + 13);
    (RENDERERS[type] || RENDERERS.dither)(ctx, W, H, rnd);
  }, [type, seed]);
  return (
    <div className={`x-tile ${className}`} style={{ aspectRatio: ratio }}>
      <canvas ref={ref} />
    </div>
  );
}
