import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * SISTEMA DI ANIMAZIONI GLOBALE (GSAP)
 * --------------------------------------------------------------------------
 * Un'unica "voce" di movimento per tutto il sito: stesso easing, stessa
 * durata, stesso ritmo su ogni pagina. Niente animazioni sparse.
 *
 * Uso dichiarativo via attributi (così le pagine restano pulite):
 *   data-anim="reveal"    -> il blocco entra (fade + y + micro-blur) allo scroll
 *   data-anim="stagger"   -> i figli diretti entrano a cascata, ordinati
 *
 * Tutto rispetta prefers-reduced-motion e si alleggerisce su mobile.
 * Si animano solo transform/opacity/filter (leggero, niente layout).
 */

// --- Token di movimento condivisi (le "regole di stile") ---
export const EASE = 'power3.out';
export const EASE_INOUT = 'power2.inOut';
export const DUR = 0.8;

export const prefersReduced = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Reveal coerente dei blocchi marcati [data-anim="reveal"]
function animateSectionsOnScroll(scope, mobile) {
  const y = mobile ? 26 : 42;
  const dur = mobile ? 0.6 : DUR;

  gsap.utils.toArray(scope.querySelectorAll('[data-anim="reveal"]')).forEach((el) => {
    gsap.from(el, {
      opacity: 0,
      y,
      filter: 'blur(6px)',
      duration: dur,
      ease: EASE,
      scrollTrigger: { trigger: el, start: 'top 86%', once: true },
    });
  });
}

// Liste/griglie marcate [data-anim="stagger"]: i figli entrano in sequenza
function animateStaggers(scope, mobile) {
  const y = mobile ? 22 : 36;
  const dur = mobile ? 0.55 : 0.7;

  gsap.utils.toArray(scope.querySelectorAll('[data-anim="stagger"]')).forEach((group) => {
    const items = gsap.utils.toArray(group.children);
    if (!items.length) return;
    gsap.from(items, {
      opacity: 0,
      y,
      filter: 'blur(6px)',
      duration: dur,
      ease: EASE,
      stagger: mobile ? 0.07 : 0.11,
      scrollTrigger: { trigger: group, start: 'top 84%', once: true },
    });
  });
}

/**
 * Inizializza il sistema su uno scope (default: tutto il documento).
 * Ritorna una funzione di cleanup da chiamare al cambio pagina.
 */
export function initMotion(scope = document) {
  // Accessibilità: con reduced-motion gli elementi restano subito visibili.
  if (prefersReduced()) return () => {};

  const ctx = gsap.context(() => {
    const mm = gsap.matchMedia();
    mm.add(
      { desktop: '(min-width: 769px)', mobile: '(max-width: 768px)' },
      (c) => {
        const mobile = !!c.conditions.mobile;
        animateSectionsOnScroll(scope, mobile);
        animateStaggers(scope, mobile);
      }
    );
  }, scope);

  // Ricalcola le posizioni una volta che il layout è pronto.
  const r1 = requestAnimationFrame(() => ScrollTrigger.refresh());

  return () => {
    cancelAnimationFrame(r1);
    ctx.revert();
  };
}

export default initMotion;
