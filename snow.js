// Анимация падающих снежинок для страницы 'Обо мне'
window.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('snow-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let snowflakes = [];
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    function createSnowflakes() {
        snowflakes = [];
        for (let i = 0; i < 60; i++) {
            snowflakes.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                r: 1.5 + Math.random() * 2.5,
                speed: 0.25 + Math.random() * 0.5, // медленнее
                drift: -0.5 + Math.random() * 1,
                opacity: 0.5 + Math.random() * 0.5
            });
        }
    }
    createSnowflakes();
    function animateSnowflakes() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let s of snowflakes) {
            ctx.save();
            ctx.globalAlpha = s.opacity;
            ctx.beginPath();
            ctx.arc(s.x, s.y, s.r, 0, 2 * Math.PI);
            ctx.fillStyle = '#fff';
            ctx.shadowColor = '#fff';
            ctx.shadowBlur = 8;
            ctx.fill();
            ctx.restore();
            s.y += s.speed;
            s.x += s.drift;
            if (s.y > canvas.height + 5) {
                s.y = -5;
                s.x = Math.random() * canvas.width;
            }
            if (s.x < 0) s.x = canvas.width;
            if (s.x > canvas.width) s.x = 0;
        }
        requestAnimationFrame(animateSnowflakes);
    }
    animateSnowflakes();
    window.addEventListener('resize', () => {
        resizeCanvas();
        createSnowflakes();
    });
});
