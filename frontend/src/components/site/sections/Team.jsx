import React, { useRef } from 'react';
import DecodeText from '../DecodeText';
import { languages, teamImage, statusWords } from '../../../mock';
import { useSectionStatus } from '../../../lib/statusBus';

// Pure-blue section with grayscale imagery and the languages index.
export default function Team() {
  const secRef = useRef(null);
  useSectionStatus(secRef, statusWords.team);

  return (
    <section ref={secRef} className="x-sec-blue relative overflow-hidden" data-testid="team-section">
      <img
        src={teamImage}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover opacity-90 mix-blend-multiply grayscale contrast-110"
      />
      <div className="relative x-pad max-w-[1440px] mx-auto min-h-[80vh] flex flex-col justify-between">
        <DecodeText text="Languages" as="h2" className="xh-giant text-[#dcdcd6]" speed={60} testId="team-heading" />

        <div className="my-14">
          {languages.map((m, i) => (
            <div key={m.name} className="x-teamrow x-label text-[#e6e6e0]" data-testid={`team-row-${i}`}>
              <span>{m.name}</span>
              <span className="opacity-80">{m.level}</span>
              <span className="opacity-80 hidden md:block">{m.notes}</span>
              <span className="text-right">{m.cefr}</span>
            </div>
          ))}
        </div>

        <DecodeText text="Fluency" as="div" className="xh-giant text-[#dcdcd6] self-end" speed={60} delay={300} />
      </div>
    </section>
  );
}
