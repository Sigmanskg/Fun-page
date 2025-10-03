    // Анимированные частицы на фоне
    const canvas = document.getElementById('bg-particles');
    const ctx = canvas.getContext('2d');
    let particles = [];
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    function randomColor() {
        const colors = ['#23a6d5', '#e73c7e', '#fff', '#23d5ab'];
        return colors[Math.floor(Math.random() * colors.length)];
    }
    function createParticles() {
        particles = [];
        for (let i = 0; i < 60; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                r: 1.5 + Math.random() * 2.5,
                dx: -0.5 + Math.random(),
                dy: -0.5 + Math.random(),
                color: randomColor(),
                alpha: 0.3 + Math.random() * 0.7
            });
        }
    }
    createParticles();
    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let p of particles) {
            ctx.save();
            ctx.globalAlpha = p.alpha;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, 2 * Math.PI);
            ctx.fillStyle = p.color;
            ctx.shadowColor = p.color;
            ctx.shadowBlur = 16;
            ctx.fill();
            ctx.restore();
            p.x += p.dx;
            p.y += p.dy;
            if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
            if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
        }
        requestAnimationFrame(animateParticles);
    }
    animateParticles();
    window.addEventListener('resize', () => {
        resizeCanvas();
        createParticles();
    });

document.addEventListener('DOMContentLoaded', () => {
    // Анимированная кнопка-ссылка 'Обо мне' с ripple-эффектом
    const aboutBtn = document.getElementById('about-link');
    // Появление кнопки и логотипа строго после печати текста
    function showAboutAndLogo() {
        if (aboutBtn) aboutBtn.classList.add('visible');
        const logoContainer = document.getElementById('logo-container');
        if (logoContainer) logoContainer.classList.add('visible');
    }

    if (aboutBtn) {
        aboutBtn.addEventListener('click', function(e) {
            // Ripple эффект
            const circle = document.createElement('span');
            circle.className = 'ripple';
            const rect = aboutBtn.getBoundingClientRect();
            circle.style.left = (e.clientX - rect.left) + 'px';
            circle.style.top = (e.clientY - rect.top) + 'px';
            aboutBtn.appendChild(circle);
            setTimeout(() => circle.remove(), 600);
            // Переход на подстраницу с задержкой для анимации overlay
            e.preventDefault();
            const overlay = document.getElementById('page-transition');
            if (overlay) {
                overlay.classList.add('active');
                document.body.classList.add('overlay-blur');
                setTimeout(() => {
                    window.location.href = aboutBtn.href;
                }, 650);
            } else {
                window.location.href = aboutBtn.href;
            }
        });
    }

    // Typewriter effect for title (печать начинается только после анимации подъёма)
    const title = 'Elora, the best TikTok streamer — welcome to her fan page.';
    const typewriter = document.getElementById('typewriter');
    const titleAnim = document.querySelector('.title-anim');
    const logoContainer = document.getElementById('logo-container');
    let i = 0;
    setTimeout(() => {
        typewriter.classList.add('visible');
        titleAnim.classList.add('move-up');
        // После завершения анимации (700мс) — начать печатать
        setTimeout(() => {
            typewriter.classList.add('typing'); // добавить курсор
            function typeOnce() {
                if (i <= title.length) {
                    // Просто печатаем текст без span и подсветки
                    typewriter.textContent = title.slice(0, i);
                    i++;
                    setTimeout(typeOnce, 120);
                } else {
                    typewriter.textContent = title;
                    typewriter.classList.remove('typing');
                    typewriter.classList.remove('glow'); // Убрать glow, чтобы не было подсветки
                    // Показать кнопку и логотип вместе
                    showLogo();
                    showAboutAndLogo();
                    setTimeout(() => {
                        typewriter.classList.add('move-left');
                        setTimeout(() => {
                            if (logoContainer) logoContainer.classList.add('move-left');
                            if (aboutBtn) aboutBtn.classList.add('move-left');
                        }, 800);
                    }, 1200);
                }
            }
            typeOnce();
        }, 700);
    }, 600);

    // Show TikTok logo with animation
    function showLogo() {
        const logoContainer = document.getElementById('logo-container');
        logoContainer.innerHTML = `
            <a href="https://www.tiktok.com/@elora0327" target="_blank" class="tiktok-link" aria-label="TikTok">
                <svg class="tiktok-logo" width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g>
                        <path d="M33.5 7c.3 2.7 2.3 6.1 6.1 6.4v5.1c-2.1.2-4.2-.1-6.1-.9v13.2c0 7.1-5.8 12.8-13 12.8S7.5 37.9 7.5 30.8c0-7.1 5.8-12.8 13-12.8.5 0 1 .1 1.5.1v5.2c-.5-.1-1-.2-1.5-.2-4.2 0-7.5 3.3-7.5 7.7s3.3 7.7 7.5 7.7 7.5-3.3 7.5-7.7V7h5z" fill="#25F4EE"/>
                        <path d="M33.5 7c.3 2.7 2.3 6.1 6.1 6.4v5.1c-2.1.2-4.2-.1-6.1-.9v13.2c0 7.1-5.8 12.8-13 12.8S7.5 37.9 7.5 30.8c0-7.1 5.8-12.8 13-12.8.5 0 1 .1 1.5.1v5.2c-.5-.1-1-.2-1.5-.2-4.2 0-7.5 3.3-7.5 7.7s3.3 7.7 7.5 7.7 7.5-3.3 7.5-7.7V7h5z" fill="#FE2C55" fill-opacity=".5"/>
                        <path d="M33.5 7c.3 2.7 2.3 6.1 6.1 6.4v5.1c-2.1.2-4.2-.1-6.1-.9v13.2c0 7.1-5.8 12.8-13 12.8S7.5 37.9 7.5 30.8c0-7.1 5.8-12.8 13-12.8.5 0 1 .1 1.5.1v5.2c-.5-.1-1-.2-1.5-.2-4.2 0-7.5 3.3-7.5 7.7s3.3 7.7 7.5 7.7 7.5-3.3 7.5-7.7V7h5z" fill="#fff" fill-opacity=".2"/>
                    </g>
                </svg>
            </a>
        `;
        // Сбросить opacity, чтобы анимация .logo-anim работала
        logoContainer.style.opacity = '';
    }
});