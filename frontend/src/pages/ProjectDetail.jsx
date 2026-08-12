import { useRef } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, ExternalLink } from 'lucide-react';
import DecodeText from '../components/site/DecodeText';
import { ProjectMedia } from '../components/site/ProjectMedia';
import { projects, statusWords } from '../mock';
import { useSectionStatus } from '../lib/statusBus';

export default function ProjectDetail() {
  const { slug } = useParams();
  const sectionRef = useRef(null);
  useSectionStatus(sectionRef, statusWords.made);

  const index = projects.findIndex((project) => project.id === slug);
  if (index < 0) return <Navigate to="/projects" replace />;

  const project = projects[index];
  const previous = projects[(index - 1 + projects.length) % projects.length];
  const next = projects[(index + 1) % projects.length];

  return (
    <main
      ref={sectionRef}
      className="x-project-detail"
      data-testid="project-detail-page"
      style={{ '--project-accent': project.themeText }}
    >
      <section className="x-project-hero x-pad">
        <div className="x-project-hero-head">
          <Link to="/projects" className="x-project-back x-label"><ArrowLeft size={13} /> All work</Link>
          <div className="x-project-meta x-label"><span>{project.num}</span><span>{project.year}</span><span>{project.fields[0]}</span></div>
        </div>

        <div className="x-project-intro">
          <p className="x-project-kicker x-label">{project.client}</p>
          <DecodeText text={project.name} as="h1" className="x-project-title" speed={30} testId="project-detail-title" />
          <p className="x-project-dek">{project.description}</p>
          <div className="x-project-actions">
            {project.link && (
              <a href={project.link} target="_blank" rel="noreferrer" className="x-project-live" data-testid="project-live-link">
                Visit live site <ExternalLink size={14} />
              </a>
            )}
            <span className="x-label">Role — {project.role}</span>
          </div>
        </div>

        <div className="x-project-cover">
          <img
            src={project.image}
            alt={project.name}
            style={{ viewTransitionName: `project-${project.id}` }}
            fetchPriority="high"
          />
          <div className="x-project-cover-caption x-label"><span>Case study</span><span>Scroll to explore ↓</span></div>
        </div>
      </section>

      <section className="x-project-body x-pad">
        <aside className="x-project-facts">
          <div>
            <span className="x-label">Disciplines</span>
            <ul>{project.fields.map((field) => <li key={field}>{field}</li>)}</ul>
          </div>
          <div>
            <span className="x-label">Technology</span>
            <div className="x-project-tech">
              {project.technologies.map((technology) => <span key={technology}>{technology}</span>)}
            </div>
          </div>
        </aside>

        <article className="x-project-story">
          <div className="x-project-story-label x-label">The brief</div>
          <div className="x-project-copy">
            {project.detail.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </div>

          <div className="x-project-features">
            <div className="x-project-story-label x-label">What it delivers</div>
            <ul>
              {project.features.map((feature, featureIndex) => (
                <li key={feature}><span>0{featureIndex + 1}</span><span>{feature}</span></li>
              ))}
            </ul>
          </div>
        </article>
      </section>

      {project.media && (
        <section className="x-project-media-wrap x-pad">
          <ProjectMedia media={project.media} />
        </section>
      )}

      <nav className="x-project-next x-pad" aria-label="Project navigation">
        <Link to={`/projects/${previous.id}`} viewTransition className="x-project-next-link"><span className="x-label">Previous</span><span><ArrowLeft size={16} /> {previous.name}</span></Link>
        <Link to="/projects" className="x-project-next-index x-label">All work</Link>
        <Link to={`/projects/${next.id}`} viewTransition className="x-project-next-link x-project-next-link--right"><span className="x-label">Next</span><span>{next.name} <ArrowRight size={16} /></span></Link>
      </nav>
    </main>
  );
}
