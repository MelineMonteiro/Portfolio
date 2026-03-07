// Menu mobile toggle
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



// ===================== */
// CAROUSEL POUR LES IMAGES (LEVEL DESIGN) - CORRIGÉ
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

    // Afficher la première image
    showImage(0);
    console.log('Carousel initialized');
}

// Initialiser les carousels
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOMContentLoaded - initializing carousels');
    initCarousel('carousel-ld');
});

// Initialiser aussi après un petit délai au cas où
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

// Observer pour les éléments qui doivent s'animer au scroll
document.addEventListener('DOMContentLoaded', () => {
    // Animer les textes à propos au scroll
    const aboutTexts = document.querySelectorAll('.about-text');
    aboutTexts.forEach(el => {
        el.classList.add('scroll-animation');
        observer.observe(el);
    });

    // Animer les cartes de projets au scroll
    const projectCards = document.querySelectorAll('.project-card.featured.clean-layout');
    projectCards.forEach(el => {
        el.classList.add('scroll-animation');
        observer.observe(el);
    });

    // Animer les cartes de projets annexe au scroll
    const gridCards = document.querySelectorAll('.grid-card');
    gridCards.forEach(el => {
        el.classList.add('scroll-animation');
        observer.observe(el);
    });

    // Animer les sections de features
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
    // Créer le modal s'il n'existe pas
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

    // Ajouter le zoom à toutes les images concernées
    const zoomImages = document.querySelectorAll(
        '.hp-image img, .hp-feature-image img, .carousel-image, .card-image img, .project-image-wrapper img'
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
