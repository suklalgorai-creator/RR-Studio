/**
 * testimonials.js — Testimonials slider with auto-advance and manual controls.
 */

import { $, $$, prefersReducedMotion } from './utils.js';

export const initTestimonials = () => {
    const track = $('.testimonial-track');
    const cards = $$('.testimonial-card');
    const controls = $$('.testimonial-btn');
    let currentIndex = 0;
    let timer;

    if (!track || !cards.length) return;

    // We calculate how many cards fit in the view to know the maximum index
    const getCardsPerView = () => {
        if (window.innerWidth <= 768) return 1;
        if (window.innerWidth <= 1024) return 2;
        return 3;
    };

    const getMaxIndex = () => Math.max(0, cards.length - getCardsPerView());

    const showSlide = (index) => {
        const maxIndex = getMaxIndex();
        if (index < 0) {
            currentIndex = maxIndex;
        } else if (index > maxIndex) {
            currentIndex = 0;
        } else {
            currentIndex = index;
        }
        
        const cardWidth = cards[0].offsetWidth;
        // gap is 30px from css
        const gap = 30;
        const moveAmount = currentIndex * (cardWidth + gap);
        
        track.style.transform = `translateX(-${moveAmount}px)`;
    };

    const startTimer = () => {
        if (prefersReducedMotion) return;
        clearInterval(timer);
        timer = setInterval(() => showSlide(currentIndex + 1), 5000);
    };

    controls.forEach((button) => {
        button.addEventListener('click', () => {
            const direction = button.dataset.slide === 'prev' ? -1 : 1;
            showSlide(currentIndex + direction);
            startTimer();
        });
    });

    // Handle window resize
    window.addEventListener('resize', () => {
        showSlide(currentIndex);
    });

    showSlide(0);
    startTimer();
};
