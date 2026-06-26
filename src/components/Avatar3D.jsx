import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import SplineScene from './SplineScene';

/**
 * Avatar del brand nella Hero.
 * - Se viene passato `sceneUrl` (scena Spline) carica l'avatar 3D.
 * - Altrimenti mostra il personaggio (`image`) ANIMATO come la demo del robot:
 *     · entrata in dissolvenza + scale
 *     · galleggiamento "idle" continuo (bob + leggera oscillazione)
 *     · inseguimento del mouse: la figura si orienta verso il cursore (tilt 3D)
 *     · glow pulsante dietro la figura
 * Rispetta prefers-reduced-motion.
 */
const Avatar3D = ({ sceneUrl, image, alt = 'Avatar', revealed = false, className = '' }) => {
  const containerRef = useRef(null);
  const glowRef = useRef(null);
  const floatRef = useRef(null);
  const tiltRef = useRef(null);

  useEffect(() => {
    if (!revealed || !containerRef.current || sceneUrl) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) {
      gsap.set(containerRef.current, { opacity: 1, scale: 1, filter: 'blur(0px)' });
      return;
    }

    const ctx = gsap.context(() => {
      // Entrata
      gsap.fromTo(
        containerRef.current,
        { opacity: 0, scale: 0.85, filter: 'blur(16px)' },
        { opacity: 1, scale: 1, filter: 'blur(0px)', duration: 1.1, ease: 'power3.out', delay: 0.25 }
      );

      // Galleggiamento idle (come il robot fermo che "respira")
      gsap.to(floatRef.current, { y: -14, duration: 2.6, ease: 'sine.inOut', yoyo: true, repeat: -1 });
      gsap.to(floatRef.current, { rotation: 1.4, duration: 3.4, ease: 'sine.inOut', yoyo: true, repeat: -1 });

      // Glow pulsante dietro la figura
      gsap.to(glowRef.current, { opacity: 0.6, scale: 1.12, duration: 3, ease: 'sine.inOut', yoyo: true, repeat: -1 });
    }, containerRef);

    // Inseguimento del mouse solo su desktop con puntatore fine.
    // L'omino si GIRA verso il cursore (tilt 3D) e si SPOSTA verso di esso
    // (drift), per un "segui il mouse" netto come la demo del robot.
    const mm = gsap.matchMedia();
    mm.add('(min-width: 768px) and (pointer: fine)', () => {
      const rotY = gsap.quickTo(tiltRef.current, 'rotationY', { duration: 0.55, ease: 'power3' });
      const rotX = gsap.quickTo(tiltRef.current, 'rotationX', { duration: 0.55, ease: 'power3' });
      const moveX = gsap.quickTo(tiltRef.current, 'x', { duration: 0.55, ease: 'power3' });
      const moveY = gsap.quickTo(tiltRef.current, 'y', { duration: 0.55, ease: 'power3' });

      const onMove = (e) => {
        const r = containerRef.current.getBoundingClientRect();
        const dx = (e.clientX - (r.left + r.width / 2)) / window.innerWidth;   // ~ -0.5..0.5
        const dy = (e.clientY - (r.top + r.height / 2)) / window.innerHeight;
        rotY(gsap.utils.clamp(-34, 34, dx * 75));   // si gira verso il cursore
        rotX(gsap.utils.clamp(-24, 24, -dy * 50));
        moveX(gsap.utils.clamp(-38, 38, dx * 85));  // si sposta verso il cursore
        moveY(gsap.utils.clamp(-26, 26, dy * 65));
      };
      const onLeave = () => { rotY(0); rotX(0); moveX(0); moveY(0); };

      window.addEventListener('mousemove', onMove);
      window.addEventListener('mouseleave', onLeave);
      return () => {
        window.removeEventListener('mousemove', onMove);
        window.removeEventListener('mouseleave', onLeave);
      };
    });

    return () => {
      ctx.revert();
      mm.revert();
    };
  }, [revealed, sceneUrl]);

  if (!revealed || (!sceneUrl && !image)) return null;

  if (sceneUrl) {
    return (
      <div
        className={`avatar-3d ${className}`}
        style={{ position: 'relative', width: 'min(420px, 80vw)', height: 'clamp(220px, 50vw, 340px)', margin: '0 auto 1.2rem' }}
      >
        <SplineScene scene={sceneUrl} className="w-full h-full" />
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={`avatar-3d ${className}`}
      style={{
        position: 'relative',
        height: 'clamp(170px, 32vw, 260px)',
        margin: '0 auto 1.1rem',
        perspective: '900px',
        willChange: 'transform, opacity, filter',
      }}
    >
      {/* Glow dietro la figura */}
      <div
        ref={glowRef}
        style={{
          position: 'absolute',
          top: '46%',
          left: '50%',
          width: '150%',
          height: '70%',
          transform: 'translate(-50%, -50%)',
          background: 'radial-gradient(ellipse at center, rgba(34,211,238,0.32) 0%, rgba(139,92,246,0.18) 40%, rgba(0,0,0,0) 70%)',
          filter: 'blur(26px)',
          opacity: 0.4,
          zIndex: 0,
          pointerEvents: 'none',
        }}
      />
      <div ref={floatRef} style={{ position: 'relative', height: '100%', zIndex: 1 }}>
        <div ref={tiltRef} style={{ height: '100%', transformStyle: 'preserve-3d' }}>
          <img
            src={image}
            alt={alt}
            draggable={false}
            style={{
              height: '100%',
              width: 'auto',
              display: 'block',
              filter: 'drop-shadow(0 10px 22px rgba(0,0,0,0.55))',
              userSelect: 'none',
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Avatar3D;
