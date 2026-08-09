import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { manifesto, overlayWords, statusWords } from '../../../mock';
import { useSectionStatus } from '../../../lib/statusBus';

// Light manifesto section: 4 mono text columns with giant grotesque words
// drifting over them at different scroll speeds.
export default function Manifesto({ showReadMore = false }) {
  const secRef = useRef(null);
  const wordsRef = useRef([]);
  useSectionStatus(secRef, statusWords.thinking);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const el = secRef.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const vh = window.innerHeight;
        const progress = Math.min(1, Math.max(0, (vh - rect.top) / (vh + rect.height)));
        wordsRef.current.forEach((w, i) => {
          if (!w) return;
          const speed = 120 + (i % 4) * 90;
          const dir = i % 2 === 0 ? 1 : -0.6;
          w.style.transform = `translateY(${(0.5 - progress) * speed * dir * 3}px)`;
        });
      });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  const positions = [
    { top: '4%', left: '24%' },
    { top: '14%', left: '2%' },
    { top: '26%', left: '55%' },
    { top: '40%', left: '1%' },
    { top: '52%', left: '40%' },
    { top: '66%', left: '1%' },
    { top: '72%', left: '58%' },
    { top: '82%', left: '52%' },
  ];

  return (
    <section ref={secRef} className="x-sec-light relative overflow-hidden" data-testid="manifesto-section">
      <div className="relative x-pad max-w-[1440px] mx-auto">
        {/* parallax giant words */}
        {overlayWords.map((w, i) => (
          <div
            key={i}
            ref={(el) => (wordsRef.current[i] = el)}
            className="x-ovword xh-giant z-10 text-[#161615] mix-blend-multiply"
            style={positions[i % positions.length]}
          >
            {w}
          </div>
        ))}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10 relative">
          {manifesto.columns.map((col, ci) => (
            <div key={ci} className="space-y-6">
              {col.map((p, pi) => (
                <p key={pi} className="x-body text-[#3c3c38]">
                  {p}
                </p>
              ))}
            </div>
          ))}
        </div>

        {showReadMore && (
          <div className="mt-16 relative z-20">
            <Link to="/about" className="x-label x-underline" data-testid="manifesto-read-more">
              (Read More)
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
