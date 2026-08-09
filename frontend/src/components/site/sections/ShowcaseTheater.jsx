import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { projects, statusWords } from '../../../mock';
import { useSectionStatus } from '../../../lib/statusBus';

// Full-viewport "theater": big background preview + centered filmstrip
// carousel of project thumbnails (Foundations style), with 2xA glitch
// transitions, mono captions and auto-advance.
export default function ShowcaseTheater() {
  const secRef = useRef(null);
  useSectionStatus(secRef, statusWords.showcase);
  const [active, setActive] = useState(0);
  const [tick, setTick] = useState(0); // retriggers glitch animation
  const hoverRef = useRef(false);
  const stripRef = useRef(null);

  const go = useCallback((idx) => {
    const n = projects.length;
    const next = ((idx % n) + n) % n;
    setActive(next);
    setTick((t) => t + 1);
  }, []);

  // auto-advance every 5s, paused while hovered
  useEffect(() => {
    const iv = setInterval(() => {
      if (!hoverRef.current) go(activeRef.current + 1);
    }, 5000);
    return () => clearInterval(iv);
  }, [go]);
  const activeRef = useRef(active);
  useEffect(() => {
    activeRef.current = active;
    // keep active thumb in view on mobile strips
    const strip = stripRef.current;
    const el = strip?.children?.[active];
    if (el && strip.scrollWidth > strip.clientWidth) {
      el.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    }
  }, [active]);

  const p = projects[active];

  return (
    <section
      ref={secRef}
      className="x-theater"
      data-testid="showcase-theater"
      onMouseEnter={() => (hoverRef.current = true)}
      onMouseLeave={() => (hoverRef.current = false)}
    >
      <div className="x-theater-bg" key={tick}>
        <img src={p.image} alt={p.name} className="x-tear" />
      </div>
      <div className="x-theater-shade" />

      <div className="x-film" ref={stripRef} data-testid="theater-filmstrip">
        {projects.map((pr, i) => (
          <button
            key={pr.id}
            className={`x-thumb ${i === active ? 'active' : ''}`}
            onClick={() => go(i)}
            aria-label={pr.name}
            data-testid={`theater-thumb-${pr.id}`}
          >
            <img src={pr.image} alt="" loading="lazy" />
          </button>
        ))}
      </div>

      <div className="x-theater-foot">
        <div className="flex items-baseline gap-6 md:gap-14 min-w-0">
          <span className="x-label text-[#a8a8a2] whitespace-nowrap">( {p.num} )</span>
          <Link
            to={`/projects/${p.id}`}
            className="x-grot text-xl md:text-2xl font-medium text-[#f0f0ea] x-underline truncate"
            data-testid="theater-caption-link"
          >
            {p.name}
          </Link>
        </div>
        <div className="flex items-center gap-3">
          <button className="x-arrowbtn" onClick={() => go(active - 1)} aria-label="Previous" data-testid="theater-prev">
            <ArrowLeft size={18} />
          </button>
          <button className="x-arrowbtn" onClick={() => go(active + 1)} aria-label="Next" data-testid="theater-next">
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
}
