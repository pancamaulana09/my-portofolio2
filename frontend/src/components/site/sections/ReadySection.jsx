import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { Words, Magnetic, Marquee } from '../fx/Motion';
import { useSectionStatus } from '../../../lib/statusBus';
import { statusWords } from '../../../mock';

// Big word-reveal call-to-action in the studio voice, followed by a neon
// marquee band. Mirrors the reference's "So, ready to animate?" beat.
export default function ReadySection() {
  const ref = useRef(null);
  useSectionStatus(ref, statusWords.noticed);

  const items = ['WEB DEV', 'UI / UX', 'ENTERPRISE', 'IOT', '3D WEB', 'REACT', 'NEXT.JS', 'WEB DEV', 'UI / UX', 'ENTERPRISE', 'IOT', '3D WEB', 'REACT', 'NEXT.JS'];

  return (
    <section ref={ref} className="x-ready" data-testid="ready-section">
      <div className="x-ready-inner">
        <Words
          text="So — ready to build something that performs?"
          className="x-ready-head"
          once
        />
        <div className="x-ready-actions">
          <Magnetic strength={0.4}>
            <Link to="/projects" className="x-ready-btn x-ready-btn--lime" data-testid="ready-projects-btn">
              View Projects <ArrowUpRight size={16} />
            </Link>
          </Magnetic>
          <Magnetic strength={0.4}>
            <Link to="/contact" className="x-ready-btn x-ready-btn--ghost" data-testid="ready-contact-btn">
              Get In Touch <ArrowUpRight size={16} />
            </Link>
          </Magnetic>
        </div>
      </div>

      <Marquee speed={26} className="x-ready-marquee">
        {items.map((it, i) => (
          <span key={i} className="x-marquee-item">
            {it}
            <span className="x-marquee-star">✦</span>
          </span>
        ))}
      </Marquee>
    </section>
  );
}
