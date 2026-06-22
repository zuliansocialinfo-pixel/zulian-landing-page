import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

/**
 * Inclina l'elemento in 3D seguendo il mouse (effetto "oggetto reale").
 * Solo desktop con puntatore fine; rispetta reduced-motion.
 */
const Tilt = ({ children, max = 9, className, style }) => {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!fine || reduce) return;

    const onMove = (e) => {
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      gsap.to(el, {
        rotateY: px * max,
        rotateX: -py * max,
        transformPerspective: 900,
        transformOrigin: 'center',
        duration: 0.4,
        ease: 'power2.out',
      });
    };
    const onLeave = () =>
      gsap.to(el, { rotateX: 0, rotateY: 0, duration: 0.7, ease: 'elastic.out(1, 0.5)' });

    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseleave', onLeave);
    return () => {
      el.removeEventListener('mousemove', onMove);
      el.removeEventListener('mouseleave', onLeave);
    };
  }, [max]);

  return (
    <div ref={ref} className={className} style={{ ...style, transformStyle: 'preserve-3d', willChange: 'transform' }}>
      {children}
    </div>
  );
};

export default Tilt;
