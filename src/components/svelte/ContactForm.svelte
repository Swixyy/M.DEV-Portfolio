<script lang="ts">
  import { inview } from 'svelte-inview';
  
  export let title: string;
  export let subtitle: string;
  export let namePlaceholder: string;
  export let emailPlaceholder: string;
  export let subjectPlaceholder: string;
  export let messagePlaceholder: string;
  export let sendText: string;
  export let successText: string;
  
  let isVisible = false;
  let formData = { name: '', email: '', subject: '', message: '' };
  let errors: Record<string, string> = {};
  let isSubmitting = false;
  let isSubmitted = false;
  
  const handleInview = (event: CustomEvent<{ inView: boolean }>) => {
    if (event.detail.inView) {
      isVisible = true;
    }
  };
  
  function validateEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
  
  function validate(): boolean {
    errors = {};
    if (!formData.name.trim()) errors.name = 'Name is required';
    if (!formData.email.trim()) errors.email = 'Email is required';
    else if (!validateEmail(formData.email)) errors.email = 'Invalid email address';
    if (!formData.subject.trim()) errors.subject = 'Subject is required';
    if (!formData.message.trim()) errors.message = 'Message is required';
    else if (formData.message.length < 10) errors.message = 'Message must be at least 10 characters';
    return Object.keys(errors).length === 0;
  }
  
  function handleSubmit(event: Event) {
    event.preventDefault();
    if (!validate()) return;
    
    isSubmitting = true;
    setTimeout(() => {
      isSubmitting = false;
      isSubmitted = true;
      formData = { name: '', email: '', subject: '', message: '' };
      setTimeout(() => { isSubmitted = false; }, 5000);
    }, 1500);
  }
</script>

<section 
  id="contact"
  class="py-20 md:py-32 bg-white"
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
    
    <div class="max-w-2xl mx-auto">
      {#if isSubmitted}
        <div class="bg-green-50 border border-green-200 rounded-2xl p-8 text-center animate-fade-in-up">
          <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <p class="text-green-700 text-lg font-medium">{successText}</p>
        </div>
      {:else}
        <form 
          on:submit={handleSubmit}
          class="bg-cream/50 rounded-2xl p-8 shadow-lg border border-primary-light/20 opacity-0"
          class:animate-fade-in-up={isVisible}
          style="animation-delay: 0.2s"
        >
          <div class="grid gap-6">
            <div>
              <label for="name" class="block text-sm font-medium text-primary-dark mb-2">{namePlaceholder}</label>
              <input
                type="text"
                id="name"
                bind:value={formData.name}
                placeholder={namePlaceholder}
                class="w-full px-4 py-3 rounded-lg border border-primary-light/30 bg-white 
                       focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all
                       {errors.name ? 'border-red-500' : ''}"
              />
              {#if errors.name}<p class="mt-1 text-sm text-red-500">{errors.name}</p>{/if}
            </div>
            
            <div>
              <label for="email" class="block text-sm font-medium text-primary-dark mb-2">{emailPlaceholder}</label>
              <input
                type="email"
                id="email"
                bind:value={formData.email}
                placeholder={emailPlaceholder}
                class="w-full px-4 py-3 rounded-lg border border-primary-light/30 bg-white 
                       focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all
                       {errors.email ? 'border-red-500' : ''}"
              />
              {#if errors.email}<p class="mt-1 text-sm text-red-500">{errors.email}</p>{/if}
            </div>
            
            <div>
              <label for="subject" class="block text-sm font-medium text-primary-dark mb-2">{subjectPlaceholder}</label>
              <input
                type="text"
                id="subject"
                bind:value={formData.subject}
                placeholder={subjectPlaceholder}
                class="w-full px-4 py-3 rounded-lg border border-primary-light/30 bg-white 
                       focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all
                       {errors.subject ? 'border-red-500' : ''}"
              />
              {#if errors.subject}<p class="mt-1 text-sm text-red-500">{errors.subject}</p>{/if}
            </div>
            
            <div>
              <label for="message" class="block text-sm font-medium text-primary-dark mb-2">{messagePlaceholder}</label>
              <textarea
                id="message"
                bind:value={formData.message}
                placeholder={messagePlaceholder}
                rows="5"
                class="w-full px-4 py-3 rounded-lg border border-primary-light/30 bg-white 
                       focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none
                       {errors.message ? 'border-red-500' : ''}"
              ></textarea>
              {#if errors.message}<p class="mt-1 text-sm text-red-500">{errors.message}</p>{/if}
            </div>
            
            <button
              type="submit"
              disabled={isSubmitting}
              class="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {#if isSubmitting}
                <svg class="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Sending...</span>
              {:else}
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
                <span>{sendText}</span>
              {/if}
            </button>
          </div>
        </form>
      {/if}
    </div>
  </div>
</section>

<style>
  .animate-fade-in-up {
    animation: fadeInUp 0.6s ease-out forwards;
  }
  
  @keyframes fadeInUp {
    from { opacity: 0; transform: translateY(30px); }
    to { opacity: 1; transform: translateY(0); }
  }
</style>
