import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Preloader = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time to show the intro animation
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
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
            {/* The Logo Container */}
            <motion.div
              animate={{ 
                rotateY: [0, 360],
              }}
              transition={{ 
                duration: 2, 
                ease: "easeInOut",
                times: [0, 1]
              }}
              style={{
                width: '120px',
                height: '120px',
                margin: '0 auto 2rem',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, var(--accent-color), var(--accent-hover))',
                boxShadow: '0 0 30px rgba(212, 175, 55, 0.4)',
              }}
            >
              <span style={{ fontSize: '3rem', color: '#000', fontFamily: 'var(--font-serif)', fontWeight: 'bold' }}>Z</span>
            </motion.div>
            
            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              style={{ color: 'var(--accent-color)', fontSize: '2rem', letterSpacing: '2px', marginBottom: '0.5rem' }}
            >
              ZULIAN
            </motion.h1>
            
            <motion.p
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1, duration: 0.8 }}
              style={{ color: 'var(--text-secondary)', letterSpacing: '4px', fontSize: '0.9rem', textTransform: 'uppercase' }}
            >
              Social Media Marketing
            </motion.p>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.8, duration: 1 }}
              style={{ 
                marginTop: '2rem', 
                fontStyle: 'italic', 
                color: 'var(--text-primary)',
                maxWidth: '300px',
                margin: '2rem auto 0',
                fontSize: '0.95rem'
              }}
            >
              "La strategia vincente, fatta su misura."
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
