<!--
  ============================================================================
  ContactForm.svelte - Φόρμα Επικοινωνίας
  ============================================================================
  
  ΠΕΡΙΓΡΑΦΗ:
  Φόρμα επικοινωνίας με client-side validation.
  ΣΗΜΕΙΩΣΗ: Αυτή είναι μόνο UI - δεν στέλνει πραγματικά emails.
  Για production θα χρειαστεί backend endpoint ή service όπως EmailJS.
  
  FEATURES:
  - Form validation (required fields, email format, min length)
  - Loading state με spinner
  - Success message μετά την "αποστολή"
  - Error messages ανά πεδίο
  - Responsive design
  
  PROPS:
  - title: Τίτλος section
  - subtitle: Υπότιτλος
  - namePlaceholder: Placeholder για το όνομα
  - emailPlaceholder: Placeholder για το email
  - subjectPlaceholder: Placeholder για το θέμα
  - messagePlaceholder: Placeholder για το μήνυμα
  - sendText: Text του submit button
  - successText: Μήνυμα επιτυχίας
  ============================================================================
-->

<script lang="ts">
  import { inview } from 'svelte-inview';
  
  // Props - Όλα τα κείμενα για i18n support
  export let title: string;             // "Get In Touch" / "Επικοινωνία"
  export let subtitle: string;          // Υπότιτλος
  export let namePlaceholder: string;   // "Your Name" / "Το Όνομά σου"
  export let emailPlaceholder: string;  // "Your Email" / "Το Email σου"
  export let subjectPlaceholder: string;// "Subject" / "Θέμα"
  export let messagePlaceholder: string;// "Your Message" / "Το Μήνυμά σου"
  export let sendText: string;          // "Send Message" / "Αποστολή Μηνύματος"
  export let successText: string;       // Success message
  
  // State
  let isVisible = false;                               // Animation trigger
  let formData = { name: '', email: '', subject: '', message: '' };  // Form values
  let errors: Record<string, string> = {};             // Validation errors
  let isSubmitting = false;                            // Loading state
  let isSubmitted = false;                             // Success state
  
  /**
   * Handler για inview event
   */
  const handleInview = (event: CustomEvent<{ inView: boolean }>) => {
    if (event.detail.inView) {
      isVisible = true;
    }
  };
  
  /**
   * Email validation με regex
   * Επιστρέφει true αν το email είναι valid
   */
  function validateEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
  
  /**
   * Form Validation
   * Ελέγχει όλα τα πεδία και γεμίζει το errors object
   * Επιστρέφει true αν δεν υπάρχουν errors
   */
  function validate(): boolean {
    errors = {};
    
    // Name validation
    if (!formData.name.trim()) {
      errors.name = 'Name is required';
    }
    
    // Email validation
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      errors.email = 'Invalid email address';
    }
    
    // Subject validation
    if (!formData.subject.trim()) {
      errors.subject = 'Subject is required';
    }
    
    // Message validation
    if (!formData.message.trim()) {
      errors.message = 'Message is required';
    } else if (formData.message.length < 10) {
      errors.message = 'Message must be at least 10 characters';
    }
    
    // True αν το errors object είναι άδειο
    return Object.keys(errors).length === 0;
  }
  
  /**
   * Form Submit Handler
   * 
   * ΣΗΜΕΙΩΣΗ: Αυτό είναι mock implementation!
   * Δεν στέλνει πραγματικά email.
   * Για production χρειάζεται:
   * - Backend API endpoint, ή
   * - Service όπως EmailJS, Formspree, κλπ
   */
  function handleSubmit(event: Event) {
    event.preventDefault();
    
    // Validate πρώτα
    if (!validate()) return;
    
    // Show loading state
    isSubmitting = true;
    
    // Simulate API call με setTimeout
    setTimeout(() => {
      isSubmitting = false;
      isSubmitted = true;
      
      // Clear form
      formData = { name: '', email: '', subject: '', message: '' };
      
      // Hide success message μετά από 5 δευτερόλεπτα
      setTimeout(() => { 
        isSubmitted = false; 
      }, 5000);
    }, 1500);  // 1.5s fake delay
  }
</script>

<!-- MAIN SECTION -->
<section 
  id="contact"
  class="py-20 md:py-32 bg-white"
  use:inview={{ threshold: 0.1 }}
  on:inview_change={handleInview}
