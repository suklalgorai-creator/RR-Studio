/**
 * animations.js — IntersectionObservers for scroll-reveal and stat counters.
 */

import { $$, prefersReducedMotion } from './utils.js';

export const initReveal = () => {
    /* Dynamically add .reveal to animatable elements */
    const revealItems = $$('section, .service-card, .package-card, .why-card, .testimonial-card, .gallery-item, .stat-box');
    revealItems.forEach((item) => item.classList.add('reveal'));

    if (!('IntersectionObserver' in window) || prefersReducedMotion) {
        revealItems.forEach((item) => item.classList.add('visible'));
        return;
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.14, rootMargin: '0px 0px -60px 0px' });

    revealItems.forEach((item) => observer.observe(item));
};

export const initCounters = () => {
    const counters = $$('[data-count]');
    if (!counters.length) return;

    const animateCounter = (counter) => {
        const target = Number(counter.dataset.count || 0);
        const suffix = counter.textContent.includes('+') ? '+' : '';
        const duration = 1500;
        const start = performance.now();

        const tick = (now) => {
            const progressValue = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progressValue, 3);
            counter.textContent = `${Math.floor(target * eased)}${suffix}`;

            if (progressValue < 1) {
                requestAnimationFrame(tick);
            }
        };

        requestAnimationFrame(tick);
    };

    if (!('IntersectionObserver' in window) || prefersReducedMotion) {
        counters.forEach(animateCounter);
        return;
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.6 });

    counters.forEach((counter) => observer.observe(counter));
};
