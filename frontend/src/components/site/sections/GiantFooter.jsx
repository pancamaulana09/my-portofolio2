import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { useReducedMotion } from 'framer-motion';
import { site } from '../../../mock';

const FOOTER_VIDEO_DURATION = 7.033333;

function clamp(value, min = 0, max = 1) {
  return Math.min(max, Math.max(min, value));
}

export default function GiantFooter() {
  const sectionRef = useRef(null);
  const videoRef = useRef(null);
  const frameRef = useRef(0);
  const reduce = useReducedMotion();
  const [duration, setDuration] = useState(FOOTER_VIDEO_DURATION);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    const video = videoRef.current;
    if (!section || !video || reduce || !duration) return undefined;

    const update = () => {
      frameRef.current = 0;
      const rect = section.getBoundingClientRect();
      const travel = Math.max(1, rect.height - window.innerHeight);
      const nextProgress = clamp(-rect.top / travel);
      setProgress((current) => (Math.abs(current - nextProgress) > 0.005 ? nextProgress : current));
      const targetTime = Math.min(Math.max(0, nextProgress * duration), Math.max(0, duration - 0.04));
      if (Math.abs(video.currentTime - targetTime) > 0.025) video.currentTime = targetTime;
    };

    const onScroll = () => {
      if (!frameRef.current) frameRef.current = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [duration, reduce]);

  const syncDuration = () => {
    const video = videoRef.current;
    if (!video || !Number.isFinite(video.duration) || video.duration <= 0) return;
    setDuration(video.duration);
  };

  const frame = duration ? Math.round(progress * duration * 30) : 0;
  const totalFrames = duration ? Math.round(duration * 30) : 0;

  return (
    <section ref={sectionRef} className="x-giant-footer x-giant-footer--scrub" data-testid="giant-footer">
      <div className="x-footer-sticky">
        <video
          ref={videoRef}
          className="x-footer-video"
          src="/assets/shotfooter.mp4"
          poster="/assets/shotfooter-poster.jpg"
          muted
          playsInline
          preload="auto"
          onLoadedMetadata={syncDuration}
          onLoadedData={syncDuration}
          onCanPlay={syncDuration}
          onDurationChange={syncDuration}
          aria-hidden="true"
          tabIndex={-1}
        />
        <div className="x-footer-video-shade" aria-hidden="true" />
        <div className="x-footer-gridlines" aria-hidden="true" />

        <div className="x-footer-top x-label">
          <span><i className="x-footer-live-dot" aria-hidden="true" /> Panca Maulana / independent practice</span>
          <span>Surabaya, Indonesia</span>
          <span>Scroll controlled film</span>
        </div>

        <div className="x-footer-center">
          <p className="x-label">Have a project with momentum?</p>
          <a href={site.emailHref} className="x-footer-title" data-cursor="project">
            Let’s build<br />something <em>real.</em><ArrowUpRight aria-hidden="true" />
          </a>
        </div>

        <div className="x-footer-bottom">
          <div>
            <span className="x-label">(a.) Contact</span>
            <a href={site.emailHref}>{site.email}</a>
            <span>Available for selected collaborations</span>
          </div>
          <div>
            <span className="x-label">(b.) Base</span>
            <span>Surabaya, Indonesia</span>
            <span>Product · Web · 3D</span>
          </div>
          <div>
            <span className="x-label">(c.) Signal</span>
            <span>{reduce ? 'Static frame · motion reduced' : 'Scroll forward / reverse to scrub'}</span>
            <span className="x-footer-frame">Frame {String(frame).padStart(3, '0')} / {String(totalFrames).padStart(3, '0')}</span>
          </div>
          <div>
            <span className="x-label">(d.) Links</span>
            <a href="https://github.com/pancamaulana09" target="_blank" rel="noreferrer">GitHub ↗</a>
            <a href="/projects">Selected work ↗</a>
          </div>
        </div>
      </div>
    </section>
  );
}
