// --- Burger menu logic ---
const burgerBtn = document.getElementById('burger-btn');
const mobileNav = document.getElementById('mobile-nav');
if (burgerBtn && mobileNav) {
	burgerBtn.addEventListener('click', () => {
		burgerBtn.classList.toggle('open');
		mobileNav.classList.toggle('open');
	});
	// Закрытие меню по клику на ссылку
	mobileNav.querySelectorAll('.mobile-link').forEach(link => {
		link.addEventListener('click', () => {
			burgerBtn.classList.remove('open');
			mobileNav.classList.remove('open');
		});
	});
	// Закрытие по клику вне меню
	document.addEventListener('click', e => {
		if (mobileNav.classList.contains('open') && !mobileNav.contains(e.target) && !burgerBtn.contains(e.target)) {
			burgerBtn.classList.remove('open');
			mobileNav.classList.remove('open');
		}
	});
}
// --- Theme toggle (dark/light) ---
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = themeToggle ? themeToggle.querySelector('.theme-icon') : null;
function setTheme(mode) {
	if (mode === 'light') {
		document.body.classList.add('light-theme');
		if (themeIcon) themeIcon.textContent = '☀️';
	} else {
		document.body.classList.remove('light-theme');
		if (themeIcon) themeIcon.textContent = '🌙';
	}
	localStorage.setItem('theme', mode);
}
if (themeToggle) {
	themeToggle.addEventListener('click', () => {
		const isLight = document.body.classList.toggle('light-theme');
		setTheme(isLight ? 'light' : 'dark');
	});
}
// Init theme from localStorage
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'light') setTheme('light');
else setTheme('dark');
// Random Fact button logic
const facts = [
   "Her height is a secret!",
   "Elora is 20 years old.",
   "Elora is from China but lives in Tokyo.",
   "She doesn't speak Japanese well.",
   "Elora loves reading manga.",
   "Her favorite anime is Chainsaw Man.",
   "She loves traditional Chinese style.",
   "Elora wears glasses for style, not for vision.",
   "She sometimes cosplays characters.",
   "Elora plans to cosplay Reze from Chainsaw Man."
];
const randomFactBtn = document.getElementById('random-fact-btn');
const randomFactDiv = document.getElementById('random-fact');
if (randomFactBtn) {
   randomFactBtn.addEventListener('click', () => {
	   const idx = Math.floor(Math.random() * facts.length);
	   randomFactDiv.textContent = facts[idx];
	   randomFactDiv.classList.remove('show');
	   // Триггерим анимацию
	   setTimeout(() => {
		   randomFactDiv.classList.add('show');
	   }, 10);
   });
}

// --- Robust DOMContentLoaded: terminal intro, fade-in, reviews ---
function startTerminalIntro() {
	const mainContent = document.getElementById('main-content');
	const introTyped = document.getElementById('intro-typed');
	if (!mainContent || !introTyped) {
		// DOM not ready, try again
		setTimeout(startTerminalIntro, 50);
		return;
	}
	mainContent.classList.remove('fade-in');
	introIndex = 0;
	introDone = false;
	setTimeout(typeIntroTerminal, 400);

	// Animate reviews after main content is shown
	setTimeout(() => {
		const cards = document.querySelectorAll('.review-card');
		cards.forEach((card, i) => {
			setTimeout(() => {
				card.classList.add('show');
			}, 200 + i * 220);
		});
	}, 2000);
}

if (document.readyState === 'loading') {
	document.addEventListener('DOMContentLoaded', startTerminalIntro);
} else {
	startTerminalIntro();
}
document.querySelectorAll('.gallery-img').forEach(img => {
   img.addEventListener('click', () => {
	   const modal = document.getElementById('gallery-modal');
	   const modalImg = document.getElementById('gallery-modal-img');
	   modalImg.src = img.src;
	   modal.classList.add('open');
   });
});
document.querySelector('.gallery-modal-close').addEventListener('click', () => {
   document.getElementById('gallery-modal').classList.remove('open');
});
document.getElementById('gallery-modal').addEventListener('click', e => {
   if (e.target === e.currentTarget) e.currentTarget.classList.remove('open');
});

// Terminal intro typing animation (robust, bug-free)
const introText = 'Welcome to Elora Fan Page!';
let introIndex = 0;
let introDone = false;

function renderIntroText() {
	const introTyped = document.getElementById('intro-typed');
	if (!introTyped) return;
	// Новый способ: не пересоздаём все буквы, а просто обновляем текст и добавляем курсор
	introTyped.innerHTML = `<span class=\"typed-text\">${introText.substring(0, introIndex)}</span><span class=\"typed-cursor\"></span>`;
	// Сбросить цвет/opacity если вдруг остались от fade-out
	introTyped.style.color = '#4f5bd5';
	introTyped.style.opacity = '';
}

function typeIntroTerminal() {
	if (introDone) return;
	renderIntroText();
	if (introIndex < introText.length) {
		introIndex++;
		setTimeout(typeIntroTerminal, 90 + Math.random() * 60);
	} else {
		introDone = true;
		// Fade out text before overlay hide
		const introTyped = document.getElementById('intro-typed');
		if (introTyped) {
			introTyped.style.transition = 'opacity 0.5s';
			introTyped.style.opacity = '0.2';
		}
		setTimeout(() => {
			const overlay = document.getElementById('intro-overlay');
			if (overlay) overlay.classList.add('hide');
			// Fade in main content
			const mainContent = document.getElementById('main-content');
			if (mainContent) mainContent.classList.add('fade-in');
			// Animate counter
			const subCounter = document.getElementById('sub-counter');
			if (subCounter) animateCounter(subCounter, 0, 5000, 3000);
			// Reset introTyped for next time
			if (introTyped) {
				setTimeout(() => {
					introTyped.style.color = '';
					introTyped.style.opacity = '';
				}, 700);
			}
		}, 900);
	}
}

// ...existing code...
function animateCounter(el, from, to, duration) {
   let start = null;
   function step(ts) {
	   if (!start) start = ts;
	   let progress = Math.min((ts - start) / duration, 1);
	   let value = Math.floor(from + (to - from) * progress);
	   el.textContent = value.toLocaleString('ru-RU');
	   if (progress < 1) {
		   requestAnimationFrame(step);
	   } else {
		   el.textContent = to.toLocaleString('ru-RU');
	   }
   }
   requestAnimationFrame(step);
}
// ...existing code...
// Модалки
document.querySelectorAll('.modal-btn').forEach(btn => {
   btn.addEventListener('click', e => {
	   const modal = document.getElementById('modal-' + btn.dataset.modal);
	   if (modal) modal.classList.add('open');
   });
});
document.querySelectorAll('.modal-close').forEach(btn => {
   btn.addEventListener('click', e => {
	   btn.closest('.modal').classList.remove('open');
   });
});
window.addEventListener('click', e => {
   if (e.target.classList.contains('modal')) {
	   e.target.classList.remove('open');
   }
});
