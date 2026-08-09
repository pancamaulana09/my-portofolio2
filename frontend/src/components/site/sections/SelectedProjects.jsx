import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import DecodeText from '../DecodeText';
import { projects, studioIntro, statusWords } from '../../../mock';
import { useSectionStatus } from '../../../lib/statusBus';

function ProjectBlock({ p, align }) {
  return (
    <article className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start" data-testid={`project-block-${p.id}`}>
      <div className={`lg:col-span-5 ${align === 'right' ? 'lg:order-2 lg:col-start-8' : ''}`}>
        <div className="x-label text-[#8f8f8a] mb-2">({p.num})</div>
        <DecodeText
          text={p.name}
          as="h3"
          className="xh-big text-current mb-6"
          speed={40}
          testId={`project-title-${p.id}`}
        />
        <p className="x-body text-[#4a4a46] max-w-[42ch] mb-6">{p.description}</p>
        <Link to={`/projects/${p.id}`} className="x-label x-underline" data-testid={`project-link-${p.id}`}>
          View project details
        </Link>
      </div>
      <div className={`lg:col-span-7 ${align === 'right' ? 'lg:order-1 lg:col-start-1' : ''}`}>
        <Link to={`/projects/${p.id}`} className="x-projcard" aria-label={p.name}>
          <img src={p.image} alt={p.name} loading="lazy" />
        </Link>
      </div>
    </article>
  );
}

export default function SelectedProjects({ limit = 3 }) {
  const secRef = useRef(null);
  useSectionStatus(secRef, statusWords.made);
  const list = projects.slice(0, limit);

  return (
    <section ref={secRef} className="x-sec-light" data-testid="selected-projects-section">
      <div className="x-pad max-w-[1440px] mx-auto">
        <div className="flex flex-wrap items-end justify-between gap-6 mb-16">
          <DecodeText text="Selected    Projects" as="h2" className="xh-giant" speed={34} testId="selected-projects-heading" />
          <Link to="/projects" className="x-label x-underline mb-3" data-testid="view-all-projects">
            View All ({projects.length})
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24 max-w-[1100px]">
          {studioIntro.map((p, i) => (
            <p key={i} className="x-body text-[#4a4a46]">
              {p}
            </p>
          ))}
        </div>

        <div className="space-y-28">
          {list.map((p, i) => (
            <ProjectBlock key={p.id} p={p} align={i % 2 === 1 ? 'right' : 'left'} />
          ))}
        </div>
      </div>
    </section>
  );
}
