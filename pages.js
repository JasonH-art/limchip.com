
// === 仅存放首页 (Index) 的特有功能 ===
//1. 首页hero背景粒子宇宙动画 (Canvas 版)
function initParticles() {
    const canvas = document.getElementById('luxCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    
    let particles = [];
    let globalTime = 0; 
    const config = { 
        count: 40, 
        lineDistSq: 11000, 
        colors: ['0,212,255', '100,120,255', '255,255,255'] 
    };

    class Particle {
        constructor(i) {
            this.id = i;
            this.color = config.colors[i % config.colors.length];
            this.reset();
        }
        reset() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.vx = (Math.random() - 0.5) * 0.35;
            this.vy = (Math.random() - 0.5) * 0.35;
            this.phase = Math.random() * 6.28;
            this.size = Math.random() * 1.5 + 1;
        }
        update() {
            this.x += this.vx + Math.sin(globalTime + this.phase) * 0.15;
            this.y += this.vy + Math.cos(globalTime + this.phase) * 0.15;
            if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
            if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
        }
    }

    function render() {
        globalTime += 0.02; 
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // 核心优化：将连线绘制合并为单个 Path，极大降低 Draw Call
        ctx.beginPath();
        ctx.strokeStyle = "rgba(255,255,255,0.12)";
        ctx.lineWidth = 0.8;
        for (let i = 0; i < particles.length; i++) {
            const p1 = particles[i];
            p1.update();
            for (let j = i + 1; j < particles.length; j++) {
                const p2 = particles[j];
                const dx = p1.x - p2.x;
                const dy = p1.y - p2.y;
                if (dx * dx + dy * dy < config.lineDistSq) {
                    ctx.moveTo(p1.x, p1.y);
                    ctx.lineTo(p2.x, p2.y);
                }
            }
        }
        ctx.stroke();

        // 批量绘制粒子
        particles.forEach(p => {
            ctx.fillStyle = `rgba(${p.color}, 0.6)`;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, 6.28);
            ctx.fill();
        });

        requestAnimationFrame(render);
    }

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        particles = Array.from({ length: config.count }, (_, i) => new Particle(i));
    }

    resize();
    render();
    window.addEventListener('resize', resize, { passive: true });
}
// === 首页文字入场动画 (唯一开关) ===
(function() {
    function showHeroText() {
        const targets = document.querySelectorAll('.animate-hero');
        if (targets.length > 0 && typeof anime !== 'undefined') {
            anime({
                targets: '.animate-hero',
                translateY: [30, 0],    // 从下方30px浮现
                opacity: [0, 1],        // 从透明到显示
                delay: anime.stagger(200, {start: 600}), // 等待背景稳定后依次出现
                duration: 1200,
                easing: 'easeOutExpo'
            });
        }
    }

    // 确保在页面资源（包括背景粒子）加载完后触发
    if (document.readyState === 'complete') {
        showHeroText();
    } else {
        window.addEventListener('load', showHeroText);
    }
})();

//  首页品牌跑马灯
function initBrandMarquee() {
    const track = document.querySelector('.marquee-track');
    if (!track) return;
    // 这里保持你 main.js 里的跑马灯逻辑
    console.log('Home Marquee Initialized');
}

//  首页数字滚动
function initCounters() {
    const counters = document.querySelectorAll('.stat-number');
    if (counters.length === 0) return;

    const animateValue = (obj, target, duration) => {
        let startTime = null;
        // 增加一个标记，防止重复执行
        if (obj.dataset.animating === 'true') return;
        obj.dataset.animating = 'true';

        const step = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            
            // EaseOutCubic: 你的公式挺好，保持这个减速感
            const easeOut = 1 - Math.pow(1 - progress, 3);
            
            // 优化：只有当数值真的变化时才更新 DOM
            const currentValue = Math.floor(easeOut * target);
            if (obj.innerText !== currentValue.toLocaleString()) {
                obj.innerHTML = currentValue.toLocaleString();
            }

            if (progress < 1) {
                window.requestAnimationFrame(step);
            } else {
                obj.innerHTML = target.toLocaleString();
                obj.dataset.animating = 'false';
            }
        };
        window.requestAnimationFrame(step);
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.getAttribute('data-target'));
                // 3秒动画在 120Hz 屏幕上非常吃资源，可以稍微缩短到 2000ms 提高丝滑度
                animateValue(entry.target, target, 2000); 
                observer.unobserve(entry.target);
            }
        });
    }, { 
        // 调低阈值到 0.1，让动画在刚进入视野就开始，
        // 避免滚到一半才突然卡一下开始跑数字
        threshold: 0.1 
    });

    counters.forEach(c => observer.observe(c));
}






// === 2. 产品页 (Products) 特有功能 ===

