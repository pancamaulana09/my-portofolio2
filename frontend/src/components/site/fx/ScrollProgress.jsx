import React from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

// Thin neon progress bar pinned to the very top of the viewport.
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.3,
  });
  return <motion.div className="x-scrollprog" style={{ scaleX }} aria-hidden="true" data-testid="scroll-progress" />;
}
