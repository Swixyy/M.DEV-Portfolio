<!--
  ============================================================================
  AboutSection.svelte - Ενότητα "Σχετικά με Εμένα"
  ============================================================================
  
  ΠΕΡΙΓΡΑΦΗ:
  Παρουσιάζει πληροφορίες για τον developer σε 3 κάρτες:
  1. Bio - Σύντομη βιογραφία
  2. 5 Year Goal - Πού βλέπω τον εαυτό μου σε 5 χρόνια
  3. Interview Highlight - Τι μου άρεσε από τη συνέντευξη
  
  FEATURES:
  - Typewriter Effect: Το subtitle γράφεται γράμμα-γράμμα σαν γραφομηχανή
  - API Data: Τα κείμενα φορτώνονται από το /api/about.json endpoint
  - Drop-bounce Animation: Τα κείμενα πέφτουν με bounce effect
  - Scroll-triggered: Όλα ξεκινούν όταν το section γίνει ορατό
  
  PROPS:
  - title: Τίτλος section ("About Me" / "Σχετικά με Εμένα")
  - lang: Γλώσσα ('en' | 'el') για το API call
  ============================================================================
-->

<script lang="ts">
  import { onMount } from 'svelte';
  import { inview } from 'svelte-inview';
  import type { AboutData } from '../../types';
  
  // Props
  export let title: string;       // Τίτλος section
  export let lang: 'en' | 'el';   // Γλώσσα για API call
  
  // === STATE VARIABLES ===
  let isVisible = false;           // True όταν το section είναι στο viewport
  let aboutData: AboutData | null = null;  // Data από το API
  let loading = true;              // True ενώ φορτώνει το API
  let error = false;               // True αν αποτύχει το API
  let typewriterStarted = false;   // Για να μην ξανατρέξει το typewriter
  let typewriterComplete = false;  // True όταν τελειώσει το typewriter
  let showRainEffect = false;      // Ενεργοποιεί το drop animation
  
  // === TYPEWRITER CONFIGURATION ===
  // Οι φράσεις που θα γραφτούν με typewriter effect
  // Κάθε φράση έχει text και pause (ms μετά το τέλος της)
  const phrases = [
    { text: 'If there is a "why"', pause: 1500 },  // Πρώτο μέρος + παύση
    { text: ', I will chase it.', pause: 1000 },   // Δεύτερο μέρος + παύση
    { text: ' Full-stack dev.', pause: 0 }          // Τελευταίο μέρος
  ];
  
  // Typewriter state
  let currentPhraseIndex = 0;   // Ποια φράση γράφουμε τώρα
  let currentCharIndex = 0;     // Ποιο character της φράσης
  let displayedText = '';       // Το κείμενο που εμφανίζεται
  
  /**
   * Handler για το inview event
   * Εκτελείται όταν το section μπαίνει/βγαίνει από το viewport
   */
  const handleInview = (event: CustomEvent<{ inView: boolean }>) => {
    if (event.detail.inView) {
      isVisible = true;
      
      // Ξεκίνα το typewriter μόνο μία φορά
      if (!typewriterStarted) {
        typewriterStarted = true;
        startTypewriter();
      }
      
      // Ξεκίνα το drop effect μετά από 800ms
      // (αφού εμφανιστούν οι κάρτες)
      setTimeout(() => {
        showRainEffect = true;
      }, 800);
    }
  };
  
  /**
   * Ξεκινάει το typewriter effect
   */
  function startTypewriter() {
    typePhrase();
  }
  
  /**
   * Γράφει μία φράση character-by-character
   * Recursive: Μετά από κάθε φράση καλεί τον εαυτό της για την επόμενη
   */
  function typePhrase() {
    // Αν τελείωσαν όλες οι φράσεις, σταμάτα
    if (currentPhraseIndex >= phrases.length) {
      typewriterComplete = true;
      return;
    }
    
    const currentPhrase = phrases[currentPhraseIndex];
    const baseText = displayedText;  // Κρατάμε το ήδη γραμμένο κείμενο
    
    // Interval που προσθέτει ένα character κάθε 80ms
    const typeInterval = setInterval(() => {
      if (currentCharIndex < currentPhrase.text.length) {
        // Πρόσθεσε το επόμενο character
        displayedText = baseText + currentPhrase.text.slice(0, currentCharIndex + 1);
        currentCharIndex++;
      } else {
        // Τέλος φράσης
        clearInterval(typeInterval);
        currentCharIndex = 0;
        currentPhraseIndex++;
        
        // Αν υπάρχουν άλλες φράσεις, συνέχισε μετά την παύση
        if (currentPhraseIndex < phrases.length) {
          setTimeout(typePhrase, currentPhrase.pause);
        } else {
          typewriterComplete = true;
        }
      }
    }, 80);  // 80ms ανά character
  }
  
  
  /**
   * Lifecycle: Εκτελείται όταν το component φορτώσει
   * Κάνει fetch τα δεδομένα από το API
   */
  onMount(async () => {
    try {
      // Fetch δεδομένα με βάση τη γλώσσα
      const response = await fetch(`/api/about.json?lang=${lang}`);
      if (!response.ok) throw new Error('Failed to fetch');
      aboutData = await response.json();
    } catch (e) {
      error = true;
    } finally {
      loading = false;
    }
  });
