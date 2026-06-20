// ═══════════════════════════════════════════
// CINEMATIC LOADER & INTERACTIONS
// ═══════════════════════════════════════════

class CinematicExperience {
  constructor() {
    this.canvas = document.getElementById('loader-canvas');
    if (!this.canvas) return;

    // Check prefers-reduced-motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      this.canvas.style.display = 'none';
      const preloader = document.getElementById('preloader');
      if (preloader) {
        setTimeout(() => {
          gsap.to(preloader, { opacity: 0, duration: 0.5, onComplete: () => {
            preloader.style.display = 'none';
            if (typeof initAfterLoader === 'function') {
              initAfterLoader();
            } else {
              initAfterCinematicLoader();
            }
          }});
        }, 100);
      }
      return;
    }

    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    this.phase = 0; // 0: circuits, 1: money/matrix, 2: text morph
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    
    // Config
    this.numParticles = window.innerWidth < 768 ? 100 : 350;
    this.symbols = ['$', '€', '£', '¥', '1', '0', '7', 'X', 'Z'];
    this.textTargets = [];
    this.isPaused = false;
    
    this.init();
    this.animate = this.animate.bind(this);
    requestAnimationFrame(this.animate);

    document.addEventListener('visibilitychange', () => {
      if (document.hidden || document.visibilityState === 'hidden') {
        this.isPaused = true;
      } else {
        if (this.isPaused) {
          this.isPaused = false;
          requestAnimationFrame(this.animate);
        }
      }
    });
  }

  init() {
    for (let i = 0; i < this.numParticles; i++) {
      this.particles.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        symbol: this.symbols[Math.floor(Math.random() * this.symbols.length)],
        size: Math.random() * 14 + 10,
        alpha: Math.random()
      });
    }

    // Code Typing simulation
    const codes = [
      "INITIALIZING STRATEGY...",
      "CONNECTING SOCIAL API...",
      "OPTIMIZING TARGETING...",
      "GENERATING CREATIVES...",
      "ZULIAN MARKETING ONLINE"
    ];
    let currentLineIdx = 0;
    const typingContainer = document.querySelector('.code-typing');
    const logoContainer = document.querySelector('.preloader-logo-container');

    const typeNextCode = () => {
      if (currentLineIdx < codes.length) {
        const text = codes[currentLineIdx];
        let charIndex = 0;
        if (typingContainer) typingContainer.textContent = "> ";
        const typeChar = () => {
          if (charIndex < text.length) {
            if (typingContainer) typingContainer.textContent = "> " + text.substring(0, charIndex + 1) + "_";
            charIndex++;
            setTimeout(typeChar, 12);
          } else {
            if (typingContainer) typingContainer.textContent = "> " + text;
            currentLineIdx++;
            setTimeout(typeNextCode, 150);
          }
        };
        typeChar();
      } else {
        if (typingContainer) typingContainer.style.display = 'none';
        if (logoContainer) {
          logoContainer.style.opacity = '1';
          logoContainer.style.transform = 'scale(1)';
          const img = logoContainer.querySelector('img');
          if (img) {
            gsap.to(img, { opacity: 1, scale: 1, duration: 0.8, ease: 'power3.out' });
          }
        }
      }
    };
    if (typingContainer) {
      typeNextCode();
    }

    // Timeline phases
    setTimeout(() => { this.phase = 1; }, 1000); // Matrix Money
    setTimeout(() => { this.setupTextTargets(); this.phase = 2; }, 2000); // Text Morph
    setTimeout(() => { this.endLoader(); }, 3500); // End & Reveal Logo
  }

  setupTextTargets() {
    const textCanvas = document.createElement('canvas');
    const tCtx = textCanvas.getContext('2d');
    textCanvas.width = this.width;
    textCanvas.height = this.height;
    tCtx.fillStyle = 'white';
    tCtx.font = 'bold ' + (this.width < 768 ? '30px' : '80px') + ' Playfair Display';
    tCtx.textAlign = 'center';
    tCtx.textBaseline = 'middle';
    tCtx.fillText('ZULIAN', this.width/2, this.height/2 - 40);
    tCtx.font = 'bold ' + (this.width < 768 ? '16px' : '30px') + ' Inter';
    tCtx.fillText('SOCIAL MEDIA MARKETING', this.width/2, this.height/2 + 40);

    const data = tCtx.getImageData(0, 0, this.width, this.height).data;
    this.textTargets = [];
    
    for (let y = 0; y < this.height; y += 4) {
      for (let x = 0; x < this.width; x += 4) {
        if (data[(y * this.width + x) * 4 + 3] > 128) {
          this.textTargets.push({x, y});
        }
      }
    }
    
    this.particles.forEach((p, i) => {
      if (this.textTargets.length > 0) {
        let t = this.textTargets[i % this.textTargets.length];
        p.tx = t.x;
        p.ty = t.y;
      }
    });
  }

  animate() {
    if(this.phase > 3) return; // Stopped
    if (document.hidden || document.visibilityState === 'hidden') {
      this.isPaused = true;
      return;
    }
    this.isPaused = false;
    
    this.ctx.fillStyle = 'rgba(13, 13, 13, 0.2)'; 
    this.ctx.fillRect(0, 0, this.width, this.height);
    
    this.particles.forEach((p, i) => {
      if (this.phase === 0) {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > this.width) p.vx *= -1;
        if (p.y < 0 || p.y > this.height) p.vy *= -1;
        
        this.ctx.fillStyle = `rgba(212, 175, 55, ${p.alpha})`;
        this.ctx.beginPath();
        this.ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
        this.ctx.fill();
        
        for (let j = i + 1; j < this.particles.length; j++) {
          let p2 = this.particles[j];
          let d = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (d < 100) {
            this.ctx.strokeStyle = `rgba(212, 175, 55, ${0.2 - d/500})`;
            this.ctx.beginPath();
            this.ctx.moveTo(p.x, p.y);
            this.ctx.lineTo(p2.x, p2.y);
            this.ctx.stroke();
          }
        }
      } 
      else if (this.phase === 1) {
        p.y += (Math.abs(p.vy) + 5);
        if (p.y > this.height) { p.y = 0; p.x = Math.random() * this.width; }
        
        this.ctx.fillStyle = `rgba(197, 160, 89, ${p.alpha})`;
        this.ctx.font = `${p.size}px monospace`;
        if(Math.random() < 0.05) p.symbol = this.symbols[Math.floor(Math.random() * this.symbols.length)];
        this.ctx.fillText(p.symbol, p.x, p.y);
      }
      else if (this.phase === 2) {
        if (p.tx) {
          p.x += (p.tx - p.x) * 0.05;
          p.y += (p.ty - p.y) * 0.05;
        }
        this.ctx.fillStyle = `rgba(212, 175, 55, ${p.alpha})`;
        this.ctx.beginPath();
        this.ctx.arc(p.x, p.y, 1.5, 0, Math.PI * 2);
        this.ctx.fill();
      }
    });
    
    requestAnimationFrame(this.animate);
  }

  endLoader() {
    this.phase = 4;
    const logo = document.querySelector('.loader-logo img');
    if(logo) {
      gsap.to(logo, { opacity: 1, scale: 1, duration: 1.0, ease: 'power3.out' });
      setTimeout(() => {
        gsap.to('#preloader', { 
          opacity: 0, 
          y: '-100%', 
          duration: 1.0, 
          ease: 'power4.inOut',
          onComplete: () => {
            const preloader = document.getElementById('preloader');
            if (preloader) preloader.style.display = 'none';
            if (typeof initAfterLoader === 'function') {
              initAfterLoader();
            } else {
              initAfterCinematicLoader();
            }
          }
        });
      }, 1000);
    }
  }
}

