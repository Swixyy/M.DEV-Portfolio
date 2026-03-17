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
    
    interviewHighlight: `When I choose the appropriate tech stack for a project, I always start from the product’s needs rather than personal preferences. I analyze the type of application, its performance, SEO, and scalability requirements, as well as the user experience I want to deliver. At the same time, I consider code maintainability and how easy it will be for the team to develop and evolve the project. An important factor is also the amount of overhead each technology introduces and whether it truly adds value. In cases where the content is mostly static with selective interactivity, I prefer solutions that follow more modern architectural approaches. In this specific case, we chose the Astro framework due to its island architecture, which optimizes performance by loading only what is necessary. At the same time, we used Svelte for the interactive components, as it is lightweight, efficient, and offers a more enjoyable developer experience.`
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
    
    interviewHighlight: `Όταν επιλέγω το κατάλληλο tech stack για ένα project, ξεκινάω πάντα από τις ανάγκες του ίδιου του προϊόντος και όχι από προσωπικές προτιμήσεις. Αναλύω το είδος της εφαρμογής, τις απαιτήσεις σε performance, SEO και scalability, καθώς και την εμπειρία που θέλω να προσφέρω στον τελικό χρήστη. Παράλληλα, λαμβάνω υπόψη τη συντηρησιμότητα του κώδικα και την ευκολία ανάπτυξης για την ομάδα. Ένα σημαντικό κριτήριο είναι επίσης το πόσο “overhead” εισάγει κάθε τεχνολογία και αν πραγματικά προσθέτει αξία. Σε περιπτώσεις όπου το περιεχόμενο είναι κυρίως στατικό με επιλεκτική διαδραστικότητα, προτιμώ λύσεις που ακολουθούν πιο σύγχρονες αρχιτεκτονικές προσεγγίσεις. Έτσι, στη συγκεκριμένη περίπτωση επιλέξαμε το Astro framework λόγω του island architecture, που επιτρέπει βέλτιστο performance φορτώνοντας μόνο ό,τι χρειάζεται. Ταυτόχρονα, χρησιμοποιήσαμε Svelte για τα interactive components, καθώς είναι lightweight, αποδοτικό και προσφέρει μια πιο ευχάριστη εμπειρία ανάπτυξης.`
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

