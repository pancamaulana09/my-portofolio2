import { useEffect, useMemo, useRef, useState } from 'react';
import { Play, Volume2, VolumeX } from 'lucide-react';
import { useReducedMotion } from 'framer-motion';

const GLYPHS = ['·', '∙', '░', '▒', '▓', '█', '·', '∙'];
const PIXEL_COUNT = 32 * 20;

function clamp(value, min = 0, max = 1) {
  return Math.min(max, Math.max(min, value));
}

export default function SignalScreen() {
  const sectionRef = useRef(null);
  const videoRef = useRef(null);
  const reduce = useReducedMotion();
  const [progress, setProgress] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  const pixels = useMemo(
    () => Array.from({ length: PIXEL_COUNT }, (_, index) => GLYPHS[(index * 11 + (index % 7)) % GLYPHS.length]),
    [],
  );

  useEffect(() => {
    const section = sectionRef.current;
    const video = videoRef.current;
    if (!section) return undefined;

    const update = () => {
      const rect = section.getBoundingClientRect();
      const distance = Math.max(1, rect.height - window.innerHeight);
      setProgress(clamp(-rect.top / distance));
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);

    if (!video || reduce) return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) video.play().catch(() => {});
      else video.pause();
    }, { threshold: [0, 0.35] });
    observer.observe(section);

    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
      observer.disconnect();
    };
  }, [reduce]);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) video.play().catch(() => {});
    else video.pause();
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setMuted(video.muted);
  };

  return (
    <section
      ref={sectionRef}
      id="signal"
      className="x-signal"
      style={{ '--signal-progress': progress }}
      data-testid="signal-screen"
      aria-label="Scroll-driven selected work signal"
    >
      <div className="x-signal-sticky">
        <div className="x-signal-head x-pad">
          <div>
            <p className="x-label">Signal / Selected proof</p>
            <h2>Watch the work<br /><em>resolve.</em></h2>
          </div>
          <p className="x-signal-intro">A campaign film from the archive, translated into a living screen. Keep scrolling to move from noise to signal.</p>
        </div>

        <div className="x-signal-stage-wrap">
          <div className="x-signal-tv" data-testid="signal-tv">
            <div className="x-signal-bezel">
              <div className="x-signal-screen">
                <video
                  ref={videoRef}
                  className="x-signal-video"
                  src="/assets/fenomena-ad.mp4"
                  poster="/assets/fenomena-poster.jpg"
                  muted={muted}
                  loop
                  playsInline
                  preload="metadata"
                  onPlay={() => setPlaying(true)}
                  onPause={() => setPlaying(false)}
                  onClick={togglePlay}
                  aria-label="Fenomena Bike campaign film"
                />
                <div className="x-signal-pixels" aria-hidden="true">
                  {pixels.map((glyph, index) => <span key={index}>{glyph}</span>)}
                </div>
                <div className="x-signal-scanlines" aria-hidden="true" />
                <div className="x-signal-vignette" aria-hidden="true" />
                <div className="x-signal-cursor" aria-hidden="true" />
                <div className="x-signal-screen-meta x-label"><span>FMN / 05</span><span>{String(Math.round(progress * 100)).padStart(3, '0')}%</span></div>
              </div>
            </div>
            <div className="x-signal-tv-feet" aria-hidden="true"><i /><i /></div>
          </div>
        </div>

        <div className="x-signal-footer x-pad">
          <div className="x-signal-status x-label"><span className="x-signal-status-dot" /> {progress > .86 ? 'SIGNAL RESOLVED' : progress > .2 ? 'DECODING BROADCAST' : 'SEARCHING FOR SIGNAL'}</div>
          <div className="x-signal-controls">
            <button type="button" onClick={togglePlay} className="x-signal-control x-label" aria-label={playing ? 'Pause campaign film' : 'Play campaign film'}>{playing ? 'Pause' : <><Play size={12} /> Play</>}</button>
            <button type="button" onClick={toggleMute} className="x-signal-control x-label" aria-label={muted ? 'Unmute campaign film' : 'Mute campaign film'}>{muted ? <><VolumeX size={12} /> Muted</> : <><Volume2 size={12} /> Sound on</>}</button>
          </div>
        </div>
      </div>
    </section>
  );
}
