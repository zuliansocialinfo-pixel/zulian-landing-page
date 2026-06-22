import React, { useState, useRef, useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Transizione cinematografica tra pagine (stile Barba) per React Router.
 * Pannelli cyan salgono e coprono lo schermo -> si scambia la pagina (e si
 * torna in cima) -> i pannelli scendono rivelando la nuova.
 *
 * IMPORTANTE: l'effetto dipende SOLO da `location`. Lo swap interno aggiorna
 * `display` (stato) ma NON deve far ripartire l'effetto, altrimenti la
 * cleanup ucciderebbe la timeline a meta' chiusura, lasciando i pannelli
 * "incollati" sopra il testo. Il confronto avviene tramite ref.
 */
const PageTransition = ({ children }) => {
  const location = useLocation();
  const [display, setDisplay] = useState(location);
  const displayPathRef = useRef(location.pathname);
  const overlayRef = useRef(null);
  const first = useRef(true);

  useLayoutEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    if (location.pathname === displayPathRef.current) return;

    const swap = () => {
      setDisplay(location);
      displayPathRef.current = location.pathname;
      if (window.__lenis) window.__lenis.scrollTo(0, { immediate: true });
      else window.scrollTo(0, 0);
    };

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) {
      swap();
      requestAnimationFrame(() => ScrollTrigger.refresh());
      return;
    }

    const overlay = overlayRef.current;
    const panels = overlay.querySelectorAll('.pt-panel');

    const tl = gsap.timeline();
    tl.set(overlay, { pointerEvents: 'auto' })
      .set(panels, { scaleY: 0, opacity: 1, transformOrigin: 'bottom center' })
      .to(panels, { scaleY: 1, duration: 0.28, stagger: 0.03, ease: 'power4.inOut' }, 0)
      .add(swap, 0.22)
      .set(panels, { transformOrigin: 'top center' })
      .to(panels, { scaleY: 0, duration: 0.3, stagger: 0.03, ease: 'power4.inOut' })
      .set(overlay, { pointerEvents: 'none' })
      .add(() => ScrollTrigger.refresh());

    return () => {
      tl.kill();
      // Reset di sicurezza: i pannelli non devono MAI restare visibili
      // né intercettare i click se la timeline viene interrotta.
      gsap.set(panels, { scaleY: 0, opacity: 1 });
      gsap.set(overlay, { pointerEvents: 'none' });
    };
  }, [location]); // eslint-disable-line react-hooks/exhaustive-deps

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
