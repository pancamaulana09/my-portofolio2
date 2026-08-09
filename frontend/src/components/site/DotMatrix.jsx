import React, { useMemo } from 'react';

// Hand-drawn 5x7 dot glyphs for the giant "2xA STUDIO" dot-matrix type.
const GLYPHS = {
  '2': ['.###.', '#...#', '....#', '...#.', '..#..', '.#...', '#####'],
  x: ['.....', '.....', '#...#', '.#.#.', '..#..', '.#.#.', '#...#'],
  A: ['.###.', '#...#', '#...#', '#####', '#...#', '#...#', '#...#'],
  S: ['.####', '#....', '#....', '.###.', '....#', '....#', '####.'],
  T: ['#####', '..#..', '..#..', '..#..', '..#..', '..#..', '..#..'],
  U: ['#...#', '#...#', '#...#', '#...#', '#...#', '#...#', '.###.'],
  D: ['####.', '#...#', '#...#', '#...#', '#...#', '#...#', '####.'],
  I: ['#####', '..#..', '..#..', '..#..', '..#..', '..#..', '#####'],
  O: ['.###.', '#...#', '#...#', '#...#', '#...#', '#...#', '.###.'],
};

function Letter({ ch, seed }) {
  const rows = GLYPHS[ch];
  if (!rows) return <span className="x-dm-space" />;
  const dots = [];
  rows.forEach((row, r) => {
    row.split('').forEach((cell, c) => {
      dots.push({ r, c, on: cell === '#' });
    });
  });
  return (
    <span className="x-dm-letter" aria-hidden="true">
      {dots.map((d, i) =>
        d.on ? (
          <span
            key={i}
            className="x-dm-dot"
            style={{
              gridColumn: d.c + 1,
              gridRow: d.r + 1,
              animationDelay: `${((seed * 13 + i * 7) % 40) * 14}ms, ${((seed * 7 + i * 11) % 50) * 90}ms`,
              '--jit-dur': `${2.4 + ((seed + i) % 5) * 0.7}s`,
              '--jit-delay': `${((seed * 3 + i) % 9) * 0.4}s`,
            }}
          />
        ) : null
      )}
    </span>
  );
}

export default function DotMatrix({ text = '2xA STUDIO', cell, className = '', testId }) {
  const letters = useMemo(() => text.split(''), [text]);
  return (
    <div
      className={`x-dm ${className}`}
      style={{ '--dm-cell': cell || 'clamp(5px, 1.55vw, 24px)' }}
      role="img"
      aria-label={text}
      data-testid={testId}
    >
      {letters.map((ch, i) =>
        ch === ' ' ? <span key={i} className="x-dm-space" /> : <Letter key={i} ch={ch} seed={i + 1} />
      )}
    </div>
  );
}
