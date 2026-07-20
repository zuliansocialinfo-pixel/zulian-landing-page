document.addEventListener("DOMContentLoaded", () => {
    
    // 1. Initialize Smooth Scroll (Lenis)
    const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        direction: 'vertical',
        gestureDirection: 'vertical',
        smooth: true,
        mouseMultiplier: 1,
        smoothTouch: false,
        touchMultiplier: 2,
        infinite: false,
    });

    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // 2. Preloader Animation
    const loader = document.querySelector('.loader');
    const percentage = document.querySelector('.loader-percentage');
    
    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.floor(Math.random() * 20) + 5;
        if (progress > 100) progress = 100;
        percentage.textContent = `${progress}%`;
        
        if (progress === 100) {
            clearInterval(interval);
            gsap.to(loader, {
                yPercent: -100,
                duration: 1,
                ease: "power4.inOut",
                delay: 0.5,
                onComplete: () => {
                    initPageAnimations();
                }
            });
        }
    }, 150);

    // 3. Navigation Toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navOverlay = document.querySelector('.nav-overlay');
    const navLinks = document.querySelectorAll('.nav-text');
    let isNavOpen = false;

    const splitNavLinks = new SplitType(navLinks, { types: 'chars' });
    
    navToggle.addEventListener('click', () => {
        if (!isNavOpen) {
            lenis.stop();
            gsap.to(navOverlay, {
                clipPath: "inset(0% 0 0% 0)",
                duration: 1,
                ease: "power4.inOut"
            });
            gsap.fromTo(splitNavLinks.chars, 
                { y: 100, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.8, stagger: 0.02, ease: "power4.out", delay: 0.5 }
            );
            document.querySelector('.nav-toggle-text').textContent = "CHIUDI";
        } else {
            lenis.start();
            gsap.to(navOverlay, {
                clipPath: "inset(0 0 100% 0)",
                duration: 1,
                ease: "power4.inOut"
            });
            document.querySelector('.nav-toggle-text').textContent = "MENU";
        }
        isNavOpen = !isNavOpen;
    });

    // 4. Page Animations (GSAP + ScrollTrigger + SplitType)
    function initPageAnimations() {
        gsap.registerPlugin(ScrollTrigger);

        const splitTexts = new SplitType('.anim-split', { types: 'lines, words' });
        
        splitTexts.lines.forEach(line => {
            const wrapper = document.createElement('div');
            wrapper.style.overflow = 'hidden';
            wrapper.style.display = 'inline-block';
            wrapper.style.verticalAlign = 'top';
            line.parentNode.insertBefore(wrapper, line);
            wrapper.appendChild(line);
        });

        gsap.fromTo('.hero .word', 
            { y: "120%", opacity: 0, skewX: -10 },
            { 
                y: "0%", 
                opacity: 1, 
                skewX: 0, 
                duration: 1.2, 
                stagger: 0.05, 
                ease: "power4.out" 
            }
        );

        gsap.fromTo('.anim-fade', 
            { y: 30, opacity: 0 },
            { 
                y: 0, 
                opacity: 1, 
                duration: 1, 
                stagger: 0.2,
                ease: "power3.out",
                delay: 0.5
            }
        );

        const skewTexts = new SplitType('.anim-skew', { types: 'words' });
        skewTexts.words.forEach(word => {
            const wrapper = document.createElement('div');
            wrapper.style.overflow = 'hidden';
            word.parentNode.insertBefore(wrapper, word);
            wrapper.appendChild(word);
        });

        gsap.utils.toArray('.figure-item').forEach(item => {
            const words = item.querySelectorAll('.word');
            const p = item.querySelector('p');
            
            gsap.fromTo(words, 
                { y: "120%", skewX: -10 },
                {
                    y: "0%",
                    skewX: 0,
                    duration: 1,
                    ease: "power4.out",
                    scrollTrigger: {
                        trigger: item,
                        start: "top 85%",
                        toggleActions: "play none none reverse"
                    }
                }
            );

            gsap.fromTo(p,
                { y: 20, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    delay: 0.2,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: item,
                        start: "top 85%",
                        toggleActions: "play none none reverse"
                    }
                }
            );
        });

        gsap.utils.toArray('.switching-text-section .big-text').forEach(text => {
            const words = text.querySelectorAll('.word');
            gsap.fromTo(words,
                { y: "120%", opacity: 0, skewX: -5 },
                {
                    y: "0%",
                    opacity: 1,
                    skewX: 0,
                    duration: 1.2,
                    stagger: 0.02,
                    ease: "power4.out",
                    scrollTrigger: {
                        trigger: text,
                        start: "top 75%",
                        toggleActions: "play none none reverse"
                    }
                }
            );
        });

        // Fade Up items (Teaser Cards etc)
        gsap.fromTo('.anim-fade-up', 
            { y: 50, opacity: 0 },
            { 
                y: 0, 
                opacity: 1, 
                duration: 0.8, 
                stagger: 0.1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: '.teaser-grid',
                    start: "top 80%",
                    toggleActions: "play none none reverse"
                }
            }
        );
    }
});