// ─── INIT AFTER LOADER ───
function initAfterCinematicLoader() {
  if (typeof initRevealAnimations === 'function') initRevealAnimations();
  if (typeof initStatsCounter === 'function') initStatsCounter();
  if (typeof initProjectModals === 'function') initProjectModals();
  if (typeof initColorScroll === 'function') initColorScroll();
  initMagneticElements();
  initCustomCursor();
  initImageDistortions();
}

// ─── PAGE TRANSITION ───
function initPageTransitions() {
  const transLayer = document.createElement('div');
  transLayer.className = 'page-transition';
  document.body.appendChild(transLayer);

  document.querySelectorAll('.nav-links a').forEach(a => {
    a.addEventListener('click', e => {
      e.preventDefault();
      const targetId = a.getAttribute('href');
      
      gsap.to(transLayer, {
        top: 0,
        height: '100%',
        duration: 0.8,
        ease: 'power4.inOut',
        onComplete: () => {
          const target = document.querySelector(targetId);
          if (target && typeof lenis !== 'undefined') lenis.scrollTo(target, { immediate: true });
          else if(target) target.scrollIntoView();
          
          gsap.to(transLayer, {
            top: '100%',
            height: 0,
            duration: 0.8,
            ease: 'power4.inOut',
            delay: 0.2
          });
        }
      });
    });
  });
}

// ─── MAGNETIC ELEMENTS ───
function initMagneticElements() {
  const magnets = document.querySelectorAll('.btn-primary, .btn-ghost, .nav-logo img, h2');
  
  magnets.forEach(magnet => {
    magnet.addEventListener('mousemove', function(e) {
      const pos = this.getBoundingClientRect();
      const mx = e.clientX - pos.left - pos.width/2;
      const my = e.clientY - pos.top - pos.height/2;
      
      gsap.to(magnet, { x: mx * 0.15, y: my * 0.15, duration: 0.5, ease: 'power2.out' });
    });
    
    magnet.addEventListener('mouseleave', function() {
      gsap.to(magnet, { x: 0, y: 0, duration: 0.8, ease: 'elastic.out(1, 0.3)' });
    });
  });
}

// ─── LIQUID CURSOR ───
function initCustomCursor() {
  if (window.innerWidth < 768) return;
  const cursor = document.createElement('div');
  cursor.className = 'liquid-cursor';
  document.body.appendChild(cursor);
  
  let mouseX = window.innerWidth/2;
  let mouseY = window.innerHeight/2;
  let cursorX = mouseX;
  let cursorY = mouseY;
  
  window.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });
  
  let isCursorPaused = false;
  function renderCursor() {
    if (document.hidden || document.visibilityState === 'hidden') {
      isCursorPaused = true;
      return;
    }
    isCursorPaused = false;
    cursorX += (mouseX - cursorX) * 0.15;
    cursorY += (mouseY - cursorY) * 0.15;
    cursor.style.transform = `translate(${cursorX}px, ${cursorY}px)`;
    requestAnimationFrame(renderCursor);
  }
  requestAnimationFrame(renderCursor);

  document.addEventListener('visibilitychange', () => {
    if (!document.hidden && document.visibilityState !== 'hidden' && isCursorPaused) {
      isCursorPaused = false;
      requestAnimationFrame(renderCursor);
    }
  });
  
  document.querySelectorAll('a, button, .work-item, .pricing-card').forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
  });
}

// ─── IMAGE DISTORTION (CSS based for simplicity & performance) ───
function initImageDistortions() {
  document.querySelectorAll('img:not(.nav-logo img)').forEach(img => {
    img.classList.add('distort-img');
  });
}

window.addEventListener('load', () => {
  new CinematicExperience();
  initPageTransitions();
});