async function initProductsChipAnimation() {
    const CHIP_SCALE = 0.75; 
    const container = document.getElementById('chip-canvas-container');
    if (!container) return;

    // 1. 动态引入：保持不变
    const THREE = await import('https://cdn.skypack.dev/three@0.136.0');

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, container.clientWidth / container.clientHeight, 0.1, 1000);
    
    // 2. 渲染器优化：禁用不需要的 alpha 计算，强制高效模式
    const renderer = new THREE.WebGLRenderer({ 
        antialias: false, // 极致优化：关闭硬件抗锯齿，靠 1.2 像素比补偿
        powerPreference: "high-performance",
        alpha: true,
        stencil: false,   // 关闭不必要的缓冲
        depth: true
    });
    
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.2)); 
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // 3. 背景处理：CanvasTexture 预渲染后直接设为静态
    const waferImageURL = './resources/Hero-BG-Ref/silicon-wafer-or.webp';
    scene.background = new THREE.Color(0x0a1529);
    
    const textureLoader = new THREE.TextureLoader();
    textureLoader.load(waferImageURL, (texture) => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = 1024; canvas.height = 1024; // 降采样：背景不需要 2048，1024 足够
        ctx.drawImage(texture.image, 0, 0, canvas.width, canvas.height);
        
        // 预处理滤镜效果
        ctx.globalCompositeOperation = 'saturation';
        ctx.fillStyle = 'rgba(0, 0, 255, 0.2)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        const finalTexture = new THREE.CanvasTexture(canvas);
        scene.background = finalTexture;
        scene.fog = new THREE.FogExp2(0x0a1529, 0.01);
        
        // 释放原始纹理内存
        texture.dispose(); 
    });

    // 4. 品牌文字：将 80 个降为 50 个，显著降低每帧循环的 CPU 压力
    const brands = ['CIS', 'MEMS', 'Sensors', 'MOSFET', 'IGBT', 'PMIC', 'ADC/DAC', 'DRAM', 'SRAM', 'NAND Flash', 'MCU', 'FPGA', 'LDO', 'SoC', 'ASIC'];
    const brandMeshes = [];
    const brandCount = 50; // 性能平衡点

    // 缓存材质以减少内存抖动
    function createBrandTexture(text) {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = 256; canvas.height = 64; // 高宽比优化
        ctx.font = 'bold 28px "Rajdhani", sans-serif';
        ctx.fillStyle = '#1D9BF0';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(text, 128, 32);
        return new THREE.CanvasTexture(canvas);
    }

    for (let i = 0; i < brandCount; i++) {
        const texture = createBrandTexture(brands[i % brands.length]);
        const material = new THREE.SpriteMaterial({ map: texture, transparent: true, opacity: 0.8 });
        const sprite = new THREE.Sprite(material);
        sprite.position.set((Math.random() - 0.5) * 14, (Math.random() - 0.5) * 14, (Math.random() - 0.5) * 10);
        sprite.scale.set(1.6, 0.4, 1);
        scene.add(sprite);
        brandMeshes.push(sprite);
    }

    // 5. 芯片模型：简化几何体顶点
    const chipGroup = new THREE.Group();
    const chipBody = new THREE.Mesh(
        new THREE.BoxGeometry(2.4, 2.4, 0.5), 
        new THREE.MeshStandardMaterial({ color: 0x050505, metalness: 0.8, roughness: 0.2 })
    );
    chipGroup.add(chipBody);
    
    // BGA 焊球：大幅减少分段数 (6,4 -> 4,2)
    const bgaGeo = new THREE.SphereGeometry(0.05, 4, 2); 
    const bgaMat = new THREE.MeshStandardMaterial({ color: 0x888888 });
    for (let x = 0; x < 8; x++) { // 10x10 降为 8x8，减少 36% 的网格数量
        for (let y = 0; y < 8; y++) {
            const ball = new THREE.Mesh(bgaGeo, bgaMat);
            ball.position.set(-0.875 + x * 0.25, -0.875 + y * 0.25, -0.25);
            chipGroup.add(ball);
        }
    }
    chipGroup.scale.set(CHIP_SCALE, CHIP_SCALE, CHIP_SCALE);
    scene.add(chipGroup);

    // 6. 光照：减少光影计算
    scene.add(new THREE.AmbientLight(0xffffff, 1.2));
    const pointLight = new THREE.PointLight(0x1D9BF0, 2, 20);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    camera.position.z = 9;

    // 7. 交互控制
    let mouseX = 0, mouseY = 0;
    const onMouseMove = (e) => {
        mouseX = (e.clientX - window.innerWidth / 2) / 400;
        mouseY = (e.clientY - window.innerHeight / 2) / 400;
    };
    document.addEventListener('mousemove', onMouseMove);

    // 8. 视口检测 (已优化：离开视口彻底停止帧循环)
    let isVisible = true;
    const observer = new IntersectionObserver((entries) => {
        isVisible = entries[0].isIntersecting;
    }, { threshold: 0.01 });
    observer.observe(container);

    function animate() {
        if (!document.getElementById('chip-canvas-container')) {
            // 资源彻底回收
            document.removeEventListener('mousemove', onMouseMove);
            observer.disconnect();
            scene.traverse((obj) => {
                if (obj.geometry) obj.geometry.dispose();
                if (obj.material) obj.material.dispose();
            });
            renderer.dispose();
            return;
        }

        requestAnimationFrame(animate);
        if (!isVisible) return; // 性能核心：不可见时不执行计算和渲染

        const time = performance.now() * 0.001;
        
        chipGroup.rotation.x += 0.004;
        chipGroup.rotation.y += 0.004;
        
        // 减少 Lerp 频率
        scene.rotation.y += (mouseX - scene.rotation.y) * 0.05;
        scene.rotation.x += (mouseY - scene.rotation.x) * 0.05;

        // 简化的品牌漂浮逻辑
        for (let i = 0; i < brandMeshes.length; i++) {
            brandMeshes[i].position.y -= 0.015;
            if (brandMeshes[i].position.y < -8) brandMeshes[i].position.y = 8;
        }

        renderer.render(scene, camera);
        if(!container.classList.contains('is-visible')) container.classList.add('is-visible');
    }
    animate();

    window.addEventListener('resize', () => {
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
    }, { passive: true });
}
// 屏1：产品类型  卡片出现触发函数
document.addEventListener('DOMContentLoaded', () => {
    const productCards = document.querySelectorAll('.product-row-card');
    
    if (productCards.length === 0) return;

    const observerOptions = {
        root: null,
        // 产品分类卡片滚动时需要更早响应，避免快速滚动时动画跟不上视线
        threshold: 0.01, 
        rootMargin: "0px 0px 4% 0px"
    };

    const cardObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    productCards.forEach(card => {
        cardObserver.observe(card);
    });
});


