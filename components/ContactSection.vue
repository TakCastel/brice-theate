<template>
  <section
    id="contact"
    class="section-page contact-section w-screen h-full flex-shrink-0 py-24 bg-white z-10 border-l-[0.25px] border-black flex items-center justify-center"
  >
    <div class="max-w-4xl mx-auto px-4 lg:px-6">
      <h2
        class="section-title text-3xl md:text-4xl font-normal tracking-tight mb-16 text-center animate-on-scroll"
      >
        Contact
      </h2>

      <div class="flex flex-col items-center">
        <div class="max-w-2xl w-full">
          <!-- Introduction -->
          <p class="text-line text-lg mb-8 text-center animate-on-scroll stagger-1">
            Pour toute question, collaboration ou projet, n'hésitez pas à me contacter.
          </p>

          <!-- Formulaire de contact -->
          <form
            class="contact-form bg-white border-[0.25px] border-black p-8 animate-on-scroll stagger-2"
            @submit.prevent="handleSubmit"
          >
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <!-- Nom -->
              <div class="form-group">
                <label for="name" class="block text-sm font-medium text-gray-700 mb-2">
                  Nom *
                </label>
                <input
                  id="name"
                  v-model="form.name"
                  type="text"
                  required
                  class="w-full px-3 py-2 border border-gray-300 text-gray-900 focus:outline-none focus:ring-1 focus:ring-black focus:border-black transition-colors"
                  placeholder="Votre nom"
                  @focus="trackFormInteraction('name_focus')"
                />
              </div>

              <!-- Email -->
              <div class="form-group">
                <label for="email" class="block text-sm font-medium text-gray-700 mb-2">
                  Email *
                </label>
                <input
                  id="email"
                  v-model="form.email"
                  type="email"
                  required
                  class="w-full px-3 py-2 border border-gray-300 text-gray-900 focus:outline-none focus:ring-1 focus:ring-black focus:border-black transition-colors"
                  placeholder="votre@email.com"
                  @focus="trackFormInteraction('email_focus')"
                />
              </div>
            </div>

            <!-- Sujet -->
            <div class="form-group mb-6">
              <label for="subject" class="block text-sm font-medium text-gray-700 mb-2">
                Sujet *
              </label>
              <input
                id="subject"
                v-model="form.subject"
                type="text"
                required
                class="w-full px-3 py-2 border border-gray-300 text-gray-900 focus:outline-none focus:ring-1 focus:ring-black focus:border-black transition-colors"
                placeholder="Objet de votre message"
                @focus="trackFormInteraction('subject_focus')"
              />
            </div>

            <!-- Message -->
            <div class="form-group mb-6">
              <label for="message" class="block text-sm font-medium text-gray-700 mb-2">
                Message *
              </label>
              <textarea
                id="message"
                v-model="form.message"
                required
                rows="6"
                class="w-full px-3 py-2 border border-gray-300 text-gray-900 focus:outline-none focus:ring-1 focus:ring-black focus:border-black transition-colors resize-none"
                placeholder="Votre message..."
                @focus="trackFormInteraction('message_focus')"
              ></textarea>
            </div>

            <!-- Messages d'état -->
            <div v-if="showSuccess" class="mb-4 p-3 bg-green-50 border border-green-200 text-green-800 text-sm">
              ✓ Votre client email va s'ouvrir avec le message pré-rempli
            </div>

            <div v-if="showError" class="mb-4 p-3 bg-red-50 border border-red-200 text-red-800 text-sm">
              ⚠ Veuillez remplir tous les champs obligatoires
            </div>

            <!-- Bouton d'envoi et contact direct -->
            <div class="flex flex-col sm:flex-row gap-6 items-center">
              <button
                type="submit"
                :disabled="isSubmitting"
                class="flex-1 bg-black text-white py-3 px-6 font-medium tracking-wide transition-all duration-200 hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
                @click="trackFormInteraction('submit_attempt')"
              >
                <span v-if="!isSubmitting">Envoyer le message</span>
                <span v-else>Envoi en cours...</span>
              </button>
              
              <div class="text-center sm:text-left">
                <p class="text-gray-600 text-sm mb-2">Ou contactez-moi directement :</p>
                <a
                  href="mailto:theatebrice@gmail.com"
                  class="inline-block text-base font-medium text-black hover:text-gray-600 transition-colors border-b border-black hover:border-gray-600"
                  @click="trackContactClick('direct_email')"
                >
                  theatebrice@gmail.com
                </a>
              </div>
            </div>
          </form>

        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import { useCookieConsent } from '~/composables/useCookieConsent'

