document.addEventListener('DOMContentLoaded', () => {
    const navContent = document.querySelector(".nav-content");
    const heroContent = document.querySelector('.hero-content');

    // Jediný scroll listener pro celý web
    window.addEventListener('scroll', () => {
        const isScrolled = window.scrollY > 50;

        // 1. Přepnutí barvy navigace
        if (navContent) {
            navContent.classList.toggle('scrolled', isScrolled);
        }

        // 2. Animace hero obsahu (původní hero.js)
        if (heroContent) {
            heroContent.classList.toggle('scrolled', isScrolled);
        }
    }, { passive: true });
});