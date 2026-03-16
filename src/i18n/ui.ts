/**
 * i18n UI strings – Astro recipe: https://docs.astro.build/en/recipes/i18n/
 * Flat key structure for getLangFromUrl / useTranslations / useTranslatedPath.
 */

export const languages = {
  en: 'English',
  el: 'Ελληνικά',
} as const;

export const defaultLang = 'en';

/** When true, default language appears in URL (e.g. /en/). When false, default is at / and others at /el/ etc. */
export const showDefaultLang = false;

export const ui = {
  en: {
    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.projects': 'Projects',
    'nav.contact': 'Contact',
    'hero.greeting': "Hi, I'm",
    'hero.name': 'Michael',
    'hero.tagline': 'Full-Stack Web Developer',
    'hero.description': 'Crafting modern, responsive, and user-friendly web experiences with cutting-edge technologies.',
    'hero.cta': 'View My Work',
    'hero.ctaSecondary': 'Get In Touch',
    'about.title': 'About Me',
    'about.subtitle': 'If there is a "why", I will chase it. Full-stack dev.',
    'projects.title': 'My Projects',
    'projects.subtitle': 'A showcase of my recent work',
    'projects.viewProject': 'View Project',
    'projects.viewCode': 'View Code',
    'contact.title': 'Get In Touch',
    'contact.subtitle': "Let's work together on your next project",
    'contact.name': 'Your Name',
    'contact.email': 'Your Email',
    'contact.subject': 'Subject',
    'contact.message': 'Your Message',
    'contact.send': 'Send Message',
    'contact.success': 'Message sent successfully!',
    'footer.rights': 'All rights reserved.',
    'footer.madeWith': 'Made with',
  },
  el: {
    'nav.home': 'Αρχική',
    'nav.about': 'Σχετικά',
    'nav.projects': 'Έργα',
    'nav.contact': 'Επικοινωνία',
    'hero.greeting': 'Γεια, είμαι ο',
    'hero.name': 'Μιχαήλ',
    'hero.tagline': 'Full-Stack Web Developer',
    'hero.description': 'Δημιουργώ σύγχρονες, responsive και φιλικές προς τον χρήστη web εμπειρίες με τις πιο σύγχρονες τεχνολογίες.',
    'hero.cta': 'Δες τα Έργα μου',
    'hero.ctaSecondary': 'Επικοινώνησε',
    'about.title': 'Σχετικά με Εμένα',
    'about.subtitle': 'Γνώρισέ με καλύτερα',
    'projects.title': 'Τα Έργα μου',
    'projects.subtitle': 'Μια επίδειξη της πρόσφατης δουλειάς μου',
    'projects.viewProject': 'Προβολή Έργου',
    'projects.viewCode': 'Προβολή Κώδικα',
    'contact.title': 'Επικοινωνία',
    'contact.subtitle': 'Ας συνεργαστούμε στο επόμενο project σου',
    'contact.name': 'Το Όνομά σου',
    'contact.email': 'Το Email σου',
    'contact.subject': 'Θέμα',
    'contact.message': 'Το Μήνυμά σου',
    'contact.send': 'Αποστολή Μηνύματος',
    'contact.success': 'Το μήνυμα στάλθηκε επιτυχώς!',
    'footer.rights': 'Με επιφύλαξη παντός δικαιώματος.',
    'footer.madeWith': 'Φτιαγμένο με',
  },
} as const;

export type UITranslationKey = keyof typeof ui.en;
