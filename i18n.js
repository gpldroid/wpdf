// WPDF localization module placeholder. Existing dictionary remains in app.js during migration.
export function getLanguage() { return localStorage.getItem('wpdf-lang') || 'ar'; }
export function setLanguage(lang) { localStorage.setItem('wpdf-lang', lang); }
