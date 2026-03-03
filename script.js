// Menu mobile toggle
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.querySelector('.nav-menu');

menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Fermer le menu quand on clique sur un lien
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// Smooth scroll pour les liens internes
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Effet Coolors vague au survol du nom
const rainbowSpans = document.querySelectorAll('.rainbow-name span:not(.space)');

rainbowSpans.forEach((span, index) => {
    span.addEventListener('mouseenter', function () {
        // Créer l'effet vague en cascade
        rainbowSpans.forEach((s, i) => {
            const delay = Math.abs(i - index) * 50;
            setTimeout(() => {
                s.style.animation = 'wave-up 0.5s ease';
                s.style.animationDelay = '0s';
                // Reset après animation
                setTimeout(() => {
                    s.style.animation = 'none';
                }, 500);
            }, delay);
        });
    });
});
