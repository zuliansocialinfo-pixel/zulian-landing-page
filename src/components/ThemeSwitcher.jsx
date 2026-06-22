import React, { useState, useEffect } from 'react';
import { Palette } from 'lucide-react';

const THEMES = {
  gold: {
    name: 'Gold',
    accentColor: '#22d3ee',
    icon: '✨',
  },
  silver: {
    name: 'Silver',
    accentColor: '#c0c0c0',
    icon: '🌙',
  },
  emerald: {
    name: 'Emerald',
    accentColor: '#2ecc71',
    icon: '🌿',
  },
  copper: {
    name: 'Copper',
    accentColor: '#b87333',
    icon: '🔥',
  },
};

const ThemeSwitcher = () => {
  const [currentTheme, setCurrentTheme] = useState('gold');
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('zulian-theme');
    if (saved && THEMES[saved]) {
      setCurrentTheme(saved);
      applyTheme(saved);
    }
  }, []);

  const applyTheme = (theme) => {
    const colors = THEMES[theme];
    if (colors) {
      document.documentElement.style.setProperty('--accent-color', colors.accentColor);
      document.documentElement.style.setProperty('--accent-hover', adjustColor(colors.accentColor, 0.8));
      localStorage.setItem('zulian-theme', theme);
    }
  };

  const adjustColor = (hex, factor) => {
    const c = parseInt(hex.slice(1), 16);
    const r = Math.round((c >> 16) * factor);
    const g = Math.round(((c >> 8) & 0xff) * factor);
    const b = Math.round((c & 0xff) * factor);
    return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')}`;
  };

  const handleThemeChange = (theme) => {
    setCurrentTheme(theme);
    applyTheme(theme);
    setShowMenu(false);
  };

  return (
    <div style={{ position: 'relative' }}>
      <button
        onClick={() => setShowMenu(!showMenu)}
        style={{
          background: 'transparent',
          border: '1px solid var(--glass-border)',
          borderRadius: '50%',
          width: '40px',
          height: '40px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          color: 'var(--text-primary)',
        }}
        title="Cambia tema"
      >
        <Palette size={18} />
      </button>

      {showMenu && (
        <div
          style={{
            position: 'absolute',
            top: '50px',
            right: 0,
            background: 'rgba(10,10,10,0.95)',
            border: '1px solid var(--glass-border)',
            borderRadius: '12px',
            padding: '0.8rem',
            minWidth: '160px',
            zIndex: 200,
            backdropFilter: 'blur(10px)',
          }}
        >
          {Object.entries(THEMES).map(([key, theme]) => (
            <button
              key={key}
              onClick={() => handleThemeChange(key)}
              style={{
                display: 'block',
                width: '100%',
                padding: '0.7rem 1rem',
                background: currentTheme === key ? 'rgba(34, 211, 238,0.15)' : 'transparent',
                border: 'none',
                borderRadius: '8px',
                color: 'var(--text-primary)',
                textAlign: 'left',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                marginBottom: key !== Object.keys(THEMES)[Object.keys(THEMES).length - 1] ? '0.4rem' : 0,
                fontSize: '0.9rem',
                fontWeight: currentTheme === key ? 600 : 500,
              }}
              onMouseEnter={(e) => {
                e.target.style.background = 'rgba(34, 211, 238,0.1)';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = currentTheme === key ? 'rgba(34, 211, 238,0.15)' : 'transparent';
              }}
            >
              <span style={{ marginRight: '0.6rem' }}>{theme.icon}</span>
              {theme.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ThemeSwitcher;
