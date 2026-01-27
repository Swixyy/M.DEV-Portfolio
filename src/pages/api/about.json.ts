import type { APIRoute } from 'astro';
import type { AboutData } from '../../types';

const aboutContent: Record<'en' | 'el', AboutData> = {
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

export const GET: APIRoute = ({ request }) => {
  const url = new URL(request.url);
  const lang = url.searchParams.get('lang') as 'en' | 'el' || 'en';
  const validLang = lang === 'el' ? 'el' : 'en';
  
  return new Response(JSON.stringify(aboutContent[validLang]), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'public, max-age=3600'
    }
  });
};

export const prerender = false;
