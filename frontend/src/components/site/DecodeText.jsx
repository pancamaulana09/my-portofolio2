import React, { useEffect, useRef, useState } from 'react';

const SCRAMBLE = '!<>-_\\/[]{}=+*^?#';

// Text that decodes character-by-character with a travelling blue highlight,
// triggered when scrolled into view. Mirrors the reference site's effect.
export default function DecodeText({
  text,
  as: Tag = 'span',
  className = '',
  speed = 26,
  step = 1,
  delay = 0,
  testId,
}) {
  const ref = useRef(null);
  const [pos, setPos] = useState(0);
  const [done, setDone] = useState(false);
  const started = useRef(false);

  useEffect(() => {
    started.current = false;
    setPos(0);
    setDone(false);
  }, [text]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let iv = null;
    let to = null;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          to = setTimeout(() => {
            let i = 0;
            iv = setInterval(() => {
              i += step;
              if (i >= text.length) {
                setPos(text.length);
                setDone(true);
                clearInterval(iv);
              } else {
                setPos(i);
              }
            }, speed);
          }, delay);
          io.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      if (iv) clearInterval(iv);
      if (to) clearTimeout(to);
    };
  }, [text, speed, step, delay]);

  const chars = text.split('');
  return (
    <Tag ref={ref} className={className} data-testid={testId} aria-label={text}>
      {chars.map((c, i) => {
        if (done || i < pos) {
          return <span key={i}>{c}</span>;
        }
        if (i < pos + Math.max(2, step) && c !== ' ') {
          const r = SCRAMBLE[Math.floor(Math.random() * SCRAMBLE.length)];
          return (
            <span key={i} className="x-dt-hl">
              {i === pos ? c : r}
            </span>
          );
        }
        return (
          <span key={i} className="x-dt-hidden">
            {c}
          </span>
        );
      })}
    </Tag>
  );
}
