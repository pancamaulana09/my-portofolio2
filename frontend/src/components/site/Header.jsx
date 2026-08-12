import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { site } from '../../mock';

export default function Header() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const closeOnResize = () => {
      if (window.innerWidth >= 768) setOpen(false);
    };
    window.addEventListener('resize', closeOnResize);
    return () => window.removeEventListener('resize', closeOnResize);
  }, []);

  const closeMenu = () => setOpen(false);

  return (
    <header className={`x-header ${open ? 'is-menu-open' : ''}`}>
      <div className="x-header-bar">
        <Link to="/" className="x-header-mark" data-testid="header-logo" onClick={closeMenu}>
          <span className="x-header-mark-dot" aria-hidden="true" />
          {site.logo}
        </Link>

        <div className="x-header-context x-label" aria-hidden="true">
          <span>Creative web developer</span>
          <span>Surabaya · Indonesia</span>
        </div>

        <button
          className="x-menu-toggle"
          type="button"
          aria-label={open ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={open}
          aria-controls="primary-navigation"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X size={18} aria-hidden="true" /> : <Menu size={18} aria-hidden="true" />}
          <span className="x-label">{open ? 'Close' : 'Menu'}</span>
        </button>

        <nav id="primary-navigation" className="x-primary-nav" aria-label="Primary navigation" data-testid="header-nav">
          {site.nav.map((item, index) => (
            <NavLink
              key={item.path}
              to={item.path}
              data-testid={`nav-${item.label.toLowerCase()}`}
              className={({ isActive }) => `x-navlink ${isActive ? 'is-active' : ''}`}
              onClick={closeMenu}
            >
              <span className="x-nav-index">0{index + 1}</span>
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}
