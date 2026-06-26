import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import SplineScene from './SplineScene';

/**
 * Avatar del brand nella Hero.
 * - Se viene passato `sceneUrl` (scena Spline) carica l'avatar 3D.
 * - Altrimenti mostra la foto reale (`image`) in un anello glow circolare.
 * Entrambi entrano con fade + scale e hanno un glow pulsante "vivo".
 * Rispetta prefers-reduced-motion.
 */
const Avatar3D = ({ sceneUrl, image, alt = 'Avatar', revealed = false, className = '' }) => {
  const containerRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    if (!revealed || !containerRef.current) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) {
      gsap.set(containerRef.current, { opacity: 1, scale: 1, filter: 'blur(0px)' });
      return;
    }

    const ctx = gsap.context(() => {
      // Ingresso: fade + scale + defocus
      gsap.fromTo(
        containerRef.current,
        { opacity: 0, scale: 0.8, filter: 'blur(20px)' },
        { opacity: 1, scale: 1, filter: 'blur(0px)', duration: 1.2, ease: 'power3.out', delay: 0.3 }
      );

      // Glow pulsante sull'anello
      if (ringRef.current) {
        gsap.to(ringRef.current, {
          boxShadow: '0 0 50px rgba(34, 211, 238, 0.55), 0 0 95px rgba(139, 92, 246, 0.3)',
          duration: 3,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1,
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, [revealed]);

  if (!revealed || (!sceneUrl && !image)) return null;

  const size = 'clamp(120px, 26vw, 164px)';

  return (
    <div
      ref={containerRef}
      className={`avatar-3d ${className}`}
      style={{
        position: 'relative',
        width: sceneUrl ? 'min(420px, 80vw)' : size,
        height: sceneUrl ? 'clamp(220px, 50vw, 340px)' : size,
        margin: '0 auto 1.4rem',
      }}
    >
      {sceneUrl ? (
        <SplineScene scene={sceneUrl} className="w-full h-full" />
      ) : (
        <div
          ref={ringRef}
          style={{
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            padding: '3px',
            background: 'linear-gradient(135deg, rgba(34,211,238,0.95), rgba(139,92,246,0.95))',
            boxShadow: '0 0 35px rgba(34,211,238,0.35), 0 0 70px rgba(139,92,246,0.18)',
          }}
        >
          <img
            src={image}
            alt={alt}
            style={{
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              objectFit: 'cover',
              objectPosition: 'center 18%',
              display: 'block',
              border: '2px solid rgba(8,10,20,0.92)',
            }}
          />
        </div>
      )}
    </div>
  );
};

export default Avatar3D;
