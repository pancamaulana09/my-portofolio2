import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, ExternalLink } from 'lucide-react';
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion';
import { projects, statusWords } from '../../../mock';
import { useSectionStatus } from '../../../lib/statusBus';

const EASE = [0.22, 1, 0.36, 1];

function EditorialProject({ project, index, reduce, horizontal }) {
  const reveal = reduce || horizontal
    ? {}
    : {
        initial: { opacity: 0, y: 36 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.28 },
        transition: { duration: 0.75, ease: EASE },
      };
  const imageReveal = reduce || horizontal
    ? {}
    : {
        initial: { opacity: 0, scale: 1.12 },
        whileInView: { opacity: 1, scale: 1 },
        viewport: { once: true, amount: 0.24 },
        transition: { duration: 1.15, ease: EASE },
      };
  const detailReveal = reduce || horizontal
    ? {}
    : {
        initial: { opacity: 0, scale: 1.16, y: 20 },
        whileInView: { opacity: 1, scale: 1, y: 0 },
        viewport: { once: true, amount: 0.35 },
        transition: { duration: 0.95, ease: EASE, delay: 0.16 },
      };

  return (
    <article className="x-editorial-project" data-project-index={index} data-testid={`editorial-project-${project.id}`}>
      <div className="x-editorial-project-info">
        <motion.div className="x-editorial-project-copy" {...reveal}>
          <div className="x-editorial-project-meta x-label">
            <span>{project.num}</span>
            <span>{project.year}</span>
            <span>{project.client}</span>
          </div>
          <h3>{project.name}</h3>
          <p>{project.description}</p>
          <div className="x-editorial-project-fields" aria-label="Project disciplines">
            {project.fields.slice(0, 3).map((field) => <span key={field}>{field}</span>)}
          </div>
          <div className="x-editorial-project-links">
            <Link to={`/projects/${project.id}`} viewTransition className="x-editorial-project-link" data-cursor="project">
              Enter case study <ArrowUpRight size={15} />
            </Link>
            {project.link && (
              <a href={project.link} target="_blank" rel="noreferrer" className="x-editorial-project-link x-editorial-project-link--muted">
                Live site <ExternalLink size={13} />
              </a>
            )}
          </div>
        </motion.div>
      </div>

      <div className="x-editorial-project-visual">
        <Link
          to={`/projects/${project.id}`}
          viewTransition
          className="x-editorial-project-main-media"
          aria-label={`Open ${project.name} case study`}
          data-cursor="project"
        >
          <motion.img
            src={project.image}
            alt={project.name}
            loading={index === 0 ? 'eager' : 'lazy'}
            decoding="async"
            draggable={false}
            style={{ viewTransitionName: `project-${project.id}` }}
            {...imageReveal}
          />
          <span className="x-editorial-project-media-label x-label">View project ↗</span>
        </Link>
        <motion.div className="x-editorial-project-detail-media" {...detailReveal} aria-hidden="true">
          <img src={project.image} alt="" loading="lazy" decoding="async" draggable={false} />
          <span className="x-editorial-project-detail-index x-label">{String(index + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}</span>
        </motion.div>
        <div className="x-editorial-project-accent" aria-hidden="true" />
      </div>
    </article>
  );
}

function StudioSplitPanel({ mediaProject, reduce, horizontal }) {
  const mediaReveal = reduce || horizontal
    ? {}
    : {
        initial: { opacity: 0, scale: 1.06 },
        whileInView: { opacity: 1, scale: 1 },
        viewport: { once: true, amount: 0.3 },
        transition: { duration: 0.9, ease: EASE },
      };

  return (
    <article className="x-editorial-split-panel" aria-label="Creative web development practice">
      <div className="x-editorial-split-copy">
        <p className="x-label">Practice note · digital systems</p>
        <h3>Make ideas<br />move<span>.</span></h3>
        <p>I connect interface craft, creative technology and practical engineering to turn a rough brief into a digital experience people can actually use.</p>
        <Link to="/about" className="x-editorial-split-link">About the practice <ArrowUpRight size={16} /></Link>
      </div>

      <div className="x-editorial-split-spine x-label" aria-hidden="true">Creative web development · systems in motion</div>

      <Link
        to={`/projects/${mediaProject.id}`}
        viewTransition
        className="x-editorial-split-media"
        aria-label={`Open ${mediaProject.name} case study`}
        data-cursor="project"
      >
        <motion.img
          src={mediaProject.image}
          alt={mediaProject.name}
          loading="lazy"
          decoding="async"
          draggable={false}
          style={{ viewTransitionName: `project-${mediaProject.id}` }}
          {...mediaReveal}
        />
        <span className="x-editorial-split-media-label x-label">Selected direction · View project ↗</span>
      </Link>
    </article>
  );
}

export default function HorizontalShowcase() {
  const sectionRef = useRef(null);
  const stageRef = useRef(null);
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
    target: stageRef,
    offset: ['start start', 'end end'],
  });
  const x = useTransform(scrollYProgress, [0, 1], [0, -scrollRange]);
  const progressScale = useTransform(scrollYProgress, [0, 1], [0.03, 1]);

  useMotionValueEvent(scrollYProgress, 'change', (value) => {
    if (!isDesktop) return;
    const next = Math.min(projects.length, Math.max(1, Math.round(value * (projects.length - 1)) + 1));
    setActive((current) => (current === next ? current : next));
  });

  useEffect(() => {
    if (isDesktop) return undefined;
    const track = trackRef.current;
    if (!track) return undefined;
    const cards = [...track.querySelectorAll('[data-project-index]')];
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible) setActive(Number(visible.target.dataset.projectIndex) + 1);
    }, { threshold: [0.28, 0.5, 0.72], rootMargin: '-12% 0px -18% 0px' });
    cards.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, [isDesktop]);

  const count = String(projects.length).padStart(2, '0');

  return (
    <section ref={sectionRef} id="selected-work" className={`x-editorial-showcase ${isDesktop ? 'x-editorial-showcase--horizontal' : ''}`} data-testid="horizontal-showcase">
      <div className="x-editorial-showcase-intro x-pad">
        <div>
          <p className="x-label">Selected work · 2021—2025</p>
          <h2>Proof<br /><em>of practice.</em></h2>
        </div>
        <p>Seven products across different systems and audiences. Each one begins with a real problem and ends as something people can use.</p>
      </div>

      <div ref={stageRef} className="x-editorial-showcase-shell" style={isDesktop ? { height: `calc(${scrollRange}px + 100vh)` } : undefined}>
        <div className="x-editorial-showcase-stage">
          <aside className="x-editorial-rail x-label" aria-hidden="true">
            <span>Selected projects</span>
            <span className="x-editorial-rail-line"><motion.i style={isDesktop ? { scaleY: progressScale } : { height: `${(active / projects.length) * 100}%` }} /></span>
            <span>{String(active).padStart(2, '0')} / {count}</span>
          </aside>
          <motion.div ref={trackRef} className="x-editorial-project-list" style={isDesktop ? { x } : undefined}>
            {projects.slice(0, 2).map((project, index) => <EditorialProject key={project.id} project={project} index={index} reduce={reduce} horizontal={isDesktop} />)}
            <StudioSplitPanel mediaProject={projects[4]} reduce={reduce} horizontal={isDesktop} />
            {projects.slice(2).map((project, index) => <EditorialProject key={project.id} project={project} index={index + 2} reduce={reduce} horizontal={isDesktop} />)}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
