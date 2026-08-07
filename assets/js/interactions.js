/**
 * interactions.js — Button ripple effects and missing image fallbacks.
 */

import { $$ } from './utils.js';

export const initRipple = () => {
    $$('.primary-btn, .secondary-btn, .book-btn').forEach((button) => {
        button.addEventListener('click', (event) => {
            const rect = button.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const ripple = document.createElement('span');

            ripple.className = 'ripple';
            ripple.style.width = `${size}px`;
            ripple.style.height = `${size}px`;
            ripple.style.left = `${event.clientX - rect.left - size / 2}px`;
            ripple.style.top = `${event.clientY - rect.top - size / 2}px`;

            button.appendChild(ripple);
            ripple.addEventListener('animationend', () => ripple.remove());
        });
    });
};

export const initImageFallbacks = () => {
    $$('img').forEach((image) => {
        image.addEventListener('error', () => {
            image.classList.add('is-missing');
            image.setAttribute('aria-hidden', 'true');
        }, { once: true });
    });
};
