import React, { useEffect, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

const EASE = [0.22, 1, 0.36, 1];

// Fade/slide-in on scroll into view. Respects reduced-motion.
export function Reveal({
  children,
  as = 'div',
  className = '',
  delay = 0,
  y = 26,
  duration = 0.7,
  once = true,
  ...rest
}) {
  const reduce = useReducedMotion();
  const MotionTag = motion[as] || motion.div;
  if (reduce) {
    const Tag = as;
    return (
      <Tag className={className} {...rest}>
        {children}
      </Tag>
    );
  }
  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: '-10% 0px -10% 0px' }}
      transition={{ duration, delay, ease: EASE }}
      {...rest}
    >
      {children}
    </MotionTag>
  );
}

// Word-by-word reveal with a subtle rise + rotate. Great for big headlines.
export function Words({
  text,
  className = '',
  wordClassName = '',
  once = true,
  stagger = 0.06,
  y = 44,
}) {
  const reduce = useReducedMotion();
  const words = String(text).split(' ');

  if (reduce) {
    return <div className={className}>{text}</div>;
  }

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: stagger } },
  };
  const word = {
    hidden: { y, opacity: 0, rotate: 6 },
    show: { y: 0, opacity: 1, rotate: 0, transition: { duration: 0.85, ease: EASE } },
  };

  return (
    <motion.div
      className={className}
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once, margin: '-15% 0px' }}
      aria-label={text}
    >
      {words.map((w, i) => (
        <span key={i} className="x-word-wrap">
          <motion.span className={`x-word ${wordClassName}`} variants={word}>
            {w}
          </motion.span>
          {i < words.length - 1 ? '\u00A0' : ''}
        </span>
      ))}
    </motion.div>
  );
}

// Magnetic wrapper: pulls its child toward the cursor. Desktop only.
export function Magnetic({ children, strength = 0.35, className = '' }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) return undefined;
    const el = ref.current;
    if (!el) return undefined;
    if (!window.matchMedia('(pointer: fine)').matches) return undefined;

    const onMove = (e) => {
      const r = el.getBoundingClientRect();
      const x = e.clientX - (r.left + r.width / 2);
      const y = e.clientY - (r.top + r.height / 2);
      el.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
    };
    const onLeave = () => {
      el.style.transform = 'translate(0px, 0px)';
    };
    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseleave', onLeave);
    return () => {
      el.removeEventListener('mousemove', onMove);
      el.removeEventListener('mouseleave', onLeave);
    };
  }, [strength, reduce]);

  return (
    <span ref={ref} className={`x-magnetic ${className}`}>
      {children}
    </span>
  );
}

// Infinite horizontal marquee. Duplicates content for a seamless loop.
export function Marquee({ children, speed = 32, reverse = false, className = '' }) {
  return (
    <div className={`x-marquee ${className}`} data-testid="marquee">
      <div
        className="x-marquee-track"
        style={{ animationDuration: `${speed}s`, animationDirection: reverse ? 'reverse' : 'normal' }}
      >
        <div className="x-marquee-group">{children}</div>
        <div className="x-marquee-group" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
}
