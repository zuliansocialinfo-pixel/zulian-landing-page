import React from 'react';
import { motion } from 'framer-motion';

const VideoShowcase = () => {
  return (
    <section id="video-showcase" style={{ padding: '6rem 0', backgroundColor: '#0a0a0a', borderTop: '1px solid var(--glass-border)' }}>
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-accent" style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Presentazione Video</h2>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto' }}>
            Scopri in due minuti come posso trasformare la presenza online della tua attività.
          </p>
        </div>

        <motion.div 
          className="glass"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{
            maxWidth: '800px',
            margin: '0 auto',
            padding: '1.5rem',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          {/* Video Placeholder Container */}
          <div 
            className="video-container"
            data-testid="video-container"
            style={{
              position: 'relative',
              width: '100%',
              paddingTop: '56.25%', // 16:9 Aspect Ratio
              background: '#000',
              borderRadius: '8px',
              overflow: 'hidden',
              boxShadow: '0 10px 30px rgba(0,0,0,0.5)'
            }}
          >
            {/* HTML5 Video or Embed Placeholder */}
            <iframe
              src="https://www.youtube.com/embed/dQw4w9WgXcQ"
              title="Zulian Presentation Video"
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                border: 0
              }}
              allowFullScreen
            ></iframe>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default VideoShowcase;
