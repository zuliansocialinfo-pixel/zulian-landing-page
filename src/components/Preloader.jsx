import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import logo from '../assets/logo.jpg';

/**
 * Luxury Preloader
 * - GSAP driven: rotazione + glow infiniti, particelle dorate orbitanti, shimmer sweep
 * - Interattivo: il logo segue il mouse (parallax tilt)
 * - Ogni sessione e' diversa: frase, emoji luxury, direzione e parametri random
 */

// Frasi luxury (una a caso per sessione)
const QUOTES = [
  '"La strategia vincente, fatta su misura."',
  '"Eccellenza in ogni dettaglio."',
  '"Il tuo brand merita il palcoscenico migliore."',
  '"Dove la visione incontra i risultati."',
  '"Crescita autentica, su misura per te."',
  '"Trasformiamo la tua presenza in prestigio."',
];

// Emoji eleganti / luxury (una a caso per sessione)
const LUX_EMOJIS = ['✨', '💎', '👑', '🥂', '🪙', '🌟', '⭐', '🏆'];

const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
const rand = (min, max) => min + Math.random() * (max - min);

const Preloader = ({ onComplete }) => {
  const [loading, setLoading] = useState(true);

  // Valori random fissati una volta per sessione
  const session = useRef({
    quote: pick(QUOTES),
    emoji: pick(LUX_EMOJIS),
    spinDir: Math.random() > 0.5 ? 1 : -1,
    spinDur: rand(7, 12),
    particleCount: Math.round(rand(8, 14)),
    hueShift: Math.random() > 0.6, // a volte aggiunge un guizzo di colore
  }).current;

  const rootRef = useRef(null);
  const logoRef = useRef(null);
  const glowRef = useRef(null);
  const shimmerRef = useRef(null);
  const orbitRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const s = session;

      // --- ENTRATA ---
      const intro = gsap.timeline();
      intro
        .from(logoRef.current, {
          scale: 0.5,
          opacity: 0,
          duration: 0.8,
          ease: 'back.out(1.6)',
        })
        .from('.pl-title', { y: 20, opacity: 0, duration: 0.5, ease: 'power3.out' }, '-=0.35')
        .from('.pl-sub', { y: 14, opacity: 0, duration: 0.5, ease: 'power3.out' }, '-=0.3')
        .from('.pl-quote', { opacity: 0, duration: 0.6, ease: 'power2.out' }, '-=0.25');

      // --- ROTAZIONE INFINITA (visibile) ---
      gsap.to(logoRef.current, {
        rotation: 360 * s.spinDir,
        duration: s.spinDur,
        ease: 'none',
        repeat: -1,
      });

      // --- LEGGERO FLOAT SU/GIU INFINITO ---
      gsap.to(logoRef.current, {
        y: '-=12',
        duration: rand(1.8, 2.6),
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
      });

      // --- GLOW PULSANTE INFINITO ---
      gsap.to(glowRef.current, {
        opacity: 0.85,
        scale: 1.25,
        duration: 1.6,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
      });

      // --- SHIMMER SWEEP INFINITO ---
      gsap.fromTo(
        shimmerRef.current,
        { xPercent: -160, opacity: 0 },
        {
          xPercent: 160,
          opacity: 1,
          duration: 1.4,
          ease: 'power2.inOut',
          repeat: -1,
          repeatDelay: 1.6,
        }
      );

      // --- PARTICELLE DORATE ORBITANTI INFINITE ---
      const particles = gsap.utils.toArray('.pl-particle');
      particles.forEach((p, i) => {
        const angle = (i / particles.length) * Math.PI * 2;
        const radius = rand(85, 115);
        const dur = rand(4, 8);
        const tl = gsap.timeline({ repeat: -1 });
        // ruota la particella attorno al centro
        gsap.set(p, {
          x: Math.cos(angle) * radius,
          y: Math.sin(angle) * radius,
        });
        tl.to(p, {
          duration: dur,
          ease: 'none',
          motionPath: false,
          onUpdate: function () {
            const prog = this.progress() * Math.PI * 2 * s.spinDir + angle;
            gsap.set(p, {
              x: Math.cos(prog) * radius,
              y: Math.sin(prog) * radius,
            });
          },
        });
        // twinkle
        gsap.to(p, {
          opacity: rand(0.25, 0.6),
          duration: rand(0.6, 1.4),
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1,
          delay: rand(0, 1),
        });
      });

      // --- INTERATTIVITA': il logo segue il mouse (parallax tilt) ---
      const onMove = (e) => {
        const cx = window.innerWidth / 2;
        const cy = window.innerHeight / 2;
        const dx = (e.clientX - cx) / cx; // -1..1
        const dy = (e.clientY - cy) / cy;
        gsap.to(orbitRef.current, {
          rotationY: dx * 18,
          rotationX: -dy * 18,
          duration: 0.6,
          ease: 'power2.out',
          transformPerspective: 600,
        });
      };
      window.addEventListener('mousemove', onMove);

      // --- USCITA ---
      // Avvisiamo subito l'App: il contenuto entra MENTRE il preloader sfuma
      // (transizione coordinata, nessun delay "magico" nelle altre sezioni).
      const exitTimer = setTimeout(() => {
        onComplete?.();
        gsap.to(rootRef.current, {
          opacity: 0,
          duration: 0.7,
          ease: 'power2.inOut',
          onComplete: () => {
            window.removeEventListener('mousemove', onMove);
            setLoading(false);
          },
        });
      }, 2000);

      return () => {
        window.removeEventListener('mousemove', onMove);
        clearTimeout(exitTimer);
      };
    }, rootRef);

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!loading) return null;

  const s = session;

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
      <div style={{ textAlign: 'center' }}>
        {/* Stage 3D per il parallax */}
        <div
          ref={orbitRef}
          style={{
            position: 'relative',
            width: '220px',
            height: '220px',
            margin: '0 auto 2rem',
            transformStyle: 'preserve-3d',
          }}
        >
          {/* Glow pulsante */}
          <div
            ref={glowRef}
            style={{
              position: 'absolute',
              inset: '20px',
              borderRadius: '50%',
              background:
                'radial-gradient(circle, rgba(212,175,55,0.55) 0%, rgba(212,175,55,0) 70%)',
              filter: 'blur(18px)',
              opacity: 0.5,
              pointerEvents: 'none',
            }}
          />

          {/* Particelle dorate orbitanti */}
          {Array.from({ length: s.particleCount }).map((_, i) => (
            <span
              key={i}
              className="pl-particle"
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                width: `${rand(3, 6).toFixed(1)}px`,
                height: `${rand(3, 6).toFixed(1)}px`,
                marginTop: '-3px',
                marginLeft: '-3px',
                borderRadius: '50%',
                background: s.hueShift && i % 4 === 0
                  ? 'rgba(255, 240, 200, 0.9)'
                  : 'var(--accent-color)',
                boxShadow: '0 0 8px rgba(212, 175, 55, 0.9)',
                pointerEvents: 'none',
              }}
            />
          ))}

          {/* Logo */}
          <div
            ref={logoRef}
            style={{
              position: 'absolute',
              inset: '50px',
              borderRadius: '50%',
              overflow: 'hidden',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              background: 'var(--bg-color)',
              boxShadow:
                '0 0 30px rgba(212, 175, 55, 0.45), inset 0 0 0 2px rgba(212,175,55,0.4)',
            }}
          >
            <img
              src={logo}
              alt="Zulian Logo"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
            {/* Shimmer sweep */}
            <span
              ref={shimmerRef}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '60%',
                height: '100%',
                background:
                  'linear-gradient(115deg, transparent 0%, rgba(255,255,255,0.55) 50%, transparent 100%)',
                pointerEvents: 'none',
              }}
            />
          </div>
        </div>

        <h1
          className="pl-title"
          style={{
            color: 'var(--accent-color)',
            fontSize: '2rem',
            letterSpacing: '4px',
            marginBottom: '0.5rem',
          }}
        >
          {s.emoji} ZULIAN {s.emoji}
        </h1>

        <p
          className="pl-sub"
          style={{
            color: 'var(--text-secondary)',
            letterSpacing: '4px',
            fontSize: '0.9rem',
            textTransform: 'uppercase',
          }}
        >
          Social Media Marketing
        </p>

        <p
          className="pl-quote"
          style={{
            marginTop: '2rem',
            fontStyle: 'italic',
            fontFamily: 'var(--font-serif)',
            color: 'var(--text-primary)',
            maxWidth: '320px',
            margin: '2rem auto 0',
            fontSize: '1rem',
          }}
        >
          {s.quote}
        </p>
      </div>
    </div>
  );
};

export default Preloader;
