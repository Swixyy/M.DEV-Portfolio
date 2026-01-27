<script lang="ts">
  import { onMount } from 'svelte';
  import { inview } from 'svelte-inview';
  import type { AboutData } from '../../types';
  
  export let title: string;
  export let lang: 'en' | 'el';
  
  let isVisible = false;
  let aboutData: AboutData | null = null;
  let loading = true;
  let error = false;
  let typewriterStarted = false;
  let typewriterComplete = false;
  let showRainEffect = false;
  
  const phrases = [
    { text: 'If there is a "why"', pause: 1500 },
    { text: ', I will chase it.', pause: 1000 },
    { text: ' Full-stack dev.', pause: 0 }
  ];
  
  let currentPhraseIndex = 0;
  let currentCharIndex = 0;
  let displayedText = '';
  
  const handleInview = (event: CustomEvent<{ inView: boolean }>) => {
    if (event.detail.inView) {
      isVisible = true;
      if (!typewriterStarted) {
        typewriterStarted = true;
        startTypewriter();
      }
      setTimeout(() => {
        showRainEffect = true;
      }, 800);
    }
  };
  
  function startTypewriter() {
    typePhrase();
  }
  
  function typePhrase() {
    if (currentPhraseIndex >= phrases.length) {
      typewriterComplete = true;
      return;
    }
    
    const currentPhrase = phrases[currentPhraseIndex];
    const baseText = displayedText;
    
    const typeInterval = setInterval(() => {
      if (currentCharIndex < currentPhrase.text.length) {
        displayedText = baseText + currentPhrase.text.slice(0, currentCharIndex + 1);
        currentCharIndex++;
      } else {
        clearInterval(typeInterval);
        currentCharIndex = 0;
        currentPhraseIndex++;
        
        if (currentPhraseIndex < phrases.length) {
          setTimeout(typePhrase, currentPhrase.pause);
        } else {
          typewriterComplete = true;
        }
      }
    }, 80);
  }
  
  
  onMount(async () => {
    try {
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

<section 
  id="about"
  class="py-20 md:py-32 bg-white"
  use:inview={{ threshold: 0.1 }}
  on:inview_change={handleInview}
>
  <div class="container mx-auto px-4 sm:px-6 lg:px-8">
    <div 
      class="text-center mb-16 opacity-0"
      class:animate-fade-in-up={isVisible}
    >
      <h2 class="section-title mb-6">{title}</h2>
      <p class="typewriter-text mx-auto">
        <span class="typewriter-content">{displayedText}</span>
        {#if !typewriterComplete}
          <span class="typewriter-cursor">|</span>
        {/if}
      </p>
    </div>
    
    {#if loading}
      <div class="flex justify-center">
        <div class="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    {:else if error || !aboutData}
      <p class="text-center text-red-500">Failed to load content</p>
    {:else}
      <div class="max-w-4xl mx-auto grid gap-8 md:gap-12">
        <div 
          class="bg-cream/50 rounded-2xl p-8 shadow-lg border border-primary-light/20 opacity-0"
          class:animate-fade-in-left={isVisible}
          style="animation-delay: 0.2s"
        >
          <div class="flex items-start gap-4">
            <div class="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <div>
              <h3 class="text-xl font-semibold text-primary-dark mb-3">
                {lang === 'en' ? 'About Me' : 'Σχετικά με Εμένα'}
              </h3>
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
                {lang === 'en' ? 'What I Enjoyed from the Interview' : 'Τι μου Άρεσε από τη Συνέντευξη'}
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

<style>
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
  
  .typewriter-text {
    font-family: 'Caveat', 'Dancing Script', cursive;
    font-size: 1.75rem;
    line-height: 1.4;
    color: rgb(41, 99, 116);
    max-width: 700px;
    min-height: 2.5rem;
  }
  
  @media (min-width: 768px) {
    .typewriter-text {
      font-size: 2.25rem;
      min-height: 3rem;
    }
  }
  
  .typewriter-content {
    background: linear-gradient(135deg, rgb(41, 99, 116) 0%, rgb(12, 44, 85) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  
  .typewriter-cursor {
    display: inline-block;
    color: rgb(41, 99, 116);
    animation: blink 0.7s infinite;
    margin-left: 2px;
    -webkit-text-fill-color: rgb(41, 99, 116);
  }
  
  @keyframes blink {
    0%, 50% { opacity: 1; }
    51%, 100% { opacity: 0; }
  }
  
  .drop-bounce {
    opacity: 0;
    transform: translateY(-15px);
  }
  
  .animate-drop {
    animation: dropBounce 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
    animation-delay: var(--drop-delay);
  }
  
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
