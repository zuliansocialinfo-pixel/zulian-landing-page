import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import logo from '../assets/logo.jpg';

const Preloader = ({ onComplete }) => {
  const [loading, setLoading] = useState(true);
  const rootRef = useRef(null);
  const svgRef = useRef(null);
  const logoRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // Phase 1: Circuits animate in (0-0.8s)
      const circuits = gsap.utils.toArray('.circuit-path');
      circuits.forEach((path, i) => {
        const length = path.getTotalLength();
        gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
        tl.to(path, {
          strokeDashoffset: 0,
          duration: 0.7,
          ease: 'power2.inOut',
        }, i * 0.08);
      });

      // Phase 2: Axes form (0.5-1.2s)
      gsap.set(['.axis-x', '.axis-y'], { opacity: 0, scaleX: 0, scaleY: 0 });
      tl.to('.axis-x', { scaleX: 1, opacity: 1, duration: 0.6, ease: 'power3.out' }, 0.5);
      tl.to('.axis-y', { scaleY: 1, opacity: 1, duration: 0.6, ease: 'power3.out' }, 0.5);

      // Phase 3: Toggle signs animate (0.8-1.3s)
      gsap.set('.toggle-sign', { opacity: 0, scale: 0 });
      tl.to('.toggle-sign', {
        opacity: 1,
        scale: 1,
        duration: 0.5,
        ease: 'back.out(1.4)',
        stagger: 0.08,
      }, 0.8);

      // Phase 4: Central glow pulses (1.0-1.8s)
      gsap.set('.center-glow', { opacity: 0 });
      tl.to('.center-glow', {
        opacity: 0.8,
        scale: 1.3,
        duration: 0.4,
        ease: 'power2.out',
      }, 1.0);

      // Phase 5: Logo emerges (1.2-2.0s)
      tl.from(logoRef.current, {
        scale: 0.3,
        opacity: 0,
        duration: 0.8,
        ease: 'back.out(1.2)',
      }, 1.2);

      tl.to(logoRef.current, {
        filter: 'drop-shadow(0 0 24px rgba(212, 175, 55, 0.6))',
        duration: 0.4,
      }, 1.4);

      // Phase 6: Text fades in (1.5-2.0s)
      tl.from(['.pl-title', '.pl-sub', '.pl-quote'], {
        opacity: 0,
        y: 12,
        duration: 0.5,
        ease: 'power2.out',
        stagger: 0.1,
      }, 1.5);

      // Infinite loop: axes + toggles + glow pulse gently
      gsap.timeline({ repeat: -1 })
        .to('.center-glow', { opacity: 0.5, scale: 0.95, duration: 1.8, ease: 'sine.inOut', yoyo: true }, 0);

      gsap.to('.toggle-sign', {
        rotation: 5,
        duration: 2,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
        stagger: 0.2,
      });

      // Exit at 2.5s
      const exitTimer = setTimeout(() => {
        onComplete?.();
        gsap.to(rootRef.current, {
          opacity: 0,
          duration: 0.6,
          ease: 'power2.inOut',
          onComplete: () => setLoading(false),
        });
      }, 2500);

      return () => clearTimeout(exitTimer);
    }, rootRef);

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!loading) return null;

  return (
    <div
      ref={rootRef}
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'var(--bg-color)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 9999,
        overflow: 'hidden',
      }}
    >
      {/* SVG: Circuits + Axes + Toggles */}
      <svg
        ref={svgRef}
        viewBox="0 0 400 400"
        width="300"
        height="300"
        style={{ marginBottom: '2rem' }}
      >
        <defs>
          <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(212, 175, 55, 0.8)" />
            <stop offset="100%" stopColor="rgba(212, 175, 55, 0.3)" />
          </linearGradient>
        </defs>

        {/* Background: subtle grid/circuit pattern */}
        <g className="circuit-grid" opacity="0.15">
          {[...Array(8)].map((_, i) => (
            <line
              key={`h${i}`}
              x1="20"
              y1={20 + i * 45}
              x2="380"
              y2={20 + i * 45}
              stroke="var(--accent-color)"
              strokeWidth="0.5"
            />
          ))}
          {[...Array(8)].map((_, i) => (
            <line
              key={`v${i}`}
              x1={20 + i * 45}
              y1="20"
              x2={20 + i * 45}
              y2="380"
              stroke="var(--accent-color)"
              strokeWidth="0.5"
            />
          ))}
        </g>

        {/* Circuits: stylized paths flowing from edges to center */}
        <path
          className="circuit-path"
          d="M 80,30 L 150,50 L 180,80 L 200,120 L 180,150 L 150,180 L 120,200"
          stroke="url(#goldGradient)"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />
        <path
          className="circuit-path"
          d="M 320,100 L 270,140 L 240,170 L 220,200 L 240,220 L 270,240 L 300,280"
          stroke="url(#goldGradient)"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />
        <path
          className="circuit-path"
          d="M 150,320 L 180,280 L 200,250 L 220,200 L 200,180 L 180,150"
          stroke="url(#goldGradient)"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />
        <path
          className="circuit-path"
          d="M 50,200 L 100,210 L 140,205 L 180,200 L 200,180 L 210,140"
          stroke="url(#goldGradient)"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />

        {/* X-Axis */}
        <line
          className="axis-x"
          x1="60"
          y1="200"
          x2="340"
          y2="200"
          stroke="var(--accent-color)"
          strokeWidth="2"
          vectorEffect="non-scaling-stroke"
        />

        {/* Y-Axis */}
        <line
          className="axis-y"
          x1="200"
          y1="60"
          x2="200"
          y2="340"
          stroke="var(--accent-color)"
          strokeWidth="2"
          vectorEffect="non-scaling-stroke"
        />

        {/* Toggle Signs on Axes */}
        {/* Top toggle */}
        <g className="toggle-sign">
          <circle cx="200" cy="50" r="12" fill="none" stroke="var(--accent-color)" strokeWidth="1.5" />
          <line x1="200" y1="44" x2="200" y2="56" stroke="var(--accent-color)" strokeWidth="2" />
        </g>

        {/* Right toggle */}
        <g className="toggle-sign">
          <circle cx="350" cy="200" r="12" fill="none" stroke="var(--accent-color)" strokeWidth="1.5" />
          <line x1="344" y1="200" x2="356" y2="200" stroke="var(--accent-color)" strokeWidth="2" />
        </g>

        {/* Bottom toggle */}
        <g className="toggle-sign">
          <circle cx="200" cy="350" r="12" fill="none" stroke="var(--accent-color)" strokeWidth="1.5" />
          <line x1="200" y1="344" x2="200" y2="356" stroke="var(--accent-color)" strokeWidth="2" />
        </g>

        {/* Left toggle */}
        <g className="toggle-sign">
          <circle cx="50" cy="200" r="12" fill="none" stroke="var(--accent-color)" strokeWidth="1.5" />
          <line x1="44" y1="200" x2="56" y2="200" stroke="var(--accent-color)" strokeWidth="2" />
        </g>

        {/* Central glow at intersection */}
        <circle
          className="center-glow"
          cx="200"
          cy="200"
          r="50"
          fill="none"
          stroke="var(--accent-color)"
          strokeWidth="1"
          style={{ filter: 'blur(8px)' }}
        />
        <circle
          className="center-glow"
          cx="200"
          cy="200"
          r="30"
          fill="var(--accent-color)"
          style={{ filter: 'blur(12px)' }}
        />
      </svg>

      {/* Logo in center */}
      <div
        ref={logoRef}
        style={{
          width: '140px',
          height: '140px',
          borderRadius: '50%',
          overflow: 'hidden',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          background: 'var(--bg-color)',
          border: '2px solid rgba(212, 175, 55, 0.4)',
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          marginTop: '1rem',
        }}
      >
        <img
          src={logo}
          alt="Zulian Logo"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </div>

      {/* Text */}
      <div style={{ position: 'absolute', bottom: '60px', textAlign: 'center', width: '100%' }}>
        <h1
          className="pl-title"
          style={{
            color: 'var(--accent-color)',
            fontSize: '1.8rem',
            letterSpacing: '3px',
            marginBottom: '0.4rem',
          }}
        >
          ZULIAN
        </h1>
        <p
          className="pl-sub"
          style={{
            color: 'var(--text-secondary)',
            letterSpacing: '2px',
            fontSize: '0.85rem',
            textTransform: 'uppercase',
          }}
        >
          Social Media Marketing
        </p>
        <p
          className="pl-quote"
          style={{
            marginTop: '1.2rem',
            fontStyle: 'italic',
            fontFamily: 'var(--font-serif)',
            color: 'var(--text-primary)',
            maxWidth: '320px',
            margin: '1.2rem auto 0',
            fontSize: '0.95rem',
          }}
        >
          "La strategia vincente, fatta su misura."
        </p>
      </div>
    </div>
  );
};

export default Preloader;
