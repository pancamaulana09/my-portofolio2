import React, { useRef } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, ExternalLink } from 'lucide-react';
import DecodeText from '../components/site/DecodeText';
import GenArt from '../components/site/GenArt';
import { ProjectMedia } from '../components/site/ProjectMedia';
import { projects, statusWords } from '../mock';
import { useSectionStatus } from '../lib/statusBus';

export default function ProjectDetail() {
  const { slug } = useParams();
  const secRef = useRef(null);
  useSectionStatus(secRef, statusWords.made);

  const idx = projects.findIndex((p) => p.id === slug);
  if (idx === -1) return <Navigate to="/projects" replace />;
  const p = projects[idx];
  const next = projects[(idx + 1) % projects.length];
  const prev = projects[(idx - 1 + projects.length) % projects.length];

  return (
    <main ref={secRef} data-testid="project-detail-page" style={{ background: p.theme, color: p.themeText }}>
      <section className="min-h-screen x-pad pt-32 max-w-[1440px] mx-auto">
        <div className="x-label opacity-70 mb-3">({p.num}) — {p.year}</div>
        <DecodeText text={p.name} as="h1" className="xh-giant mb-6" speed={36} testId="project-detail-title" />

        {p.link && (
          <a
            href={p.link}
            target="_blank"
            rel="noreferrer"
            className="x-label x-underline inline-flex items-center gap-2 mb-12"
            data-testid="project-live-link"
            style={{ opacity: 0.95 }}
          >
            <ExternalLink size={13} /> Visit live site
          </a>
        )}
        {!p.link && <div className="mb-12" />}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-20">
          <div className="lg:col-span-3 space-y-6">
            <div>
              <div className="x-label opacity-60 mb-1">Category</div>
              <div className="x-label">{p.client}</div>
            </div>
            <div>
              <div className="x-label opacity-60 mb-1">Fields</div>
              {p.fields.map((f) => (
                <div key={f} className="x-label">{f}</div>
              ))}
            </div>
            {p.technologies && p.technologies.length > 0 && (
              <div>
                <div className="x-label opacity-60 mb-1">Technologies</div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {p.technologies.map((t) => (
                    <span key={t} className="x-chip" data-testid="project-tech">{t}</span>
                  ))}
                </div>
              </div>
            )}
            {p.role && (
              <div>
                <div className="x-label opacity-60 mb-1">Role</div>
                <div className="x-label" style={{ lineHeight: 1.5, opacity: 0.9 }}>{p.role}</div>
              </div>
            )}
            <div>
              <div className="x-label opacity-60 mb-1">Year</div>
              <div className="x-label">{p.year}</div>
            </div>
          </div>
          <div className="lg:col-span-9">
            <div className="x-projcard mb-10">
              <img src={p.image} alt={p.name} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-[92ch]">
              {p.detail.map((para, i) => (
                <p key={i} className="x-body opacity-85">
                  {para}
                </p>
              ))}
            </div>

            {p.features && p.features.length > 0 && (
              <div className="mt-12">
                <div className="x-label opacity-60 mb-4">Key features</div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8">
                  {p.features.map((f) => (
                    <div
                      key={f}
                      className="x-label py-2 flex items-center gap-3"
                      data-testid="project-feature"
                      style={{ borderTop: '1px solid rgba(255,255,255,0.14)' }}
                    >
                      <span style={{ opacity: 0.5 }}>→</span> {f}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {p.media && <ProjectMedia media={p.media} />}

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-24">
          <GenArt type="waves" seed={idx * 3 + 2} ratio="1 / 1" />
          <GenArt type="ascii" seed={idx * 5 + 4} ratio="1 / 1" />
          <GenArt type="pixels" seed={idx * 7 + 6} ratio="1 / 1" />
          <GenArt type="glyphs" seed={idx * 11 + 8} ratio="1 / 1" />
        </div>

        <div className="flex justify-between items-center border-t pt-8" style={{ borderColor: 'rgba(255,255,255,0.2)' }}>
          <Link to={`/projects/${prev.id}`} className="x-label x-underline flex items-center gap-2" data-testid="prev-project">
            <ArrowLeft size={13} /> {prev.name}
          </Link>
          <Link to="/projects" className="x-label x-underline" data-testid="back-to-projects">
            All Projects
          </Link>
          <Link to={`/projects/${next.id}`} className="x-label x-underline flex items-center gap-2" data-testid="next-project">
            {next.name} <ArrowRight size={13} />
          </Link>
        </div>
      </section>
    </main>
  );
}