//屏2：产品品牌 背景触发函数
const handleBrandAnimation = () => {
    const wrapper = document.querySelector('.brands-section-wrapper');
    if (!wrapper) return;

    const rect = wrapper.getBoundingClientRect();
    const viewHeight = window.innerHeight;

    // --- 核心修正：触发时机 ---
    // 0.95 表示容器进入屏幕底部 5% 处就开始动，几乎是“一露脸就动”
    const triggerStart = viewHeight * 0.95; 
    const distance = triggerStart - rect.top; 
    
    // 总行程：稍微拉长，确保滑动有足够的空间
    const totalPath = triggerStart + rect.height; 
    const progress = Math.min(1, Math.max(0, distance / totalPath));

    let currentSplit = 0;
    let currentDeg = 90;

    // --- 保持你要求的节奏：旋转快、滑动顺、定格稳 ---

    if (progress <= 0.2) {
        // 1. 填充 (快：0% - 20%)
        const p1 = progress / 0.2;
        currentSplit = p1 * 50;
        currentDeg = 90;
    } 
    else if (progress <= 0.4) {
        // 2. 定格 (20% - 40%)：依然保留明显的定格区间
        currentSplit = 50;
        currentDeg = 90;
    }
    else if (progress <= 0.45) {
        // 3. 旋转 (40% - 45%)：5% 的路程，极速倒下
        currentSplit = 50;
        const p2 = (progress - 0.4) / 0.05;
        currentDeg = 90 + (p2 * 45); 
    } 
    else if (progress <= 0.9) {
        // 4. 滑动 (45% - 90%)：给足 45% 的路程，慢速、顺滑地划走
        currentDeg = 135;
        const p3 = (progress - 0.45) / 0.45;
        currentSplit = 50 + (p3 * 100); 
    }
    else {
        currentDeg = 135;
        currentSplit = 150;
    }

    wrapper.style.setProperty('--split', `${currentSplit}%`);
    wrapper.style.setProperty('--deg', `${currentDeg}deg`);
};

window.addEventListener('scroll', handleBrandAnimation);
handleBrandAnimation();



//屏3：严苛的质量管控体系 背景触发函数
function initQualityLightAnimation() {
    const bgLayer = document.getElementById('quality-light-bg');
    const section = document.querySelector('.full-screen-bg');

    if (!bgLayer || !section) return;

    const updateLightEffect = () => {
        const rect = section.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        const sectionCenter = rect.top + rect.height / 2;
        const viewportCenter = windowHeight / 2;
        const distance = Math.abs(sectionCenter - viewportCenter);

        // 维持 0.4 的黄金比例，让流程图整体亮起
        const range = windowHeight * 0.4; 
        
        let opacity = 1 - (distance / range);
        
        if (opacity < 0.01) opacity = 0;
        if (opacity > 0.99) opacity = 1;

        bgLayer.style.opacity = opacity;
    };

    window.addEventListener('scroll', updateLightEffect, { passive: true });
    window.addEventListener('resize', updateLightEffect);
    updateLightEffect();
}

document.addEventListener('DOMContentLoaded', initQualityLightAnimation);




// === 3. 供应链服务页 (Services) 特有功能 ===

/* ============================================================
                         3D背景
   ============================================================ */
