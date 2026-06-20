import React from 'react';

const items = [
  'Social Media Management',
  'Pubblicità Online',
  'Content Creation',
  'Siti & E-commerce',
  'Strategia di Crescita',
  'Campagne Meta & Google',
  'Video & Reels',
  'Branding',
];

const Dot = () => (
  <span style={{ color: 'var(--accent-color)', margin: '0 2rem', fontSize: '0.6rem' }}>◆</span>
);

const Marquee = () => {
  // Lista duplicata per loop continuo senza stacchi
  const loop = [...items, ...items];

  return (
    <div
      style={{
        borderTop: '1px solid var(--glass-border)',
        borderBottom: '1px solid var(--glass-border)',
        background: 'rgba(255,255,255,0.015)',
        padding: '1.4rem 0',
        overflow: 'hidden',
        maskImage: 'linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)',
        WebkitMaskImage: 'linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)',
      }}
    >
      <div className="marquee">
        {loop.map((item, i) => (
          <span
            key={i}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              color: 'var(--text-secondary)',
              fontSize: '1rem',
              letterSpacing: '1px',
              textTransform: 'uppercase',
              whiteSpace: 'nowrap',
            }}
          >
            {item}
            <Dot />
          </span>
        ))}
      </div>
    </div>
  );
};

export default Marquee;
