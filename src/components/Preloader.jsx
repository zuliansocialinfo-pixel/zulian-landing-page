import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import logoImg from '../assets/logo.jpg';

const codes = [
  "INITIALIZING STRATEGY...",
  "CONNECTING SOCIAL API...",
  "OPTIMIZING TARGETING...",
  "GENERATING CREATIVES...",
  "ZULIAN MARKETING ONLINE"
];

const Preloader = () => {
  const [loading, setLoading] = useState(true);
  const [currentLine, setCurrentLine] = useState('');
  const [lineIndex, setLineIndex] = useState(0);

  useEffect(() => {
    if (lineIndex < codes.length) {
      let charIndex = 0;
      const lineText = codes[lineIndex];
      const timer = setInterval(() => {
        setCurrentLine(lineText.substring(0, charIndex + 1));
        charIndex++;
        if (charIndex >= lineText.length) {
          clearInterval(timer);
          setTimeout(() => {
            setLineIndex((prev) => prev + 1);
          }, 350);
        }
      }, 20);
      return () => clearInterval(timer);
    }
  }, [lineIndex]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 4800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          id="preloader"
          data-testid="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'var(--bg-color)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 9999,
          }}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            style={{ textAlign: 'center' }}
          >
            {lineIndex < codes.length ? (
              <div 
                className="code-typing" 
                data-testid="code-typing" 
                style={{ 
                  fontFamily: 'monospace', 
                  color: 'var(--accent-color)', 
                  fontSize: '1.2rem', 
                  minHeight: '60px',
                  marginBottom: '2rem',
                  textShadow: '0 0 10px rgba(212, 175, 55, 0.5)'
                }}
              >
                <span>&gt; {currentLine}</span>
                <span className="blink-cursor">_</span>
              </div>
            ) : (
              /* The Logo Container */
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1, rotateY: 360 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                style={{
                  width: '240px',
                  height: '240px',
                  margin: '0 auto 2rem',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: '50%',
                  background: 'var(--bg-color)',
                  boxShadow: '0 0 50px rgba(212, 175, 55, 0.6)',
                  overflow: 'hidden'
                }}
                className="preloader-logo-container"
              >
                <img src={logoImg} alt="Zulian Logo" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </motion.div>
            )}
            
            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              style={{ color: 'var(--accent-color)', fontSize: '2.5rem', letterSpacing: '2px', marginBottom: '0.5rem' }}
            >
              ZULIAN
            </motion.h1>
            
            <motion.p
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1, duration: 0.8 }}
              style={{ color: 'var(--text-secondary)', letterSpacing: '4px', fontSize: '1rem', textTransform: 'uppercase' }}
            >
              Social Media Marketing
            </motion.p>
          </motion.div>
          
          <style>{`
            @keyframes blink {
              0%, 100% { opacity: 1; }
              50% { opacity: 0; }
            }
            .blink-cursor {
              animation: blink 0.8s infinite;
              font-weight: bold;
              color: var(--accent-color);
            }
          `}</style>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
