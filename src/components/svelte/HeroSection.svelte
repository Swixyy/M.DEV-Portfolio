<!--
  ============================================================================
  HeroSection.svelte - Κεντρικό Hero Section του Portfolio
  ============================================================================
  
  ΠΕΡΙΓΡΑΦΗ:
  Αυτό είναι το πρώτο section που βλέπει ο χρήστης. Περιέχει:
  - Χαιρετισμό και όνομα
  - Tagline (τίτλος επαγγέλματος)
  - Περιγραφή
  - CTA buttons (View Work / Contact)
  - Animated background με circuit lines (αριστερά/δεξιά)
  - Code fountain animation (Hello World σε διάφορες γλώσσες)
  
  ANIMATIONS:
  1. Fade-in-up: Τα κείμενα εμφανίζονται με animation από κάτω προς τα πάνω
  2. Circuit lines: SVG γραμμές κυκλώματος με κινούμενα nodes στα πλαϊνά
  3. Code fountain: "Hello World" εντολές που αναβλύζουν σαν σιντριβάνι
  
  DEPENDENCIES:
  - svelte-inview: Για να ανιχνεύει πότε το section είναι ορατό στο viewport
  
  PROPS:
  - greeting: "Hi, I'm" ή "Γεια, είμαι ο"
  - name: "Michael" ή "Μιχαήλ"
  - tagline: Τίτλος επαγγέλματος
  - description: Σύντομη περιγραφή
  - ctaPrimary: Κείμενο πρωτεύοντος κουμπιού
  - ctaSecondary: Κείμενο δευτερεύοντος κουμπιού
  ============================================================================
-->

<script lang="ts">
  // svelte-inview: Βιβλιοθήκη που ανιχνεύει πότε ένα element μπαίνει στο viewport
  // Χρησιμοποιείται για να ξεκινάνε τα animations μόνο όταν ο χρήστης βλέπει το section
  import { inview } from 'svelte-inview';
  import { onMount } from 'svelte';
  
  // Props - Τα κείμενα περνιούνται από το parent component (index.astro)
  // ώστε να υποστηρίζεται η δίγλωσση λειτουργία (EN/EL)
  export let greeting: string;      // "Hi, I'm" / "Γεια, είμαι ο"
  export let name: string;          // "Michael" / "Μιχαήλ"
  export let tagline: string;       // "Full-Stack Web Developer"
  export let description: string;   // Περιγραφή
  export let ctaPrimary: string;    // "View My Work" / "Δες τα Έργα μου"
  export let ctaSecondary: string;  // "Get In Touch" / "Επικοινώνησε"
  
  // State για animations
  let isVisible = false;      // Γίνεται true όταν το section εμφανίζεται στο viewport
  let animationCycle = 0;     // Counter για να επαναλαμβάνεται το fountain animation
  
  // Code Fountain Animation - "Hello World" σε διάφορες γλώσσες προγραμματισμού
  // Αυτά τα strings εμφανίζονται σαν σιντριβάνι που αναβλύζει από το κέντρο
  const codeSymbols = [
    'print("Hello World")',           // Python
    'console.log("Hello World")',     // JavaScript
    'System.out.println("Hello")',    // Java
    'Console.WriteLine("Hello")',     // C#
    'cout << "Hello World"',          // C++
    'puts "Hello World"',             // Ruby
    'fmt.Println("Hello World")',     // Go
    'echo "Hello World"',             // PHP
    'printf("Hello World")',          // C
  ];
  
  
  // Handler για το inview event
  // Καλείται όταν το section μπαίνει ή βγαίνει από το viewport
  const handleInview = (event: CustomEvent<{ inView: boolean }>) => {
    if (event.detail.inView) {
      isVisible = true;  // Ενεργοποιεί τα fade-in animations
    }
  };
  
  // Lifecycle: Εκτελείται όταν το component φορτώνει
  onMount(() => {
    // Interval που αυξάνει το animationCycle κάθε 7 δευτερόλεπτα
    // Αυτό κάνει restart το fountain animation περιοδικά
    const interval = setInterval(() => {
      animationCycle = (animationCycle + 1) % 100;
    }, 7000);
    
    // Cleanup: Σταματάει το interval όταν το component καταστραφεί
    return () => clearInterval(interval);
  });
</script>

<!-- 
  MAIN SECTION
  - use:inview: Directive που παρακολουθεί αν το section είναι visible
  - threshold: 0.2 σημαίνει ότι το event πυροδοτείται όταν το 20% είναι ορατό
-->
<section 
  id="home"
  class="min-h-screen flex items-center justify-center relative overflow-hidden pt-20"
  use:inview={{ threshold: 0.2 }}
  on:inview_change={handleInview}