>
  <div class="container mx-auto px-4 sm:px-6 lg:px-8">
    <!-- HEADER -->
    <div 
      class="text-center mb-16 opacity-0"
      class:animate-fade-in-up={isVisible}
    >
      <h2 class="section-title mb-4">{title}</h2>
      <p class="section-subtitle mx-auto">{subtitle}</p>
    </div>
    
    <div class="max-w-2xl mx-auto">
      <!-- SUCCESS STATE: Εμφανίζεται μετά την επιτυχή "αποστολή" -->
      {#if isSubmitted}
        <div class="bg-green-50 border border-green-200 rounded-2xl p-8 text-center animate-fade-in-up">
          <!-- Success Icon -->
          <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <p class="text-green-700 text-lg font-medium">{successText}</p>
        </div>
      {:else}
        <!-- FORM -->
        <form 
          on:submit={handleSubmit}
          class="bg-cream/50 rounded-2xl p-8 shadow-lg border border-primary-light/20 opacity-0"
          class:animate-fade-in-up={isVisible}
          style="animation-delay: 0.2s"
        >
          <div class="grid gap-6">
            
            <!-- NAME FIELD -->
            <div>
              <label for="name" class="block text-sm font-medium text-primary-dark mb-2">
                {namePlaceholder}
              </label>
              <input
                type="text"
                id="name"
                bind:value={formData.name}
                placeholder={namePlaceholder}
                class="w-full px-4 py-3 rounded-lg border border-primary-light/30 bg-white 
                       focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all
                       {errors.name ? 'border-red-500' : ''}"
              />
              <!-- Error message -->
              {#if errors.name}
                <p class="mt-1 text-sm text-red-500">{errors.name}</p>
              {/if}
            </div>
            
            <!-- EMAIL FIELD -->
            <div>
              <label for="email" class="block text-sm font-medium text-primary-dark mb-2">
                {emailPlaceholder}
              </label>
              <input
                type="email"
                id="email"
                bind:value={formData.email}
                placeholder={emailPlaceholder}
                class="w-full px-4 py-3 rounded-lg border border-primary-light/30 bg-white 
                       focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all
                       {errors.email ? 'border-red-500' : ''}"
              />
              {#if errors.email}
                <p class="mt-1 text-sm text-red-500">{errors.email}</p>
              {/if}
            </div>
            
            <!-- SUBJECT FIELD -->
            <div>
              <label for="subject" class="block text-sm font-medium text-primary-dark mb-2">
                {subjectPlaceholder}
              </label>
              <input
                type="text"
                id="subject"
                bind:value={formData.subject}
                placeholder={subjectPlaceholder}
                class="w-full px-4 py-3 rounded-lg border border-primary-light/30 bg-white 
                       focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all
                       {errors.subject ? 'border-red-500' : ''}"
              />
              {#if errors.subject}
                <p class="mt-1 text-sm text-red-500">{errors.subject}</p>
              {/if}
            </div>
            
            <!-- MESSAGE FIELD -->
            <div>
              <label for="message" class="block text-sm font-medium text-primary-dark mb-2">
                {messagePlaceholder}
              </label>
              <textarea
                id="message"
                bind:value={formData.message}
                placeholder={messagePlaceholder}
                rows="5"
                class="w-full px-4 py-3 rounded-lg border border-primary-light/30 bg-white 
                       focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none
                       {errors.message ? 'border-red-500' : ''}"
              ></textarea>
              {#if errors.message}
                <p class="mt-1 text-sm text-red-500">{errors.message}</p>
              {/if}
            </div>
            
            <!-- SUBMIT BUTTON -->
            <button
              type="submit"
              disabled={isSubmitting}
              class="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {#if isSubmitting}
                <!-- Loading Spinner -->
                <svg class="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Sending...</span>
              {:else}
                <!-- Send Icon -->
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

<!--
  ============================================================================
  STYLES
  ============================================================================
-->
<style>
  .animate-fade-in-up {
    animation: fadeInUp 0.6s ease-out forwards;
  }
  
  @keyframes fadeInUp {
    from { opacity: 0; transform: translateY(30px); }
    to { opacity: 1; transform: translateY(0); }
  }
</style>
