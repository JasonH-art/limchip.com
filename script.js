// ===== 语言切换功能 =====
let currentLang = 'en'; // 默认语言为英文

// 切换语言的函数
function toggleLanguage() {
    // 切换当前语言标识
    currentLang = currentLang === 'en' ? 'zh' : 'en';
    
    // 更新所有带有 data-en 和 data-zh 属性的元素
    document.querySelectorAll('[data-en], [data-zh]').forEach(element => {
        // 根据当前语言设置文本
        element.textContent = currentLang === 'en' 
            ? element.getAttribute('data-en') 
            : element.getAttribute('data-zh');
    });
    
    // 更新所有输入框和文本域的 placeholder
    document.querySelectorAll('[data-en-placeholder], [data-zh-placeholder]').forEach(input => {
        input.placeholder = currentLang === 'en' 
            ? input.getAttribute('data-en-placeholder') 
            : input.getAttribute('data-zh-placeholder');
    });
    
    // 更新语言切换按钮的视觉状态
    const enSpan = document.querySelector('.lang-code:first-child');
    const zhSpan = document.querySelector('.lang-code:last-child');
    
    if (currentLang === 'en') {
        enSpan.classList.add('active');
        zhSpan.classList.remove('active');
    } else {
        enSpan.classList.remove('active');
        zhSpan.classList.add('active');
    }
    
    // 将语言偏好保存到本地存储
    localStorage.setItem('preferredLang', currentLang);
}

// 页面加载时初始化语言
document.addEventListener('DOMContentLoaded', function() {
    // 检查本地存储中的语言偏好
    const savedLang = localStorage.getItem('preferredLang');
    if (savedLang && (savedLang === 'en' || savedLang === 'zh')) {
        currentLang = savedLang;
        // 如果不是默认的'en'，则切换一次以应用设置
        if (currentLang !== 'en') {
            toggleLanguage();
        }
    }
    
    // 为语言切换按钮绑定事件
    const langToggleBtn = document.getElementById('langToggle');
    if (langToggleBtn) {
        langToggleBtn.addEventListener('click', toggleLanguage);
    }
    
    // 初始化按钮激活状态
    const enSpan = document.querySelector('.lang-code:first-child');
    const zhSpan = document.querySelector('.lang-code:last-child');
    enSpan.classList.add('active');
});

// ===== 设置当前年份 =====
document.getElementById('currentYear').textContent = new Date().getFullYear();

// ===== 表单提交处理 =====
document.getElementById('contactForm')?.addEventListener('submit', function(e) {
    e.preventDefault(); // 阻止表单默认提交
    
    // 获取表单数据
    const formData = new FormData(this);
    const data = Object.fromEntries(formData);
    
    // 这里通常应发送数据到服务器
    console.log('表单提交数据:', data);
    
    // 给用户一个反馈
    alert(currentLang === 'en' 
        ? 'Thank you for your message! We will contact you soon.' 
        : '感谢您的留言！我们会尽快与您联系。');
    
    this.reset(); // 清空表单
});

// ===== 导航栏高亮与平滑滚动 =====
// 为导航链接添加平滑滚动和高亮
document.querySelectorAll('.nav-links a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            // 移除所有活动类
            document.querySelectorAll('.nav-links a').forEach(link => {
                link.classList.remove('active');
            });
            
            // 为当前点击的链接添加活动类
            this.classList.add('active');
            
            // 平滑滚动到目标位置
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
            
            // 在移动端点击后关闭菜单
            if (window.innerWidth <= 768) {
                document.querySelector('.nav-links').classList.remove('active');
            }
        }
    });
});

// 根据滚动位置高亮导航项
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section[id], header[id]');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});