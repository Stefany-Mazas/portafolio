document.addEventListener('DOMContentLoaded', function () {
    // Protección: verificar autenticación
    if (!localStorage.getItem('authToken')) {
        window.location.href = 'inicio.html';
        return;
    }

    // === Inicializar Locomotive Scroll ===
    const scroll = new LocomotiveScroll({
        el: document.querySelector('[data-scroll-container]'),
        smooth: true,
        smartphone: { smooth: true, breakpoint: 768 },
        tablet: { smooth: true, breakpoint: 1024 },
        getDirection: true,
        getSpeed: true
    });

    gsap.registerPlugin(ScrollTrigger);
    ScrollTrigger.scrollerProxy("[data-scroll-container]", {
        scrollTop(value) {
            return arguments.length ? scroll.scrollTo(value, 0, 0) : scroll.scroll.instance.scroll.y;
        },
        getBoundingClientRect() {
            return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
        },
        pinType: document.querySelector("[data-scroll-container]").style.transform ? "transform" : "fixed"
    });

    scroll.on("scroll", ScrollTrigger.update);
    ScrollTrigger.addEventListener("refresh", () => scroll.update());
    ScrollTrigger.refresh();

    // === Animaciones ===
    function initScrollAnimations() {
        gsap.to(".section-title", {
            scrollTrigger: {
                trigger: ".section-title",
                scroller: "[data-scroll-container]",
                start: "top 80%",
                toggleActions: "play none none none"
            },
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power2.out"
        });

        gsap.utils.toArray(".tema-card").forEach((card, index) => {
            gsap.to(card, {
                scrollTrigger: {
                    trigger: card,
                    scroller: "[data-scroll-container]",
                    start: "top 80%",
                    toggleActions: "play none none none"
                },
                opacity: 1,
                y: 0,
                duration: 0.8,
                delay: index * 0.1,
                ease: "back.out(1.7)"
            });
        });

        gsap.to(".hero-image", {
            scrollTrigger: {
                trigger: ".hero",
                scroller: "[data-scroll-container]",
                start: "top top",
                end: "bottom top",
                scrub: true
            },
            y: 100,
            ease: "none"
        });
    }

    initScrollAnimations();

    // === Hover en tarjetas ===
    document.querySelectorAll('.tema-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            gsap.to(card.querySelector('.tema-circle'), {
                scale: 1.05,
                duration: 0.3,
                ease: "power2.out"
            });
        });
        card.addEventListener('mouseleave', () => {
            gsap.to(card.querySelector('.tema-circle'), {
                scale: 1,
                duration: 0.3,
                ease: "power2.out"
            });
        });
    });

    // === Nubes ===
    gsap.to(".c-cloud", {
        scrollTrigger: {
            trigger: ".cloud-section",
            scroller: "[data-scroll-container]",
            start: "top 50%",
            end: "bottom top",
            scrub: true
        },
        x: "60vw",
        y: "-90vh",
        scale: 1.2,
        ease: "power2.out"
    });

    gsap.to(".c-cloud1", {
        scrollTrigger: {
            trigger: ".cloud-section",
            scroller: "[data-scroll-container]",
            start: "top 70%",
            end: "bottom top",
            scrub: true
        },
        x: "-60vw",
        y: "-90vh",
        scale: 1.2,
        ease: "power2.out"
    });

    // === FUNCIONALIDAD DE BOTONES EN FOOTER ===
    const supportBtn = document.getElementById('supportBtn');
    const supportBubble = document.getElementById('supportBubble');
    const closeBubble = document.getElementById('closeBubble');
    const logoutBtn = document.getElementById('logoutBtn');

    if (supportBtn && supportBubble) {
        supportBtn.addEventListener('click', function (e) {
            e.stopPropagation();
            const isVisible = supportBubble.style.display === 'block';
            supportBubble.style.display = isVisible ? 'none' : 'block';
        });

        closeBubble?.addEventListener('click', function (e) {
            e.stopPropagation();
            supportBubble.style.display = 'none';
        });

        document.addEventListener('click', function (e) {
            if (!supportBubble.contains(e.target) && e.target !== supportBtn) {
                supportBubble.style.display = 'none';
            }
        });
    }

    if (logoutBtn) {
        logoutBtn.addEventListener('click', function () {
            if (confirm('¿Estás seguro de que deseas cerrar sesión?')) {
                localStorage.removeItem('authToken');
                window.location.href = 'inicio.html';
            }
        });
    }

    // === PWA ===
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('/service-worker.js')
                .then(reg => console.log('ServiceWorker registrado:', reg.scope))
                .catch(err => console.log('Error ServiceWorker:', err));
        });
    }
}); 