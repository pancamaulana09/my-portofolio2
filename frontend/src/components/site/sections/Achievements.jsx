import React, { useRef } from 'react';
import DecodeText from '../DecodeText';
import { awards, statusWords } from '../../../mock';
import { useSectionStatus } from '../../../lib/statusBus';

// Awards index table with the giant heading overlapping the rows.
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
          text="Achievements"
          as="h2"
          className="xh-giant absolute top-16 left-4 z-10 pointer-events-none opacity-95"
          speed={36}
          testId="achievements-heading"
        />

        <div className="pt-10 relative">
          <div className={`x-tr x-label ${isDark ? 'text-[#6f6f6a]' : 'text-[#8a8a84]'} border-b ${isDark ? 'border-[#242422]' : 'border-[#d3d1cb]'} pb-3 mb-4`}>
            <span>Project</span>
            <span>Organization</span>
            <span>Awards</span>
            <span className="text-right">Year</span>
          </div>
          {awards.map((a, i) => (
            <div key={i} className="x-tr x-label" data-testid={`award-row-${i}`}>
              <span>{a.project}</span>
              <span className="opacity-80">{a.org}</span>
              <span className="opacity-80">{a.award}</span>
              <span className="text-right">{a.year}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
