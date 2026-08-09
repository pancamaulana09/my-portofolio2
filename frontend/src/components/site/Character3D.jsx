/* eslint-disable react/no-unknown-property */
import React, { Suspense, useRef, useState, useCallback } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import {
  useGLTF,
  OrbitControls,
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
          fontFamily: 'var(--x-mono, monospace)',
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color: '#fff',
          background: 'rgba(8,8,8,0.55)',
          border: '1px solid rgba(255,255,255,0.35)',
          padding: '7px 12px',
          whiteSpace: 'nowrap',
        }}
      >
        Loading 3D · {Math.round(progress)}%{active ? '' : ''}
      </div>
    </Html>
  );
}

// The GLTF model. Auto-rotates right -> left, but pauses while the user
// is actively dragging so the OrbitControls interaction feels natural.
function CharacterModel({ draggingRef, autoRotateSpeed = 0.35 }) {
  const group = useRef();
  const { scene } = useGLTF(MODEL_URL);

  useFrame((_, delta) => {
    if (group.current && !draggingRef.current) {
      // Negative Y delta = clockwise when viewed from above = right-to-left front face.
      group.current.rotation.y -= autoRotateSpeed * delta;
    }
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
  const draggingRef = useRef(false);
  const [failed, setFailed] = useState(false);

  const onStart = useCallback(() => {
    draggingRef.current = true;
  }, []);
  const onEnd = useCallback(() => {
    draggingRef.current = false;
  }, []);

  if (failed) return null;

  return (
    <Canvas
      className="x-char-canvas"
      shadows
      dpr={[1, 1.8]}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
        preserveDrawingBuffer: false,
      }}
      camera={{ position: [0, 0.4, 6], fov: 40, near: 0.1, far: 100 }}
      onCreated={({ gl }) => {
        gl.domElement.addEventListener('webglcontextlost', () => setFailed(true), { once: true });
      }}
      data-testid="hero-3d-canvas"
    >
      {/* Studio lighting — self-contained, no external HDR fetch dependency. */}
      <ambientLight intensity={0.6} />
      <directionalLight
        position={[4, 6, 5]}
        intensity={2.2}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-bias={-0.0001}
      />
      <directionalLight position={[-5, 3, -4]} intensity={0.8} color="#8ab4ff" />
      <pointLight position={[0, -3, 3]} intensity={0.6} color="#ff5ea8" />

      <Suspense fallback={<Loader />}>
        <Bounds fit clip observe margin={1.15}>
          <CharacterModel draggingRef={draggingRef} />
        </Bounds>

        <ContactShadows
          position={[0, -1.4, 0]}
          opacity={0.5}
          scale={12}
          blur={2.6}
          far={4}
          resolution={512}
          color="#000000"
        />
        <BakeShadows />
      </Suspense>

      <OrbitControls
        makeDefault
        enablePan={false}
        enableZoom={false}
        enableDamping
        dampingFactor={0.08}
        rotateSpeed={0.9}
        minPolarAngle={Math.PI / 3}
        maxPolarAngle={Math.PI / 1.7}
        onStart={onStart}
        onEnd={onEnd}
      />

      <AdaptiveDpr pixelated />
      <AdaptiveEvents />
    </Canvas>
  );
}
