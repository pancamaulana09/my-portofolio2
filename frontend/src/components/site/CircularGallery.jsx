import React, { useRef, useState, useEffect, useCallback } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';

function ArcCard({ post, i, x, cardW, gap, vw, onOpen }) {
  const bend = vw < 640 ? 9 : 12;
  const drop = Math.max(40, vw * 0.055);
  const center = i * (cardW + gap) + cardW / 2;
  const rotate = useTransform(x, (v) => ((center + v - vw / 2) / vw) * bend);
  const y = useTransform(x, (v) => {
    const d = (center + v - vw / 2) / vw;
    return d * d * drop;
  });
  return (
    <motion.div
      className="x-circ-card"
      style={{ width: cardW, rotate, y }}
      onClick={() => onOpen(post.id)}
      data-testid={`circ-card-${post.id}`}
    >
      <div className="x-circ-media">
        <img src={post.image} alt={post.title} loading="lazy" draggable={false} />
        <span className="x-circ-num x-label">{post.num}</span>
      </div>
      <div className="x-circ-cap">
        <span className="x-circ-tag x-label">{post.tags[0]}</span>
        <h4 className="x-circ-title">{post.title}</h4>
        <span className="x-circ-view x-label">View post <ArrowUpRight size={12} /></span>
      </div>
    </motion.div>
  );
}

// Codapress-style curved drag gallery: cards sit on an arc and tilt as they travel.
export default function CircularGallery({ items, title = 'More from the journal' }) {
  const wrapRef = useRef(null);
  const [vw, setVw] = useState(0);
  const [dragged, setDragged] = useState(false);
  const draggingRef = useRef(false);
  const x = useMotionValue(0);
  const navigate = useNavigate();

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const measure = () => setVw(el.clientWidth);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const cardW = vw < 640 ? Math.round(vw * 0.58) : Math.round(Math.min(330, Math.max(230, vw * 0.21)));
  const gap = vw < 640 ? 20 : 30;
  const trackW = items.length * (cardW + gap) - gap;
  const minX = Math.min(0, -(trackW - vw + Math.round(cardW * 0.4)));

  const onOpen = useCallback(
    (id) => {
      if (draggingRef.current) return;
      navigate(`/blog/${id}`);
    },
    [navigate]
  );

  const step = (dir) => {
    const target = Math.max(minX, Math.min(0, x.get() + dir * (cardW + gap) * -1));
    animate(x, target, { type: 'spring', stiffness: 140, damping: 22 });
  };

  return (
    <section className="x-circ" data-testid="circular-gallery">
      <div className="x-circ-head x-pad" style={{ paddingBottom: 0, paddingTop: 72 }}>
        <div className="max-w-[1440px] mx-auto flex items-end justify-between gap-6 flex-wrap">
          <h2 className="x-circ-heading">{title}</h2>
          <div className="flex items-center gap-3">
            <button className="x-arrowbtn" onClick={() => step(-1)} aria-label="Previous" data-testid="circ-prev">
              <ArrowLeft size={18} />
            </button>
            <button className="x-arrowbtn" onClick={() => step(1)} aria-label="Next" data-testid="circ-next">
              <ArrowRight size={18} />
            </button>
            <Link to="/blog" className="x-blog-allbtn" data-testid="circ-all-posts">
              All posts →
            </Link>
          </div>
        </div>
      </div>

      <div className="x-circ-stage" ref={wrapRef}>
        {vw > 0 && (
          <motion.div
            className="x-circ-track"
            drag="x"
            style={{ x }}
            dragConstraints={{ left: minX, right: 0 }}
            dragElastic={0.06}
            onDragStart={() => {
              draggingRef.current = true;
              setDragged(true);
            }}
            onDragEnd={() => {
              setTimeout(() => {
                draggingRef.current = false;
              }, 60);
            }}
            data-testid="circ-track"
          >
            {items.map((p, i) => (
              <ArcCard key={p.id} post={p} i={i} x={x} cardW={cardW} gap={gap} vw={vw} onOpen={onOpen} />
            ))}
          </motion.div>
        )}
        {!dragged && (
          <div className="x-circ-dragbadge x-label" aria-hidden="true">
            ‹ DRAG ›
          </div>
        )}
      </div>
    </section>
  );
}
