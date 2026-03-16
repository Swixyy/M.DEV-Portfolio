/**
 * Re-exports for i18n. Canonical implementation: ui.ts + utils.ts
 * per https://docs.astro.build/en/recipes/i18n/
 */

export { languages, defaultLang, ui } from './ui';
export type { UITranslationKey } from './ui';
export { getLangFromUrl, useTranslations, useTranslatedPath } from './utils';
export type { Language } from './utils';
