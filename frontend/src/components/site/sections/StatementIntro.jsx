import React, { useEffect, useRef, useState } from 'react';

// "( Label )" + giant indented statement, revealed word by word on scroll.
// Foundations typographic voice fused with the 2xA mono label system.
export default function StatementIntro({
  label = 'Studio',
  text,
  tone = 'light',
  testId = 'statement-section',
}) {
  const ref = useRef(null);
  const [on, setOn] = useState(false);
  const words = text.split(' ');

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setOn(true);
          io.disconnect();
        }
      },
      { threshold: 0.25 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className={`${tone === 'dark' ? 'x-sec-dark' : 'x-sec-light'} x-pad`}
      data-testid={testId}
    >
      <div className="max-w-[1440px] mx-auto relative">
        <span className="x-label text-[#8f8f8a] absolute left-0 top-2 md:top-4">( {label} )</span>
        <p className="x-statement">
          {words.map((w, i) => (
            <span
              key={i}
              className={`x-st-word ${on ? 'on' : ''}`}
              style={{ transitionDelay: `${i * 28}ms` }}
            >
              {w}{' '}
            </span>
          ))}
        </p>
      </div>
    </section>
  );
}
