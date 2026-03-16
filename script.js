/* ============================================
   SATYA TEJ ENUMULA — ULTRA PREMIUM PORTFOLIO
   Enhanced Interactions & Animations v2.0
============================================ */

// ========== PRELOADER ==========
function initPreloader() {
    const bar = document.getElementById('preloaderBar');
    const preloader = document.getElementById('preloader');
    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.random() * 15 + 5;
        if (progress > 100) progress = 100;
        bar.style.width = progress + '%';
        if (progress >= 100) {
            clearInterval(interval);
            setTimeout(() => { preloader.classList.add('hidden'); }, 400);
        }
    }, 120);
}

// ========== PARTICLE NETWORK ==========
class ParticleNetwork {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.particles = [];
        this.mouse = { x: null, y: null, r: 180 };
        this.count = Math.min(100, Math.floor(window.innerWidth / 15));
        this.maxDist = 170;
        this.resize();
        this.init();
        this.animate();
        window.addEventListener('resize', () => { this.resize(); this.count = Math.min(100, Math.floor(window.innerWidth / 15)); this.init(); });
        window.addEventListener('mousemove', e => { this.mouse.x = e.clientX; this.mouse.y = e.clientY; });
        window.addEventListener('mouseout', () => { this.mouse.x = null; this.mouse.y = null; });
    }
    resize() { this.canvas.width = window.innerWidth; this.canvas.height = window.innerHeight; }
    init() {
        this.particles = [];
        for (let i = 0; i < this.count; i++) {
            this.particles.push({ x: Math.random() * this.canvas.width, y: Math.random() * this.canvas.height, vx: (Math.random() - .5) * .4, vy: (Math.random() - .5) * .4, r: Math.random() * 2 + .5, o: Math.random() * .4 + .15 });
        }
    }
    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.particles.forEach((p, i) => {
            p.x += p.vx; p.y += p.vy;
            if (p.x < 0) p.x = this.canvas.width; if (p.x > this.canvas.width) p.x = 0;
            if (p.y < 0) p.y = this.canvas.height; if (p.y > this.canvas.height) p.y = 0;
            if (this.mouse.x !== null) {
                const dx = p.x - this.mouse.x, dy = p.y - this.mouse.y, dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < this.mouse.r) { const f = (this.mouse.r - dist) / this.mouse.r; p.vx += (dx / dist) * f * .25; p.vy += (dy / dist) * f * .25; }
            }
            p.vx *= .99; p.vy *= .99;
            this.ctx.beginPath(); this.ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            this.ctx.fillStyle = `rgba(0,255,200,${p.o})`; this.ctx.fill();
            for (let j = i + 1; j < this.particles.length; j++) {
                const p2 = this.particles[j], dx = p.x - p2.x, dy = p.y - p2.y, dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < this.maxDist) {
                    this.ctx.beginPath(); this.ctx.moveTo(p.x, p.y); this.ctx.lineTo(p2.x, p2.y);
                    this.ctx.strokeStyle = `rgba(0,255,200,${(1 - dist / this.maxDist) * .12})`; this.ctx.lineWidth = .5; this.ctx.stroke();
                }
            }
        });
        requestAnimationFrame(() => this.animate());
    }
}

// ========== HEX GRID BACKGROUND ==========
class HexGrid {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.resize();
        this.draw();
        window.addEventListener('resize', () => { this.resize(); this.draw(); });
    }
    resize() { this.canvas.width = window.innerWidth; this.canvas.height = window.innerHeight; }
    draw() {
        const ctx = this.ctx, w = this.canvas.width, h = this.canvas.height;
        ctx.clearRect(0, 0, w, h);
        const size = 40, rows = Math.ceil(h / (size * 1.5)) + 2, cols = Math.ceil(w / (size * Math.sqrt(3))) + 2;
        ctx.strokeStyle = 'rgba(0,255,200,0.03)'; ctx.lineWidth = 0.5;
        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < cols; c++) {
                const x = c * size * Math.sqrt(3) + (r % 2 ? size * Math.sqrt(3) / 2 : 0);
                const y = r * size * 1.5;
                ctx.beginPath();
                for (let i = 0; i < 6; i++) { const angle = Math.PI / 3 * i + Math.PI / 6; const px = x + size * Math.cos(angle); const py = y + size * Math.sin(angle); i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py); }
                ctx.closePath(); ctx.stroke();
            }
        }
    }
}

