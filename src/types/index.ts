/**
 * ============================================================================
 * types/index.ts - TypeScript Type Definitions
 * ============================================================================
 * 
 * ΠΕΡΙΓΡΑΦΗ:
 * Κεντρικό αρχείο με όλα τα TypeScript interfaces του project.
 * Εξάγονται για χρήση σε components, API endpoints, κλπ.
 * 
 * ΧΡΗΣΗ:
 * ```typescript
 * import type { Project, AboutData } from '../types';
 * ```
 * ============================================================================
 */

import type { Language } from '../i18n/utils';


// ============================================================================
// PROJECT TYPES
// ============================================================================

/**
 * Interface για ένα Project item
 * Χρησιμοποιείται στο ProjectsSection component
 */
export interface Project {
  /** Unique identifier για το project (π.χ. 'ecommerce-ads') */
  id: string;
  
  /** Τίτλος σε κάθε γλώσσα */
  title: {
    en: string;  // English title
    el: string;  // Greek title
  };
  
  /** Περιγραφή σε κάθε γλώσσα */
  description: {
    en: string;  // English description
    el: string;  // Greek description
  };
  
  /** Path στην εικόνα (public folder) */
  image: string;
  
  /** Array με τεχνολογίες/tags */
  tags: string[];
  
  /** URL για live demo (optional) */
  liveUrl?: string;
  
  /** URL για GitHub repo (optional) */
  githubUrl?: string;
  
  /** True αν είναι featured project (εμφανίζει badge) */
  featured: boolean;
}


// ============================================================================
// ABOUT SECTION TYPES
// ============================================================================

/**
 * Interface για τα δεδομένα του About section
 * Επιστρέφεται από το /api/about.json endpoint
 */
export interface AboutData {
  /** Βιογραφικό κείμενο */
  bio: string;
  
  /** Απάντηση στο "Πού βλέπεις τον εαυτό σου σε 5 χρόνια" */
  fiveYearGoal: string;
  
  /** Τι άρεσε από τη συνέντευξη */
  interviewHighlight: string;
}


// ============================================================================
// SOCIAL LINKS TYPES
// ============================================================================

/**
 * Interface για social media links
 * Χρησιμοποιείται στο Footer component
 */
export interface SocialLink {
  /** Display name (π.χ. 'GitHub') */
  name: string;
  
  /** Full URL (π.χ. 'https://github.com/username') */
  url: string;
  
  /** SVG icon markup as string */
  icon: string;
}


// ============================================================================
// SEO TYPES
// ============================================================================

/**
 * Interface για SEO meta tags
 * Χρησιμοποιείται στο BaseLayout component
 */
export interface SEOProps {
  /** Page title (εμφανίζεται στο tab) */
  title: string;
  
  /** Meta description για search engines */
  description: string;
  
  /** Open Graph image URL (optional) */
  image?: string;
  
  /** Canonical URL (optional) */
  canonicalURL?: string;
  
  /** Page language (optional, defaults to 'en') */
  lang?: Language;
}


// ============================================================================
// FORM TYPES
// ============================================================================

/**
 * Interface για τα δεδομένα της contact form
 * Χρησιμοποιείται στο ContactForm component
 */
export interface ContactFormData {
  /** Όνομα αποστολέα */
  name: string;
  
  /** Email αποστολέα */
  email: string;
  
  /** Θέμα μηνύματος */
  subject: string;
  
  /** Περιεχόμενο μηνύματος */
  message: string;
}
