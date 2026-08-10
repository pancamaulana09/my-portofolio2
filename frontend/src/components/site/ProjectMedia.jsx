import React, { useRef, useState, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX, Maximize2, X } from 'lucide-react';

const EASE = [0.22, 1, 0.36, 1];

function Lightbox({ src, alt, onClose }) {
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);
  return createPortal(
    <motion.div
      className="x-pmedia-lightbox"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      onClick={onClose}
      data-testid="poster-lightbox"
    >
      <button className="x-pmedia-close" onClick={onClose} aria-label="Close" data-testid="lightbox-close">
        <X size={20} />
      </button>
      <motion.img
        src={src}
        alt={alt}
        initial={{ scale: 0.94, y: 12 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ duration: 0.35, ease: EASE }}
        onClick={(e) => e.stopPropagation()}
      />
    </motion.div>,
    document.body
  );
}

export const ProjectMedia = ({ media }) => {
  const videoRef = useRef(null);
  const wrapRef = useRef(null);
  const reduce = useReducedMotion();
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  const [zoomed, setZoomed] = useState(false);

  // Autoplay (muted) only while at least half of the player is on screen
  useEffect(() => {
    const vid = videoRef.current;
    const wrap = wrapRef.current;
    if (!vid || !wrap || reduce) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.intersectionRatio >= 0.5) {
          vid.play().catch(() => {});
        } else {
          vid.pause();
        }
      },
      { threshold: [0, 0.5] }
    );
    io.observe(wrap);
    return () => io.disconnect();
  }, [reduce]);

  const togglePlay = useCallback(() => {
    const vid = videoRef.current;
    if (!vid) return;
    if (vid.paused) vid.play().catch(() => {});
    else vid.pause();
  }, []);

  const toggleMute = useCallback(() => {
    const vid = videoRef.current;
    if (!vid) return;
    vid.muted = !vid.muted;
    setMuted(vid.muted);
  }, []);

  const reveal = (delay = 0) =>
    reduce
      ? {}
      : {
          initial: { y: 32, opacity: 0 },
          whileInView: { y: 0, opacity: 1 },
          viewport: { once: true, margin: '0px 0px -10% 0px' },
          transition: { duration: 0.7, ease: EASE, delay },
        };

  return (
    <section className="x-pmedia" data-testid="project-media-section" style={{ '--pm-accent': media.accent }}>
      <div className="flex items-baseline justify-between gap-4 flex-wrap mb-6">
        <div className="x-label opacity-60">( Campaign ) — Film &amp; poster</div>
        <div className="x-label opacity-40">AD · LOOP · SOUND OFF BY DEFAULT</div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <motion.div className="lg:col-span-8" {...reveal(0)}>
          <div className="x-pmedia-player" ref={wrapRef}>
            <video
              ref={videoRef}
              src={media.video}
              poster={media.videoPoster}
              muted={muted}
              loop
              playsInline
              preload="metadata"
              onPlay={() => setPlaying(true)}
              onPause={() => setPlaying(false)}
              onClick={togglePlay}
              data-testid="project-media-video"
            />
            <span className="x-pmedia-badge x-label">Promo film</span>
            <div className="x-pmedia-controls">
              <button className="x-pmedia-btn" onClick={togglePlay} aria-label={playing ? 'Pause' : 'Play'} data-testid="video-play-toggle">
                {playing ? <Pause size={15} /> : <Play size={15} />}
              </button>
              <button className="x-pmedia-btn" onClick={toggleMute} aria-label={muted ? 'Unmute' : 'Mute'} data-testid="video-mute-toggle">
                {muted ? <VolumeX size={15} /> : <Volume2 size={15} />}
              </button>
              <span className="x-label x-pmedia-state">{playing ? 'Playing' : 'Paused'}{muted ? ' · muted' : ''}</span>
            </div>
          </div>
        </motion.div>

        <motion.div className="lg:col-span-4" {...reveal(0.12)}>
          <button className="x-pmedia-posterbtn" onClick={() => setZoomed(true)} data-testid="project-media-poster" aria-label="Enlarge poster">
            <img src={media.poster} alt={media.posterAlt} loading="lazy" />
            <span className="x-pmedia-zoom x-label"><Maximize2 size={12} /> Enlarge</span>
          </button>
        </motion.div>
      </div>

      <AnimatePresence>
        {zoomed && <Lightbox src={media.poster} alt={media.posterAlt} onClose={() => setZoomed(false)} />}
      </AnimatePresence>
    </section>
  );
};
