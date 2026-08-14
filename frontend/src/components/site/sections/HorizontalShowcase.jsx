import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { projects, statusWords } from '../../../mock';
import { useSectionStatus } from '../../../lib/statusBus';

function ProjectMediaPanel({ project, variant, eager = false }) {
  return (
    <article className={`x-work-panel x-work-panel--media x-work-panel--${variant}`}>
      <Link
        to={`/projects/${project.id}`}
        viewTransition
        className="x-work-media-link"
        aria-label={`Open ${project.name} case study`}
        data-cursor="project"
      >
        <img
          src={project.image}
          alt={project.name}
          loading={eager ? 'eager' : 'lazy'}
          decoding="async"
          draggable={false}
          style={{ viewTransitionName: `project-${project.id}` }}
        />
        <span className="x-work-media-caption x-label">
          {project.num} · {project.name} · View project ↗
        </span>
      </Link>
    </article>
  );
}

export default function HorizontalShowcase() {
  const sectionRef = useRef(null);
  const shellRef = useRef(null);
  const trackRef = useRef(null);
  const reducedMotion = useReducedMotion();
  const [isDesktop, setIsDesktop] = useState(false);
  const [scrollRange, setScrollRange] = useState(0);

  useSectionStatus(sectionRef, statusWords.showcase);

  useEffect(() => {
    const desktopQuery = window.matchMedia('(min-width: 901px) and (pointer: fine)');
    const reducedQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const syncMode = () => setIsDesktop(desktopQuery.matches && !reducedQuery.matches);

    syncMode();
    desktopQuery.addEventListener('change', syncMode);
    reducedQuery.addEventListener('change', syncMode);

    return () => {
      desktopQuery.removeEventListener('change', syncMode);
      reducedQuery.removeEventListener('change', syncMode);
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
    target: shellRef,
    offset: ['start start', 'end end'],
  });
  const x = useTransform(scrollYProgress, [0, 1], [0, -scrollRange]);
  const progress = useTransform(scrollYProgress, [0, 1], [0.02, 1]);

  return (
    <section
      ref={sectionRef}
      id="selected-work"
      className={`x-work-narrative${isDesktop ? ' x-work-narrative--horizontal' : ''}`}
      aria-label="Selected work"
      data-testid="selected-work-narrative"
    >
      <div
        ref={shellRef}
        className="x-work-narrative-shell"
        style={isDesktop ? { height: `calc(${scrollRange}px + 100vh)` } : undefined}
      >
        <div className="x-work-narrative-stage">
          <motion.div ref={trackRef} className="x-work-narrative-track" style={isDesktop ? { x } : undefined}>
            <section className="x-work-panel x-work-panel--intro">
              <div className="x-work-panel-kicker x-label">
                <span>Selected work</span>
                <span>2021—2025</span>
              </div>
              <div className="x-work-intro-copy">
                <h2>Work with<br />a point of<br /><em>view.</em></h2>
                <p>Seven shipped products across IoT, enterprise, e-commerce, education and community—built around real requirements, not templates.</p>
                <Link to="/projects" className="x-work-inline-link">Browse all projects <ArrowUpRight size={16} /></Link>
              </div>
              <span className="x-work-panel-foot x-label">Scroll to explore →</span>
            </section>

            <section className="x-work-panel x-work-panel--spine" aria-hidden="true">
              <span>Concept · interface · build · deploy</span>
            </section>

            <ProjectMediaPanel project={projects[0]} variant="portrait" eager />
            <ProjectMediaPanel project={projects[1]} variant="wide" />

            <section className="x-work-panel x-work-panel--statement">
              <span className="x-label">Practice principle</span>
              <div className="x-work-statement-lines" aria-label="Built for the real world">
                <span>Built for</span>
                <span className="is-offset">the real</span>
                <span>world<span className="x-work-dot">.</span></span>
              </div>
            </section>

            <section className="x-work-panel x-work-panel--approach">
              <span className="x-label">Approach</span>
              <h3>From first brief to working system.</h3>
              <div className="x-work-approach-copy">
                <p>Every project moves through the same discipline: define the problem, shape a clear interface, build with the right technology, then tune the experience until it performs in the real world.</p>
                <p>Design and engineering stay connected from the first screen to the final deploy.</p>
              </div>
            </section>

            <section className="x-work-panel x-work-panel--focus">
              <span className="x-label">Focus</span>
              <strong>Systems<br /><em>in motion.</em></strong>
              <span className="x-work-focus-caption x-label">Product · Web · 3D</span>
            </section>

            <ProjectMediaPanel project={projects[4]} variant="landscape" />

            <section className="x-work-panel x-work-panel--finale">
              <div className="x-work-finale-main">
                <span className="x-label">Selected direction · {projects[4].year}</span>
                <h3>{projects[4].name}</h3>
              </div>
              <div className="x-work-finale-aside">
                <p>{projects[4].description}</p>
                <Link to={`/projects/${projects[4].id}`} viewTransition className="x-work-inline-link">Enter case study <ArrowUpRight size={16} /></Link>
              </div>
            </section>
          </motion.div>

          {isDesktop && (
            <div className="x-work-progress" aria-hidden="true">
              <motion.i style={{ scaleX: progress }} />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
