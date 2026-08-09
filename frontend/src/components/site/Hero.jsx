import React, { useEffect, useRef, useState } from 'react';
import { Upload, RotateCcw } from 'lucide-react';
import GlitchCanvas from './GlitchCanvas';
import { saveHeroMedia, loadHeroMedia, clearHeroMedia } from '../../lib/mediaStore';
import { useToast } from '../../hooks/use-toast';

// Full-viewport hero. Shows the procedural glitch animation by default;
// the user can replace it with their own image or video (kept in IndexedDB).
export default function Hero() {
  const [media, setMedia] = useState(null); // { type: 'image'|'video', url }
  const inputRef = useRef(null);
  const urlRef = useRef(null);
  const { toast } = useToast();

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
    } catch (e) {}
    if (urlRef.current) URL.revokeObjectURL(urlRef.current);
    urlRef.current = null;
    setMedia(null);
    toast({ title: 'MEDIA RESET', description: 'Back to the generative signal.' });
  };

  return (
    <section className="x-hero" data-testid="hero-section">
      <div className="x-hero-media x-hero-scan">
        {!media && <GlitchCanvas />}
        {media?.type === 'image' && <img src={media.url} alt="Hero media" data-testid="hero-user-image" />}
        {media?.type === 'video' && (
          <video src={media.url} autoPlay muted loop playsInline data-testid="hero-user-video" />
        )}
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
