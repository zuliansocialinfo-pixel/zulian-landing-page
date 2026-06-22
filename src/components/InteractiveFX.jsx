import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

/**
 * Layer di luci interattive "futuristiche":
 * - DESKTOP: un alone luminoso + un anello reticolo seguono il mouse con
 *   inerzia, con una scia di particelle; l'anello reagisce al passaggio sui
 *   link/bottoni.
 * - OVUNQUE (anche mobile/touch): ad ogni click/tap parte un'onda di luce
 *   (ripple) nel colore della sezione corrente -> "quando clicchi, succede".
 * Il colore base del sito e' gestito da SectionThemer (cambia per sezione):
 * qui NON lo sovrascriviamo, diamo solo feedback istantaneo.
 * Rispetta prefers-reduced-motion (si disattiva del tutto).
 */
const isReduced = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const isDesktopCursor = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(hover: hover) and (pointer: fine)').matches &&
  window.innerWidth >= 992;

const InteractiveFX = () => {
  const glowRef = useRef(null);
  const ringRef = useRef(null);
  const layerRef = useRef(null);

  useEffect(() => {
    if (isReduced()) return;

    const layer = layerRef.current;
    const desktop = isDesktopCursor();

    // --- Onda di luce al click/tap: funziona su QUALSIASI dispositivo ---
    const spawnRipple = (x, y) => {
      const ripple = document.createElement('div');
      ripple.className = 'fx-ripple';
      ripple.style.left = x + 'px';
      ripple.style.top = y + 'px';
      layer.appendChild(ripple);
      gsap.fromTo(ripple,
        { scale: 0, opacity: 0.85 },
        { scale: 1, opacity: 0, duration: 0.9, ease: 'power2.out', onComplete: () => ripple.remove() }
      );
    };

    // pointerdown copre mouse, penna e touch con le stesse coordinate
    const onPointerDown = (e) => {
      spawnRipple(e.clientX, e.clientY);
      if (desktop && ringRef.current) {
        gsap.fromTo(ringRef.current,
          { scale: 0.6, opacity: 1 },
          { scale: 1.6, opacity: 0.4, duration: 0.5, ease: 'power2.out', overwrite: true }
        );
      }
    };
    window.addEventListener('pointerdown', onPointerDown);

    // --- Reticolo + alone + scia: solo desktop con mouse ---
    let cleanupDesktop = () => {};
    if (desktop) {
      const glow = glowRef.current;
      const ring = ringRef.current;
      const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
      const target = { x: pos.x, y: pos.y };
      const setGlowX = gsap.quickSetter(glow, 'x', 'px');
      const setGlowY = gsap.quickSetter(glow, 'y', 'px');
      const setRingX = gsap.quickSetter(ring, 'x', 'px');
      const setRingY = gsap.quickSetter(ring, 'y', 'px');
      let lastTrail = 0;

      const spawnTrail = (x, y) => {
        const dot = document.createElement('div');
        dot.className = 'fx-trail';
        dot.style.left = x + 'px';
        dot.style.top = y + 'px';
        layer.appendChild(dot);
        gsap.fromTo(dot,
          { opacity: 0.7, scale: 1 },
          { opacity: 0, scale: 0.2, duration: 0.7, ease: 'power2.out', onComplete: () => dot.remove() }
        );
      };

      const onMove = (e) => {
        target.x = e.clientX;
        target.y = e.clientY;
        const now = performance.now();
        if (now - lastTrail > 40) {
          lastTrail = now;
          spawnTrail(e.clientX, e.clientY);
        }
      };

      const onOver = (e) => {
        if (e.target.closest('a, button, .glass, [role="button"]')) {
          gsap.to(ring, { scale: 1.8, duration: 0.3, overwrite: 'auto' });
          gsap.to(glow, { scale: 1.4, duration: 0.3, overwrite: 'auto' });
        }
      };
      const onOut = (e) => {
        if (e.target.closest('a, button, .glass, [role="button"]')) {
          gsap.to(ring, { scale: 1, duration: 0.3, overwrite: 'auto' });
          gsap.to(glow, { scale: 1, duration: 0.3, overwrite: 'auto' });
        }
      };

      const ticker = () => {
        pos.x += (target.x - pos.x) * 0.18;
        pos.y += (target.y - pos.y) * 0.18;
        setGlowX(pos.x);
        setGlowY(pos.y);
        setRingX(target.x);
        setRingY(target.y);
      };

      gsap.set([glow, ring], { xPercent: -50, yPercent: -50 });
      gsap.ticker.add(ticker);
      window.addEventListener('mousemove', onMove);
      document.addEventListener('mouseover', onOver);
      document.addEventListener('mouseout', onOut);

      cleanupDesktop = () => {
        gsap.ticker.remove(ticker);
        window.removeEventListener('mousemove', onMove);
        document.removeEventListener('mouseover', onOver);
        document.removeEventListener('mouseout', onOut);
      };
    }

    return () => {
      window.removeEventListener('pointerdown', onPointerDown);
      cleanupDesktop();
    };
  }, []);

  // Reduced-motion: niente layer.
  if (isReduced()) return null;

  const desktop = isDesktopCursor();

  return (
    <div ref={layerRef} className="fx-layer" aria-hidden="true">
      {/* Reticolo e alone: solo desktop con mouse */}
      {desktop && (
        <>
          <div
            ref={glowRef}
            className="fx-glow"
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '380px',
              height: '380px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(34, 211, 238,0.12) 0%, rgba(34, 211, 238,0.04) 35%, transparent 70%)',
              pointerEvents: 'none',
              zIndex: 1,
              willChange: 'transform',
            }}
          />
          <div
            ref={ringRef}
            className="fx-ring"
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '34px',
              height: '34px',
              borderRadius: '50%',
              border: '1.5px solid var(--accent-color)',
              pointerEvents: 'none',
              zIndex: 9998,
              willChange: 'transform',
              boxShadow: '0 0 12px rgba(34, 211, 238,0.4)',
            }}
          />
        </>
      )}
    </div>
  );
};

export default InteractiveFX;
