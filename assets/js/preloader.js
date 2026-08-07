/**
 * preloader.js — Handles the initial loading screen fade out
 */

export const initPreloader = () => {
    const preloader = document.getElementById('preloader');
    if (!preloader) return;

    const hidePreloader = () => {
        preloader.classList.add('loaded');
        setTimeout(() => {
            preloader.remove();
        }, 850);
    };

    if (document.readyState === 'complete') {
        hidePreloader();
    } else {
        window.addEventListener('load', hidePreloader);
        // Fallback just in case load event fails
        setTimeout(hidePreloader, 3000);
    }
};
