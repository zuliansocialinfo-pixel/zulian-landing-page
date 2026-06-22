import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

/**
 * Layer di luci interattive "futuristiche":
 * - Un alone luminoso (cursor glow) segue il mouse con inerzia morbida.
 * - Una scia di particelle dietro al cursore.
 * - Onde di luce (ripple) ad ogni click che si espandono.
 * - Al passaggio/click cambia leggermente la tonalita' dell'accento della home.
 * Tutto guidato da GSAP. Si disattiva su mobile/touch e con reduced-motion.
 */
const ACCENTS = ['#d4af37', '#e8c75a', '#c9a227', '#f0d878', '#b8860b'];

const isFXDisabled = () =>
  typeof window !== 'undefined' &&
  (window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
    window.matchMedia('(pointer: coarse)').matches);

const InteractiveFX = () => {
  const glowRef = useRef(null);
  const ringRef = useRef(null);
  const layerRef = useRef(null);

  useEffect(() => {
    if (isFXDisabled()) return;

    const glow = glowRef.current;
    const ring = ringRef.current;
    const layer = layerRef.current;

    // Posizione target e corrente (per inerzia)
    const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const target = { x: pos.x, y: pos.y };

    // Quick setters per performance (no re-layout)
    const setGlowX = gsap.quickSetter(glow, 'x', 'px');
    const setGlowY = gsap.quickSetter(glow, 'y', 'px');
    const setRingX = gsap.quickSetter(ring, 'x', 'px');
    const setRingY = gsap.quickSetter(ring, 'y', 'px');

    let colorIdx = 0;
    let lastTrail = 0;

    // Proxy per interpolare davvero il colore (GSAP non tween-a hex dentro var)
    const colorProxy = { c: ACCENTS[0] };

    const onMove = (e) => {
      target.x = e.clientX;
      target.y = e.clientY;

      // Scia di particelle (throttle ~ ogni 40ms)
      const now = performance.now();
      if (now - lastTrail > 40) {
        lastTrail = now;
        spawnTrail(e.clientX, e.clientY);
      }
    };

    const spawnTrail = (x, y) => {
      const dot = document.createElement('div');
      dot.className = 'fx-trail';
      dot.style.left = x + 'px';
      dot.style.top = y + 'px';
      layer.appendChild(dot);
      gsap.fromTo(dot,
        { opacity: 0.7, scale: 1 },
        {
          opacity: 0, scale: 0.2, duration: 0.7, ease: 'power2.out',
          onComplete: () => dot.remove(),
        }
      );
    };

    // Onda di luce al click + cambio colore accento
    const onClick = (e) => {
      const ripple = document.createElement('div');
      ripple.className = 'fx-ripple';
      ripple.style.left = e.clientX + 'px';
      ripple.style.top = e.clientY + 'px';
      layer.appendChild(ripple);
      gsap.fromTo(ripple,
        { scale: 0, opacity: 0.8 },
        {
          scale: 1, opacity: 0, duration: 0.9, ease: 'power2.out',
          onComplete: () => ripple.remove(),
        }
      );

      // Pulse sull'anello del cursore
      gsap.fromTo(ring,
        { scale: 0.6, opacity: 1 },
        { scale: 1.6, opacity: 0.4, duration: 0.5, ease: 'power2.out', overwrite: true }
      );

      // Cambio colore accento della home: interpolazione reale via proxy
      colorIdx = (colorIdx + 1) % ACCENTS.length;
      gsap.to(colorProxy, {
        c: ACCENTS[colorIdx],
        duration: 0.8,
        ease: 'power2.inOut',
        onUpdate: () => {
          document.documentElement.style.setProperty('--accent-color', colorProxy.c);
        },
      });
    };

    // Hover su elementi interattivi: ingrandisce l'anello
    const onOver = (e) => {
      if (e.target.closest('a, button, .glass, [role="button"]')) {
        gsap.to(ring, { scale: 1.8, borderColor: 'var(--accent-color)', duration: 0.3, overwrite: 'auto' });
        gsap.to(glow, { scale: 1.4, duration: 0.3, overwrite: 'auto' });
      }
    };
    const onOut = (e) => {
      if (e.target.closest('a, button, .glass, [role="button"]')) {
        gsap.to(ring, { scale: 1, duration: 0.3, overwrite: 'auto' });
        gsap.to(glow, { scale: 1, duration: 0.3, overwrite: 'auto' });
      }
    };

    // Loop di rendering con inerzia
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
    window.addEventListener('click', onClick);
    document.addEventListener('mouseover', onOver);
    document.addEventListener('mouseout', onOut);

    return () => {
      gsap.ticker.remove(ticker);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('click', onClick);
      document.removeEventListener('mouseover', onOver);
      document.removeEventListener('mouseout', onOut);
    };
  }, []);

  // Su touch / reduced-motion non renderizziamo nulla (niente reticolo fantasma).
  if (isFXDisabled()) return null;

  return (
    <div ref={layerRef} className="fx-layer" aria-hidden="true">
      {/* Alone morbido che segue il mouse con inerzia */}
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
          background: 'radial-gradient(circle, rgba(212,175,55,0.12) 0%, rgba(212,175,55,0.04) 35%, transparent 70%)',
          pointerEvents: 'none',
          zIndex: 1,
          willChange: 'transform',
        }}
      />
      {/* Anello "reticolo" preciso sul cursore */}
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
          boxShadow: '0 0 12px rgba(212,175,55,0.4)',
        }}
      />
    </div>
  );
};

export default InteractiveFX;
