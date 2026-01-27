<script lang="ts">
  import { inview } from 'svelte-inview';
  import type { Project } from '../../types';
  
  export let title: string;
  export let subtitle: string;
  export let viewProjectText: string;
  export let viewCodeText: string;
  export let lang: 'en' | 'el';
  
  let isVisible = false;
  let selectedProject: Project | null = null;
  let isModalOpen = false;
  
  const handleInview = (event: CustomEvent<{ inView: boolean }>) => {
    if (event.detail.inView) {
      isVisible = true;
    }
  };
  
  const projects: Project[] = [
    {
      id: 'ecommerce-ads',
      title: {
        en: 'E-commerce with Smart Ads',
        el: 'E-commerce με Έξυπνες Διαφημίσεις'
      },
      description: {
        en: 'A full-stack e-commerce platform featuring advanced advertising algorithms and personalized product recommendations. Built with Next.js, Prisma, and TypeScript.',
        el: 'Μια full-stack πλατφόρμα ηλεκτρονικού εμπορίου με προηγμένους αλγόριθμους διαφήμισης και εξατομικευμένες προτάσεις προϊόντων. Κατασκευασμένη με Next.js, Prisma και TypeScript.'
      },
      image: '/images/projects/ecommerce-ads.png',
      tags: ['Next.js', 'TypeScript', 'Prisma', 'TailwindCSS', 'PostgreSQL'],
      liveUrl: '#',
      githubUrl: 'https://github.com/Swixyy/EcommerceWithAds',
      featured: true
    },
    {
      id: 'portfolio',
      title: {
        en: 'Portfolio Website',
        el: 'Portfolio Website'
      },
      description: {
        en: 'A modern, responsive portfolio website built with Astro, Svelte, and TailwindCSS. Features bilingual support, SEO optimization, and smooth scroll animations.',
        el: 'Ένα σύγχρονο, responsive portfolio website κατασκευασμένο με Astro, Svelte και TailwindCSS. Διαθέτει δίγλωσση υποστήριξη, SEO optimization και ομαλά scroll animations.'
      },
      image: '/images/projects/portfolio.png',
      tags: ['Astro', 'Svelte', 'TailwindCSS', 'TypeScript'],
      githubUrl: 'https://github.com/Swixyy/M.DEV-Portfolio',
      featured: true
    },
    {
      id: 'minidb',
      title: {
        en: 'MiniDB Educational Database',
        el: 'MiniDB Εκπαιδευτική Βάση Δεδομένων'
      },
      description: {
        en: 'An extremely minimal database system designed for educational purposes and rapid prototyping. Forked and enhanced from DataStories-UniPi.',
        el: 'Ένα εξαιρετικά minimal σύστημα βάσης δεδομένων σχεδιασμένο για εκπαιδευτικούς σκοπούς και γρήγορη πρωτοτυποποίηση.'
      },
      image: '/images/projects/minidb.png',
      tags: ['Python', 'Database', 'Educational'],
      githubUrl: 'https://github.com/Swixyy/miniDB-1',
      featured: false
    }
  ];
  
  function openModal(project: Project) {
    selectedProject = project;
    isModalOpen = true;
    document.body.style.overflow = 'hidden';
  }
  
  function closeModal() {
    isModalOpen = false;
    selectedProject = null;
    document.body.style.overflow = '';
  }
  
  function handleKeydown(event: KeyboardEvent) {
    if (event.key === 'Escape' && isModalOpen) {
      closeModal();
    }
  }
</script>

<svelte:window on:keydown={handleKeydown} />

<section 
  id="projects"
  class="py-20 md:py-32 bg-cream"
  use:inview={{ threshold: 0.1 }}
  on:inview_change={handleInview}
