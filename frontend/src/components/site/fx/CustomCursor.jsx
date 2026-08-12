import { useEffect, useRef, useState } from 'react';

const INTERACTIVE_SELECTOR = 'a,button,[role="button"],input,textarea,select,label,.x-magnetic,[data-cursor="hover"],[data-cursor="project"]';

export default function CustomCursor() {
  const ringRef = useRef(null);
  const dotRef = useRef(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const finePointer = window.matchMedia('(pointer: fine)');
    if (!finePointer.matches) return undefined;

    const root = document.documentElement;
    setEnabled(true);
    root.classList.add('x-has-cursor');

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;
    let frameId;

    const followPointer = () => {
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;
      if (ringRef.current) ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
      frameId = requestAnimationFrame(followPointer);
    };

    const onMove = (event) => {
      mouseX = event.clientX;
      mouseY = event.clientY;
      if (dotRef.current) dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
    };

    const setCursorState = (target) => {
      const interactive = target?.closest?.(INTERACTIVE_SELECTOR);
      const project = target?.closest?.('[data-cursor="project"]');
      root.classList.toggle('x-cursor-hover', Boolean(interactive));
      root.classList.toggle('x-cursor-project', Boolean(project));
    };

    const onOver = (event) => setCursorState(event.target);
    const onOut = (event) => setCursorState(event.relatedTarget);
    const onDown = () => root.classList.add('x-cursor-down');
    const onUp = () => root.classList.remove('x-cursor-down');

    frameId = requestAnimationFrame(followPointer);
    window.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mouseover', onOver);
    document.addEventListener('mouseout', onOut);
    window.addEventListener('mousedown', onDown);
    window.addEventListener('mouseup', onUp);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onOver);
      document.removeEventListener('mouseout', onOut);
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('mouseup', onUp);
      root.classList.remove('x-has-cursor', 'x-cursor-hover', 'x-cursor-project', 'x-cursor-down');
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
