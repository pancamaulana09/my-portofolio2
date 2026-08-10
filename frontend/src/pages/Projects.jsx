import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink } from 'lucide-react';
import DecodeText from '../components/site/DecodeText';
import GiantFooter from '../components/site/sections/GiantFooter';
import { projects, projectsIntro, statusWords } from '../mock';
import { useSectionStatus } from '../lib/statusBus';

export default function Projects() {
  const secRef = useRef(null);
  useSectionStatus(secRef, statusWords.made);

  return (
    <main data-testid="projects-page">
      <section ref={secRef} className="x-sec-light min-h-screen">
        <div className="x-pad pt-32 max-w-[1440px] mx-auto">
          <DecodeText
            text="Selected    Projects"
            as="h1"
            className="xh-giant mb-16"
            speed={30}
            testId="projects-heading"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-28 max-w-[1100px]">
            {projectsIntro.map((p, i) => (
              <p key={i} className="x-body text-[#4a4a46]">
                {p}
              </p>
            ))}
          </div>

          <div className="space-y-28">
            {projects.map((p, i) => (
              <article
                key={p.id}
                className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start"
                data-testid={`project-item-${p.id}`}
              >
                <div className={`lg:col-span-5 ${i % 2 === 1 ? 'lg:order-2 lg:col-start-8' : ''}`}>
                  <div className="x-label text-[#8f8f8a] mb-2">({p.num})</div>
                  <DecodeText text={p.name} as="h2" className="xh-big mb-4" speed={40} />
                  <div className="x-projtags">
                    {p.fields.map((f) => (
                      <span key={f} className="x-projtag">{f}</span>
                    ))}
                  </div>
                  <p className="x-body text-[#4a4a46] max-w-[42ch] mb-6">{p.description}</p>
                  <div className="flex items-center gap-6 flex-wrap">
                    <Link to={`/projects/${p.id}`} className="x-label x-underline" data-testid={`projects-link-${p.id}`}>
                      View project details
                    </Link>
                    {p.link && (
                      <a
                        href={p.link}
                        target="_blank"
                        rel="noreferrer"
                        className="x-label x-underline inline-flex items-center gap-1.5"
                        data-testid={`projects-live-${p.id}`}
                      >
                        <ExternalLink size={12} /> Live site
                      </a>
                    )}
                  </div>
                </div>
                <div className={`lg:col-span-7 ${i % 2 === 1 ? 'lg:order-1 lg:col-start-1' : ''}`}>
                  <Link to={`/projects/${p.id}`} className="x-projcard" aria-label={p.name}>
                    <img src={p.image} alt={p.name} loading="lazy" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      <GiantFooter tone="light" />
    </main>
  );
}