async function initServicesAnimations() {
    const container = document.getElementById('services-animation-container');
    if (!container) return;

    let width = container.clientWidth;
    let height = container.clientHeight;

    const THREE = await import('https://cdn.skypack.dev/three@0.136.0');

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 2000);
    const renderer = new THREE.WebGLRenderer({ 
        antialias: true, 
        alpha: true, 
        powerPreference: "high-performance" 
    });
    
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    
    container.innerHTML = ''; 
    container.appendChild(renderer.domElement);

    scene.fog = new THREE.Fog(0x001520, 100, 1000);

    const nodeTypes = [
        { name: '物流中心', color: 0x00e6c3, size: 3.0, weight: 8 },
        { name: '制造工厂', color: 0x00b8ff, size: 2.5, weight: 7 },
        { name: '零售节点', color: 0xff6b6b, size: 2.0, weight: 6 },
        { name: '仓储中心', color: 0x9d4edd, size: 2.8, weight: 7 },
        { name: '港口枢纽', color: 0x4cc9f0, size: 3.2, weight: 9 },
        { name: '运输载体', color: 0xffd166, size: 1.8, weight: 5 }
    ];

    const nodes = [];
    const connections = [];
    const dataPackets = [];
    const nodeCount = 80;
    const connectionCount = 120;

    function createNode(type, position) {
        let geometry;
        let color = type.color;
        
        switch(type.name) {
            case '物流中心': geometry = new THREE.OctahedronGeometry(type.size * 0.8); break;
            case '制造工厂': geometry = new THREE.BoxGeometry(type.size * 1.0, type.size * 1.0, type.size * 1.0); break;
            case '仓储中心': geometry = new THREE.CylinderGeometry(type.size * 0.6, type.size * 0.6, type.size * 1.2); break;
            case '港口枢纽': geometry = new THREE.SphereGeometry(type.size * 0.9, 32, 32); break;
            default: geometry = new THREE.SphereGeometry(type.size * 0.6, 16, 16);
        }
        
        const material = new THREE.MeshPhongMaterial({
            color: color,
            emissive: color,
            emissiveIntensity: 0.3,
            shininess: 100,
            transparent: true,
            opacity: 0.9
        });
        
        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.copy(position);
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        
        const glowGeometry = new THREE.SphereGeometry(type.size * 1.5, 16, 16);
        const glowMaterial = new THREE.MeshBasicMaterial({
            color: color,
            transparent: true,
            opacity: 0.1,
            side: THREE.BackSide
        });
        const glowMesh = new THREE.Mesh(glowGeometry, glowMaterial);
        mesh.add(glowMesh);
        
        mesh.userData = {
            type: type,
            pulseSpeed: 0.4 + Math.random() * 0.8, // 呼吸稍微放缓
            pulsePhase: Math.random() * Math.PI * 2,
            rotationSpeed: (Math.random() - 0.5) * 0.008, // 旋转稍微增强，更有立体感
            connections: [],
            glowMesh: glowMesh
        };
        
        scene.add(mesh);
        nodes.push(mesh);
        return mesh;
    }

    function createConnection(node1, node2) {
        const points = [node1.position, node2.position];
        const geometry = new THREE.BufferGeometry().setFromPoints(points);
        const material = new THREE.LineBasicMaterial({ color: 0x00e6c3, transparent: true, opacity: 0.4 });
        const line = new THREE.Line(geometry, material);
        scene.add(line);
        
        const dot = new THREE.Mesh(new THREE.SphereGeometry(0.3, 8, 8), new THREE.MeshBasicMaterial({ color: 0x00e6c3, transparent: true, opacity: 0.8, blending: THREE.AdditiveBlending }));
        scene.add(dot);
        
        node1.userData.connections.push(node2);
        node2.userData.connections.push(node1);
        
        connections.push({ line, node1, node2, dot, dotProgress: Math.random(), pulseOffset: Math.random() * Math.PI * 2 });
        return line;
    }

    function createDataPacket(startNode, endNode, color = 0x00e6c3) {
        const mesh = new THREE.Mesh(new THREE.SphereGeometry(0.4, 12, 12), new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.9, blending: THREE.AdditiveBlending }));
        const trail = new THREE.Mesh(new THREE.SphereGeometry(0.2, 6, 6), new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.4, blending: THREE.AdditiveBlending }));
        scene.add(mesh); scene.add(trail);
        // --- 关键修改：降低 speed 数值让穿梭变慢 ---
        mesh.userData = { 
            startNode, 
            endNode, 
            progress: 0, 
            speed: 0.0004 + Math.random() * 0.0006, 
            color, 
            trail, 
            trailProgress: 0 
        };
        dataPackets.push(mesh);
        return mesh;
    }

    for (let i = 0; i < nodeCount; i++) {
        createNode(nodeTypes[Math.floor(Math.random() * nodeTypes.length)], new THREE.Vector3((Math.random()-0.5)*300, (Math.random()-0.5)*150, (Math.random()-0.5)*200));
    }
    for (let i = 0; i < connectionCount; i++) {
        const n1 = nodes[Math.floor(Math.random()*nodes.length)], n2 = nodes[Math.floor(Math.random()*nodes.length)];
        if (n1 !== n2 && n1.position.distanceTo(n2.position) < 120 && !n1.userData.connections.includes(n2)) createConnection(n1, n2);
    }
    // --- 关键修改：增加到 40 个粒子，弥补减速后的稀疏感 ---
    for (let i = 0; i < 40; i++) { 
        if (connections.length > 0) { 
            const c = connections[Math.floor(Math.random()*connections.length)]; 
            createDataPacket(c.node1, c.node2); 
        } 
    }

    const ambientLight = new THREE.AmbientLight(0x444444, 0.6); scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0x00e6c3, 1.2); directionalLight.position.set(50, 100, 50); scene.add(directionalLight);
    const pointLight = new THREE.PointLight(0x00b8ff, 1.5, 300); pointLight.position.set(-100, 50, -100); scene.add(pointLight);

    camera.position.set(0, 80, 200); camera.lookAt(0, 0, 0);

    let targetRotationX = 0, targetRotationY = 0, currentRotationX = 0, currentRotationY = 0, isMouseDown = false, prevX = 0, prevY = 0;
    
    container.addEventListener('mousedown', (e) => { isMouseDown = true; prevX = e.clientX; prevY = e.clientY; });
    window.addEventListener('mouseup', () => isMouseDown = false);
    container.addEventListener('mousemove', (e) => {
        if (isMouseDown) {
            targetRotationY += (e.clientX - prevX) * 0.005;
            targetRotationX += (e.clientY - prevY) * 0.005;
            prevX = e.clientX; prevY = e.clientY;
        }
        targetRotationY = ((e.clientX - window.innerWidth / 2) / 100) * 0.2;
        targetRotationX = ((e.clientY - window.innerHeight / 2) / 100) * 0.2;
    });

    let isVisible = true;
    const observer = new IntersectionObserver((entries) => {
        isVisible = entries[0].isIntersecting;
    }, { threshold: 0.1 });
    observer.observe(container);

    function animate() {
        if (!document.getElementById('services-animation-container')) {
            observer.disconnect();
            return;
        }
        requestAnimationFrame(animate);

        if (!isVisible) return;

        const time = Date.now() * 0.001;
        currentRotationX += (targetRotationX - currentRotationX) * 0.05;
        currentRotationY += (targetRotationY - currentRotationY) * 0.05;
        scene.rotation.x = currentRotationX; scene.rotation.y = currentRotationY;

        nodes.forEach((node, i) => {
            const d = node.userData;
            node.scale.setScalar(1 + Math.sin(time * d.pulseSpeed + d.pulsePhase) * 0.3);
            if (d.glowMesh) d.glowMesh.scale.setScalar(1 + Math.sin(time * d.pulseSpeed * 0.7 + d.pulsePhase) * 0.2);
            node.rotation.x += d.rotationSpeed; node.position.y += Math.sin(time * 0.3 + i) * 0.05;
        });

        connections.forEach((conn) => {
            conn.line.material.opacity = 0.3 + Math.sin(time * 1.5 + conn.pulseOffset) * 0.2;
            conn.dot.position.lerpVectors(conn.node1.position, conn.node2.position, conn.dotProgress);
            // --- 关键修改：将 0.005 降低到 0.0015，让滑动点明显变慢 ---
            conn.dotProgress = (conn.dotProgress + 0.0015) % 1;
        });

        dataPackets.forEach((packet) => {
            const d = packet.userData; d.progress += d.speed;
            if (d.progress > 1) { 
                d.startNode = d.endNode; 
                d.endNode = d.startNode.userData.connections.length > 0 ? d.startNode.userData.connections[Math.floor(Math.random()*d.startNode.userData.connections.length)] : nodes[Math.floor(Math.random()*nodes.length)]; 
                d.progress = 0; 
            }
            packet.position.lerpVectors(d.startNode.position, d.endNode.position, d.progress);
            if (d.trail) d.trail.position.lerpVectors(d.startNode.position, d.endNode.position, Math.max(0, d.progress - 0.1));
        });

        renderer.render(scene, camera);
        if(!container.classList.contains('is-visible')) container.classList.add('is-visible');
    }
    animate();

    window.addEventListener('resize', () => {
        const newW = container.clientWidth;
        const newH = container.clientHeight;
        camera.aspect = newW / newH;
        camera.updateProjectionMatrix();
        renderer.setSize(newW, newH);
    });
}




// ===  4. 行业赋能页 (Applications) 特有功能 ===

