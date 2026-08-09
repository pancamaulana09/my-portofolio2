import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { site } from '../../mock';
import { subscribeStatus } from '../../lib/statusBus';

const SPIN = ['|', '/', '\u2014', '\\'];

// Minimal generative "studio sounds": sparse pentatonic blips via WebAudio.
function useStudioSounds() {
  const [playing, setPlaying] = useState(false);
  const ctxRef = useRef(null);
  const ivRef = useRef(null);

  const stop = () => {
    if (ivRef.current) clearInterval(ivRef.current);
    ivRef.current = null;
    if (ctxRef.current) {
      ctxRef.current.close().catch(() => {});
      ctxRef.current = null;
    }
    setPlaying(false);
  };

  const start = () => {
    try {
      const AC = window.AudioContext || window.webkitAudioContext;
      const ctx = new AC();
      ctxRef.current = ctx;
      const scale = [220, 261.63, 293.66, 329.63, 392, 440, 523.25];
      const blip = () => {
        if (!ctxRef.current) return;
        const t = ctx.currentTime;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = Math.random() > 0.5 ? 'square' : 'triangle';
        osc.frequency.value = scale[Math.floor(Math.random() * scale.length)] * (Math.random() > 0.8 ? 2 : 1);
        gain.gain.setValueAtTime(0.0001, t);
        gain.gain.exponentialRampToValueAtTime(0.035, t + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.28);
        osc.connect(gain).connect(ctx.destination);
        osc.start(t);
        osc.stop(t + 0.3);
      };
      blip();
      ivRef.current = setInterval(() => {
        if (Math.random() > 0.35) blip();
      }, 420);
      setPlaying(true);
    } catch (e) {
      setPlaying(false);
    }
  };

  useEffect(() => stop, []);
  return { playing, toggle: () => (playing ? stop() : start()) };
}

export default function FooterBar() {
  const [words, setWords] = useState(null);
  const [spin, setSpin] = useState(0);
  const { playing, toggle } = useStudioSounds();

  useEffect(() => subscribeStatus(setWords), []);
  useEffect(() => {
    const iv = setInterval(() => setSpin((s) => (s + 1) % SPIN.length), playing ? 90 : 240);
    return () => clearInterval(iv);
  }, [playing]);

  return (
    <footer className="x-foot" data-testid="footer-bar">
      {words ? (
        <div className="flex justify-between items-center px-4 py-3 gap-3" key={words.join('')}>
          {words.map((w, i) => (
            <span key={i} className="x-label x-foot-word" style={{ animationDelay: `${i * 40}ms` }}>
              {w}
            </span>
          ))}
        </div>
      ) : (
        <div className="flex justify-between items-center px-4 py-3 gap-3" key="links">
          <div className="flex items-center gap-6 md:gap-0 md:justify-between md:w-[52%]">
            {site.footerLinks.map((l) =>
              l.external ? (
                <a
                  key={l.label}
                  href={l.href}
                  target={l.href.startsWith('http') ? '_blank' : undefined}
                  rel="noreferrer"
                  className="x-label x-navlink x-foot-word hidden sm:inline-block"
                  data-testid={`footer-link-${l.label.toLowerCase().replace(/[^a-z]/g, '')}`}
                >
                  {l.label}
                </a>
              ) : (
                <Link key={l.label} to={l.href} className="x-label x-navlink x-foot-word hidden sm:inline-block">
                  {l.label}
                </Link>
              )
            )}
          </div>
          <button
            onClick={toggle}
            className="x-label x-navlink x-foot-word"
            data-testid="studio-sounds-toggle"
            title={playing ? 'Stop studio sounds' : 'Play studio sounds'}
          >
            STUDIO SOUNDS {playing ? `ON ${SPIN[spin]}` : SPIN[spin]}
          </button>
        </div>
      )}
    </footer>
  );
}
