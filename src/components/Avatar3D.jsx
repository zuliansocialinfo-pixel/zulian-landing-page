import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import SplineScene from './SplineScene';

const Avatar3D = ({ sceneUrl, revealed = false, className = '' }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!revealed || !containerRef.current) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) {
      gsap.set(containerRef.current, { opacity: 1, scale: 1 });
      return;
    }

    // Animazione ingresso avatar: scale + glow
    gsap.fromTo(
      containerRef.current,
      { opacity: 0, scale: 0.8, filter: 'blur(20px)' },
      {
        opacity: 1,
        scale: 1,
        filter: 'blur(0px)',
        duration: 1.2,
        ease: 'power3.out',
        delay: 0.3,
      }
    );

    // Glow pulsante
    gsap.to(containerRef.current, {
      boxShadow: '0 0 60px rgba(34, 211, 238, 0.4), 0 0 120px rgba(139, 92, 246, 0.2)',
      duration: 3,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1,
    });
  }, [revealed]);

  if (!revealed) return null;

  return (
    <div
      ref={containerRef}
      className={`avatar-3d ${className}`}
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        maxWidth: '500px',
        maxHeight: '600px',
        margin: '0 auto',
      }}
    >
      {sceneUrl ? (
        <SplineScene scene={sceneUrl} className="w-full h-full" />
      ) : (
        <div style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, rgba(34, 211, 238, 0.1), rgba(139, 92, 246, 0.1))',
          borderRadius: '24px',
          border: '1px solid rgba(34, 211, 238, 0.3)',
          color: 'var(--text-secondary)',
          fontSize: '0.9rem',
          textAlign: 'center',
          padding: '2rem',
        }}>
          Avatar 3D — Spline scene loading...
        </div>
      )}
    </div>
  );
};

export default Avatar3D;
