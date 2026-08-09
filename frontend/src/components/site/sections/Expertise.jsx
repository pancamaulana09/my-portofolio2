import React, { useRef } from 'react';
import DecodeText from '../DecodeText';
import { expertise, statusWords } from '../../../mock';
import { useSectionStatus } from '../../../lib/statusBus';

// Scattered layout of expertise items — blue "selected text" labels with
// short mono descriptions, echoing the reference layout.
const PLACEMENTS = [
  'lg:col-start-4 lg:col-span-3 lg:mt-0',
  'lg:col-start-9 lg:col-span-3 lg:mt-10',
  'lg:col-start-6 lg:col-span-3 lg:mt-24',
  'lg:col-start-2 lg:col-span-3 lg:mt-16',
  'lg:col-start-8 lg:col-span-3 lg:mt-20',
  'lg:col-start-4 lg:col-span-3 lg:mt-12',
  'lg:col-start-9 lg:col-span-3 lg:mt-8',
];

export default function Expertise() {
  const secRef = useRef(null);
  useSectionStatus(secRef, statusWords.practice);

  return (
    <section ref={secRef} className="x-sec-light relative" data-testid="expertise-section">
      <div className="x-pad max-w-[1440px] mx-auto">
        <h2 className="xh-giant mb-20 max-w-[8ch]">
          <DecodeText text="Fields of" as="span" speed={40} />
          <br />
          <DecodeText text="Expertise" as="span" speed={40} delay={350} testId="expertise-heading" />
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-x-6 gap-y-14">
          {expertise.map((e, i) => (
            <div key={e.title} className={`${PLACEMENTS[i % PLACEMENTS.length]}`} data-testid={`expertise-item-${i}`}>
              <h3 className="x-grot text-xl md:text-2xl font-medium mb-4">
                <span className="x-hl">{e.title}</span>
              </h3>
              <p className="x-body text-[#4a4a46] max-w-[36ch]">{e.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
