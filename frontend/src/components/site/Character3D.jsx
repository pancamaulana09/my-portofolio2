/* eslint-disable react/no-unknown-property */
import React, { Suspense, useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import {
  useGLTF,
  ContactShadows,
  Center,
  Bounds,
  Html,
  useProgress,
  AdaptiveDpr,
  AdaptiveEvents,
  BakeShadows,
} from '@react-three/drei';

const MODEL_URL = '/models/character.glb';

// Preload the model as early as possible so it is ready when the hero mounts.
useGLTF.preload(MODEL_URL);

// Loading indicator rendered inside the WebGL canvas via drei's <Html>.
function Loader() {
  const { progress, active } = useProgress();
  return (
    <Html center>
      <div
        style={{
          fontFamily: 'var(--x-pixel, monospace)',
          fontSize: 18,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          color: '#fff',
          background: 'rgba(0,0,0,0.35)',
          border: '1px solid rgba(255,255,255,0.45)',
          padding: '6px 12px',
          whiteSpace: 'nowrap',
        }}
      >
        Loading 3D · {Math.round(progress)}%{active ? '' : ''}
      </div>
    </Html>
  );
}

// GLTF model. Auto-rotates left → right (positive Y = counter-clockwise from
// above = front face drifts left-to-right). Manual drag adds an offset that
// eases back to the auto-rotation over time.
function CharacterModel({ dragOffsetRef, autoRotateSpeed = 0.35 }) {
  const group = useRef();
  const { scene } = useGLTF(MODEL_URL);
  const autoRot = useRef(0);

  useFrame((_, delta) => {
    if (!group.current) return;
    autoRot.current += autoRotateSpeed * delta;
    group.current.rotation.y = autoRot.current + dragOffsetRef.current;
  });

  return (
    <group ref={group}>
      <Center>
        <primitive object={scene} />
      </Center>
    </group>
  );
}

export default function Character3D() {
  const dragOffsetRef = useRef(0);
  const canvasWrapRef = useRef(null);
  const [failed, setFailed] = useState(false);

  // Custom pointer handling — only capture horizontal drags. Vertical
  // gestures are ignored so the page can scroll on mobile. Uses raw
  // pointer events instead of OrbitControls so we can decide per-event.
  useEffect(() => {
    const el = canvasWrapRef.current;
    if (!el) return;

    let active = false;
    let decided = false; // whether we've decided horizontal vs vertical
    let startX = 0;
    let startY = 0;
    let lastX = 0;
    let pointerId = null;

    const onDown = (e) => {
      if (e.pointerType === 'mouse' && e.button !== 0) return;
      active = true;
      decided = e.pointerType === 'mouse'; // desktop: always drag
      startX = e.clientX;
      startY = e.clientY;
      lastX = e.clientX;
      pointerId = e.pointerId;
    };

    const onMove = (e) => {
      if (!active) return;
      const dx = e.clientX - startX;
      const dy = e.clientY - startY;

      // Touch/pen: wait until the user commits to a direction. If
      // vertical wins, we release the pointer so the page can scroll.
      if (!decided) {
        if (Math.abs(dx) < 6 && Math.abs(dy) < 6) return;
        if (Math.abs(dy) > Math.abs(dx)) {
          active = false;
          return;
        }
        decided = true;
        try { el.setPointerCapture(pointerId); } catch {}
      }

      const stepX = e.clientX - lastX;
      lastX = e.clientX;
      // Positive stepX (drag right) = rotate right on Y axis.
      const width = el.clientWidth || 1;
      dragOffsetRef.current += (stepX / width) * Math.PI * 1.4;
      e.preventDefault();
    };

    const onUp = () => {
      active = false;
      decided = false;
      pointerId = null;
    };

    el.addEventListener('pointerdown', onDown, { passive: true });
    // move must be non-passive so we can preventDefault when we own the drag
    el.addEventListener('pointermove', onMove, { passive: false });
    el.addEventListener('pointerup', onUp, { passive: true });
    el.addEventListener('pointercancel', onUp, { passive: true });
    el.addEventListener('pointerleave', onUp, { passive: true });

    return () => {
      el.removeEventListener('pointerdown', onDown);
      el.removeEventListener('pointermove', onMove);
      el.removeEventListener('pointerup', onUp);
      el.removeEventListener('pointercancel', onUp);
      el.removeEventListener('pointerleave', onUp);
    };
  }, []);

  if (failed) return null;

  return (
    <div
      ref={canvasWrapRef}
      style={{ width: '100%', height: '100%' }}
      data-testid="hero-3d-wrap"
    >
      <Canvas
        className="x-char-canvas"
        shadows
        dpr={[1, 1.6]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
          preserveDrawingBuffer: false,
        }}
        camera={{ position: [0, 0.4, 6], fov: 40, near: 0.1, far: 100 }}
        onCreated={({ gl }) => {
          gl.domElement.addEventListener(
            'webglcontextlost',
            () => setFailed(true),
            { once: true }
          );
          // Prevent the canvas itself from consuming touch — the wrapper
          // decides. This is critical for mobile vertical scroll.
          gl.domElement.style.touchAction = 'pan-y';
        }}
        data-testid="hero-3d-canvas"
      >
        {/* Studio lighting — self-contained. */}
        <ambientLight intensity={0.75} />
        <directionalLight
          position={[4, 6, 5]}
          intensity={2.0}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
          shadow-bias={-0.0001}
        />
        <directionalLight position={[-5, 3, -4]} intensity={0.6} color="#ffffff" />

        <Suspense fallback={<Loader />}>
          <Bounds fit clip observe margin={1.15}>
            <CharacterModel dragOffsetRef={dragOffsetRef} />
          </Bounds>

          <ContactShadows
            position={[0, -1.4, 0]}
            opacity={0.45}
            scale={12}
            blur={2.6}
            far={4}
            resolution={512}
            color="#000000"
          />
          <BakeShadows />
        </Suspense>

        <AdaptiveDpr pixelated />
        <AdaptiveEvents />
      </Canvas>
    </div>
  );
}