async function initAppsAnimation() {
    const container = document.getElementById('apps-animation-container');
    if (!container || container.dataset.initialized === 'true') return;

    const THREE = await import('https://cdn.skypack.dev/three@0.136.0');

    const scene = new THREE.Scene();
    const width = container.clientWidth;
    const height = container.clientHeight || 600;
    
    const camera = new THREE.PerspectiveCamera(45, width / height, 1, 3000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    
    // 关键优化：限制高分屏采样率，减轻 3K 屏压力
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.2));
    
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    const createRandomGradientTexture = () => {
        const canvas = document.createElement('canvas');
        canvas.width = 16; canvas.height = 128;
        const ctx = canvas.getContext('2d');
        const h1 = 190 + Math.random() * 30;
        const h2 = 260 + Math.random() * 40;
        const grad = ctx.createLinearGradient(0, 0, 0, 128);
        grad.addColorStop(0, `hsl(${h1}, 100%, 60%)`);
        grad.addColorStop(1, `hsl(${h2}, 100%, 50%)`);
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, 16, 128);
        const tex = new THREE.CanvasTexture(canvas);
        tex.needsUpdate = true;
        return tex;
    };

    const cylinderGroup = new THREE.Group();
    cylinderGroup.rotation.x = Math.PI / 6; 
    scene.add(cylinderGroup);

    const cards = [];
    const radius = 850; 
    const images = [
        './resources/Hero-BG-Ref/APPS-BG/asic-mining.webp', './resources/Hero-BG-Ref/APPS-BG/broadcast.webp',
        './resources/Hero-BG-Ref/APPS-BG/computer-matherboard.webp', './resources/Hero-BG-Ref/APPS-BG/dashboard.webp',
        './resources/Hero-BG-Ref/APPS-BG/drone.webp', './resources/Hero-BG-Ref/APPS-BG/electric-lathe.webp',
        './resources/Hero-BG-Ref/APPS-BG/energy-storage.webp', './resources/Hero-BG-Ref/APPS-BG/ev-car.webp',
        './resources/Hero-BG-Ref/APPS-BG/EVcharging.webp', './resources/Hero-BG-Ref/APPS-BG/Graphics-card2.webp',
        './resources/Hero-BG-Ref/APPS-BG/machine-illustration.webp', './resources/Hero-BG-Ref/APPS-BG/panel-equipmen.webp',
        './resources/Hero-BG-Ref/APPS-BG/PLCCC.webp', './resources/Hero-BG-Ref/APPS-BG/robotic-arm.webp',
        './resources/Hero-BG-Ref/APPS-BG/robot-w.webp', './resources/Hero-BG-Ref/APPS-BG/router-wifi.webp',
        './resources/Hero-BG-Ref/APPS-BG/security-camera.webp', './resources/Hero-BG-Ref/APPS-BG/servers.webp',
        './resources/Hero-BG-Ref/APPS-BG/smartwatch.webp', './resources/Hero-BG-Ref/APPS-BG/ultrasound-machiner.webp'
    ];

    const loader = new THREE.TextureLoader();
    images.forEach((src, i) => {
        const cardSize = 120; 
        const thickness = 6;  
        const geometry = new THREE.BoxGeometry(cardSize, cardSize, thickness);
        geometry.translate(0, cardSize / 2, 0); 
        const uniqueSideTex = createRandomGradientTexture();
        const materials = [
            new THREE.MeshBasicMaterial({ map: uniqueSideTex, transparent: true, opacity: 0 }),
            new THREE.MeshBasicMaterial({ map: uniqueSideTex, transparent: true, opacity: 0 }),
            new THREE.MeshBasicMaterial({ map: uniqueSideTex, transparent: true, opacity: 0 }),
            new THREE.MeshBasicMaterial({ map: uniqueSideTex, transparent: true, opacity: 0 }),
            new THREE.MeshBasicMaterial({ transparent: true, opacity: 0 }), 
            new THREE.MeshBasicMaterial({ color: 0x0a0a0a, transparent: true, opacity: 0 })
        ];
        const mesh = new THREE.Mesh(geometry, materials);
        const angleStep = (Math.PI * 2) / images.length;
        mesh.userData = { angle: i * angleStep + 1.8, isLoaded: false };
        mesh.rotation.x = -0.3; 
        mesh.visible = false; 
        cylinderGroup.add(mesh);
        cards.push(mesh);
        loader.load(src, (tex) => {
            mesh.material[4].map = tex;
            mesh.material[4].needsUpdate = true;
            mesh.userData.isLoaded = true;
        });
    });

    camera.position.set(0, 180, 1000);

    // --- 交互控制 ---
    let autoScroll = 0;      
    let manualOffset = 0;    
    let isDragging = false;  
    let lastX = 0;           

    const el = renderer.domElement;
    el.style.touchAction = 'none'; 

    el.addEventListener('pointerdown', (e) => {
        isDragging = true;
        lastX = e.clientX;
        el.setPointerCapture(e.pointerId); 
    });

    el.addEventListener('pointermove', (e) => {
        if (!isDragging) return;
        const deltaX = e.clientX - lastX;
        manualOffset += deltaX * 0.0055; 
        lastX = e.clientX;
    });

    const stopDragging = (e) => {
        isDragging = false;
        if(e) el.releasePointerCapture(e.pointerId);
    };
    el.addEventListener('pointerup', stopDragging);
    el.addEventListener('pointercancel', stopDragging);

    // --- 新增：视口拦截 ---
    let isVisible = true;
    const observer = new IntersectionObserver((entries) => {
        isVisible = entries[0].isIntersecting;
    }, { threshold: 0.1 });
    observer.observe(container);

    function animate() {
        if (!document.body.contains(container)) {
            observer.disconnect(); // 销毁时清理
            return;
        }
        requestAnimationFrame(animate);

        // 如果不可见，直接跳过计算和渲染（解决滚动卡顿的核心）
        if (!isVisible) return;

        if (!isDragging) {
            autoScroll += 0.002; 
        }

        const totalRotation = autoScroll + manualOffset;

        cards.forEach((card) => {
            if (!card.userData.isLoaded || !card.material[4].map) return;
            const currentAngle = card.userData.angle + totalRotation;
            
            card.position.x = Math.sin(currentAngle) * radius;
            card.position.z = Math.cos(currentAngle) * radius - radius;
            card.rotation.y = currentAngle;

            const viewFactor = Math.cos(currentAngle);
            if (viewFactor > -0.5) { 
                card.visible = true;
                const scale = 0.7 + Math.max(0, viewFactor) * 0.6; 
                card.scale.setScalar(scale);
                const opacity = Math.pow(Math.max(0, viewFactor + 0.5), 1.5) * 0.9; 
                for(let j = 0; j < 6; j++) { card.material[j].opacity = opacity; }
            } else {
                card.visible = false;
            }
        });

        renderer.render(scene, camera);
        if(!container.classList.contains('is-visible')) container.classList.add('is-visible');
    }
    animate();
}

