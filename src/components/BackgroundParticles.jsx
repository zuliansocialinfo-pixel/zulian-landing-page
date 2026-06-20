import React, { useEffect, useRef, useState } from 'react';

const BackgroundParticles = () => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Check user preference for reduced motion
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    const handleChange = (e) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let isElementVisible = true;
    let isTabVisible = document.visibilityState === 'visible';
    const maxParticles = 40; // Low count for high performance (40-45 limit)
    const particles = [];

    // Set canvas dimensions respecting Device Pixel Ratio for rendering sharpness
    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Tab visibility listener
    const handleVisibilityChange = () => {
      isTabVisible = document.visibilityState === 'visible';
      if (isTabVisible && isElementVisible) {
        tick();
      } else {
        cancelAnimationFrame(animationFrameId);
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Intersection Observer to pause animation loops when component is out of view
    const observer = new IntersectionObserver(
      ([entry]) => {
        isElementVisible = entry.isIntersecting;
        if (isElementVisible && isTabVisible) {
          tick();
        } else {
          cancelAnimationFrame(animationFrameId);
        }
      },
      { threshold: 0.05 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    // Particle representation class
    class Particle {
      constructor(w, h) {
        this.reset(w, h, true);
      }

      reset(w, h, initial = false) {
        this.x = Math.random() * w;
        this.y = initial ? Math.random() * h : h + 10;
        this.size = Math.random() * 2.0 + 0.5; // Very small, fine particles
        this.speedX = Math.random() * 0.15 - 0.075; // Subtle drift
        this.speedY = -(Math.random() * 0.2 + 0.08); // Slow drift upward
        this.opacity = Math.random() * 0.4 + 0.1;
        this.fade = Math.random() * 0.005 + 0.002;
        this.fadeDirection = Math.random() > 0.5 ? 1 : -1;
      }

      update(w, h) {
        this.x += this.speedX;
        this.y += this.speedY;

        // Reset particle position if it exits viewport bounds
        if (this.y < -10 || this.x < -10 || this.x > w + 10) {
          this.reset(w, h, false);
        }

        // Opacity pulsing
        this.opacity += this.fade * this.fadeDirection;
        if (this.opacity > 0.65 || this.opacity < 0.08) {
          this.fadeDirection *= -1;
        }
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        // Using gold theme color (rgb 212, 175, 55)
        ctx.fillStyle = `rgba(212, 175, 55, ${Math.max(0, Math.min(1, this.opacity))})`;
        ctx.fill();
      }
    }

    // Initialize particles
    const initW = canvas.clientWidth || window.innerWidth;
    const initH = canvas.clientHeight || window.innerHeight;
    for (let i = 0; i < maxParticles; i++) {
      particles.push(new Particle(initW, initH));
    }

    // Main render loop
    const tick = () => {
      if (!isTabVisible || !isElementVisible) return;

      const w = canvas.clientWidth || window.innerWidth;
      const h = canvas.clientHeight || window.innerHeight;

      ctx.clearRect(0, 0, w, h);

      for (let i = 0; i < particles.length; i++) {
        particles[i].update(w, h);
        particles[i].draw();
      }

      cancelAnimationFrame(animationFrameId);
      animationFrameId = requestAnimationFrame(tick);
    };

    tick();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      observer.disconnect();
    };
  }, [prefersReducedMotion]);

  if (prefersReducedMotion) return null;

  return (
    <div 
      ref={containerRef}
      className="absolute inset-0 pointer-events-none z-0 overflow-hidden"
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full block opacity-60"
        style={{ mixBlendMode: 'screen' }}
      />
    </div>
  );
};

export default BackgroundParticles;
