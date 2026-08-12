import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { projects } from '../../../mock';

export default function ProofGrid() {
  return (
    <section className="x-proof" data-testid="proof-grid">
      <div className="x-proof-inner">
        <header className="x-proof-head">
          <div>
            <p className="x-label">Selected proof</p>
            <h2>Built for<br /><em>the real world.</em></h2>
          </div>
          <p className="x-proof-intro">A compact index of products, systems, and experiments carried from brief to working experience.</p>
        </header>

        <div className="x-proof-grid" aria-label="Selected project proof">
          {projects.map((project) => (
            <Link
              key={project.id}
              to={`/projects/${project.id}`}
              viewTransition
              className="x-proof-tile"
              data-cursor="project"
              aria-label={`Open ${project.name} case study`}
            >
              <img src={project.image} alt="" loading="lazy" aria-hidden="true" />
              <div className="x-proof-tile-noise" aria-hidden="true" />
              <div className="x-proof-tile-copy">
                <span className="x-label">{project.num} · {project.year}</span>
                <strong>{project.name}</strong>
                <span>{project.fields[0]}</span>
              </div>
              <ArrowUpRight className="x-proof-tile-arrow" size={20} aria-hidden="true" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