// Importation du composable cookie consent pour le tracking
const { trackEvent } = useCookieConsent()

// État du formulaire
const form = ref({
  name: '',
  email: '',
  subject: '',
  message: ''
})

const isSubmitting = ref(false)
const showSuccess = ref(false)
const showError = ref(false)

// Fonctions de tracking GTM
const trackContactClick = (method) => {
  trackEvent('contact_click', {
    contact_method: method,
    section: 'contact'
  })
}


const trackFormInteraction = (interaction) => {
  trackEvent('form_interaction', {
    form_type: 'contact',
    interaction_type: interaction,
    section: 'contact'
  })
}

const trackFormSubmission = (success) => {
  trackEvent('form_submission', {
    form_type: 'contact',
    success: success,
    section: 'contact'
  })
}

// Fonction de gestion de l'envoi
const handleSubmit = async () => {
  // Validation simple côté client
  if (!form.value.name || !form.value.email || !form.value.subject || !form.value.message) {
    showError.value = true
    setTimeout(() => showError.value = false, 5000)
    
    // Track failed submission
    trackFormSubmission(false)
    return
  }

  isSubmitting.value = true
  showError.value = false
  showSuccess.value = false

  try {
    // Pour Vercel, on va utiliser la méthode mailto enrichie
    // ou vous pouvez intégrer EmailJS ici
    
    // Option 1: Redirection vers le client email
    const subject = encodeURIComponent(form.value.subject)
    const body = encodeURIComponent(
      `Nom: ${form.value.name}\n` +
      `Email: ${form.value.email}\n\n` +
      `Message:\n${form.value.message}`
    )
    
    // Simuler un envoi avec un délai
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Track successful submission
    trackFormSubmission(true)
    
    // Ouvrir le client email
    window.location.href = `mailto:theatebrice@gmail.com?subject=${subject}&body=${body}`
    
    // Afficher le message de succès
    showSuccess.value = true
    
    // Réinitialiser le formulaire
    form.value = {
      name: '',
      email: '',
      subject: '',
      message: ''
    }
    
    // Masquer le message après 10 secondes
    setTimeout(() => showSuccess.value = false, 10000)
    
  } catch (error) {
    console.error('Erreur lors de l\'envoi:', error)
    showError.value = true
    setTimeout(() => showError.value = false, 5000)
    
    // Track failed submission
    trackFormSubmission(false)
  } finally {
    isSubmitting.value = false
  }
}
</script>

<style scoped>
/* Animations pour la section contact */
.animate-on-scroll {
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.animate-on-scroll.visible {
  opacity: 1;
  transform: translateY(0);
}

.animate-on-scroll.stagger-1.visible {
  transition-delay: 0.2s;
}

.animate-on-scroll.stagger-2.visible {
  transition-delay: 0.4s;
}

.animate-on-scroll.stagger-3.visible {
  transition-delay: 0.6s;
}

/* Styles pour le formulaire */
.contact-form {
  position: relative;
  transition: box-shadow 0.3s ease;
}

.contact-form:hover {
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
}

.form-group input,
.form-group textarea {
  background: white;
  transition: all 0.2s ease;
}

.form-group input:focus,
.form-group textarea:focus {
  transform: translateY(-1px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

/* Animation pour les messages d'état */
.success-message,
.error-message {
  animation: slideInDown 0.3s ease-out;
}

@keyframes slideInDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Responsive design */
@media (max-width: 768px) {
  .contact-form {
    padding: 1.5rem;
  }
  
  .contact-content {
    padding: 0 1rem;
  }
}
</style>