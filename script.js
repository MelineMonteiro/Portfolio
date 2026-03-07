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

// Effet vague amélioré au survol du nom - gère les longs textes et espaces
const rainbowSpans = document.querySelectorAll('.rainbow-name span');

rainbowSpans.forEach((span, index) => {
    // Ignorer les espaces et les sauts de ligne
    if (span.textContent === ' ' || span.textContent === '\n') {
        span.classList.add('space');
        return;
    }

    span.addEventListener('mouseenter', function () {
        // Créer l'effet vague en cascade
        rainbowSpans.forEach((s, i) => {
            // Ne pas appliquer l'effet aux espaces
            if (s.textContent === ' ' || s.textContent === '\n') return;

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

// Carousel pour les images (Level Design)
function initCarousel(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const images = container.querySelectorAll('.carousel-image');
    if (images.length === 0) return;

    let currentIndex = 0;

    const prevBtn = container.querySelector('.carousel-arrow.prev');
    const nextBtn = container.querySelector('.carousel-arrow.next');

    function showImage(index) {
        images.forEach((img, i) => {
            img.classList.remove('active');
            if (i === index) {
                img.classList.add('active');
            }
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + images.length) % images.length;
            showImage(currentIndex);
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % images.length;
            showImage(currentIndex);
        });
    }

    // Afficher la première image
    showImage(0);
}

// Initialiser les carousels pour chaque projet
document.addEventListener('DOMContentLoaded', () => {
    initCarousel('carousel-ld');
});
