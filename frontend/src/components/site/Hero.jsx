import React, { useEffect, useRef, useState, Suspense, lazy } from 'react';
import { Upload, RotateCcw } from 'lucide-react';
import GlitchCanvas from './GlitchCanvas';
import { saveHeroMedia, loadHeroMedia, clearHeroMedia } from '../../lib/mediaStore';
import { useToast } from '../../hooks/use-toast';

// Heavy WebGL scene is code-split so it never blocks first paint.
const Character3D = lazy(() => import('./Character3D'));

// Full-viewport hero. Shows the procedural glitch animation by default;
// the user can replace it with their own image or video (kept in IndexedDB).
export default function Hero() {
  const [media, setMedia] = useState(null); // { type: 'image'|'video', url }
  const inputRef = useRef(null);
  const urlRef = useRef(null);
  const sectionRef = useRef(null);
  const layer3dRef = useRef(null);
  const crowdRef = useRef(null);
  const bgRef = useRef(null);
  const { toast } = useToast();

  // Scroll parallax: crowd (foreground) and statue (mid) drift at different
  // speeds for a subtle sense of depth. rAF-throttled, passive, in-view only,
  // and disabled for users who prefer reduced motion.
  useEffect(() => {
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return;

    let ticking = false;
    const apply = () => {
      ticking = false;
      const section = sectionRef.current;
      if (!section) return;
      const rect = section.getBoundingClientRect();
      // Only compute while the hero is anywhere near the viewport.
      if (rect.bottom < -100 || rect.top > window.innerHeight + 100) return;
      const y = Math.max(0, -rect.top); // px scrolled into the hero

      if (bgRef.current) {
        bgRef.current.style.transform = `translate3d(0, ${y * 0.06}px, 0) scale(1.06)`;
      }
      if (layer3dRef.current) {
        // Mid-ground: drifts up slowly.
        layer3dRef.current.style.transform = `translate3d(0, ${y * -0.12}px, 0)`;
      }
      if (crowdRef.current) {
        // Foreground: drifts up faster + fades slightly as it leaves.
        const opacity = Math.max(0, 1 - y / (window.innerHeight * 1.1));
        crowdRef.current.style.transform = `translate3d(-50%, ${y * 0.16}px, 0)`;
        crowdRef.current.style.opacity = String(opacity);
      }
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(apply);
      }
    };
    apply();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  useEffect(() => {
    let alive = true;
    loadHeroMedia().then((blob) => {
      if (alive && blob) {
        const url = URL.createObjectURL(blob);
        urlRef.current = url;
        setMedia({ type: blob.type.startsWith('video') ? 'video' : 'image', url });
      }
    });
    return () => {
      alive = false;
      if (urlRef.current) URL.revokeObjectURL(urlRef.current);
    };
  }, []);

  const onFile = async (e) => {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;
    if (!file.type.startsWith('image/') && !file.type.startsWith('video/')) {
      toast({ title: 'UNSUPPORTED FILE', description: 'Please select an image or a video file.' });
      return;
    }
    try {
      await saveHeroMedia(file);
    } catch (err) {
      // storage failed — still show it for this session
    }
    if (urlRef.current) URL.revokeObjectURL(urlRef.current);
    const url = URL.createObjectURL(file);
    urlRef.current = url;
    setMedia({ type: file.type.startsWith('video') ? 'video' : 'image', url });
    toast({ title: 'MEDIA REPLACED', description: 'Your file is saved locally in this browser.' });
  };

  const onReset = async () => {
    try {
      await clearHeroMedia();
    } catch (e) {
      /* ignore storage clear errors */
    }
    if (urlRef.current) URL.revokeObjectURL(urlRef.current);
    urlRef.current = null;
    setMedia(null);
    toast({ title: 'MEDIA RESET', description: 'Back to the generative signal.' });
  };

  return (
    <section className="x-hero" data-testid="hero-section" ref={sectionRef}>
      <div className="x-hero-media x-hero-scan">
        {/* Background signal / user media — slowest parallax layer. */}
        <div className="x-hero-bg" ref={bgRef}>
          {!media && <GlitchCanvas />}
          {media?.type === 'image' && <img src={media.url} alt="Hero media" data-testid="hero-user-image" />}
          {media?.type === 'video' && (
            <video src={media.url} autoPlay muted loop playsInline data-testid="hero-user-video" />
          )}
        </div>

        {/* Interactive 3D character, centered over the hero backdrop. */}
        <div className="x-hero-3d" data-testid="hero-3d-layer" ref={layer3dRef}>
          <Suspense fallback={null}>
            <Character3D />
          </Suspense>
        </div>

        {/* Static crowd, layered in FRONT of the 3D character (foreground). */}
        <img
          ref={crowdRef}
          src="/images/crowd.webp"
          alt="A crowd watching"
          className="x-hero-crowd"
          draggable={false}
          aria-hidden="true"
          data-testid="hero-crowd"
        />
      </div>

      <div className="x-hero-controls">
        <input
          ref={inputRef}
          type="file"
          accept="image/*,video/*"
          className="hidden"
          onChange={onFile}
          data-testid="hero-media-input"
        />
        <button
          className="x-ghostbtn flex items-center gap-2"
          onClick={() => inputRef.current?.click()}
          data-testid="replace-media-btn"
        >
          <Upload size={12} /> Replace Media
        </button>
        {media && (
          <button className="x-ghostbtn flex items-center gap-2" onClick={onReset} data-testid="reset-media-btn">
            <RotateCcw size={12} /> Reset
          </button>
        )}
      </div>
    </section>
  );
}
