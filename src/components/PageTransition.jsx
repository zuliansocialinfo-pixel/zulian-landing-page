import React, { useState, useRef, useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';
import gsap from 'gsap';

/**
 * Transizione cinematografica tra pagine (stile Barba) per React Router.
 * Sequenza: strisce dorate salgono e coprono lo schermo -> si scambia la
 * pagina (e si torna in cima) -> le strisce scendono rivelando la nuova.
 * Rispetta prefers-reduced-motion (cambio istantaneo).
 *
 * Uso: <PageTransition>{(location) => <Routes location={location}>...}</PageTransition>
 */
const PageTransition = ({ children }) => {
  const location = useLocation();
  const [display, setDisplay] = useState(location);
  const overlayRef = useRef(null);
  const first = useRef(true);

  useLayoutEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    if (location.pathname === display.pathname) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) {
      setDisplay(location);
      window.scrollTo(0, 0);
      return;
    }

    const overlay = overlayRef.current;
    const panels = overlay.querySelectorAll('.pt-panel');

    const tl = gsap.timeline();
    tl.set(overlay, { pointerEvents: 'auto' })
      .set(panels, { scaleY: 0, transformOrigin: 'bottom center' })
      .to(panels, { scaleY: 1, duration: 0.38, stagger: 0.05, ease: 'power3.inOut' })
      .add(() => {
        setDisplay(location);
        window.scrollTo(0, 0);
      })
      .set(panels, { transformOrigin: 'top center' })
      .to(panels, { scaleY: 0, duration: 0.42, stagger: 0.05, ease: 'power3.inOut' }, '+=0.05')
      .set(overlay, { pointerEvents: 'none' });

    return () => tl.kill();
  }, [location, display]);

  return (
    <>
      {children(display)}
      <div ref={overlayRef} className="pt-overlay" aria-hidden="true">
        <span className="pt-panel" />
        <span className="pt-panel" />
        <span className="pt-panel" />
        <span className="pt-panel" />
        <span className="pt-panel" />
      </div>
    </>
  );
};

export default PageTransition;
