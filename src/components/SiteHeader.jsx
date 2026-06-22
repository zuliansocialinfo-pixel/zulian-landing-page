import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import logo from '../assets/logo.jpg';
import ThemeSwitcher from './ThemeSwitcher';
import { NAV } from '../theme';

const SiteHeader = ({ revealed }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  // Chiudi il menu ad ogni cambio pagina
  useEffect(() => { setMenuOpen(false); }, [location.pathname]);

  // Blocca lo scroll del body quando il menu mobile e' aperto
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const linkStyle = ({ isActive }) => ({
    fontSize: '0.9rem',
    fontWeight: isActive ? 700 : 500,
    color: isActive ? 'var(--accent-color)' : 'var(--text-primary)',
    transition: 'color 0.3s',
  });

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={revealed ? { y: 0, opacity: 1 } : { y: -80, opacity: 0 }}
        transition={{ duration: 0.6, delay: 0.15, ease: 'easeOut' }}
        style={{
          position: 'fixed',
          top: 0, left: 0, right: 0,
          padding: '1rem 0',
          backgroundColor: 'rgba(10, 10, 10, 0.8)',
          backdropFilter: 'blur(10px)',
          zIndex: 100,
          borderBottom: '1px solid var(--glass-border)',
        }}
      >
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Link to="/" aria-label="Home" style={{ display: 'flex', alignItems: 'center' }}>
            <img src={logo} alt="Zulian Logo" style={{ height: '40px', width: 'auto', borderRadius: '4px' }} />
          </Link>

          <nav style={{ display: 'flex', gap: '1.8rem', alignItems: 'center' }} className="hidden-mobile">
            {NAV.map((l) => (
              <NavLink key={l.to} to={l.to} style={linkStyle}>{l.label}</NavLink>
            ))}
            <ThemeSwitcher />
          </nav>

          <div className="mobile-only" style={{ gap: '0.6rem', alignItems: 'center' }}>
            <ThemeSwitcher />
            <button
              className="menu-btn"
              aria-label="Apri menu"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen(true)}
              style={{ display: 'inline-flex' }}
            >
              <Menu size={22} />
            </button>
          </div>
        </div>
      </motion.header>

      <div className={`mobile-nav${menuOpen ? ' open' : ''}`} role="dialog" aria-modal="true" aria-hidden={!menuOpen}>
        <button className="menu-close menu-btn" aria-label="Chiudi menu" onClick={() => setMenuOpen(false)}>
          <X size={24} />
        </button>
        <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
        {NAV.map((l) => (
          <Link key={l.to} to={l.to} onClick={() => setMenuOpen(false)}>{l.label}</Link>
        ))}
      </div>
    </>
  );
};

export default SiteHeader;
