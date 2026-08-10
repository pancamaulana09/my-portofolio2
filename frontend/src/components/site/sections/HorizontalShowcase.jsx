import React, { useRef, useState, useEffect, useLayoutEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  useMotionValueEvent,
} from 'framer-motion';
import { ArrowUpRight, ExternalLink } from 'lucide-react';
import { projects, statusWords } from '../../../mock';
import { useSectionStatus } from '../../../lib/statusBus';

const EASE = [0.22, 1, 0.36, 1];

// A single project panel — used by both the pinned (desktop) and the native
// swipe (mobile/reduced-motion) layouts. Entrance reveals fire when the panel
// scrolls into the viewport (works for both horizontal modes via IntersectionObserver).
function PanelCard({ p, index, reduce }) {
  const mediaReveal = reduce
    ? {}
    : {
        initial: { scale: 1.14, opacity: 0 },
        whileInView: { scale: 1, opacity: 1 },
        viewport: { once: true, margin: '0px -8% 0px -8%' },
        transition: { duration: 0.9, ease: EASE },
      };
  const textReveal = reduce
    ? {}
    : {
        initial: { y: 34, opacity: 0 },
        whileInView: { y: 0, opacity: 1 },
        viewport: { once: true, margin: '0px -6% 0px -6%' },
        transition: { duration: 0.7, ease: EASE, delay: 0.08 },
      };

  return (
    <article className="x-hzz-panel" data-testid={`hzz-panel-${p.id}`}>
      <div className="x-hzz-text">
        <div className="x-hzz-num">{p.num}</div>
        <motion.div {...textReveal}>
          <h3 className="x-hzz-name">{p.name}</h3>
          <div className="x-hzz-tags">
            {p.fields.map((f) => (
              <span key={f} className="x-hzz-tag">{f}</span>
            ))}
          </div>
          <p className="x-hzz-desc">{p.description}</p>
          <div className="x-hzz-links">
            <Link to={`/projects/${p.id}`} className="x-hzz-link" data-testid={`hzz-view-${p.id}`}>
              View project <ArrowUpRight size={15} />
            </Link>
            {p.link && (
              <a href={p.link} target="_blank" rel="noreferrer" className="x-hzz-link x-hzz-link--lime">
                Live site <ExternalLink size={13} />
              </a>
            )}
          </div>
        </motion.div>
      </div>

      <div className="x-hzz-media">
        <motion.img src={p.image} alt={p.name} draggable={false} loading={index < 2 ? 'eager' : 'lazy'} {...mediaReveal} />
        <span className="x-hzz-year">{p.year}</span>
      </div>
    </article>
  );
}

export default function HorizontalShowcase() {
  const sectionRef = useRef(null); // tall outer section (drives scroll range)
  const trackRef = useRef(null); // inner flex track (to measure width)
  const reduce = useReducedMotion();
  const [isDesktop, setIsDesktop] = useState(false);
  const [scrollRange, setScrollRange] = useState(0);
  const [active, setActive] = useState(1);

  useSectionStatus(sectionRef, statusWords.showcase);

  // Mode: pinned horizontal only on wide, fine-pointer, motion-ok devices.
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 901px) and (pointer: fine)');
    const rm = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setIsDesktop(mq.matches && !rm.matches);
    update();
    mq.addEventListener('change', update);
    rm.addEventListener('change', update);
    return () => {
      mq.removeEventListener('change', update);
      rm.removeEventListener('change', update);
    };
  }, []);

  // Measure how far the track must travel horizontally.
  const measure = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    setScrollRange(Math.max(0, track.scrollWidth - window.innerWidth));
  }, []);

  useLayoutEffect(() => {
    if (!isDesktop) {
      setScrollRange(0);
      return undefined;
    }
    measure();
    const ro = new ResizeObserver(measure);
    if (trackRef.current) ro.observe(trackRef.current);
    window.addEventListener('resize', measure);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, [isDesktop, measure]);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });
  const x = useTransform(scrollYProgress, [0, 1], [0, -scrollRange]);
  const dotLeft = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);
  const barScale = useTransform(scrollYProgress, [0, 1], [0.04, 1]);

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    const idx = Math.min(projects.length, Math.max(1, Math.round(v * (projects.length - 1)) + 1));
    setActive((prev) => (prev === idx ? prev : idx));
  });

  const count = String(projects.length).padStart(2, '0');

  // ---------- Fallback: native swipe carousel (mobile / reduced-motion) ----------
  if (!isDesktop) {
    return (
      <section ref={sectionRef} className="x-hzz x-hzz--fallback" data-testid="horizontal-showcase">
        <div className="x-hzz-lead x-pad">
          <div className="x-label x-hzz-kicker">Selected Work — swipe →</div>
          <h2 className="x-hzz-title">Selected<br />Work</h2>
        </div>
        <div className="x-hzz-snap" data-testid="hzz-snap">
          {projects.map((p, i) => (
            <div className="x-hzz-snap-item" key={p.id}>
              <PanelCard p={p} index={i} reduce={reduce} />
            </div>
          ))}
          <div className="x-hzz-snap-item x-hzz-end">
            <Link to="/projects" className="x-hzz-endlink" data-testid="hzz-all">
              All projects <ArrowUpRight size={22} />
            </Link>
          </div>
        </div>
      </section>
    );
  }

  // ---------- Pinned horizontal scroll (desktop) ----------
  return (
    <section
      ref={sectionRef}
      className="x-hzz"
      style={{ height: `calc(${scrollRange}px + 100vh)` }}
      data-testid="horizontal-showcase"
    >
      <div className="x-hzz-stage">
        <motion.div ref={trackRef} className="x-hzz-track" style={{ x }}>
          {/* Lead / intro panel */}
          <div className="x-hzz-panel x-hzz-panel--lead">
            <div className="x-label x-hzz-kicker">Selected Work</div>
            <h2 className="x-hzz-title">
              Selected<br />Work<span className="x-hzz-dot-accent">.</span>
            </h2>
            <p className="x-hzz-lead-desc">
              Seven products across IoT, corporate web, e-commerce, safety, community, education and enterprise — carried from concept to a working thing. Scroll to move sideways.
            </p>
            <div className="x-hzz-lead-count x-label">
              <span className="x-hzz-lime">{count}</span> projects
            </div>
          </div>

          {projects.map((p, i) => (
            <PanelCard key={p.id} p={p} index={i} reduce={reduce} />
          ))}

          {/* Closing panel */}
          <div className="x-hzz-panel x-hzz-panel--end">
            <Link to="/projects" className="x-hzz-endlink" data-testid="hzz-all">
              All<br />projects <ArrowUpRight size={40} />
            </Link>
          </div>
        </motion.div>

        {/* Progress + counter */}
        <div className="x-hzz-counter x-label" data-testid="hzz-counter">
          <span className="x-hzz-lime">{String(active).padStart(2, '0')}</span> / {count}
        </div>
        <div className="x-hzz-progress" aria-hidden="true">
          <motion.div className="x-hzz-progress-fill" style={{ scaleX: barScale }} />
          <motion.div className="x-hzz-progress-dot" style={{ left: dotLeft }} />
        </div>
      </div>
    </section>
  );
}
