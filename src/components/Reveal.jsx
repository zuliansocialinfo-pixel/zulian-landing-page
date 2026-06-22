import React from 'react';
import { motion } from 'framer-motion';

/**
 * Reveal allo scroll raffinato e riutilizzabile.
 * Slide + leggero sfocato che si mette a fuoco: piu' "cinematografico"
 * di una semplice dissolvenza. once=true per non ripetere.
 * Imposta amount basso cosi' parte appena la sezione entra (niente blocchi
 * piatti che restano fermi). Rispetta prefers-reduced-motion via framer.
 */
const EASE = [0.22, 1, 0.36, 1];

const Reveal = ({
  children,
  y = 30,
  x = 0,
  delay = 0,
  duration = 0.75,
  amount = 0.2,
  className,
  style,
}) => (
  <motion.div
    initial={{ opacity: 0, y, x, filter: 'blur(8px)' }}
    whileInView={{ opacity: 1, y: 0, x: 0, filter: 'blur(0px)' }}
    viewport={{ once: true, amount }}
    transition={{ duration, delay, ease: EASE }}
    className={className}
    style={style}
  >
    {children}
  </motion.div>
);

export default Reveal;