// ========== TYPING ANIMATION ==========
class TypeWriter {
    constructor(el, texts, speed = 65, pause = 2800) {
        this.el = el; this.texts = texts; this.speed = speed; this.pause = pause;
        this.ti = 0; this.ci = 0; this.del = false; this.type();
    }
    type() {
        const text = this.texts[this.ti];
        this.el.textContent = this.del ? text.substring(0, --this.ci) : text.substring(0, ++this.ci);
        let t = this.del ? this.speed / 2 : this.speed;
        if (!this.del && this.ci === text.length) { t = this.pause; this.del = true; }
        else if (this.del && this.ci === 0) { this.del = false; this.ti = (this.ti + 1) % this.texts.length; t = 400; }
        setTimeout(() => this.type(), t);
    }
}

// ========== COUNTER ANIMATION ==========
function animateCounters(selector) {
    document.querySelectorAll(selector).forEach(el => {
        const target = parseInt(el.getAttribute('data-target')), start = performance.now(), dur = 2200;
        (function update(now) {
            const p = Math.min((now - start) / dur, 1), eased = 1 - Math.pow(1 - p, 3);
            el.textContent = Math.floor(eased * target);
            p < 1 ? requestAnimationFrame(update) : el.textContent = target;
        })(start);
    });
}

// ========== SCROLL PROGRESS ==========
function initScrollProgress() {
    const bar = document.getElementById('scrollProgress');
    window.addEventListener('scroll', () => {
        const h = document.documentElement.scrollHeight - window.innerHeight;
        bar.style.width = (window.scrollY / h * 100) + '%';
    });
}

// ========== SCROLL REVEAL ==========
function initScrollReveal() {
    const els = document.querySelectorAll('.skill-card,.tl-item,.proj-card,.cert-card,.info-card,.about-terminal,.ca-card,.dash-card,.addl-card,.sf-item,.saas-mock,.saas-tech-stack');
    els.forEach(el => el.classList.add('reveal'));
    const obs = new IntersectionObserver((entries) => {
        entries.forEach((e, i) => { if (e.isIntersecting) { setTimeout(() => e.target.classList.add('visible'), i * 60); obs.unobserve(e.target); } });
    }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });
    els.forEach(el => obs.observe(el));
}

// ========== NAVIGATION ==========
function initNavigation() {
    const navbar = document.getElementById('navbar'), toggle = document.getElementById('navToggle'), links = document.getElementById('navLinks'), navLinks = document.querySelectorAll('.nav-link'), sections = document.querySelectorAll('section');
    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 50);
        let cur = '';
        sections.forEach(s => { if (window.scrollY >= s.offsetTop - 120) cur = s.id; });
        navLinks.forEach(l => { l.classList.toggle('active', l.getAttribute('data-section') === cur); });
    });
    toggle.addEventListener('click', () => {
        links.classList.toggle('open');
        const lines = toggle.querySelectorAll('.hamburger-line');
        if (links.classList.contains('open')) { lines[0].style.transform = 'rotate(45deg) translate(5px,5px)'; lines[1].style.opacity = '0'; lines[2].style.transform = 'rotate(-45deg) translate(5px,-5px)'; }
        else { lines[0].style.transform = 'none'; lines[1].style.opacity = '1'; lines[2].style.transform = 'none'; }
    });
    navLinks.forEach(l => l.addEventListener('click', () => { links.classList.remove('open'); toggle.querySelectorAll('.hamburger-line').forEach(li => { li.style.transform = 'none'; li.style.opacity = '1'; }); }));
}

// ========== SMOOTH SCROLL ==========
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', e => { e.preventDefault(); const t = document.querySelector(a.getAttribute('href')); if (t) t.scrollIntoView({ behavior: 'smooth', block: 'start' }); });
    });
}

