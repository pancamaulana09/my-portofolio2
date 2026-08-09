import React, { useRef, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import DecodeText from '../DecodeText';
import { archive, statusWords } from '../../../mock';
import { useSectionStatus } from '../../../lib/statusBus';

// "Full Archive": giant title index (Foundations) with a cursor-following
// preview thumbnail and 2xA blue hover states.
export default function ArchiveIndex() {
  const secRef = useRef(null);
  useSectionStatus(secRef, statusWords.archive);
  const navigate = useNavigate();
  const [preview, setPreview] = useState(null); // image url
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const rafRef = useRef(0);

  const onMove = useCallback((e) => {
    const x = e.clientX;
    const y = e.clientY;
    cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => setPos({ x, y }));
  }, []);

  return (
    <section
      ref={secRef}
      className="x-sec-light"
      data-testid="archive-section"
      onMouseMove={onMove}
      onMouseLeave={() => setPreview(null)}
    >
      <div className="x-pad max-w-[1440px] mx-auto">
        <div className="x-label text-[#8f8f8a] mb-10">( Full Archive )</div>
        <div>
          {archive.map((item, i) => (
            <button
              key={item.name}
              className="x-arch-row"
              onClick={() => navigate(item.path)}
              onMouseEnter={() => setPreview(item.image)}
              data-testid={`archive-row-${i}`}
            >
              <DecodeText text={item.name} speed={16} step={2} delay={i * 90} />
            </button>
          ))}
        </div>
      </div>

      {preview && (
        <div
          className="x-arch-preview"
          style={{ transform: `translate(${pos.x}px, ${pos.y}px) translate(-50%, -60%)` }}
          aria-hidden="true"
        >
          <img src={preview} alt="" />
        </div>
      )}
    </section>
  );
}
