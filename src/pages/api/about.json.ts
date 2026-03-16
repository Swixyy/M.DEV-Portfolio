/**
 * ============================================================================
 * /api/about.json - API Endpoint για About Section Data
 * ============================================================================
 * 
 * ΠΕΡΙΓΡΑΦΗ:
 * Astro API endpoint που επιστρέφει τα δεδομένα του About section.
 * Χρησιμοποιείται για τις "εξτρα βαθμούς" απαιτήσεις της εργασίας.
 * 
 * ΧΡΗΣΗ:
 * GET /api/about.json?lang=en  → Επιστρέφει Αγγλικά
 * GET /api/about.json?lang=el  → Επιστρέφει Ελληνικά
 * GET /api/about.json          → Default: Αγγλικά
 * 
 * RESPONSE FORMAT:
 * {
 *   "bio": "...",
 *   "fiveYearGoal": "...",
 *   "interviewHighlight": "..."
 * }
 * 
 * ΣΗΜΕΙΩΣΗ:
 * - prerender = false: Απαιτείται για server-side rendering
 * - Στο development λειτουργεί κανονικά
 * - Για production χρειάζεται server adapter (Node.js, Vercel, κλπ)
 * ============================================================================
 */

import type { APIRoute } from 'astro';
import type { AboutData } from '../../types';


// ============================================================================
// ABOUT CONTENT DATA
// ============================================================================

/**
 * Το περιεχόμενο του About section σε δύο γλώσσες
 * Κάθε γλώσσα έχει τα ίδια πεδία (bio, fiveYearGoal, interviewHighlight)
 */
const aboutContent: Record<'en' | 'el', AboutData> = {
  // -------------------------------------------------------------------------
  // ENGLISH CONTENT
  // -------------------------------------------------------------------------
  en: {
    bio: `I'm Michael, a passionate Full-Stack Web Developer with a strong foundation in modern web technologies. 
    I specialize in building responsive, user-friendly applications using React, Next.js, Astro, and Svelte on the frontend, 
    paired with Node.js and various databases on the backend. My approach combines clean code practices with creative 
    problem-solving to deliver exceptional digital experiences. I'm constantly learning and exploring new technologies 
    to stay at the cutting edge of web development.`,
    
    fiveYearGoal: `In five years, I envision myself as a Senior Full-Stack Developer or Technical Lead, 
    working on innovative projects that make a real impact. I aim to deepen my expertise in cloud architecture 
    and DevOps practices while mentoring junior developers. I'm particularly interested in exploring the 
    intersection of web development and AI/ML, creating intelligent applications that enhance user experiences. 
    Whether in a startup environment or a larger tech company, I want to be part of a team that pushes 
    boundaries and creates meaningful solutions.`,
    
    interviewHighlight: `What excited me most about our interview was the emphasis on continuous learning 
    and the opportunity to work with modern technologies like Astro and Svelte. I was impressed by the 
    team's collaborative approach and the focus on code quality. The challenge of building responsive, 
    bilingual applications that prioritize both user experience and SEO really resonated with my interests. 
    It was inspiring to discuss how thoughtful architecture decisions can lead to better maintainability 
    and scalability in the long run.`
  },
  
  // -------------------------------------------------------------------------
  // GREEK CONTENT
  // -------------------------------------------------------------------------
  el: {
    bio: `Είμαι ο Μιχαήλ. Με πάθος και αστείρευτη περιέργεια εξερευνώ τις σύγχρονες web τεχνολογίες ως Full-Stack Web Developer. 
    Εξειδικεύομαι στη δημιουργία responsive, φιλικών προς τον χρήστη εφαρμογών χρησιμοποιώντας React, Next.js, Astro 
    και Svelte στο frontend, σε συνδυασμό με Node.js και διάφορες βάσεις δεδομένων στο backend. Η προσέγγισή μου 
    συνδυάζει καθαρές πρακτικές κώδικα με δημιουργική επίλυση προβλημάτων για να παραδώσω εξαιρετικές ψηφιακές εμπειρίες. 
    Συνεχώς μαθαίνω και εξερευνώ νέες τεχνολογίες για να παραμένω στην αιχμή της web ανάπτυξης.`,
    
    fiveYearGoal: `Σε πέντε χρόνια, οραματίζομαι τον εαυτό μου ως Senior Full-Stack Developer ή Technical Lead, 
    δουλεύοντας σε καινοτόμα projects που έχουν πραγματικό αντίκτυπο. Στοχεύω να εμβαθύνω την τεχνογνωσία μου 
    στην cloud αρχιτεκτονική και τις πρακτικές DevOps, ενώ παράλληλα θα καθοδηγώ νεότερους developers. 
    Ενδιαφέρομαι ιδιαίτερα για την εξερεύνηση της τομής του web development με το AI/ML, δημιουργώντας έξυπνες 
    εφαρμογές που βελτιώνουν τις εμπειρίες των χρηστών. Είτε σε startup περιβάλλον είτε σε μεγαλύτερη εταιρεία 
    τεχνολογίας, θέλω να είμαι μέλος μιας ομάδας που δοκιμάζει τα όρια και δημιουργεί ουσιαστικές λύσεις.`,
    
    interviewHighlight: `Αυτό που με ενθουσίασε περισσότερο από τη συνέντευξή μας ήταν η έμφαση στη συνεχή μάθηση 
    και η ευκαιρία να δουλέψω με σύγχρονες τεχνολογίες όπως το Astro και το Svelte. Εντυπωσιάστηκα από τη 
    συνεργατική προσέγγιση της ομάδας και την εστίαση στην ποιότητα του κώδικα. Η πρόκληση της δημιουργίας 
    responsive, δίγλωσσων εφαρμογών που δίνουν προτεραιότητα τόσο στην εμπειρία χρήστη όσο και στο SEO 
    ταιριάζει απόλυτα με τα ενδιαφέροντά μου. Η συζήτηση ανέδειξε πώς οι προσεκτικές αποφάσεις αρχιτεκτονικής οδηγούν σε καλύτερη συντηρησιμότητα και επεκτασιμότητα μακροπρόθεσμα.`
  }
};


// ============================================================================
// API ROUTE HANDLER
// ============================================================================

/**
 * GET Handler
 * Επιστρέφει τα about data με βάση το lang query parameter
 * 
 * @param request - Astro request object
 * @returns JSON response με τα about data
 */
export const GET: APIRoute = ({ request }) => {
  // Parse URL για να πάρουμε query parameters
  const url = new URL(request.url);
  
  // Πάρε το lang parameter, default 'en'
  const lang = url.searchParams.get('lang') as 'en' | 'el' || 'en';
  
  // Validate: αν δεν είναι 'el', χρησιμοποίησε 'en'
  const validLang = lang === 'el' ? 'el' : 'en';
  
  // Επέστρεψε JSON response
  return new Response(JSON.stringify(aboutContent[validLang]), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      // Cache για 1 ώρα (τα data δεν αλλάζουν συχνά)
      'Cache-Control': 'public, max-age=3600'
    }
  });
};


// ============================================================================
// BUILD CONFIGURATION
// ============================================================================

/**
 * prerender = false
 * 
 * ΣΗΜΕΙΩΣΗ: Αυτό είναι απαραίτητο για server-side endpoints.
 * - Στο dev mode δουλεύει κανονικά
 * - Για production build χρειάζεται adapter (π.χ. @astrojs/node)
 * - Χωρίς adapter, το build θα αποτύχει
 */
export const prerender = false;

