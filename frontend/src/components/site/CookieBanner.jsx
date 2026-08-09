import React, { useEffect, useState } from 'react';

const KEY = 'xa_cookie_consent';

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => {
      if (!localStorage.getItem(KEY)) setVisible(true);
    }, 1600);
    return () => clearTimeout(t);
  }, []);

  const choose = (v) => {
    localStorage.setItem(KEY, v);
    setVisible(false);
  };

  if (!visible) return null;
  return (
    <div className="x-cookie" data-testid="cookie-banner">
      <div className="x-label mb-2">This site uses cookies</div>
      <p className="x-body text-[#9a9a94] mb-4" style={{ fontSize: 12 }}>
        This site uses cookies for essential functionality and analytics. Customize your settings or accept all.
      </p>
      <div className="flex gap-3">
        <button className="x-cookie-btn primary" onClick={() => choose('all')} data-testid="cookie-accept">
          Accept all
        </button>
        <button className="x-cookie-btn" onClick={() => choose('essential')} data-testid="cookie-reject">
          Reject all
        </button>
      </div>
    </div>
  );
}
