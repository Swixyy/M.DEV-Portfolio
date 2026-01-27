export const languages = {
  en: 'English',
  el: 'Ελληνικά',
} as const;

export const defaultLang = 'en' as const;

export type Language = keyof typeof languages;

export const translations = {
  en: {
    // Navigation
    nav: {
      home: 'Home',
      about: 'About',
      projects: 'Projects',
      contact: 'Contact',
    },
    // Hero Section
    hero: {
      greeting: "Hi, I'm",
      name: 'Michael',
      tagline: 'Full-Stack Web Developer',
      description: 'Crafting modern, responsive, and user-friendly web experiences with cutting-edge technologies.',
      cta: 'View My Work',
      ctaSecondary: 'Get In Touch',
    },
    // About Section
    about: {
      title: 'About Me',
      subtitle: 'If there is a "why", I will chase it. Full-stack dev.',
    },
    // Projects Section
    projects: {
      title: 'My Projects',
      subtitle: 'A showcase of my recent work',
      viewProject: 'View Project',
      viewCode: 'View Code',
    },
    // Contact Section
    contact: {
      title: 'Get In Touch',
      subtitle: "Let's work together on your next project",
      name: 'Your Name',
      email: 'Your Email',
      subject: 'Subject',
      message: 'Your Message',
      send: 'Send Message',
      success: 'Message sent successfully!',
    },
    // Footer
    footer: {
      rights: 'All rights reserved.',
      madeWith: 'Made with',
    },
  },
  el: {
    // Navigation
    nav: {
      home: 'Αρχική',
      about: 'Σχετικά',
      projects: 'Έργα',
      contact: 'Επικοινωνία',
    },
    // Hero Section
    hero: {
      greeting: 'Γεια, είμαι ο',
      name: 'Μιχαήλ',
      tagline: 'Full-Stack Web Developer',
      description: 'Δημιουργώ σύγχρονες, responsive και φιλικές προς τον χρήστη web εμπειρίες με τις πιο σύγχρονες τεχνολογίες.',
      cta: 'Δες τα Έργα μου',
      ctaSecondary: 'Επικοινώνησε',
    },
    // About Section
    about: {
      title: 'Σχετικά με Εμένα',
      subtitle: 'Γνώρισέ με καλύτερα',
    },
    // Projects Section
    projects: {
      title: 'Τα Έργα μου',
      subtitle: 'Μια επίδειξη της πρόσφατης δουλειάς μου',
      viewProject: 'Προβολή Έργου',
      viewCode: 'Προβολή Κώδικα',
    },
    // Contact Section
    contact: {
      title: 'Επικοινωνία',
      subtitle: 'Ας συνεργαστούμε στο επόμενο project σου',
      name: 'Το Όνομά σου',
      email: 'Το Email σου',
      subject: 'Θέμα',
      message: 'Το Μήνυμά σου',
      send: 'Αποστολή Μηνύματος',
      success: 'Το μήνυμα στάλθηκε επιτυχώς!',
    },
    // Footer
    footer: {
      rights: 'Με επιφύλαξη παντός δικαιώματος.',
      madeWith: 'Φτιαγμένο με',
    },
  },
} as const;

export type TranslationKey = keyof typeof translations.en;

export function getLangFromUrl(url: URL): Language {
  const [, lang] = url.pathname.split('/');
  if (lang in languages) return lang as Language;
  return defaultLang;
}

export function useTranslations(lang: Language) {
  return translations[lang];
}

export function getLocalizedPath(path: string, lang: Language): string {
  if (lang === defaultLang) {
    return path;
  }
  return `/${lang}${path}`;
}
