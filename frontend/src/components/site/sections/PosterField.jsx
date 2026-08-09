import React, { useMemo, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import GenArt from '../GenArt';
import { projects, genGridImages, statusWords } from '../../../mock';
import { useSectionStatus } from '../../../lib/statusBus';

// Black void with posters drifting toward the viewer in 3D — Foundations'
// floating poster carousel rebuilt with 2xA's procedural art as the posters.
const SLOTS = [
  { x: 22, y: 34 }, { x: 64, y: 26 }, { x: 42, y: 62 }, { x: 80, y: 58 },
  { x: 12, y: 68 }, { x: 55, y: 40 }, { x: 30, y: 22 }, { x: 72, y: 74 },
  { x: 46, y: 18 }, { x: 18, y: 48 },
];

export default function PosterField() {
  const secRef = useRef(null);
  useSectionStatus(secRef, statusWords.output);

  const posters = useMemo(() => {
    const gens = [
      { kind: 'gen', type: 'waves', seed: 21 },
      { kind: 'gen', type: 'dither', seed: 34 },
      { kind: 'gen', type: 'pixels', seed: 55 },
      { kind: 'gen', type: 'ascii', seed: 13 },
      { kind: 'gen', type: 'glyphs', seed: 89 },
    ];
    const imgs = [
      { kind: 'img', src: projects[0].image },
      { kind: 'img', src: projects[1].image },
      { kind: 'img', src: projects[2].image },
      { kind: 'img', src: genGridImages[0] },
      { kind: 'img', src: genGridImages[1] },
    ];
    return gens.flatMap((g, i) => [g, imgs[i]]).map((p, i) => ({
      ...p,
      slot: SLOTS[i % SLOTS.length],
      dur: 16 + (i % 5) * 3.5,
      delay: -(i * 3.1),
    }));
  }, []);

  return (
    <section ref={secRef} className="x-pfield" data-testid="poster-field-section">
      {posters.map((p, i) => (
        <div
          key={i}
          className="x-poster"
          style={{
            '--px': `${p.slot.x}%`,
            '--py': `${p.slot.y}%`,
            '--pt': `${p.dur}s`,
            '--pd': `${p.delay}s`,
          }}
        >
          {p.kind === 'gen' ? (
            <GenArt type={p.type} seed={p.seed} ratio="3 / 4.2" />
          ) : (
            <img src={p.src} alt="" loading="lazy" />
          )}
        </div>
      ))}

      <div className="x-pfield-foot">
        <div>
          <div className="x-label text-[#8f8f8a] mb-3">( Output )</div>
          <h2 className="xh-giant text-[#e6e6e0]">Posters</h2>
        </div>
        <Link to="/projects" className="x-arrow-giant" aria-label="View all projects" data-testid="posterfield-arrow">
          <ArrowRight strokeWidth={1.4} />
        </Link>
      </div>
    </section>
  );
}