//解决方案页面的点击切换//
document.addEventListener('DOMContentLoaded', () => {
    let currentIdx = 0;
    const inner = document.getElementById('solInner');
    const dots = document.querySelectorAll('.s-dot');
    const pages = document.querySelectorAll('.solution-page');
    const total = pages.length;

    if (!inner || total === 0) return;

    // 更新界面函数
    const updateUI = () => {
        inner.style.transform = `translateX(-${currentIdx * 100}%)`;
        dots.forEach((dot, i) => dot.classList.toggle('active', i === currentIdx));
    };

    // 暴露给 HTML 的 onclick
    window.shiftSlide = (dir) => {
        currentIdx = (currentIdx + dir + total) % total;
        updateUI();
        resetTimer();
    };

    window.jumpToSlide = (idx) => {
        currentIdx = idx;
        updateUI();
        resetTimer();
    };

    // 自动轮播
    let autoTimer = setInterval(() => window.shiftSlide(1), 5000);

    function resetTimer() {
        clearInterval(autoTimer);
        autoTimer = setInterval(() => window.shiftSlide(1), 5000);
    }
});


/* === 5. 极致丝滑背景展开 (修正节奏：前快后慢) === */
let targetProgress = 0;  // 目标位置
let currentProgress = 0; // 当前位置（插值平滑）

window.addEventListener('scroll', () => {
    const section = document.querySelector('.apps-section');
    if (!section) return;

    const rect = section.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    // 只有在元素进入视口时才计算
    if (rect.top < windowHeight && rect.bottom > 0) {
        const sectionCenter = rect.top + rect.height / 2;
        const screenCenter = windowHeight / 2;
        const maxDist = (windowHeight + rect.height) / 2;
        const dist = Math.abs(screenCenter - sectionCenter);
        
        // 1. 计算原始线性进度 (0 到 1)
        // 1.2 是灵敏度系数，保证元素在进入视野一段距离后能全开
        let linear = 1 - (dist / maxDist) * 1.2;
        linear = Math.min(1, Math.max(0, linear));

        // 2. 【核心节奏修改】：0.4 次幂函数
        // 这会让进度在开始阶段（linear 较小时）迅速爆发，实现“刚开始快”
        let explosive = Math.pow(linear, 0.4); 
        
        targetProgress = explosive * 100;
        
        // 3. 边缘吸附：确保全开和全闭时绝对干净
        if (targetProgress > 95) targetProgress = 100;
        if (targetProgress < 5) targetProgress = 0;
    } else {
        targetProgress = 0;
    }
});

/**
 * 核心更新函数：维持 60FPS 的丝滑更新
 * 线性插值公式：当前值 + (目标值 - 当前值) * 灵敏度
 */
function smoothUpdate() {
    // 0.1 维持了你原本喜欢的“肉感”手感
    currentProgress += (targetProgress - currentProgress) * 0.1;

    const section = document.querySelector('.apps-section');
    if (section) {
        // 将计算出的平滑进度写入 CSS 变量
        section.style.setProperty('--expand-progress', currentProgress.toFixed(3));
    }
    requestAnimationFrame(smoothUpdate);
}

// 启动动画循环
smoothUpdate();









// === 5.关于页 (About) 特有功能 ===
/**
 * About 页面：动态星空地球 - 能量流光版
 * 已补全 OrbitControls 鼠标交互，严格对齐参考代码的所有参数
 */