// ========== STAT COUNTER ON SCROLL ==========
function initObservedCounters() {
    const observe = (selector) => {
        const targets = document.querySelectorAll(selector);
        if (!targets.length) return;
        const parent = targets[0].closest('.hero-stats, .dashboard-grid');
        if (!parent) return;
        let done = false;
        new IntersectionObserver(entries => {
            entries.forEach(e => { if (e.isIntersecting && !done) { done = true; animateCounters(selector); } });
        }, { threshold: .3 }).observe(parent);
    };
    observe('.hstat-val[data-target]');
    observe('.dash-num[data-target]');
}

// ========== SKILLS TABS ==========
function initSkillsTabs() {
    const tabs = document.querySelectorAll('.stab'), cards = document.querySelectorAll('.skill-card');
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            const cat = tab.getAttribute('data-tab');
            cards.forEach(c => {
                if (cat === 'all' || c.getAttribute('data-cat') === cat) { c.style.display = ''; setTimeout(() => c.classList.add('visible'), 50); }
                else { c.style.display = 'none'; c.classList.remove('visible'); }
            });
        });
    });
}

// ========== 3D CARD TILT ==========
function initCardTilt() {
    document.querySelectorAll('.skill-card,.proj-card,.dash-card').forEach(card => {
        card.addEventListener('mousemove', e => {
            const r = card.getBoundingClientRect(), x = e.clientX - r.left, y = e.clientY - r.top;
            const rx = ((y - r.height / 2) / r.height) * -5, ry = ((x - r.width / 2) / r.width) * 5;
            card.style.transform = `perspective(600px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-3px)`;
        });
        card.addEventListener('mouseleave', () => { card.style.transform = 'perspective(600px) rotateX(0) rotateY(0) translateY(0)'; });
    });
}

// ========== BACK TO TOP ==========
function initBackToTop() {
    const btn = document.getElementById('backToTop');
    window.addEventListener('scroll', () => { btn.classList.toggle('visible', window.scrollY > 500); });
    btn.addEventListener('click', () => { window.scrollTo({ top: 0, behavior: 'smooth' }); });
}

// ========== DASHBOARD BAR ANIMATION ==========
function initDashBars() {
    const bars = document.querySelectorAll('.dash-fill');
    const obs = new IntersectionObserver(entries => {
        entries.forEach(e => { if (e.isIntersecting) { e.target.style.width = e.target.style.getPropertyValue('--w'); obs.unobserve(e.target); } });
    }, { threshold: .3 });
    bars.forEach(b => { b.style.width = '0'; obs.observe(b); });
}

// ========== SAAS MOCK LOG ANIMATION ==========
function initMockLogs() {
    const log = document.querySelector('.mock-log');
    if (!log) return;
    const lines = log.querySelectorAll('p');
    const obs = new IntersectionObserver(entries => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                lines.forEach((l, i) => { l.style.opacity = '0'; l.style.transform = 'translateX(-10px)'; l.style.transition = `all .4s ease ${i * .15}s`; setTimeout(() => { l.style.opacity = '1'; l.style.transform = 'translateX(0)'; }, 50); });
                obs.unobserve(e.target);
            }
        });
    }, { threshold: .3 });
    obs.observe(log);
}

// ========== INIT ==========
document.addEventListener('DOMContentLoaded', () => {
    initPreloader();
    new ParticleNetwork(document.getElementById('particleCanvas'));
    new HexGrid(document.getElementById('hexCanvas'));
    new TypeWriter(document.getElementById('typingText'), [
        'SOC Manager & Cybersecurity Leader',
        'Building Enterprise CyberSaaS Platform',
        'SIEM Expert — QRadar | Splunk | Sentinel',
        'Threat Detection & Incident Response',
        '24x7 Security Operations Across Cloud & On-Prem',
        'SOAR Automation & Workflow Engineering',
        'Enterprise-Grade Security Applications',
        '150+ Connector Integrations & Lab Expert',
    ], 55, 2800);
    initNavigation();
    initSmoothScroll();
    initScrollProgress();
    initScrollReveal();
    initObservedCounters();
    initSkillsTabs();
    initCardTilt();
    initBackToTop();
    initDashBars();
    initMockLogs();
    console.log('%c🛡️ SATYA TEJ ENUMULA — Portfolio v2.0 Loaded', 'color:#00ffc8;font-size:14px;font-weight:bold');
});
