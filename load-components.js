/**
 * 组件加载核心函数
 * 逻辑：加载 HTML -> 手动激活脚本 -> 触发翻译
 */
function loadComponent(elementId, filePath) {
    const container = document.getElementById(elementId);
    if (!container) return;

    fetch(filePath)
        .then(response => {
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            return response.text();
        })
        .then(html => {
            // 1. 注入 HTML 内容
            container.innerHTML = html;

            // 2. 【核心修复】手动激活脚本（确保页脚 Canvas 动画运行）
            const scripts = container.querySelectorAll("script");
            scripts.forEach(oldScript => {
                const newScript = document.createElement("script");
                // 复制所有属性 (type, src 等)
                Array.from(oldScript.attributes).forEach(attr => {
                    newScript.setAttribute(attr.name, attr.value);
                });
                // 注入脚本内容
                newScript.appendChild(document.createTextNode(oldScript.innerHTML));
                // 替换节点以触发执行
                oldScript.parentNode.replaceChild(newScript, oldScript);
            });

            // 3. 同步翻译
            if (window.languageManager && typeof window.languageManager.updateLanguage === 'function') {
                window.languageManager.updateLanguage();
            }
        })
        .catch(error => console.error('组件加载失败:', error));
}

/**
 * 静态导航栏初始化
 * 处理：激活态、初始对齐、点击绑定
 */
function initializeStaticNavbar() {
    // 1. 确定当前页面激活项
    const path = window.location.pathname.split('/').pop();
    const currentPage = (path === '' || !path) ? 'index.html' : path;
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        link.classList.toggle('active', linkPage === currentPage);
    });

    // 2. 初始位置物理对齐 (无动画)
    if (typeof window.centerActiveNavItem === 'function') {
        window.centerActiveNavItem(false);
    }

    // 3. 【防抽动锁】确保点击事件只绑定一次
    if (typeof window.initNavClickFeedback === 'function' && !window.__NAV_FEEDBACK_READY__) {
        window.initNavClickFeedback();
        window.__NAV_FEEDBACK_READY__ = true; // 锁定
        console.log("%c[系统] 导航点击监听已就绪", "color: #27ae60;");
    }
}

// 统一入口
document.addEventListener('DOMContentLoaded', function() {
    // 立即处理页面现有的静态导航栏
    if (document.querySelector('.navbar')) {
        initializeStaticNavbar();
    }

    // 异步加载页脚
    if (document.getElementById('footer-container')) {
        loadComponent('footer-container', 'components/footer.html');
    }
});