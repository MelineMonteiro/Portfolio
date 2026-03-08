// ===================== */
// MENU MOBILE TOGGLE
// ===================== */

const menuToggle = document.getElementById('menuToggle');
const navMenu = document.querySelector('.nav-menu');

if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });
}

// Fermer le menu quand on clique sur un lien
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        menuToggle.classList.remove('active');
    });
});

// Fermer le menu quand on clique en dehors
document.addEventListener('click', (e) => {
    if (!e.target.closest('header')) {
        navMenu.classList.remove('active');
        if (menuToggle) menuToggle.classList.remove('active');
    }
});

// ===================== */
// SMOOTH SCROLL
// ===================== */

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

// ===================== */
// HERO FADE OUT ON SCROLL
// ===================== */

const heroSection = document.querySelector('.hero');
const aboutSection = document.querySelector('.about');

if (heroSection && aboutSection) {
    window.addEventListener('scroll', () => {
        const heroRect = heroSection.getBoundingClientRect();
        const aboutRect = aboutSection.getBoundingClientRect();
        
        if (aboutRect.top <= 0) {
            heroSection.classList.add('hide');
        } else {
            heroSection.classList.remove('hide');
        }
    });
}

// ===================== */
// SCROLL INDICATOR - HIDE ON SCROLL
// ===================== */

const scrollIndicator = document.querySelector('.scroll-indicator');

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        scrollIndicator.style.opacity = '0';
        scrollIndicator.style.pointerEvents = 'none';
    } else {
        scrollIndicator.style.opacity = '1';
        scrollIndicator.style.pointerEvents = 'auto';
    }
});

// ===================== */
// CAROUSEL CORRIGÉ - UNE SEULE IMAGE
// ===================== */

function initCarousel(containerId) {
    console.log('Initializing carousel:', containerId);
    
    const container = document.getElementById(containerId);
    if (!container) {
        console.log('Container not found:', containerId);
        return;
    }

    const carouselContainer = container.closest('.carousel-container');
    if (!carouselContainer) {
        console.log('Carousel container not found');
        return;
    }

    const images = container.querySelectorAll('.carousel-image');
    console.log('Found images:', images.length);
    
    if (images.length === 0) {
        console.log('No carousel images found');
        return;
    }

    let currentIndex = 0;

    const prevBtn = carouselContainer.querySelector('.carousel-arrow.prev');
    const nextBtn = carouselContainer.querySelector('.carousel-arrow.next');

    console.log('Prev button:', prevBtn);
    console.log('Next button:', nextBtn);

    function showImage(index) {
        console.log('Showing image:', index);
        images.forEach((img, i) => {
            img.classList.remove('active');
            if (i === index) {
                img.classList.add('active');
            }
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('Prev clicked');
            currentIndex = (currentIndex - 1 + images.length) % images.length;
            showImage(currentIndex);
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('Next clicked');
            currentIndex = (currentIndex + 1) % images.length;
            showImage(currentIndex);
        });
    }

    showImage(0);
    console.log('Carousel initialized');
}

document.addEventListener('DOMContentLoaded', () => {
    console.log('DOMContentLoaded - initializing carousels');
    initCarousel('carousel-ld');
});

setTimeout(() => {
    const container = document.getElementById('carousel-ld');
    if (container && !container.querySelector('.carousel-image.active')) {
        console.log('Retrying carousel initialization');
        initCarousel('carousel-ld');
    }
}, 500);

// ===================== */
// INTERSECTION OBSERVER POUR ANIMATIONS DE SCROLL
// ===================== */

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        }
    });
}, observerOptions);

document.addEventListener('DOMContentLoaded', () => {
    const aboutTexts = document.querySelectorAll('.about-text');
    aboutTexts.forEach(el => {
        el.classList.add('scroll-animation');
        observer.observe(el);
    });

    const projectCards = document.querySelectorAll('.project-card.featured.clean-layout');
    projectCards.forEach(el => {
        el.classList.add('scroll-animation');
        observer.observe(el);
    });

    const gridCards = document.querySelectorAll('.grid-card');
    gridCards.forEach(el => {
        el.classList.add('scroll-animation');
        observer.observe(el);
    });

    const featureSections = document.querySelectorAll('.hp-container-feature');
    featureSections.forEach(el => {
        el.classList.add('scroll-animation');
        observer.observe(el);
    });
});

// ===================== */
// IMAGE ZOOM AU HOVER - AVEC MODAL
// ===================== */

function createImageModal() {
    if (document.getElementById('imageModal')) return;

    const modal = document.createElement('div');
    modal.id = 'imageModal';
    modal.className = 'image-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="modal-close">&times;</span>
            <img id="modalImage" src="" alt="">
        </div>
    `;
    document.body.appendChild(modal);

    const closeBtn = modal.querySelector('.modal-close');
    closeBtn.addEventListener('click', () => {
        modal.classList.remove('active');
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    });

    return modal;
}

document.addEventListener('DOMContentLoaded', () => {
    const modal = createImageModal();

    const zoomImages = document.querySelectorAll(
        '.hp-feature-image img, .carousel-image, .card-image img'
    );

    zoomImages.forEach(img => {
        img.style.cursor = 'zoom-in';
        img.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            const modalImg = document.getElementById('modalImage');
            modalImg.src = img.src;
            modal.classList.add('active');
        });
    });
});
