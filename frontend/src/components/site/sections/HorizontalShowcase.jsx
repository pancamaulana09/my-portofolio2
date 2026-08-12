import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion';
import { ArrowUpRight, ExternalLink } from 'lucide-react';
import { projects, statusWords } from '../../../mock';
import { useSectionStatus } from '../../../lib/statusBus';

const EASE = [0.22, 1, 0.36, 1];

function PanelCard({ project, index, reduce }) {
  const mediaReveal = reduce
    ? {}
    : {
        initial: { scale: 1.06, opacity: 0 },
        whileInView: { scale: 1, opacity: 1 },
        viewport: { once: true, margin: '0px -8% 0px -8%' },
        transition: { duration: 0.8, ease: EASE },
      };
  const textReveal = reduce
    ? {}
    : {
        initial: { y: 24, opacity: 0 },
        whileInView: { y: 0, opacity: 1 },
        viewport: { once: true, margin: '0px -6% 0px -6%' },
        transition: { duration: 0.65, ease: EASE, delay: 0.08 },
      };

  return (
    <article className="x-hzz-panel" data-testid={`hzz-panel-${project.id}`}>
      <motion.div className="x-hzz-text" {...textReveal}>
        <div className="x-hzz-meta x-label">
          <span>{project.num}</span>
          <span>{project.year}</span>
          <span>{project.client}</span>
        </div>
        <h3 className="x-hzz-name">{project.name}</h3>
        <p className="x-hzz-desc">{project.description}</p>
        <div className="x-hzz-tags" aria-label="Project disciplines">
          {project.fields.slice(0, 3).map((field) => (
            <span key={field} className="x-hzz-tag">{field}</span>
          ))}
        </div>
        <div className="x-hzz-links">
          <Link to={`/projects/${project.id}`} viewTransition className="x-hzz-link" data-testid={`hzz-view-${project.id}`} data-cursor="project">
            Enter case study <ArrowUpRight size={15} />
          </Link>
          {project.link && (
            <a href={project.link} target="_blank" rel="noreferrer" className="x-hzz-link x-hzz-link--secondary">
              Live site <ExternalLink size={13} />
            </a>
          )}
        </div>
      </motion.div>

      <Link to={`/projects/${project.id}`} viewTransition className="x-hzz-media" aria-label={`Open ${project.name} case study`} data-cursor="project">
        <motion.img
          src={project.image}
          alt={project.name}
          draggable={false}
          loading={index < 2 ? 'eager' : 'lazy'}
          style={{ viewTransitionName: `project-${project.id}` }}
          {...mediaReveal}
        />
        <span className="x-hzz-image-label x-label">View project ↗</span>
      </Link>
    </article>
  );
}

export default function HorizontalShowcase() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const reduce = useReducedMotion();
  const [isDesktop, setIsDesktop] = useState(false);
  const [scrollRange, setScrollRange] = useState(0);
  const [active, setActive] = useState(1);

  useSectionStatus(sectionRef, statusWords.showcase);

  useEffect(() => {
    const desktop = window.matchMedia('(min-width: 901px) and (pointer: fine)');
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setIsDesktop(desktop.matches && !reduced.matches);
    update();
    desktop.addEventListener('change', update);
    reduced.addEventListener('change', update);
    return () => {
      desktop.removeEventListener('change', update);
      reduced.removeEventListener('change', update);
    };
  }, []);

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
    const observer = new ResizeObserver(measure);
    if (trackRef.current) observer.observe(trackRef.current);
    window.addEventListener('resize', measure);
    return () => {
      observer.disconnect();
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

  useMotionValueEvent(scrollYProgress, 'change', (value) => {
    const next = Math.min(projects.length, Math.max(1, Math.round(value * (projects.length - 1)) + 1));
    setActive((current) => (current === next ? current : next));
  });

  const count = String(projects.length).padStart(2, '0');
  const lead = (
    <div className="x-hzz-panel x-hzz-panel--lead">
      <p className="x-hzz-kicker x-label">Selected work · 2021—2025</p>
      <h2 className="x-hzz-title">Proof<br />of practice<span>.</span></h2>
      <p className="x-hzz-lead-desc">
        Seven products across different systems and audiences. Each one begins with a real problem and ends as something people can use.
      </p>
      <div className="x-hzz-lead-count x-label"><strong>{count}</strong> project stories</div>
    </div>
  );

  if (!isDesktop) {
    return (
      <section ref={sectionRef} id="selected-work" className="x-hzz x-hzz--fallback" data-testid="horizontal-showcase">
        <div className="x-hzz-lead x-pad">{lead}</div>
        <div className="x-hzz-snap" data-testid="hzz-snap">
          {projects.map((project, index) => (
            <div className="x-hzz-snap-item" key={project.id}>
              <PanelCard project={project} index={index} reduce={reduce} />
            </div>
          ))}
          <div className="x-hzz-snap-item x-hzz-end">
            <Link to="/projects" className="x-hzz-endlink">Browse all work <ArrowUpRight size={22} /></Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      ref={sectionRef}
      id="selected-work"
      className="x-hzz"
      style={{ height: `calc(${scrollRange}px + 100vh)` }}
      data-testid="horizontal-showcase"
    >
      <div className="x-hzz-stage">
        <motion.div ref={trackRef} className="x-hzz-track" style={{ x }}>
          {lead}
          {projects.map((project, index) => <PanelCard key={project.id} project={project} index={index} reduce={reduce} />)}
          <div className="x-hzz-panel x-hzz-panel--end">
            <Link to="/projects" className="x-hzz-endlink">Browse<br />all work <ArrowUpRight size={40} /></Link>
          </div>
        </motion.div>

        <div className="x-hzz-counter x-label" data-testid="hzz-counter"><strong>{String(active).padStart(2, '0')}</strong> / {count}</div>
        <div className="x-hzz-progress" aria-hidden="true">
          <motion.div className="x-hzz-progress-fill" style={{ scaleX: barScale }} />
          <motion.div className="x-hzz-progress-dot" style={{ left: dotLeft }} />
        </div>
      </div>
    </section>
  );
}