>
  <!-- BACKGROUND DECORATIONS - Θολά κυκλικά blobs για visual effect -->
  <div class="absolute inset-0 -z-10">
    <div class="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl"></div>
    <div class="absolute bottom-20 right-10 w-96 h-96 bg-primary-light/10 rounded-full blur-3xl"></div>
  </div>
  
  <!-- 
    CIRCUIT LINES - ΑΡΙΣΤΕΡΗ ΠΛΕΥΡΑ
    SVG animation που μοιάζει με ηλεκτρονικό κύκλωμα.
    Περιέχει:
    - Paths: Οι γραμμές του κυκλώματος (σχεδιάζονται με animation)
    - Moving nodes: Κύκλοι που κινούνται κατά μήκος των paths
    - Static nodes: Σταθεροί κύκλοι στις διασταυρώσεις
    
    Τα paths ορίζονται στο <defs> και χρησιμοποιούνται:
    1. Για να σχεδιαστεί η γραμμή (stroke)
    2. Ως μονοπάτι για το animateMotion των κινούμενων nodes
  -->
  <div class="circuit-container circuit-left">
    <svg viewBox="0 0 200 800" class="w-full h-full" preserveAspectRatio="xMinYMin slice">
      <!-- Ορισμοί paths για αναφορά από τα animateMotion -->
      <defs>
        <path id="lp0" d="M0,100 L60,100 L60,180 L120,180 L120,250 L80,250 L80,350" />
        <path id="lp1" d="M0,300 L40,300 L40,220 L100,220 L100,150 L140,150" />
        <path id="lp2" d="M0,500 L80,500 L80,420 L50,420 L50,350 L120,350 L120,450" />
        <path id="lp3" d="M60,0 L60,80 L100,80 L100,140 L40,140 L40,200" />
        <path id="lp4" d="M0,650 L100,650 L100,580 L60,580 L60,500 L130,500" />
      </defs>
      
      <!-- Circuit Path 0: Γραμμή + κινούμενο node -->
      <path d="M0,100 L60,100 L60,180 L120,180 L120,250 L80,250 L80,350" class="circuit-path" style="--delay: 0s" fill="none" stroke-width="2" stroke-linecap="round" />
      <circle class="circuit-node" r="4">
        <!-- animateMotion: Κινεί τον κύκλο κατά μήκος του path lp0 -->
        <animateMotion dur="4s" repeatCount="indefinite" begin="0s" calcMode="linear">
          <mpath href="#lp0" />
        </animateMotion>
      </circle>
      
      <!-- Circuit Path 1 -->
      <path d="M0,300 L40,300 L40,220 L100,220 L100,150 L140,150" class="circuit-path" style="--delay: 0.5s" fill="none" stroke-width="2" stroke-linecap="round" />
      <circle class="circuit-node" r="4">
        <animateMotion dur="4s" repeatCount="indefinite" begin="0.5s" calcMode="linear">
          <mpath href="#lp1" />
        </animateMotion>
      </circle>
      
      <!-- Circuit Path 2 -->
      <path d="M0,500 L80,500 L80,420 L50,420 L50,350 L120,350 L120,450" class="circuit-path" style="--delay: 1s" fill="none" stroke-width="2" stroke-linecap="round" />
      <circle class="circuit-node" r="4">
        <animateMotion dur="4s" repeatCount="indefinite" begin="1s" calcMode="linear">
          <mpath href="#lp2" />
        </animateMotion>
      </circle>
      
      <!-- Circuit Path 3 -->
      <path d="M60,0 L60,80 L100,80 L100,140 L40,140 L40,200" class="circuit-path" style="--delay: 1.5s" fill="none" stroke-width="2" stroke-linecap="round" />
      <circle class="circuit-node" r="4">
        <animateMotion dur="4s" repeatCount="indefinite" begin="1.5s" calcMode="linear">
          <mpath href="#lp3" />
        </animateMotion>
      </circle>
      
      <!-- Circuit Path 4 -->
      <path d="M0,650 L100,650 L100,580 L60,580 L60,500 L130,500" class="circuit-path" style="--delay: 2s" fill="none" stroke-width="2" stroke-linecap="round" />
      <circle class="circuit-node" r="4">
        <animateMotion dur="4s" repeatCount="indefinite" begin="2s" calcMode="linear">
          <mpath href="#lp4" />
        </animateMotion>
      </circle>
      
      <!-- Static Nodes: Σταθεροί κύκλοι στις διασταυρώσεις των γραμμών -->
      <circle class="static-node" cx="60" cy="100" r="3" />
      <circle class="static-node" cx="60" cy="180" r="3" />
      <circle class="static-node" cx="120" cy="180" r="3" />
      <circle class="static-node" cx="40" cy="300" r="3" />
      <circle class="static-node" cx="100" cy="220" r="3" />
      <circle class="static-node" cx="80" cy="500" r="3" />
      <circle class="static-node" cx="100" cy="650" r="3" />
    </svg>
  </div>
  
  <!-- CIRCUIT LINES - ΔΕΞΙΑ ΠΛΕΥΡΑ (Mirror της αριστερής) -->
  <div class="circuit-container circuit-right">
    <svg viewBox="0 0 200 800" class="w-full h-full" preserveAspectRatio="xMaxYMin slice">
      <defs>
        <path id="rp0" d="M200,120 L140,120 L140,200 L100,200 L100,280 L150,280 L150,380" />
        <path id="rp1" d="M200,350 L150,350 L150,280 L110,280 L110,200 L80,200" />
        <path id="rp2" d="M200,550 L120,550 L120,470 L160,470 L160,400 L100,400 L100,480" />
        <path id="rp3" d="M150,0 L150,90 L110,90 L110,160 L160,160 L160,230" />
        <path id="rp4" d="M200,700 L100,700 L100,620 L150,620 L150,540 L80,540" />
      </defs>
      
      <path d="M200,120 L140,120 L140,200 L100,200 L100,280 L150,280 L150,380" class="circuit-path" style="--delay: 0.3s" fill="none" stroke-width="2" stroke-linecap="round" />
      <circle class="circuit-node" r="4">
        <animateMotion dur="4s" repeatCount="indefinite" begin="0.3s" calcMode="linear">
          <mpath href="#rp0" />
        </animateMotion>
      </circle>
      
      <path d="M200,350 L150,350 L150,280 L110,280 L110,200 L80,200" class="circuit-path" style="--delay: 0.8s" fill="none" stroke-width="2" stroke-linecap="round" />
      <circle class="circuit-node" r="4">
        <animateMotion dur="4s" repeatCount="indefinite" begin="0.8s" calcMode="linear">
          <mpath href="#rp1" />
        </animateMotion>
      </circle>
      
      <path d="M200,550 L120,550 L120,470 L160,470 L160,400 L100,400 L100,480" class="circuit-path" style="--delay: 1.3s" fill="none" stroke-width="2" stroke-linecap="round" />
      <circle class="circuit-node" r="4">
        <animateMotion dur="4s" repeatCount="indefinite" begin="1.3s" calcMode="linear">
          <mpath href="#rp2" />
        </animateMotion>
      </circle>
      
      <path d="M150,0 L150,90 L110,90 L110,160 L160,160 L160,230" class="circuit-path" style="--delay: 1.8s" fill="none" stroke-width="2" stroke-linecap="round" />
      <circle class="circuit-node" r="4">
        <animateMotion dur="4s" repeatCount="indefinite" begin="1.8s" calcMode="linear">
          <mpath href="#rp3" />
        </animateMotion>
      </circle>
      
      <path d="M200,700 L100,700 L100,620 L150,620 L150,540 L80,540" class="circuit-path" style="--delay: 2.3s" fill="none" stroke-width="2" stroke-linecap="round" />
      <circle class="circuit-node" r="4">
        <animateMotion dur="4s" repeatCount="indefinite" begin="2.3s" calcMode="linear">
          <mpath href="#rp4" />
        </animateMotion>
      </circle>
      
      <circle class="static-node" cx="140" cy="120" r="3" />
      <circle class="static-node" cx="140" cy="200" r="3" />
      <circle class="static-node" cx="100" cy="200" r="3" />
      <circle class="static-node" cx="150" cy="350" r="3" />
      <circle class="static-node" cx="110" cy="280" r="3" />
      <circle class="static-node" cx="120" cy="550" r="3" />
      <circle class="static-node" cx="100" cy="700" r="3" />
    </svg>
  </div>
  
  <!--
    CODE FOUNTAIN ANIMATION
    Τα "Hello World" strings αναβλύζουν από το κέντρο σαν σιντριβάνι.
    
    {#key animationCycle}: Όταν αλλάζει το animationCycle, το Svelte
    καταστρέφει και ξαναδημιουργεί τα elements, επαναλαμβάνοντας το animation.
    
    CSS Variables στο style:
    - --delay: Καθυστέρηση έναρξης για κάθε particle
    - --x-end: Τελική θέση X (απλώνονται αριστερά/δεξιά)
    - --peak-height: Πόσο ψηλά πηγαίνουν πριν πέσουν
    - --fall-distance: Πόσο κάτω πέφτουν
  -->
  <div class="code-fountain-container absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2">
    <!-- Κεντρικό σύμβολο </> -->
    <div class="code-center">
      <span class="text-5xl md:text-7xl font-mono text-primary-dark/50">&lt;/&gt;</span>
    </div>
    {#key animationCycle}
      {#each codeSymbols as symbol, i}
        <span 
          class="fountain-particle font-mono text-sm md:text-base text-primary/80 font-medium whitespace-nowrap"
          style="--delay: {i * 0.25}s; --x-end: {(i - 4) * 180}px; --peak-height: 80px; --fall-distance: 70vh;"
        >
          {symbol}
        </span>
      {/each}
    {/key}
  </div>
  
  <!-- 
    MAIN CONTENT
    Τα κείμενα του hero section με staggered fade-in animations.
    Κάθε element έχει διαφορετικό animation-delay για cascade effect.
  -->
  <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
    <div class="max-w-4xl mx-auto text-center">
      <!-- Greeting: "Hi, I'm" -->
      <p 
        class="text-lg md:text-xl text-primary mb-4 opacity-0"
        class:animate-fade-in-up={isVisible}
        style="animation-delay: 0.1s"
      >
        {greeting}
      </p>
      
      <!-- Name: "Michael" -->
      <h1 
        class="text-5xl md:text-7xl lg:text-8xl font-bold text-primary-dark mb-6 opacity-0"
        class:animate-fade-in-up={isVisible}
        style="animation-delay: 0.2s"
      >
        {name}
      </h1>
      
      <!-- Tagline: "Full-Stack Web Developer" -->
      <h2 
        class="text-2xl md:text-3xl lg:text-4xl text-primary font-semibold mb-6 opacity-0"
        class:animate-fade-in-up={isVisible}
        style="animation-delay: 0.3s"
      >
        {tagline}
      </h2>
      
      <!-- Description -->
      <p 
        class="text-lg md:text-xl text-primary-dark/70 max-w-2xl mx-auto mb-10 opacity-0"
        class:animate-fade-in-up={isVisible}
        style="animation-delay: 0.4s"
      >
        {description}
      </p>
      
      <!-- CTA Buttons -->
      <div 
        class="flex flex-col sm:flex-row items-center justify-center gap-4 opacity-0"
        class:animate-fade-in-up={isVisible}
        style="animation-delay: 0.5s"
      >
        <!-- Primary CTA: Οδηγεί στα Projects -->
        <a href="#projects" class="btn-primary inline-flex items-center gap-2">
          {ctaPrimary}
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
          </svg>
        </a>
        <!-- Secondary CTA: Οδηγεί στο Contact -->
        <a href="#contact" class="btn-secondary">
          {ctaSecondary}
        </a>
      </div>
    </div>
    
    <!-- Scroll Indicator: Animated mouse/scroll icon στο κάτω μέρος -->
    <div 
      class="absolute bottom-8 left-1/2 -translate-x-1/2 opacity-0"
      class:animate-fade-in={isVisible}
      style="animation-delay: 0.8s"
    >
      <div class="w-6 h-10 rounded-full border-2 border-primary flex items-start justify-center p-2">
        <div class="w-1 h-2 bg-primary rounded-full animate-bounce"></div>
      </div>
    </div>
  </div>
</section>

<!--
  ============================================================================
  STYLES
  ============================================================================
-->
<style>
  /* === FADE IN ANIMATIONS === */
  /* Χρησιμοποιούνται για τα κείμενα όταν το section γίνεται visible */
  .animate-fade-in-up {
    animation: fadeInUp 0.6s ease-out forwards;
  }
  
  .animate-fade-in {
    animation: fadeIn 0.6s ease-out forwards;
  }
  
  @keyframes fadeInUp {
    from { opacity: 0; transform: translateY(30px); }
    to { opacity: 1; transform: translateY(0); }
  }
  
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  
  /* === CIRCUIT LINES STYLES === */
  /* Container για τα SVG κυκλώματα */
  .circuit-container {
    position: absolute;
    top: 0;
    width: 200px;
    height: 100%;
    pointer-events: none;  /* Δεν αλληλεπιδρά με mouse events */
    opacity: 0.4;
    z-index: 0;
  }
  
  .circuit-left { left: 0; }
  .circuit-right { right: 0; }
  
  /* Οι γραμμές του κυκλώματος */
  .circuit-path {
    stroke: rgb(41, 99, 116);  /* primary color */
    stroke-dasharray: 1000;     /* Μήκος dash pattern */
    stroke-dashoffset: 1000;    /* Αρχικά κρυμμένο */
    animation: drawCircuit 3s ease-out forwards;  /* Draw animation */
    animation-delay: var(--delay);  /* Staggered start */
  }
  
  /* Κινούμενα nodes (κύκλοι που ακολουθούν τα paths) */
  .circuit-node {
    fill: rgb(98, 159, 173);  /* primary-light color */
    opacity: 0.8;
    filter: drop-shadow(0 0 4px rgb(98, 159, 173));  /* Glow effect */
  }
  
  /* Σταθερά nodes στις διασταυρώσεις */
  .static-node {
    fill: rgb(41, 99, 116);
    opacity: 0;
    animation: staticNodeAppear 0.5s ease-out forwards, staticNodePulse 3s ease-in-out infinite 1s;
  }
  
  /* Staggered appearance για τα static nodes */
  .static-node:nth-child(odd) {
    animation-delay: 0.5s, 1.5s;
  }
  
  .static-node:nth-child(even) {
    animation-delay: 0.8s, 1.8s;
  }
  
  /* Animation: Σχεδιασμός γραμμών κυκλώματος */
  @keyframes drawCircuit {
    0% {
      stroke-dashoffset: 1000;
      opacity: 0;
    }
    10% {
      opacity: 1;
    }
    100% {
      stroke-dashoffset: 0;
      opacity: 1;
    }
  }
  
  /* Animation: Εμφάνιση static nodes */
  @keyframes staticNodeAppear {
    from {
      opacity: 0;
      transform: scale(0);
    }
    to {
      opacity: 0.7;
      transform: scale(1);
    }
  }
  
  /* Animation: Pulse effect για static nodes */
  @keyframes staticNodePulse {
    0%, 100% { opacity: 0.5; }
    50% { opacity: 0.9; }
  }
  
  /* === RESPONSIVE: Κρύβουμε τα circuits σε μικρές οθόνες === */
  @media (max-width: 1024px) {
    .circuit-container {
      opacity: 0.25;
      width: 120px;
    }
  }
  
  @media (max-width: 768px) {
    .circuit-container {
      display: none;  /* Πλήρης απόκρυψη σε mobile */
    }
  }
  
  /* === CODE FOUNTAIN STYLES === */
  .code-fountain-container {
    width: 100%;
    height: 100px;
    position: absolute;
    pointer-events: none;
    overflow: visible;
  }
  
  /* Κεντρικό </> σύμβολο */
  .code-center {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    animation: pulse 5s ease-in-out infinite;
  }
  
  /* Τα "Hello World" particles */
  .fountain-particle {
    position: absolute;
    top: 50%;
    left: 50%;
    opacity: 0;
    animation: fountain 5s cubic-bezier(0.15, 0.1, 0.25, 1) forwards;
    animation-delay: var(--delay);
  }
  
  /* Pulse animation για το κεντρικό σύμβολο */
  @keyframes pulse {
    0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.5; }
    50% { transform: translate(-50%, -50%) scale(1.15); opacity: 0.75; }
  }
  
  /* 
    Fountain Animation:
    Τα particles ξεκινούν από το κέντρο, πηγαίνουν πάνω (peak),
    μετά πέφτουν προς τα κάτω ενώ απλώνονται οριζόντια.
    Η διαφάνεια μειώνεται σταδιακά μέχρι να εξαφανιστούν.
  */
  @keyframes fountain {
    0% {
      opacity: 0;
      transform: translate(-50%, -50%) translateX(0) translateY(0);
    }
    8% {
      opacity: 1;
      transform: translate(-50%, -50%) translateX(calc(var(--x-end) * 0.2)) translateY(calc(var(--peak-height) * -1));
    }
    15% {
      opacity: 1;
      transform: translate(-50%, -50%) translateX(calc(var(--x-end) * 0.4)) translateY(calc(var(--peak-height) * -0.8));
    }
    30% {
      opacity: 0.9;
      transform: translate(-50%, -50%) translateX(calc(var(--x-end) * 0.6)) translateY(calc(var(--fall-distance) * 0.1));
    }
    50% {
      opacity: 0.7;
      transform: translate(-50%, -50%) translateX(calc(var(--x-end) * 0.8)) translateY(calc(var(--fall-distance) * 0.35));
    }
    70% {
      opacity: 0.4;
      transform: translate(-50%, -50%) translateX(calc(var(--x-end) * 0.95)) translateY(calc(var(--fall-distance) * 0.6));
    }
    100% {
      opacity: 0;
      transform: translate(-50%, -50%) translateX(var(--x-end)) translateY(var(--fall-distance));
    }
  }
</style>
