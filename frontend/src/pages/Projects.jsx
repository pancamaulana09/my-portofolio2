import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, ExternalLink } from 'lucide-react';
import DecodeText from '../components/site/DecodeText';
import GiantFooter from '../components/site/sections/GiantFooter';
import { projects, projectsIntro, statusWords } from '../mock';
import { useSectionStatus } from '../lib/statusBus';

export default function Projects() {
  const sectionRef = useRef(null);
  useSectionStatus(sectionRef, statusWords.made);

  return (
    <main data-testid="projects-page" className="x-projects-page">
      <section ref={sectionRef} className="x-projects-intro x-pad">
        <p className="x-label">Selected work · systems with a point of view</p>
        <DecodeText text="Work, made useful." as="h1" className="x-projects-title" speed={30} testId="projects-heading" />
        <div className="x-projects-intro-copy">
          {projectsIntro.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        </div>
      </section>

      <section className="x-projects-list x-pad" aria-label="Project archive">
        {projects.map((project, index) => (
          <article key={project.id} className="x-project-index-item" data-testid={`project-item-${project.id}`}>
            <div className="x-project-index-copy">
              <div className="x-project-index-meta x-label"><span>{project.num}</span><span>{project.year}</span><span>{project.fields[0]}</span></div>
              <DecodeText text={project.name} as="h2" className="x-project-index-title" speed={32} />
              <p>{project.description}</p>
              <div className="x-project-index-actions">
                <Link to={`/projects/${project.id}`} viewTransition className="x-project-index-link" data-testid={`projects-link-${project.id}`} data-cursor="project">
                  Read case study <ArrowUpRight size={15} />
                </Link>
                {project.link && (
                  <a href={project.link} target="_blank" rel="noreferrer" className="x-project-index-external" data-testid={`projects-live-${project.id}`}>
                    Live site <ExternalLink size={13} />
                  </a>
                )}
              </div>
            </div>
            <Link to={`/projects/${project.id}`} viewTransition className="x-project-index-media" aria-label={`Open ${project.name}`} data-cursor="project">
              <img src={project.image} alt={project.name} loading={index < 2 ? 'eager' : 'lazy'} style={{ viewTransitionName: `project-${project.id}` }} />
              <span className="x-project-index-media-label x-label">Open case study ↗</span>
            </Link>
          </article>
        ))}
      </section>
      <GiantFooter tone="dark" />
    </main>
  );
}
