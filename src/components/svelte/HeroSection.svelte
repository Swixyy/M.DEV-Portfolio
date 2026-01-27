<script lang="ts">
  import { inview } from 'svelte-inview';
  import { onMount } from 'svelte';
  
  export let greeting: string;
  export let name: string;
  export let tagline: string;
  export let description: string;
  export let ctaPrimary: string;
  export let ctaSecondary: string;
  
  let isVisible = false;
  let animationCycle = 0;
  
  const codeSymbols = [
    'print("Hello World")',
    'console.log("Hello World")',
    'System.out.println("Hello")',
    'Console.WriteLine("Hello")',
    'cout << "Hello World"',
    'puts "Hello World"',
    'fmt.Println("Hello World")',
    'echo "Hello World"',
    'printf("Hello World")',
  ];
  
  
  const handleInview = (event: CustomEvent<{ inView: boolean }>) => {
    if (event.detail.inView) {
      isVisible = true;
    }
  };
  
  onMount(() => {
    const interval = setInterval(() => {
      animationCycle = (animationCycle + 1) % 100;
    }, 7000);
    
    return () => clearInterval(interval);
  });
</script>

<section 
  id="home"
  class="min-h-screen flex items-center justify-center relative overflow-hidden pt-20"
  use:inview={{ threshold: 0.2 }}
  on:inview_change={handleInview}
>
  <div class="absolute inset-0 -z-10">
    <div class="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl"></div>
    <div class="absolute bottom-20 right-10 w-96 h-96 bg-primary-light/10 rounded-full blur-3xl"></div>
  </div>
  
  <!-- Left Circuit Lines -->
  <div class="circuit-container circuit-left">
    <svg viewBox="0 0 200 800" class="w-full h-full" preserveAspectRatio="xMinYMin slice">
      <defs>
        <path id="lp0" d="M0,100 L60,100 L60,180 L120,180 L120,250 L80,250 L80,350" />
        <path id="lp1" d="M0,300 L40,300 L40,220 L100,220 L100,150 L140,150" />
        <path id="lp2" d="M0,500 L80,500 L80,420 L50,420 L50,350 L120,350 L120,450" />
        <path id="lp3" d="M60,0 L60,80 L100,80 L100,140 L40,140 L40,200" />
        <path id="lp4" d="M0,650 L100,650 L100,580 L60,580 L60,500 L130,500" />
      </defs>
      
      <path d="M0,100 L60,100 L60,180 L120,180 L120,250 L80,250 L80,350" class="circuit-path" style="--delay: 0s" fill="none" stroke-width="2" stroke-linecap="round" />
      <circle class="circuit-node" r="4">
        <animateMotion dur="4s" repeatCount="indefinite" begin="0s" calcMode="linear">
          <mpath href="#lp0" />
        </animateMotion>
      </circle>
      
      <path d="M0,300 L40,300 L40,220 L100,220 L100,150 L140,150" class="circuit-path" style="--delay: 0.5s" fill="none" stroke-width="2" stroke-linecap="round" />
      <circle class="circuit-node" r="4">
        <animateMotion dur="4s" repeatCount="indefinite" begin="0.5s" calcMode="linear">
          <mpath href="#lp1" />
        </animateMotion>
      </circle>
      
      <path d="M0,500 L80,500 L80,420 L50,420 L50,350 L120,350 L120,450" class="circuit-path" style="--delay: 1s" fill="none" stroke-width="2" stroke-linecap="round" />
      <circle class="circuit-node" r="4">
        <animateMotion dur="4s" repeatCount="indefinite" begin="1s" calcMode="linear">
          <mpath href="#lp2" />
        </animateMotion>
      </circle>
      
      <path d="M60,0 L60,80 L100,80 L100,140 L40,140 L40,200" class="circuit-path" style="--delay: 1.5s" fill="none" stroke-width="2" stroke-linecap="round" />
      <circle class="circuit-node" r="4">
        <animateMotion dur="4s" repeatCount="indefinite" begin="1.5s" calcMode="linear">
          <mpath href="#lp3" />
        </animateMotion>
      </circle>
      
      <path d="M0,650 L100,650 L100,580 L60,580 L60,500 L130,500" class="circuit-path" style="--delay: 2s" fill="none" stroke-width="2" stroke-linecap="round" />
      <circle class="circuit-node" r="4">
        <animateMotion dur="4s" repeatCount="indefinite" begin="2s" calcMode="linear">
          <mpath href="#lp4" />
        </animateMotion>
      </circle>
      <circle class="static-node" cx="60" cy="100" r="3" />
      <circle class="static-node" cx="60" cy="180" r="3" />
      <circle class="static-node" cx="120" cy="180" r="3" />
      <circle class="static-node" cx="40" cy="300" r="3" />
      <circle class="static-node" cx="100" cy="220" r="3" />
      <circle class="static-node" cx="80" cy="500" r="3" />
      <circle class="static-node" cx="100" cy="650" r="3" />
    </svg>
  </div>
  
  <!-- Right Circuit Lines -->
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
  
  <div class="code-fountain-container absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2">
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
  
  <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
    <div class="max-w-4xl mx-auto text-center">
      <p 
        class="text-lg md:text-xl text-primary mb-4 opacity-0"
        class:animate-fade-in-up={isVisible}
        style="animation-delay: 0.1s"
      >
        {greeting}
      </p>
      
      <h1 
        class="text-5xl md:text-7xl lg:text-8xl font-bold text-primary-dark mb-6 opacity-0"
        class:animate-fade-in-up={isVisible}
        style="animation-delay: 0.2s"
      >
        {name}
      </h1>
      
      <h2 
        class="text-2xl md:text-3xl lg:text-4xl text-primary font-semibold mb-6 opacity-0"
        class:animate-fade-in-up={isVisible}
        style="animation-delay: 0.3s"
      >
        {tagline}
      </h2>
      
      <p 
        class="text-lg md:text-xl text-primary-dark/70 max-w-2xl mx-auto mb-10 opacity-0"
        class:animate-fade-in-up={isVisible}
        style="animation-delay: 0.4s"
      >
        {description}
      </p>
      
      <div 
        class="flex flex-col sm:flex-row items-center justify-center gap-4 opacity-0"
        class:animate-fade-in-up={isVisible}
        style="animation-delay: 0.5s"
      >
        <a href="#projects" class="btn-primary inline-flex items-center gap-2">
          {ctaPrimary}
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
          </svg>
        </a>
        <a href="#contact" class="btn-secondary">
          {ctaSecondary}
        </a>
      </div>
    </div>
    
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

