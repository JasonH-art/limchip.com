/**
 * LimChip navbar kinetic scroll behavior.
 * PC keeps the original physics parameters; mobile stays fixed to avoid jumps.
 */
(function initKineticNavbar() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;

    const mobileQuery = window.matchMedia('(max-width: 768px)');
    let lastScrollY = Math.max(window.scrollY || 0, 0);
    let currentY = 0;
    let targetY = 0;

    const STIFFNESS_APPEAR = 0.085;
    const STIFFNESS_HIDE = 0.065;
    const HIDE_TARGET_DESKTOP = -120;

    function applyTransform(y) {
        navbar.style.setProperty('transform', `translateX(-50%) translateY(${y}px) translateZ(0)`, 'important');
    }

    function setFixedMobileState() {
        targetY = 0;
        currentY = 0;
        navbar.classList.remove('nav-hidden');
        navbar.classList.toggle('is-scrolled', window.scrollY > 20);
        applyTransform(0);
    }

    function update() {
        if (mobileQuery.matches) {
            setFixedMobileState();
            requestAnimationFrame(update);
            return;
        }

        const stiffness = targetY === 0 ? STIFFNESS_APPEAR : STIFFNESS_HIDE;
        const diff = targetY - currentY;
        currentY += diff * stiffness;

        if (Math.abs(diff) > 0.001) {
            applyTransform(currentY);
        }

        navbar.classList.toggle('is-scrolled', window.scrollY > 50);
        requestAnimationFrame(update);
    }

    function handleScroll() {
        const scrollY = Math.max(window.scrollY || document.documentElement.scrollTop || 0, 0);
        const delta = scrollY - lastScrollY;

        if (mobileQuery.matches) {
            setFixedMobileState();
            lastScrollY = scrollY;
            return;
        }

        if (delta > 5 && scrollY > 100) {
            targetY = HIDE_TARGET_DESKTOP;
            navbar.classList.add('nav-hidden');
        } else if (delta < -8 || scrollY <= 10) {
            targetY = 0;
            navbar.classList.remove('nav-hidden');
        }

        lastScrollY = scrollY;
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    mobileQuery.addEventListener('change', () => {
        lastScrollY = Math.max(window.scrollY || 0, 0);
        if (mobileQuery.matches) {
            setFixedMobileState();
        }
    });

    handleScroll();
    update();
})();
