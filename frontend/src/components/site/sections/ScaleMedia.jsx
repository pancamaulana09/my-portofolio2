import React, { useEffect, useRef, useState } from 'react';
import GlitchCanvas from '../GlitchCanvas';
import { loadHeroMedia } from '../../../lib/mediaStore';
import { statusWords } from '../../../mock';
import { useSectionStatus } from '../../../lib/statusBus';

// Sticky scroll sequence: a small centered frame grows to full bleed as you
// scroll (Foundations style). Shows the user's uploaded media if present,
// otherwise the generative glitch signal.
export default function ScaleMedia() {
  const secRef = useRef(null);
  const frameRef = useRef(null);
  const [media, setMedia] = useState(null);
  useSectionStatus(secRef, statusWords.signal);

  useEffect(() => {
    let alive = true;
    let url = null;
    loadHeroMedia().then((blob) => {
      if (alive && blob) {
        url = URL.createObjectURL(blob);
        setMedia({ type: blob.type.startsWith('video') ? 'video' : 'image', url });
      }
    });
    return () => {
      alive = false;
      if (url) URL.revokeObjectURL(url);
    };
  }, []);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const sec = secRef.current;
        const frame = frameRef.current;
        if (!sec || !frame) return;
        const rect = sec.getBoundingClientRect();
        const vh = window.innerHeight;
        const total = rect.height - vh;
        const p = Math.min(1, Math.max(0, -rect.top / (total || 1)));
        const eased = p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2;
        const scale = 0.32 + eased * 0.68;
        frame.style.transform = `scale(${scale})`;
        frame.style.borderRadius = `${(1 - eased) * 6}px`;
      });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section ref={secRef} className="x-scale-sec" data-testid="scale-media-section">
      <div className="x-scale-sticky">
        <span className="x-label text-[#8f8f8a] absolute top-20 left-4">( Signal )</span>
        <div className="x-scale-frame x-hero-scan" ref={frameRef} data-testid="scale-media-frame">
          {!media && <GlitchCanvas />}
          {media?.type === 'image' && <img src={media.url} alt="Your signal" />}
          {media?.type === 'video' && <video src={media.url} autoPlay muted loop playsInline />}
        </div>
        <span className="x-label text-[#8f8f8a] absolute bottom-16 right-4">Raw input, reprocessed</span>
      </div>
    </section>
  );
}