>
  <div class="container mx-auto px-4 sm:px-6 lg:px-8">
    <div 
      class="text-center mb-16 opacity-0"
      class:animate-fade-in-up={isVisible}
    >
      <h2 class="section-title mb-4">{title}</h2>
      <p class="section-subtitle mx-auto">{subtitle}</p>
    </div>
    
    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {#each projects as project, index}
        <div 
          class="group bg-white rounded-2xl overflow-hidden shadow-lg border border-primary-light/20 
                 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 cursor-pointer opacity-0"
          class:animate-fade-in-up={isVisible}
          style="animation-delay: {0.2 + index * 0.1}s"
          on:click={() => openModal(project)}
          on:keypress={(e) => e.key === 'Enter' && openModal(project)}
          role="button"
          tabindex="0"
        >
          <div class="relative h-48 bg-gradient-to-br from-primary to-primary-light overflow-hidden">
            <img 
              src={project.image} 
              alt={project.title[lang]}
              class="absolute inset-0 w-full h-full object-cover"
              loading="lazy"
              on:error={(e) => (e.currentTarget as HTMLImageElement).style.display = 'none'}
            />
            <div class="absolute inset-0 flex items-center justify-center">
              <span class="text-6xl font-bold text-white/20">{project.id.charAt(0).toUpperCase()}</span>
            </div>
            <div class="absolute inset-0 bg-primary-dark/0 group-hover:bg-primary-dark/40 transition-all duration-300 flex items-center justify-center">
              <span class="text-white font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                {lang === 'en' ? 'View Details' : 'Λεπτομέρειες'}
              </span>
            </div>
            {#if project.featured}
              <div class="absolute top-4 right-4 bg-primary-light text-white text-xs font-semibold px-3 py-1 rounded-full">
                Featured
              </div>
            {/if}
          </div>
          
          <div class="p-6">
            <h3 class="text-xl font-semibold text-primary-dark mb-2 group-hover:text-primary transition-colors">
              {project.title[lang]}
            </h3>
            <p class="text-primary-dark/60 text-sm mb-4 line-clamp-2">
              {project.description[lang]}
            </p>
            
            <div class="flex flex-wrap gap-2">
              {#each project.tags.slice(0, 3) as tag}
                <span class="text-xs font-medium bg-primary/10 text-primary px-2 py-1 rounded-full">
                  {tag}
                </span>
              {/each}
              {#if project.tags.length > 3}
                <span class="text-xs font-medium bg-primary/10 text-primary px-2 py-1 rounded-full">
                  +{project.tags.length - 3}
                </span>
              {/if}
            </div>
          </div>
        </div>
      {/each}
    </div>
  </div>
</section>

{#if isModalOpen && selectedProject}
  <div 
    class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-primary-dark/80 backdrop-blur-sm"
    on:click={closeModal}
    on:keypress={(e) => e.key === 'Enter' && closeModal()}
    role="button"
    tabindex="-1"
  >
    <div 
      class="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-fade-in-up"
      on:click|stopPropagation
      on:keypress|stopPropagation
      role="dialog"
      aria-modal="true"
      tabindex="-1"
    >
      <div class="relative h-64 bg-gradient-to-br from-primary to-primary-light">
        <img 
          src={selectedProject.image} 
          alt={selectedProject.title[lang]}
          class="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
          on:error={(e) => (e.currentTarget as HTMLImageElement).style.display = 'none'}
        />
        <div class="absolute inset-0 flex items-center justify-center">
          <span class="text-8xl font-bold text-white/20">{selectedProject.id.charAt(0).toUpperCase()}</span>
        </div>
        <button 
          class="absolute top-4 right-4 w-10 h-10 bg-white/20 hover:bg-white/40 rounded-full flex items-center justify-center transition-colors"
          on:click={closeModal}
          aria-label="Close modal"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      
      <div class="p-8">
        <h3 class="text-2xl font-bold text-primary-dark mb-4">
          {selectedProject.title[lang]}
        </h3>
        <p class="text-primary-dark/70 mb-6 leading-relaxed">
          {selectedProject.description[lang]}
        </p>
        
        <div class="flex flex-wrap gap-2 mb-8">
          {#each selectedProject.tags as tag}
            <span class="text-sm font-medium bg-primary/10 text-primary px-3 py-1.5 rounded-full">
              {tag}
            </span>
          {/each}
        </div>
        
        <div class="flex flex-wrap gap-4">
          {#if selectedProject.liveUrl}
            <a 
              href={selectedProject.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              class="btn-primary inline-flex items-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              {viewProjectText}
            </a>
          {/if}
          {#if selectedProject.githubUrl}
            <a 
              href={selectedProject.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              class="btn-secondary inline-flex items-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              {viewCodeText}
            </a>
          {/if}
        </div>
      </div>
    </div>
  </div>
{/if}

<style>
  .animate-fade-in-up {
    animation: fadeInUp 0.6s ease-out forwards;
  }
  
  @keyframes fadeInUp {
    from { opacity: 0; transform: translateY(30px); }
    to { opacity: 1; transform: translateY(0); }
  }
  
  .line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
</style>
