/* ==========================================================
    LimChip (极限智芯) - 2026 旗舰版全量核心代码 (黄金阻尼版)
    功能：全页面逻辑、多语言适配、GPU加速、智能导航、物理滚动
   ========================================================== */

// 1. 环境感知与性能分级
const isMobile = /Android|webOS|iPhone|iPad|iPod/i.test(navigator.userAgent) || window.innerWidth < 768;
const isLowEnd = navigator.hardwareConcurrency < 4;
if (isMobile) document.documentElement.classList.add('mobile-mode');

// 2. Lenis 物理滚动引擎
const lenis = new Lenis({
    duration: isMobile ? 0.7 : 1.0,
    lerp: isMobile ? 0.22 : 0.15,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: !isMobile,
    syncTouch: false,
    touchMultiplier: isMobile ? 1 : 1.5
});

let lastScrollY = 0;
const scrollTopBtn = document.getElementById('scrollTopBtn'); 

// 核心渲染循环 (RAF)
function raf(time) {
    lenis.raf(time);
    const currentScrollY = window.scrollY;
    const scrollDiff = currentScrollY - lastScrollY;

    // A. 置顶按钮；导航滚动显隐由 navbar-scroll.js 的物理插值单独负责。
    if (scrollTopBtn) {
        if (currentScrollY > 500) {
            scrollTopBtn.classList.add('is-visible');
        } else {
            scrollTopBtn.classList.remove('is-visible');
        }
    }

    if (!isLowEnd && Math.abs(scrollDiff) > 0.5) {
        document.documentElement.style.setProperty('--scroll-y', `${currentScrollY}px`);
    }

    lastScrollY = currentScrollY;
    requestAnimationFrame(raf);
}
requestAnimationFrame(raf);
window.lenis = lenis;

/* ==========================================================
    业务功能模块
   ========================================================== */

// 移动端菜单核心交互逻辑
function initMobileMenu() {
    const mobileToggle = document.getElementById('mobileToggle');
    const navbar = document.getElementById('navbar');
    const navMenu = navbar ? navbar.querySelector('.nav-menu') : null;
    const navLinks = document.querySelectorAll('.nav-menu a');

    function setMobileMenu(open) {
        if (!navbar) return;
        navbar.classList.toggle('mobile-active', open);
        if (mobileToggle) mobileToggle.setAttribute('aria-expanded', String(open));
        if (navMenu) {
            navMenu.style.opacity = open ? '1' : '';
            navMenu.style.visibility = open ? 'visible' : '';
            navMenu.style.pointerEvents = open ? 'auto' : '';
            navMenu.style.transform = open ? 'translateX(-50%) translateY(0) scaleY(1)' : '';
        }

        if (open) {
            lenis.stop();
            document.body.style.overflow = 'hidden';
        } else {
            lenis.start();
            document.body.style.overflow = '';
        }
    }

    if (mobileToggle && navbar) {
        window.limchipCloseMobileMenu = () => setMobileMenu(false);
        mobileToggle.setAttribute('role', 'button');
        mobileToggle.setAttribute('tabindex', '0');
        mobileToggle.setAttribute('aria-label', 'Toggle navigation menu');
        mobileToggle.setAttribute('aria-expanded', 'false');

        mobileToggle.addEventListener('click', () => {
            const isActive = !navbar.classList.contains('mobile-active');
            setMobileMenu(isActive);
        });
        mobileToggle.addEventListener('keydown', event => {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                const isActive = !navbar.classList.contains('mobile-active');
                setMobileMenu(isActive);
            }
            if (event.key === 'Escape') setMobileMenu(false);
        });

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (navbar.classList.contains('mobile-active')) {
                    setMobileMenu(false);
                }
            });
        });
    }
}

// Hero 区域入场
function initHeroAnimations() {
    const revealElements = document.querySelectorAll('.hero-reveal');
    revealElements.forEach((el, index) => {
        el.style.setProperty('--rand-y', `40px`);
        el.style.setProperty('--rand-s', '1.02');
        setTimeout(() => el.classList.add('is-visible'), index * 200); 
    });
}

