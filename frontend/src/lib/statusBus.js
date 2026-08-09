// Tiny pub/sub store that lets page sections take over the fixed bottom bar
// with contextual words (e.g. "MADE WITH CARE AND A LOT OF CODE").

import { useEffect } from 'react';

let listeners = new Set();
let current = null;

export function setStatus(words) {
  current = words;
  listeners.forEach((l) => l(current));
}

export function subscribeStatus(listener) {
  listeners.add(listener);
  listener(current);
  return () => listeners.delete(listener);
}

// Hook: while `ref` section is >=35% visible, the bottom bar shows `words`.
export function useSectionStatus(ref, words) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStatus(words);
        } else if (current === words) {
          setStatus(null);
        }
      },
      { threshold: 0.35 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      if (current === words) setStatus(null);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref, words]);
}
