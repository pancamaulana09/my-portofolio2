import React, { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { site } from '../../mock';

function useClock(tz) {
  const [time, setTime] = useState('');
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
      timeZone: tz,
    });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const iv = setInterval(tick, 1000);
    return () => clearInterval(iv);
  }, [tz]);
  return time;
}

function Clock({ label, tz }) {
  const time = useClock(tz);
  const [h = '', m = ''] = time.split(':');
  const [blink, setBlink] = useState(true);
  useEffect(() => {
    const iv = setInterval(() => setBlink((b) => !b), 1000);
    return () => clearInterval(iv);
  }, []);
  return (
    <span className="x-label hidden md:inline-block whitespace-nowrap">
      {label} {h}
      <span style={{ opacity: blink ? 1 : 0.25 }}>:</span>
      {m}
    </span>
  );
}

export default function Header() {
  return (
    <header className="x-header">
      <div className="flex items-center justify-between px-4 py-3.5">
        <div className="flex items-center gap-10 lg:gap-16">
          <Link to="/" className="x-label x-navlink" data-testid="header-logo">
            {site.logo}
          </Link>
          <div className="hidden md:flex items-center gap-10 lg:gap-16">
            {site.clocks.map((c) => (
              <Clock key={c.label} label={c.label} tz={c.tz} />
            ))}
          </div>
        </div>
        <nav className="flex items-center gap-4 md:gap-8" data-testid="header-nav">
          {site.nav.map((n) => (
            <NavLink
              key={n.path}
              to={n.path}
              data-testid={`nav-${n.label.toLowerCase()}`}
              className={({ isActive }) =>
                `x-label x-navlink ${isActive ? 'is-active' : ''}`
              }
            >
              {n.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}
