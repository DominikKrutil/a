document.addEventListener('DOMContentLoaded', () => {
    const track = document.querySelector('.hero-slider-track');
    const slides = Array.from(document.querySelectorAll('.hero-slide'));
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    const sliderSection = document.getElementById('hero-slider');

    if (!track || slides.length === 0) return;

    let counter = 1;
    let isMoving = false;
    let autoplayTimer = null; // Změna na null
    const intervalTime = 5000;

    // 1. Klonování (Infinity setup)
    const firstClone = slides[0].cloneNode(true);
    const lastClone = slides[slides.length - 1].cloneNode(true);
    track.appendChild(firstClone);
    track.insertBefore(lastClone, slides[0]);

    const updateSize = () => track.clientWidth;
    let size = updateSize();
    track.style.transform = `translateX(${-size * counter}px)`;

    // 2. Funkce pro pohyb
    const move = (direction) => {
        if (isMoving) return;
        isMoving = true;
        
        size = updateSize();
        track.style.transition = 'transform 0.7s cubic-bezier(0.4, 0, 0.2, 1)';
        
        counter = (direction === 'next') ? counter + 1 : counter - 1;
        track.style.transform = `translateX(${-size * counter}px)`;
    };

    // 3. Robustní Autoplay logika (setTimeout místo setInterval)
    const startAutoplay = () => {
        stopAutoplay(); // Pojistka proti duplicitním timerům
        autoplayTimer = setTimeout(() => {
            move('next');
            startAutoplay(); // Naplánuje další slide až po dokončení aktuálního cyklu
        }, intervalTime);
    };

    const stopAutoplay = () => {
        if (autoplayTimer) {
            clearTimeout(autoplayTimer);
            autoplayTimer = null;
        }
    };

    // 4. Infinity Reset po animaci
    track.addEventListener('transitionend', () => {
        isMoving = false;
        const allSlides = document.querySelectorAll('.hero-slide');

        if (counter >= allSlides.length - 1) {
            track.style.transition = 'none';
            counter = 1;
            track.style.transform = `translateX(${-size * counter}px)`;
        }

        if (counter <= 0) {
            track.style.transition = 'none';
            counter = allSlides.length - 2;
            track.style.transform = `translateX(${-size * counter}px)`;
        }
    });

    // Eventy pro tlačítka
    nextBtn.addEventListener('click', () => {
        stopAutoplay();
        move('next');
        startAutoplay();
    });

    prevBtn.addEventListener('click', () => {
        stopAutoplay();
        move('prev');
        startAutoplay();
    });

    // Inteligentní pauza - řeší i přepínání oken (visibilitychange)
    sliderSection.addEventListener('mouseenter', stopAutoplay);
    sliderSection.addEventListener('mouseleave', startAutoplay);

    // Pokud uživatel odejde z karty prohlížeče, úplně to zastavíme
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            stopAutoplay();
        } else {
            startAutoplay();
        }
    });

    // Responzivita
    window.addEventListener('resize', () => {
        size = updateSize();
        track.style.transition = 'none';
        track.style.transform = `translateX(${-size * counter}px)`;
    });

    // Start
    startAutoplay();
});