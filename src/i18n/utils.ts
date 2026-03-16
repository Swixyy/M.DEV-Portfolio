/**
 * i18n helpers – Astro recipe: https://docs.astro.build/en/recipes/i18n/
 */

import { ui, defaultLang, showDefaultLang } from './ui';

export type Language = keyof typeof ui;

export function getLangFromUrl(url: URL): Language {
  const [, lang] = url.pathname.split('/');
  if (lang in ui) return lang as Language;
  return defaultLang as Language;
}

export function useTranslations(lang: Language) {
  return function t(key: keyof typeof ui[typeof defaultLang]) {
    return ui[lang][key] || ui[defaultLang as Language][key];
  };
}

export function useTranslatedPath(lang: Language) {
  return function translatePath(path: string, l: string = lang) {
    const p = path || '/';
    const pathWithSlash = p.startsWith('/') ? p : `/${p}`;
    if (!showDefaultLang && l === defaultLang) return pathWithSlash;
    return `/${l}${pathWithSlash}`;
  };
}
