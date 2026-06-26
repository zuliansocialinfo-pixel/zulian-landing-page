import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { initMotion } from '../anim/motion';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/**
 * Attiva il sistema di animazioni globale e lo ri-applica a ogni cambio
 * pagina (dopo che la nuova route è montata e la transizione è iniziata).
 * Non renderizza nulla.
 */
const SiteMotion = ({ active }) => {
  const location = useLocation();

  useEffect(() => {
    if (!active) return undefined;
    let cleanup = () => {};
    // Attende il montaggio della nuova pagina dentro PageTransition.
    const t = window.setTimeout(() => {
      cleanup = initMotion(document);
    }, 280);
    // Un refresh extra a layout assestato (immagini/font).
    const t2 = window.setTimeout(() => ScrollTrigger.refresh(), 700);

    return () => {
      window.clearTimeout(t);
      window.clearTimeout(t2);
      cleanup();
    };
  }, [active, location.pathname]);

  return null;
};

export default SiteMotion;
