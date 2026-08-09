import React, { useEffect, useRef } from 'react';

// Procedural holographic glitch animation — the default hero "video".
// Drifting chromatic blobs on a low-res buffer, blitted in horizontal
// slices with sinusoidal + random displacement for the melting-signal look.
export default function GlitchCanvas({ className = '' }) {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const off = document.createElement('canvas');
    off.width = 300;
    off.height = 168;
    const octx = off.getContext('2d');

    let raf = 0;
    let t = 0;
    let running = true;

    const resize = () => {
      const { clientWidth, clientHeight } = canvas;
      if (clientWidth && clientHeight) {
        canvas.width = clientWidth;
        canvas.height = clientHeight;
      }
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const blobs = Array.from({ length: 7 }, (_, i) => ({
      x: Math.random(),
      y: Math.random(),
      r: 0.28 + Math.random() * 0.42,
      h: (i * 60 + Math.random() * 50) % 360,
      dx: (Math.random() - 0.5) * 0.0022,
      dy: (Math.random() - 0.5) * 0.0022,
      dh: 0.15 + Math.random() * 0.4,
    }));

    const draw = () => {
      if (!running) return;
      t += 1;

      // paint low-res chromatic field
      octx.globalCompositeOperation = 'source-over';
      octx.fillStyle = 'rgba(5,5,8,0.55)';
      octx.fillRect(0, 0, off.width, off.height);
      octx.globalCompositeOperation = 'screen';
      for (const b of blobs) {
        b.x += b.dx;
        b.y += b.dy;
        b.h += b.dh;
        if (b.x < 0 || b.x > 1) b.dx *= -1;
        if (b.y < 0 || b.y > 1) b.dy *= -1;
        const cx = b.x * off.width;
        const cy = b.y * off.height;
        const rad = b.r * off.width;
        const g = octx.createRadialGradient(cx, cy, 0, cx, cy, rad);
        g.addColorStop(0, `hsla(${b.h % 360}, 85%, 42%, 0.55)`);
        g.addColorStop(0.6, `hsla(${(b.h + 45) % 360}, 80%, 30%, 0.22)`);
        g.addColorStop(1, 'hsla(0, 0%, 0%, 0)');
        octx.fillStyle = g;
        octx.fillRect(0, 0, off.width, off.height);
      }

      // glitch-slice blit to full-res canvas
      const W = canvas.width;
      const H = canvas.height;
      if (W && H) {
        const slice = Math.max(3, Math.floor(H / 110));
        const tear = Math.random() < 0.05 ? (Math.random() - 0.5) * W * 0.25 : 0;
        const tearY = Math.random() * H;
        for (let y = 0; y < H; y += slice) {
          let dx =
            Math.sin(y * 0.018 + t * 0.035) * W * 0.018 +
            Math.sin(y * 0.006 - t * 0.012) * W * 0.03;
          if (Math.random() < 0.015) dx += (Math.random() - 0.5) * W * 0.18;
          if (tear && Math.abs(y - tearY) < H * 0.12) dx += tear;
          const sy = (y / H) * off.height;
          const sh = Math.max(1, (slice / H) * off.height);
          ctx.drawImage(off, 0, sy, off.width, sh, dx, y, W, slice + 1);
        }
      }
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, []);

  return <canvas ref={ref} className={className} data-testid="glitch-canvas" />;
}
