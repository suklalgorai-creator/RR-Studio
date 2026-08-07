/**
 * navbar.js — Header scroll chrome, mobile menu, active link tracking,
 *             smooth scrolling and back-to-top.
 */

import { $, $$, prefersReducedMotion } from './utils.js';

const header    = $('.header');
const navMenu   = $('.nav-menu');
const menuBtn   = $('.menu-btn');
const progress  = $('.scroll-progress');
const backToTop = $('.back-to-top');
const hero      = $('.hero');
const navLinks  = $$('.nav-link');
const sections  = $$('section[id]').filter(sec => 
    navLinks.some(link => link.getAttribute('href') === `#${sec.id}`)
);

const closeMenu = () => {
    if (!navMenu || !menuBtn) return;
    navMenu.classList.remove('active');
    menuBtn.setAttribute('aria-expanded', 'false');
    menuBtn.setAttribute('aria-label', 'Open menu');
};

const smoothScrollTo = (target) => {
    const section = $(target);
    if (!section) return;
    section.scrollIntoView({
        behavior: prefersReducedMotion ? 'auto' : 'smooth',
        block: 'start',
    });
};

export const updateChrome = () => {
    const scrollTop  = window.scrollY;
    const pageHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progressWidth = pageHeight > 0 ? (scrollTop / pageHeight) * 100 : 0;

    header?.classList.toggle('scrolled', scrollTop > 20);
    backToTop?.classList.toggle('show', scrollTop > 500);

    if (progress) {
        progress.style.transform = `scaleX(${progressWidth / 100})`;
    }

    // Disable heavy background parallax on mobile devices to prevent lag
    if (hero && !prefersReducedMotion && window.innerWidth > 992) {
        hero.style.backgroundPosition = `center ${scrollTop * 0.18}px`;
    }
};

export const setActiveLink = () => {
    if (sections.length === 0) return; // Don't run scrollspy on subpages
    
    const offset = window.scrollY + 130;
    let activeId = 'home';

    sections.forEach((section) => {
        if (section.offsetTop <= offset) {
            activeId = section.id;
        }
    });

    navLinks.forEach((link) => {
        const href = link.getAttribute('href');
        if (href.startsWith('#')) {
            link.classList.toggle('active', href === `#${activeId}`);
        }
    });
};

export const initNavbar = () => {
    menuBtn?.addEventListener('click', () => {
        const isOpen = navMenu?.classList.toggle('active');
        menuBtn.setAttribute('aria-expanded', String(Boolean(isOpen)));
        menuBtn.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
    });

    navLinks.forEach((link) => {
        link.addEventListener('click', (event) => {
            const href = link.getAttribute('href');
            if (href.startsWith('#')) {
                event.preventDefault();
                closeMenu();
                smoothScrollTo(href);
            } else {
                // For cross-page links (like pages/services.html or ../index.html), let the browser handle it
                closeMenu();
            }
        });
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') closeMenu();
    });

    backToTop?.addEventListener('click', () => smoothScrollTo('#home'));
};
