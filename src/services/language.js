function parseLanguage(lang) {
  return lang.split('-')[0];
}

export function getLanguage() {
  const lang = parseLanguage(navigator.language);
  return localStorage.getItem('lang') || lang;
}

export function setLanguage(lang) {
  return localStorage.setItem('lang', lang);
}