async function initAboutGlobe() {
    const container = document.getElementById('about-globe-container');
    if (!container) return;

    // 1. 初始化前清空容器
    container.innerHTML = '';

    try {
        // 2. 异步引入依赖
        const THREE = await import('https://cdn.skypack.dev/three@0.136.0');
        const { OrbitControls } = await import('https://cdn.skypack.dev/three@0.136.0/examples/jsm/controls/OrbitControls.js');
        
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(25, window.innerWidth / window.innerHeight, 0.1, 1000);
        
        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        
        // --- 性能核心优化：限制 3K 屏像素比 ---
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.2));
        
        renderer.outputEncoding = THREE.sRGBEncoding;
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 1.8;
        container.appendChild(renderer.domElement);

        const loader = new THREE.TextureLoader();

        // 材质贴图生成
        function createGradTexture() {
            const canvas = document.createElement('canvas');
            canvas.width = 256; canvas.height = 64;
            const ctx = canvas.getContext('2d');
            const grad = ctx.createLinearGradient(0, 0, 256, 0);
            grad.addColorStop(0, 'rgba(255,255,255,0.1)');
            grad.addColorStop(0.5, 'rgba(255,255,255,1)');
            grad.addColorStop(1, 'rgba(255,255,255,0.1)');
            ctx.fillStyle = grad;
            ctx.fillRect(0, 0, 256, 64);
            const tex = new THREE.CanvasTexture(canvas);
            tex.wrapS = THREE.RepeatWrapping;
            return tex;
        }

        const starCanvas = document.createElement('canvas');
        starCanvas.width = 64; starCanvas.height = 64;
        const starCtx = starCanvas.getContext('2d');
        const starGrad = starCtx.createRadialGradient(32, 32, 0, 32, 32, 32);
        starGrad.addColorStop(0, 'rgba(255,255,255,1)');
        starGrad.addColorStop(0.5, 'rgba(255,255,255,0.2)');
        starGrad.addColorStop(1, 'rgba(255,255,255,0)');
        starCtx.fillStyle = starGrad;
        starCtx.fillRect(0, 0, 64, 64);
        const staticStarTex = new THREE.CanvasTexture(starCanvas);

        // 星空生成
        const starsCount1 = 18000;
        const starsGeo1 = new THREE.BufferGeometry();
        const starsPos1 = new Float32Array(starsCount1 * 3);
        for(let i=0; i<starsCount1*3; i++) starsPos1[i] = (Math.random()-0.5)*400;
        starsGeo1.setAttribute('position', new THREE.BufferAttribute(starsPos1, 3));
        const stars1 = new THREE.Points(starsGeo1, new THREE.PointsMaterial({
            size: 0.7,
            map: staticStarTex,
            transparent: true,
            blending: THREE.AdditiveBlending,
            depthWrite: false
        }));
        scene.add(stars1);

        const starsCount2 = 26000;
        const starsGeo2 = new THREE.BufferGeometry();
        const starsPos2 = new Float32Array(starsCount2 * 3);
        for(let i=0; i<starsCount2*3; i++) starsPos2[i] = (Math.random()-0.5)*800; 
        starsGeo2.setAttribute('position', new THREE.BufferAttribute(starsPos2, 3));
        const stars2 = new THREE.Points(starsGeo2, new THREE.PointsMaterial({
            size: 0.55,
            map: staticStarTex, 
            transparent: true,
            opacity: 0.7,
            blending: THREE.AdditiveBlending,
            depthWrite: false
        }));
        scene.add(stars2);

        // 地球组
        const earthGroup = new THREE.Group();
        earthGroup.position.set(-1, 3, 0);
        const earthRadius = 2;
        const earth = new THREE.Mesh(
            new THREE.SphereGeometry(earthRadius, 128, 128),
            new THREE.MeshStandardMaterial({
                map: loader.load('./resources/Hero-BG-Ref/earth_atmos_2048.webp'),
                bumpMap: loader.load('./resources/Hero-BG-Ref/earth_normal_2048.webp'),
                bumpScale: 0.05,
                roughnessMap: loader.load('./resources/Hero-BG-Ref/earth_specular_2048.webp'),
                roughness: 0.6,
                metalness: 0.1,
                emissive: new THREE.Color(0x112244),
                emissiveIntensity: 0.45
            })
        );
        earth.rotation.y = 5;
        earthGroup.add(earth);

        const orbitDistance = earthRadius * 1.5;
        const orbitTex = createGradTexture();
        const orbit1 = new THREE.Mesh(
            new THREE.RingGeometry(orbitDistance, orbitDistance + 0.015, 128),
            new THREE.MeshBasicMaterial({ color: 0x00f2ff, map: orbitTex, transparent: true, opacity: 0.8, blending: THREE.AdditiveBlending, side: THREE.DoubleSide })
        );
        orbit1.rotation.x = Math.PI / 2;
        earthGroup.add(orbit1);

        const orbit2 = new THREE.Mesh(
            new THREE.RingGeometry(orbitDistance * 1.3, orbitDistance * 1.3 + 0.015, 128),
            new THREE.MeshBasicMaterial({ color: 0x0066ff, map: orbitTex, transparent: true, opacity: 0.6, blending: THREE.AdditiveBlending, side: THREE.DoubleSide })
        );
        orbit2.rotation.x = Math.PI / 2 + 0.5;
        orbit2.rotation.z = 1.2;
        earthGroup.add(orbit2);
        scene.add(earthGroup);

        const sun = new THREE.DirectionalLight(0xffffff, 2.5);
        sun.position.set(10, 5, 12);
        scene.add(sun);
        scene.add(new THREE.AmbientLight(0x223344, 1.2));
        camera.position.z = 25;

        const controls = new OrbitControls(camera, renderer.domElement);
        controls.target.set(4.5, 1.5, 0); 
        controls.enablePan = false; 
        controls.enableZoom = false;
        controls.enableDamping = true; 
        controls.dampingFactor = 0.04;

        // --- 关键优化：视口拦截 ---
        let isVisible = true;
        const observer = new IntersectionObserver((entries) => {
            isVisible = entries[0].isIntersecting;
        }, { threshold: 0.05 });
        observer.observe(container);

        // 动画循环
        function animate() {
            if (!document.getElementById('about-globe-container')) {
                if (controls) controls.dispose();
                observer.disconnect();
                return;
            }
            requestAnimationFrame(animate);
            
            // 如果地球不在视野内（比如用户滚到了页面下方的文字区），停止渲染
            if (!isVisible) return;

            earth.rotation.y += 0.0025;
            orbitTex.offset.x -= 0.005; 
            orbit1.rotation.z += 0.001; 
            orbit2.rotation.z -= 0.005; 

            if (stars1) {
                stars1.rotation.y += 0.0003;
                stars1.rotation.z += 0.0002;
            }
            if (stars2) {
                stars2.rotation.y -= 0.0001;
            }

            if (controls) controls.update(); 
            renderer.render(scene, camera);

            if(!container.classList.contains('is-visible')) container.classList.add('is-visible');
        }
        animate();

        window.addEventListener('resize', () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        });

    } catch (e) {
        console.error("Globe Load Error", e);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const counters = document.querySelectorAll('.counter');
    
    const animateStats = () => {
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            const duration = 2000; // 动画总时长
            const startTime = performance.now();

            const update = (now) => {
                const elapsed = now - startTime;
                const progress = Math.min(elapsed / duration, 1);
                
                // 缓动算法：先快后慢
                const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
                
                let currentValue = Math.floor(easeProgress * target);

                // --- 核心修复：针对小数字的逻辑 ---
                // 如果目标值小且进度还没完，但计算出来的数值是 0，我们让它根据进度强行显示
                if (target < 50 && progress > 0 && currentValue === 0) {
                    currentValue = Math.ceil(progress * target);
                }

                counter.innerText = currentValue.toLocaleString();

                if (progress < 1) {
                    requestAnimationFrame(update);
                } else {
                    counter.innerText = target.toLocaleString();
                }
            };
            requestAnimationFrame(update);
        });
    };

    const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            animateStats();
            observer.disconnect();
        }
    }, { threshold: 0.3 });

    const statsTarget = document.querySelector('.overview-stats-row');
    if (statsTarget) observer.observe(statsTarget);
});





