/**
 * utils.js — Shared DOM helpers & constants
 */

export const $ = (selector, scope = document) => scope.querySelector(selector);
export const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];
export const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