</script>

<!--
  MAIN SECTION
  use:inview με threshold 0.1 = πυροδοτεί όταν 10% είναι ορατό
-->
<section 
  id="about"
  class="py-20 md:py-32 bg-white"
  use:inview={{ threshold: 0.1 }}
  on:inview_change={handleInview}
>
  <div class="container mx-auto px-4 sm:px-6 lg:px-8">
    <!-- HEADER: Τίτλος + Typewriter Subtitle -->
    <div 
      class="text-center mb-16 opacity-0"
      class:animate-fade-in-up={isVisible}
    >
      <h2 class="section-title mb-6">{title}</h2>
      
      <!-- Typewriter Text Container -->
      <p class="typewriter-text mx-auto">
        <span class="typewriter-content">{displayedText}</span>
        <!-- Blinking cursor - κρύβεται όταν τελειώσει το typing -->
        {#if !typewriterComplete}
          <span class="typewriter-cursor">|</span>
        {/if}
      </p>
    </div>
    
    <!-- CONTENT: Loading / Error / Data -->
    {#if loading}
      <!-- Loading Spinner -->
      <div class="flex justify-center">
        <div class="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    {:else if error || !aboutData}
      <!-- Error Message -->
      <p class="text-center text-red-500">Failed to load content</p>
    {:else}
      <!-- CARDS GRID: Τρεις κάρτες με πληροφορίες -->
      <div class="max-w-4xl mx-auto grid gap-8 md:gap-12">
        
        <!-- CARD 1: About Me / Bio -->
        <div 
          class="bg-cream/50 rounded-2xl p-8 shadow-lg border border-primary-light/20 opacity-0"
          class:animate-fade-in-left={isVisible}
          style="animation-delay: 0.2s"
        >
          <div class="flex items-start gap-4">
            <!-- Icon -->
            <div class="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <div>
              <!-- Dynamic title based on language -->
              <h3 class="text-xl font-semibold text-primary-dark mb-3">
                {lang === 'en' ? 'About Me' : 'Σχετικά με Εμένα'}
              </h3>
              <!-- Bio text με drop animation -->
              <p 
                class="text-primary-dark/70 leading-relaxed drop-bounce"
                class:animate-drop={showRainEffect}
                style="--drop-delay: 0.2s"
              >
                {aboutData.bio}
              </p>
            </div>
          </div>
        </div>
        
        <!-- CARD 2: 5 Year Goal -->
        <div 
          class="bg-cream/50 rounded-2xl p-8 shadow-lg border border-primary-light/20 opacity-0"
          class:animate-fade-in-right={isVisible}
          style="animation-delay: 0.4s"
        >
          <div class="flex items-start gap-4">
            <div class="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <div>
              <h3 class="text-xl font-semibold text-primary-dark mb-3">
                {lang === 'en' ? 'Where I See Myself in 5 Years' : 'Πού Βλέπω τον Εαυτό μου σε 5 Χρόνια'}
              </h3>
              <p 
                class="text-primary-dark/70 leading-relaxed drop-bounce"
                class:animate-drop={showRainEffect}
                style="--drop-delay: 0.4s"
              >
                {aboutData.fiveYearGoal}
              </p>
            </div>
          </div>
        </div>
        
        <!-- CARD 3: Interview Highlight -->
        <div 
          class="bg-cream/50 rounded-2xl p-8 shadow-lg border border-primary-light/20 opacity-0"
          class:animate-fade-in-left={isVisible}
          style="animation-delay: 0.6s"
        >
          <div class="flex items-start gap-4">
            <div class="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              </svg>
            </div>
            <div>
              <h3 class="text-xl font-semibold text-primary-dark mb-3">
                {lang === 'en' ? 'How I Choose My Tech Stack' : 'Πώς Επιλέγω το Tech Stack μου'}
              </h3>
              <p 
                class="text-primary-dark/70 leading-relaxed drop-bounce"
                class:animate-drop={showRainEffect}
                style="--drop-delay: 0.6s"
              >
                {aboutData.interviewHighlight}
              </p>
            </div>
          </div>
        </div>
      </div>
    {/if}
  </div>
</section>

<!--
  ============================================================================
  STYLES
  ============================================================================
-->
<style>
  /* === FADE ANIMATIONS === */
  .animate-fade-in-up {
    animation: fadeInUp 0.6s ease-out forwards;
  }
  
  .animate-fade-in-left {
    animation: fadeInLeft 0.6s ease-out forwards;
  }
  
  .animate-fade-in-right {
    animation: fadeInRight 0.6s ease-out forwards;
  }
  
  @keyframes fadeInUp {
    from { opacity: 0; transform: translateY(30px); }
    to { opacity: 1; transform: translateY(0); }
  }
  
  @keyframes fadeInLeft {
    from { opacity: 0; transform: translateX(-30px); }
    to { opacity: 1; transform: translateX(0); }
  }
  
  @keyframes fadeInRight {
    from { opacity: 0; transform: translateX(30px); }
    to { opacity: 1; transform: translateX(0); }
  }
  
  /* === TYPEWRITER STYLES === */
  /* Container για το typewriter text */
  .typewriter-text {
    font-family: 'Caveat', 'Dancing Script', cursive;  /* Χειρόγραφο font */
    font-size: 1.75rem;
    line-height: 1.4;
    color: rgb(41, 99, 116);
    max-width: 700px;
    min-height: 2.5rem;  /* Αποφεύγει layout shift */
  }
  
  /* Μεγαλύτερο font σε desktop */
  @media (min-width: 768px) {
    .typewriter-text {
      font-size: 2.25rem;
      min-height: 3rem;
    }
  }
  
  /* Gradient text effect για το περιεχόμενο */
  .typewriter-content {
    background: linear-gradient(135deg, rgb(41, 99, 116) 0%, rgb(12, 44, 85) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  
  /* Blinking cursor */
  .typewriter-cursor {
    display: inline-block;
    color: rgb(41, 99, 116);
    animation: blink 0.7s infinite;
    margin-left: 2px;
    -webkit-text-fill-color: rgb(41, 99, 116);  /* Override του gradient */
  }
  
  @keyframes blink {
    0%, 50% { opacity: 1; }
    51%, 100% { opacity: 0; }
  }
  
  /* === DROP BOUNCE ANIMATION === */
  /* Τα κείμενα πέφτουν από πάνω με bounce effect */
  
  /* Initial state: Αόρατο και πάνω */
  .drop-bounce {
    opacity: 0;
    transform: translateY(-15px);
  }
  
  /* Ενεργοποίηση animation */
  .animate-drop {
    animation: dropBounce 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
    animation-delay: var(--drop-delay);
  }
  
  /* 
    Drop Bounce Animation:
    - 0%: Αόρατο, 15px πάνω
    - 60%: Ορατό, 4px κάτω (overshoot)
    - 80%: Μικρό bounce πίσω
    - 100%: Τελική θέση
  */
  @keyframes dropBounce {
    0% {
      opacity: 0;
      transform: translateY(-15px);
    }
    60% {
      opacity: 1;
      transform: translateY(4px);
    }
    80% {
      transform: translateY(-2px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }
</style>
