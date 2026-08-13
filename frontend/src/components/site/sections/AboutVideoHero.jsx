import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';

const VIDEO_SRC = '/assets/about-hero-pixel.mp4';

const vertexShaderSource = `
  attribute vec2 aPosition;
  varying vec2 vUv;
  void main() {
    vUv = aPosition * 0.5 + 0.5;
    gl_Position = vec4(aPosition, 0.0, 1.0);
  }
`;

const fragmentShaderSource = `
  precision mediump float;

  varying vec2 vUv;
  uniform sampler2D uVideo;
  uniform vec2 uResolution;
  uniform vec2 uVideoResolution;
  uniform vec2 uPointer;
  uniform float uTime;

  vec2 coverUv(vec2 uv) {
    vec2 safeVideo = max(uVideoResolution, vec2(1.0));
    vec2 scale = uResolution / safeVideo;
    vec2 rendered = safeVideo * max(scale.x, scale.y);
    vec2 offset = (uResolution - rendered) * 0.5;
    return (uv * uResolution - offset) / rendered;
  }

  void main() {
    float pixelSize = mix(8.0, 12.0, step(900.0, uResolution.x));
    vec2 pixelUv = (floor((vUv * uResolution) / pixelSize) + 0.5) * pixelSize / uResolution;
    vec2 direction = pixelUv - uPointer;
    float distanceToRipple = length(direction);
    vec2 normalizedDirection = direction / max(distanceToRipple, 0.001);

    float waveA = sin(distanceToRipple * 72.0 - uTime * 3.15);
    float waveB = sin(distanceToRipple * 40.0 - uTime * 1.8 + 1.2) * 0.48;
    float envelope = exp(-distanceToRipple * 4.8);
    float ripple = (waveA + waveB) * envelope;
    vec2 displacedUv = coverUv(pixelUv + normalizedDirection * ripple * 0.018);

    gl_FragColor = texture2D(uVideo, displacedUv);
  }
`;

function compileShader(gl, type, source) {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader);
    return null;
  }

  return shader;
}

function createProgram(gl) {
  const vertexShader = compileShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
  const fragmentShader = compileShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);

  if (!vertexShader || !fragmentShader) return null;

  const program = gl.createProgram();
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);
  gl.deleteShader(vertexShader);
  gl.deleteShader(fragmentShader);

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    gl.deleteProgram(program);
    return null;
  }

  return program;
}

export default function AboutVideoHero() {
  const heroRef = useRef(null);
  const frameRef = useRef(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [isCanvasReady, setIsCanvasReady] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (shouldReduceMotion) return undefined;

    const hero = heroRef.current;
    const frame = frameRef.current;
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!hero || !frame || !video || !canvas) return undefined;

    const gl = canvas.getContext('webgl', { alpha: false, antialias: false, powerPreference: 'high-performance' });
    if (!gl) return undefined;

    const program = createProgram(gl);
    if (!program) return undefined;

    const positionLocation = gl.getAttribLocation(program, 'aPosition');
    const uniforms = {
      video: gl.getUniformLocation(program, 'uVideo'),
      resolution: gl.getUniformLocation(program, 'uResolution'),
      videoResolution: gl.getUniformLocation(program, 'uVideoResolution'),
      pointer: gl.getUniformLocation(program, 'uPointer'),
      time: gl.getUniformLocation(program, 'uTime'),
    };

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]), gl.STATIC_DRAW);

    const texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

    let frameId = 0;
    let isVisible = false;
    let isDisposed = false;
    let startedAt = 0;
    let width = 1;
    let height = 1;
    let pointer = [0.5, 0.5];

    const resize = () => {
      const rect = frame.getBoundingClientRect();
      const isCoarsePointer = window.matchMedia('(pointer: coarse)').matches;
      const dpr = Math.min(window.devicePixelRatio || 1, isCoarsePointer ? 1 : 1.5);
      width = Math.max(1, Math.round(rect.width * dpr));
      height = Math.max(1, Math.round(rect.height * dpr));
      canvas.width = width;
      canvas.height = height;
      gl.viewport(0, 0, width, height);
    };

    const updatePointer = (event) => {
      const rect = frame.getBoundingClientRect();
      pointer = [
        Math.min(1, Math.max(0, (event.clientX - rect.left) / rect.width)),
        Math.min(1, Math.max(0, 1 - (event.clientY - rect.top) / rect.height)),
      ];
    };

    const draw = (timestamp) => {
      if (!isVisible || isDisposed) return;
      frameId = window.requestAnimationFrame(draw);

      if (video.readyState < HTMLMediaElement.HAVE_CURRENT_DATA) return;
      if (!startedAt) startedAt = timestamp;

      gl.useProgram(program);
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
      gl.enableVertexAttribArray(positionLocation);
      gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, video);
      gl.uniform1i(uniforms.video, 0);
      gl.uniform2f(uniforms.resolution, width, height);
      gl.uniform2f(uniforms.videoResolution, video.videoWidth || 1, video.videoHeight || 1);
      gl.uniform2f(uniforms.pointer, pointer[0], pointer[1]);
      gl.uniform1f(uniforms.time, (timestamp - startedAt) / 1000);
      gl.drawArrays(gl.TRIANGLES, 0, 6);

      if (!isCanvasReady) setIsCanvasReady(true);
    };

    const beginRender = () => {
      if (!isVisible || frameId) return;
      frameId = window.requestAnimationFrame(draw);
    };

    const stopRender = () => {
      if (frameId) window.cancelAnimationFrame(frameId);
      frameId = 0;
    };

    const intersectionObserver = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
      if (isVisible) {
        video.play().catch(() => {});
        beginRender();
      } else {
        video.pause();
        stopRender();
      }
    }, { threshold: 0.05 });

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(frame);
    intersectionObserver.observe(hero);
    frame.addEventListener('pointermove', updatePointer, { passive: true });
    frame.addEventListener('pointerdown', updatePointer, { passive: true });
    video.addEventListener('loadedmetadata', resize, { once: true });
    resize();

    return () => {
      isDisposed = true;
      stopRender();
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      frame.removeEventListener('pointermove', updatePointer);
      frame.removeEventListener('pointerdown', updatePointer);
      gl.deleteTexture(texture);
      gl.deleteBuffer(buffer);
      gl.deleteProgram(program);
    };
  }, [isCanvasReady, shouldReduceMotion]);

  return (
    <section ref={heroRef} className={`x-about-video-hero${isCanvasReady ? ' is-ready' : ''}`} aria-label="About visual">
      <div ref={frameRef} className="x-about-video-hero-frame">
        <video
          ref={videoRef}
          className="x-about-video-hero-source"
          src={VIDEO_SRC}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
        />
        {!shouldReduceMotion && <canvas ref={canvasRef} className="x-about-video-hero-canvas" aria-hidden="true" />}
      </div>
    </section>
  );
}
