import React, { useEffect, useRef, useState } from 'react';

// Reactive custom cursor: a fast dot + a lagging ring (spring-follow) that grows
// over interactive elements and contracts on press. Uses mix-blend-difference so
// it stays visible on both dark and light sections. Desktop / fine-pointer only.
export default function CustomCursor() {
  const ringRef = useRef(null);
  const dotRef = useRef(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches;
    if (!fine) return undefined;

    setEnabled(true);
    const root = document.documentElement;
    root.classList.add('x-has-cursor');

    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let rx = mx;
    let ry = my;
    let rafId;

    const onMove = (e) => {
      mx = e.clientX;
      my = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mx}px, ${my}px, 0)`;
      }
    };
    const loop = () => {
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${rx}px, ${ry}px, 0)`;
      }
      rafId = requestAnimationFrame(loop);
    };
    rafId = requestAnimationFrame(loop);

    const SEL = 'a,button,[role="button"],input,textarea,select,label,.x-magnetic,[data-cursor="hover"]';
    const onOver = (e) => {
      if (e.target.closest && e.target.closest(SEL)) root.classList.add('x-cursor-hover');
    };
    const onOut = (e) => {
      if (e.target.closest && e.target.closest(SEL)) root.classList.remove('x-cursor-hover');
    };
    const onDown = () => root.classList.add('x-cursor-down');
    const onUp = () => root.classList.remove('x-cursor-down');

    window.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mouseover', onOver);
    document.addEventListener('mouseout', onOut);
    window.addEventListener('mousedown', onDown);
    window.addEventListener('mouseup', onUp);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onOver);
      document.removeEventListener('mouseout', onOut);
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('mouseup', onUp);
      root.classList.remove('x-has-cursor', 'x-cursor-hover', 'x-cursor-down');
    };
  }, []);

  if (!enabled) return null;
  return (
    <>
      <div ref={ringRef} className="x-cursor-ring" aria-hidden="true" />
      <div ref={dotRef} className="x-cursor-dot" aria-hidden="true" />
    </>
  );
}
