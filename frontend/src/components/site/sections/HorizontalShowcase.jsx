import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, ExternalLink } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import { projects, statusWords } from '../../../mock';
import { useSectionStatus } from '../../../lib/statusBus';

const EASE = [0.22, 1, 0.36, 1];

function EditorialProject({ project, index, reduce }) {
  const reveal = reduce
    ? {}
    : {
        initial: { opacity: 0, y: 36 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.28 },
        transition: { duration: 0.75, ease: EASE },
      };
  const imageReveal = reduce
    ? {}
    : {
        initial: { opacity: 0, scale: 1.12 },
        whileInView: { opacity: 1, scale: 1 },
        viewport: { once: true, amount: 0.24 },
        transition: { duration: 1.15, ease: EASE },
      };
  const detailReveal = reduce
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

export default function HorizontalShowcase() {
  const sectionRef = useRef(null);
  const listRef = useRef(null);
  const reduce = useReducedMotion();
  const [active, setActive] = useState(1);

  useSectionStatus(sectionRef, statusWords.showcase);

  useEffect(() => {
    const list = listRef.current;
    if (!list) return undefined;
    const cards = [...list.querySelectorAll('[data-project-index]')];
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible) setActive(Number(visible.target.dataset.projectIndex) + 1);
    }, { threshold: [0.28, 0.5, 0.72], rootMargin: '-12% 0px -18% 0px' });
    cards.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, []);

  const count = String(projects.length).padStart(2, '0');

  return (
    <section ref={sectionRef} id="selected-work" className="x-editorial-showcase" data-testid="horizontal-showcase">
      <div className="x-editorial-showcase-intro x-pad">
        <div>
          <p className="x-label">Selected work · 2021—2025</p>
          <h2>Proof<br /><em>of practice.</em></h2>
        </div>
        <p>Seven products across different systems and audiences. Each one begins with a real problem and ends as something people can use.</p>
      </div>

      <div className="x-editorial-showcase-shell">
        <aside className="x-editorial-rail x-label" aria-hidden="true">
          <span>Selected projects</span>
          <span className="x-editorial-rail-line"><i style={{ height: `${(active / projects.length) * 100}%` }} /></span>
          <span>{String(active).padStart(2, '0')} / {count}</span>
        </aside>
        <div ref={listRef} className="x-editorial-project-list">
          {projects.map((project, index) => <EditorialProject key={project.id} project={project} index={index} reduce={reduce} />)}
          <div className="x-editorial-end-card">
            <p className="x-label">The full archive</p>
            <Link to="/projects" className="x-editorial-end-link">Browse all work <ArrowUpRight size={28} /></Link>
          </div>
        </div>
      </div>
    </section>
  );
}
