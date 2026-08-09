import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { pageTitles } from '../../mock';

// Route-change effects: black overlay with typed blue word blocks,
// plus scroll restoration to top.
export default function PageFX() {
  const location = useLocation();
  const [state, setState] = useState('idle'); // idle | in | out
  const [words, setWords] = useState([]);
  const prevPath = useRef(location.pathname);
  const timers = useRef([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (prevPath.current === location.pathname) {
      return; // initial mount (incl. StrictMode double-invoke) — no transition
    }
    prevPath.current = location.pathname;
    timers.current.forEach(clearTimeout);
    timers.current = [];

    const path = location.pathname;
    let title = pageTitles[path];
    if (!title && path.startsWith('/projects/')) {
      const slug = path.split('/').pop() || '';
      title = ['The', ...slug.split('-').map((w) => w.charAt(0).toUpperCase() + w.slice(1))];
    }
    if (!title) title = ['The', 'Page'];

    setWords([]);
    setState('in');
    title.forEach((w, i) => {
      timers.current.push(setTimeout(() => setWords((prev) => [...prev, w]), 120 + i * 140));
    });
    timers.current.push(setTimeout(() => setState('out'), 120 + title.length * 140 + 320));
    timers.current.push(setTimeout(() => setState('idle'), 120 + title.length * 140 + 660));

    return () => timers.current.forEach(clearTimeout);
  }, [location.pathname]);

  if (state === 'idle') return null;
  return (
    <div className={`x-pt ${state === 'out' ? 'x-pt-leave' : ''}`} data-testid="page-transition">
      {words.map((w, i) => (
        <span key={i} className="x-pt-word">
          {w}
        </span>
      ))}
    </div>
  );
}
