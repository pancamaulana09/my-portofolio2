import React, { useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import {
  Box,
  Boxes,
  Braces,
  Building2,
  Cpu,
  PenTool,
  Sparkles,
} from 'lucide-react';
import { expertise, statusWords } from '../../../mock';
import { useSectionStatus } from '../../../lib/statusBus';

const MARKS = [
  { icon: Braces, code: 'WEB/01', stack: 'React · Next.js · TypeScript' },
  { icon: PenTool, code: 'DESIGN/02', stack: 'UI systems · Prototyping' },
  { icon: Building2, code: 'SYSTEMS/03', stack: 'ERP · HRM · Reporting' },
  { icon: Cpu, code: 'IOT/04', stack: 'ESP32 · Automation · Sensors' },
  { icon: Sparkles, code: 'CREATIVE/05', stack: 'Three.js · Motion · 3D' },
  { icon: Boxes, code: 'PRODUCT/06', stack: 'Concept · Build · Launch' },
];

export default function Expertise() {
  const secRef = useRef(null);
  const reduce = useReducedMotion();
  useSectionStatus(secRef, statusWords.practice);

  return (
    <section ref={secRef} className="x-capabilities" data-testid="expertise-section">
      <div className="x-capabilities-head x-pad">
        <div>
          <p className="x-label">Capabilities / selected systems</p>
          <h2>What I bring<br />to the <em>build.</em></h2>
        </div>
        <p>Six connected disciplines, arranged as a working toolkit rather than a list of services.</p>
      </div>

      <div className="x-capabilities-grid" role="list" aria-label="Capabilities">
        {expertise.map((item, index) => {
          const mark = MARKS[index];
          const MarkIcon = mark?.icon || Box;
          return (
            <motion.article
              key={item.title}
              className="x-capability-tile"
              role="listitem"
              data-testid={`expertise-item-${index}`}
              initial={reduce ? false : { opacity: 0, y: 24 }}
              whileInView={reduce ? {} : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.22 }}
              transition={{ duration: 0.55, delay: reduce ? 0 : Math.min(index * 0.055, 0.25), ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="x-capability-tile-top">
                <span className="x-capability-code x-label">{mark?.code}</span>
                <span className="x-capability-index x-label">0{index + 1}</span>
              </div>
              <div className="x-capability-mark" aria-hidden="true"><MarkIcon strokeWidth={1.1} /></div>
              <div className="x-capability-copy">
                <h3>{item.title}</h3>
                <p>{item.text}</p>
                <span className="x-capability-stack">{mark?.stack}</span>
              </div>
            </motion.article>
          );
        })}
      </div>
    </section>
  );
}