<style>
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
  
  /* Circuit Lines Styles */
  .circuit-container {
    position: absolute;
    top: 0;
    width: 200px;
    height: 100%;
    pointer-events: none;
    opacity: 0.4;
    z-index: 0;
  }
  
  .circuit-left {
    left: 0;
  }
  
  .circuit-right {
    right: 0;
  }
  
  .circuit-path {
    stroke: rgb(41, 99, 116);
    stroke-dasharray: 1000;
    stroke-dashoffset: 1000;
    animation: drawCircuit 3s ease-out forwards;
    animation-delay: var(--delay);
  }
  
  .circuit-node {
    fill: rgb(98, 159, 173);
    opacity: 0.8;
    filter: drop-shadow(0 0 4px rgb(98, 159, 173));
  }
  
  .static-node {
    fill: rgb(41, 99, 116);
    opacity: 0;
    animation: staticNodeAppear 0.5s ease-out forwards, staticNodePulse 3s ease-in-out infinite 1s;
  }
  
  .static-node:nth-child(odd) {
    animation-delay: 0.5s, 1.5s;
  }
  
  .static-node:nth-child(even) {
    animation-delay: 0.8s, 1.8s;
  }
  
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
  
  @keyframes staticNodePulse {
    0%, 100% {
      opacity: 0.5;
    }
    50% {
      opacity: 0.9;
    }
  }
  
  /* Responsive - hide on small screens */
  @media (max-width: 1024px) {
    .circuit-container {
      opacity: 0.25;
      width: 120px;
    }
  }
  
  @media (max-width: 768px) {
    .circuit-container {
      display: none;
    }
  }
  
  .code-fountain-container {
    width: 100%;
    height: 100px;
    position: absolute;
    pointer-events: none;
    overflow: visible;
  }
  
  .code-center {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    animation: pulse 5s ease-in-out infinite;
  }
  
  .fountain-particle {
    position: absolute;
    top: 50%;
    left: 50%;
    opacity: 0;
    animation: fountain 5s cubic-bezier(0.15, 0.1, 0.25, 1) forwards;
    animation-delay: var(--delay);
  }
  
  @keyframes pulse {
    0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.5; }
    50% { transform: translate(-50%, -50%) scale(1.15); opacity: 0.75; }
  }
  
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
