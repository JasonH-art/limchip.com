document.addEventListener('DOMContentLoaded', () => {
    const injectScrollBtn = () => {
        if (document.getElementById('scrollTopBtn')) return;
        const btnHTML = `<a id="scrollTopBtn" href="javascript:void(0)" role="button"><svg viewBox="0 0 24 24"><path d="M12 19V5M5 12l7-7 7 7" stroke-linecap="round" stroke-linejoin="round"/></svg></a>`;
        document.body.insertAdjacentHTML('beforeend', btnHTML);
    };
    injectScrollBtn();
    const btn = document.getElementById('scrollTopBtn');

    // 保持之前解决延迟的“硬件级”滚动执行函数
    const fastScrollToTop = () => {
        const duration = 500; 
        const start = window.pageYOffset;
        const startTime = performance.now();
        function animation(currentTime) {
            const timeElapsed = currentTime - startTime;
            const run = easeInOutQuad(timeElapsed, start, -start, duration);
            window.scrollTo(0, run);
            if (timeElapsed < duration) requestAnimationFrame(animation);
        }
        function easeInOutQuad(t, b, c, d) {
            t /= d / 2;
            if (t < 1) return c / 2 * t * t + b;
            t--;
            return -c / 2 * (t * (t - 2) - 1) + b;
        }
        requestAnimationFrame(animation);
    };

    btn.addEventListener('pointerdown', (e) => {
        e.preventDefault();
        e.stopPropagation();
        fastScrollToTop();
    }, { capture: true });

    // ==========================================
    // 稳重微反馈：保留滚轮响应，去掉倾斜，避免专业站点显得晃动
    // ==========================================
    let isScrolling;
    window.addEventListener('wheel', (e) => {
        if (!btn || !btn.classList.contains('is-visible')) return;

        const bounceAmt = e.deltaY > 0 ? -18 : 10; 
        
        btn.style.transition = 'transform 0.24s cubic-bezier(0.22, 1, 0.36, 1)'; 
        btn.style.transform = `translateY(${bounceAmt}px) scale(1.04)`;

        window.clearTimeout(isScrolling);
        isScrolling = setTimeout(() => {
            btn.style.transition = 'transform 0.9s cubic-bezier(0.22, 1, 0.36, 1)';
            btn.style.transform = 'translateY(0) scale(1)';
        }, 120); 
    }, { passive: true });

    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        scrollTop > 300 ? btn.classList.add('is-visible') : btn.classList.remove('is-visible');
    }, { passive: true });
});