// === 6. 联系我们页 (Contact) 特有功能 ===
(function() {
    "use strict";

    const PI = Math.PI, cos = Math.cos, sin = Math.sin, abs = Math.abs, random = Math.random, TAU = 2 * PI;
    const rand = (n) => n * random();
    const randIn = (min, max) => rand(max - min) + min;
    const fadeInOut = (t, m) => {
        let hm = 0.5 * m;
        return abs((t + hm) % m - hm) / hm;
    };
    const lerp = (n1, n2, speed) => (1 - speed) * n1 + speed * n2;

    function initContactFlowField() {
        const container = document.getElementById('contact-animation-container');
        if (!container || container.dataset.initialized === 'true') return;

        const particleCount = 2500; 
        const noiseSteps = 2; 

        let canvas, ctx, center, tick, simplex;
        let positions, velocities, speeds, lifeSpans, sizes, hues;
        let ripple = { x: 0, y: 0, r: 0, active: false, opacity: 0 };

        function setup() {
            if (typeof SimplexNoise === 'undefined') return;
            tick = 0;
            center = [];
            simplex = new SimplexNoise();

            canvas = { a: document.createElement("canvas"), b: document.createElement("canvas") };
            canvas.b.style.cssText = "position:absolute; top:0; left:0; width:100%; height:100%; pointer-events:auto; cursor:pointer;";
            
            container.innerHTML = '';
            container.appendChild(canvas.b);
            container.dataset.initialized = 'true';

            ctx = { a: canvas.a.getContext("2d"), b: canvas.b.getContext("2d") };

            positions = new Float32Array(particleCount * 2);
            velocities = new Float32Array(particleCount * 2);
            lifeSpans = new Float32Array(particleCount * 2);
            speeds = new Float32Array(particleCount);
            hues = new Float32Array(particleCount);
            sizes = new Float32Array(particleCount);

            resize();

            canvas.b.addEventListener('mousedown', (e) => {
                const rect = canvas.b.getBoundingClientRect();
                center[0] = e.clientX - rect.left;
                center[1] = e.clientY - rect.top;
                ripple.x = center[0]; ripple.y = center[1];
                ripple.r = 0; ripple.opacity = 1; ripple.active = true;
            });

            for (let i = 0; i < particleCount * 2; i += 2) initParticle(i, true);
            requestAnimationFrame(() => container.classList.add('is-visible'));
            draw();
        }

        function initParticle(i, isFirstInit = false) {
            let iy = i + 1, ih = 0.5 * i | 0;
            
            if (isFirstInit) {
                positions[i] = rand(canvas.a.width);
                positions[iy] = rand(canvas.a.height);
            } else {
                let rd = rand(250); 
                let rt = rand(TAU);
                positions[i] = center[0] + cos(rt) * rd; 
                positions[iy] = center[1] + sin(rt) * rd;
            }
            
            velocities[i] = (random() - 0.5) * 0.1; 
            velocities[iy] = (random() - 0.5) * 0.1;

            // --- 修改点：基础速度小幅提升 ---
            speeds[ih] = randIn(0.8, 1.6); 
            hues[ih] = randIn(170, 250); 
            sizes[ih] = randIn(0.8, 1.8); 
            
            lifeSpans[i] = 0;
            lifeSpans[iy] = randIn(400, 800); 
        }

        function draw() {
            if (!document.getElementById('contact-animation-container')) return;
            
            tick += 0.3; // 流场漂移速度微加

            ctx.a.clearRect(0, 0, canvas.a.width, canvas.a.height);
            ctx.b.clearRect(0, 0, canvas.b.width, canvas.b.height);

            for (let i = 0; i < particleCount * 2; i += 2) {
                let iy = i + 1, ih = 0.5 * i | 0;
                let x = positions[i], y = positions[iy];
                
                let n = simplex.noise3D(x * 0.001, y * 0.001, tick * 0.0005) * TAU * noiseSteps;
                
                // --- 修改点：转向响应稍微变快，增加灵动感 ---
                let vx = lerp(velocities[i], cos(n), 0.07);
                let vy = lerp(velocities[iy], sin(n), 0.07);
                
                let s = speeds[ih], tx = x + vx * s, ty = y + vy * s;
                let dl = fadeInOut(lifeSpans[i], lifeSpans[iy]);

                ctx.a.save();
                ctx.a.lineWidth = dl * sizes[ih] + 0.5;
                ctx.a.strokeStyle = `hsla(${hues[ih]}, 70%, 75%, ${dl * 0.7})`;
                ctx.a.beginPath(); ctx.a.moveTo(x, y); ctx.a.lineTo(tx, ty); ctx.a.stroke();
                ctx.a.restore();

                positions[i] = tx; positions[iy] = ty;
                velocities[i] = vx; velocities[iy] = vy;
                lifeSpans[i] += 1; 
                
                if (x > canvas.a.width || x < 0 || y > canvas.a.height || y < 0 || lifeSpans[i] > lifeSpans[iy]) {
                    initParticle(i);
                }
            }

            ctx.b.save();
            ctx.b.filter = 'blur(4px)'; 
            ctx.b.globalCompositeOperation = 'lighten';
            ctx.b.drawImage(canvas.a, 0, 0);
            ctx.b.restore();

            ctx.b.save();
            ctx.b.globalCompositeOperation = 'lighter';
            ctx.b.drawImage(canvas.a, 0, 0);
            ctx.b.restore();

            if (ripple.active) {
                ripple.r += 2.5; 
                ripple.opacity -= 0.025;
                if (ripple.opacity <= 0) ripple.active = false;
                else {
                    ctx.b.save();
                    ctx.b.beginPath();
                    ctx.b.arc(ripple.x, ripple.y, ripple.r, 0, TAU);
                    ctx.b.strokeStyle = `rgba(0, 255, 255, ${ripple.opacity * 0.5})`;
                    ctx.b.lineWidth = 1;
                    ctx.b.stroke();
                    ctx.b.restore();
                }
            }

            window.requestAnimationFrame(draw);
        }

        function resize() {
            const w = window.innerWidth, h = window.innerHeight;
            canvas.a.width = canvas.b.width = w;
            canvas.a.height = canvas.b.height = h;
            center[0] = w * 0.5;
            center[1] = h * 0.5;
        }

        window.addEventListener('resize', resize);
        setTimeout(setup, 100);
    }

    if (document.readyState === 'complete') {
        initContactFlowField();
    } else {
        window.addEventListener('load', initContactFlowField);
    }
})();

function initContactLogic() {
    // 逻辑来源于 contact.html 原内联脚本
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return; // 防错处理

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(this);
        const data = Object.fromEntries(formData);
        
        // 显示成功消息
        document.getElementById('successMessage').style.display = 'block';
        document.getElementById('errorMessage').style.display = 'none';
        
        // 2秒后重置表单
        setTimeout(() => {
            this.reset();
            document.getElementById('successMessage').style.display = 'none';
        }, 2000);
        
        // 保持原样输出
        console.log('Contact form submitted:', data);
    });
}
