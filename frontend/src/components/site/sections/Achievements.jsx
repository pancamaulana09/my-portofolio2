import React, { useRef } from 'react';
import DecodeText from '../DecodeText';
import { capabilities, statusWords } from '../../../mock';
import { useSectionStatus } from '../../../lib/statusBus';

// Capabilities / tech-stack index with the giant heading overlapping the rows.
export default function Achievements({ tone = 'light' }) {
  const secRef = useRef(null);
  useSectionStatus(secRef, statusWords.noticed);
  const isDark = tone === 'dark';

  return (
    <section
      ref={secRef}
      className={isDark ? 'x-sec-dark' : 'x-sec-light'}
      data-testid="achievements-section"
    >
      <div className="x-pad max-w-[1440px] mx-auto relative">
        <DecodeText
          text="Capabilities"
          as="h2"
          className="xh-giant absolute top-16 left-4 z-10 pointer-events-none opacity-95"
          speed={36}
          testId="achievements-heading"
        />

        <div className="pt-10 relative">
          <div className={`x-tr x-label ${isDark ? 'text-[#6f6f6a]' : 'text-[#8a8a84]'} border-b ${isDark ? 'border-[#242422]' : 'border-[#d3d1cb]'} pb-3 mb-4`}>
            <span>Discipline</span>
            <span>Stack</span>
            <span>Focus</span>
            <span className="text-right">No.</span>
          </div>
          {capabilities.map((c, i) => (
            <div key={c.discipline} className="x-tr x-label" data-testid={`award-row-${i}`}>
              <span>{c.discipline}</span>
              <span className="opacity-80">{c.stack}</span>
              <span className="opacity-80">{c.focus}</span>
              <span className="text-right">{String(i + 1).padStart(2, '0')}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
