// WPDF UI utilities extracted as stable primitives for the modular architecture.
export const $ = (selector, root = document) => root.querySelector(selector);
export const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));
export function show(el) { el?.classList.remove('hidden'); }
export function hide(el) { el?.classList.add('hidden'); }
