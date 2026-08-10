import React from 'react';
import DotMatrix from '../DotMatrix';

// Giant dot-matrix brand mark closing every page.
export default function GiantFooter({ tone = 'light' }) {
  const isDark = tone === 'dark';
  return (
    <section
      className={`${isDark ? 'x-sec-dark' : 'x-sec-light'} pt-32 pb-20 px-4 overflow-hidden`}
      data-testid="giant-footer"
    >
      <div className="max-w-[1440px] mx-auto flex justify-center">
        <DotMatrix text="PANCA MAULANA" testId="footer-dotmatrix" />
      </div>
    </section>
  );
}