// 导航栏点击反馈
window.initNavClickFeedback = function() {
    const container = document.querySelector('.nav-container');
    if (window.innerWidth > 992 && container) {
        const activeLink = document.querySelector('.nav-menu a.active');
        if (activeLink) {
            const parentLi = activeLink.parentElement;
            container.scrollLeft = parentLi.offsetLeft - (container.offsetWidth / 2) + (parentLi.offsetWidth / 2);
        }
        requestAnimationFrame(() => container.classList.add('visible'));
    } else if (container) {
        container.classList.add('visible');
    }
};

// 其余功能函数 (保持不变)
function initLanguageToggle() {
    const langText = document.getElementById('langText');
    if (!langText) return;
    window.addEventListener('languageChanged', () => {
        langText.classList.add('lang-text-swapping');
        setTimeout(() => langText.classList.remove('lang-text-swapping'), 300); 
    });
}

function initFooterParticles(reduce) {
    const container = document.getElementById('footerParticles');
    if (!container) return;
    container.innerHTML = ''; 
    const count = reduce ? 6 : 15; 
    for (let i = 0; i < count; i++) {
        const p = document.createElement('div');
        p.className = `particle ${['large', 'medium', 'small'][Math.floor(Math.random() * 3)]}`;
        p.style.left = Math.random() * 100 + '%';
        p.style.top = Math.random() * 100 + '%';
        p.style.animationDelay = Math.random() * 8 + 's';
        container.appendChild(p);
    }
}

function initScrollAnimations() {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const animatedElements = new Set([
        ...document.querySelectorAll('.fade-in-up'),
        ...document.querySelectorAll('[data-aos]')
    ]);

    if (animatedElements.size === 0) return;

    if (reduceMotion) {
        animatedElements.forEach(el => el.classList.add('visible'));
        return;
    }

    const compactMotion = isMobile || window.innerWidth <= 768;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: compactMotion ? 0.06 : 0.1,
        rootMargin: compactMotion ? '0px 0px -2% 0px' : '0px 0px -6% 0px'
    });

    animatedElements.forEach(el => {
        const delay = Number(el.getAttribute('data-aos-delay') || 0);
        if (delay > 0) {
            const cappedDelay = compactMotion ? Math.min(delay, 80) : Math.min(delay, 260);
            el.style.transitionDelay = `${cappedDelay}ms`;
        }
        observer.observe(el);
    });
}

function initSmoothAnchors() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        if (anchor.closest('.nav-menu')) return;
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) lenis.scrollTo(target, { offset: -40 });
        });
    });
    if (scrollTopBtn) {
        scrollTopBtn.addEventListener('click', () => {
            lenis.scrollTo(0, { duration: 1.2 });
        });
    }
}

/* ==========================================================
    调度中心
   ========================================================== */
document.addEventListener('DOMContentLoaded', function() {
    initHeroAnimations();
    initScrollAnimations();
    initNavClickFeedback();
    initMobileMenu();

    const logicDelay = isMobile ? 800 : 400;
    
    setTimeout(() => {
        const pageId = document.body.id;
        initLanguageToggle();
        initSmoothAnchors();
        initFooterParticles(isMobile);

        if (pageId === 'home-p') {
            if (typeof initBrandMarquee === 'function') initBrandMarquee();
            if (typeof initCounters === 'function') initCounters();
            if (!isMobile && typeof initParticles === 'function') initParticles();
        } 
        else if (pageId === 'products-p' && typeof initProductsChipAnimation === 'function') initProductsChipAnimation();
        else if (pageId === 'services-p' && typeof initServicesAnimations === 'function') initServicesAnimations();
        else if (pageId === 'applications-p' && typeof initAppsAnimation === 'function') initAppsAnimation();
        else if (pageId === 'about-p' && typeof initAboutGlobe === 'function') initAboutGlobe();
        else if (pageId === 'contact-p' && typeof initContactLogic === 'function') initContactLogic();

    }, logicDelay);
});
