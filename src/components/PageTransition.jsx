import React, { useState, useRef, useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

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
      // La nuova pagina monta i suoi ScrollTrigger: ricalcola le misure.
      requestAnimationFrame(() => ScrollTrigger.refresh());
      return;
    }

    const overlay = overlayRef.current;
    const panels = overlay.querySelectorAll('.pt-panel');

    const tl = gsap.timeline();
    tl.set(overlay, { pointerEvents: 'auto' })
      .set(panels, { scaleY: 0, transformOrigin: 'bottom center', opacity: 1 })
      .to(panels, { scaleY: 1, duration: 0.28, stagger: 0.03, ease: 'power4.inOut' }, 0)
      .to(panels, { opacity: 0.9, duration: 0.15 }, 0)
      .add(() => {
        setDisplay(location);
        if (window.__lenis) window.__lenis.scrollTo(0, { immediate: true });
        else window.scrollTo(0, 0);
      }, 0.2)
      .set(panels, { transformOrigin: 'top center' })
      .to(panels, { scaleY: 0, opacity: 0, duration: 0.26, stagger: 0.03, ease: 'power4.inOut' }, '+=0')
      .set(overlay, { pointerEvents: 'none' })
      // La nuova pagina ha montato i suoi ScrollTrigger durante lo swap:
      // ora che e' visibile, ricalcola le misure cosi' le animazioni
      // allo scroll ripartono correttamente (niente sezioni "morte").
      .add(() => ScrollTrigger.refresh());

    return () => {
      tl.kill();
      // Sicurezza: mai lasciare l'overlay che intercetta i click.
      if (overlay) gsap.set(overlay, { pointerEvents: 'none' });
    };
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
