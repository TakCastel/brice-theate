<template>
  <section
    id="contact"
    class="section-page contact-section w-screen h-full flex-shrink-0 py-24 bg-white z-10 border-l-[0.25px] border-black flex items-center justify-center"
  >
    <div class="max-w-4xl mx-auto px-4 lg:px-6">
      <h2
        class="section-title contact-content text-3xl md:text-4xl font-normal tracking-tight mb-16 text-center animate-on-scroll"
      >
        Contact
      </h2>

      <div class="flex flex-col items-center">
        <div class="contact-content max-w-2xl w-full">
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
                  type="text"
                  id="name"
                  name="name"
                  required
                  v-model="form.name"
                  class="w-full px-3 py-2 border border-gray-300 focus:border-black focus:ring-1 focus:ring-black transition-colors outline-none"
                  placeholder="Votre nom"
                />
              </div>

              <!-- Email -->
              <div class="form-group">
                <label for="email" class="block text-sm font-medium text-gray-700 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  v-model="form.email"
                  class="w-full px-3 py-2 border border-gray-300 focus:border-black focus:ring-1 focus:ring-black transition-colors outline-none"
                  placeholder="votre@email.com"
                />
              </div>
            </div>

            <!-- Sujet -->
            <div class="form-group mb-6">
              <label for="subject" class="block text-sm font-medium text-gray-700 mb-2">
                Sujet *
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                required
                v-model="form.subject"
                class="w-full px-3 py-2 border border-gray-300 focus:border-black focus:ring-1 focus:ring-black transition-colors outline-none"
                placeholder="Objet de votre message"
              />
            </div>

            <!-- Message -->
            <div class="form-group mb-6">
              <label for="message" class="block text-sm font-medium text-gray-700 mb-2">
                Message *
              </label>
              <textarea
                id="message"
                name="message"
                required
                v-model="form.message"
                rows="6"
                class="w-full px-3 py-2 border border-gray-300 focus:border-black focus:ring-1 focus:ring-black transition-colors outline-none resize-vertical"
                placeholder="Décrivez votre projet, vos questions ou vos idées de collaboration..."
              ></textarea>
            </div>

            <!-- Note de confidentialité -->
            <div class="mb-6 text-center">
              <p class="text-sm text-gray-500">
                Vos données sont utilisées uniquement pour vous répondre et ne sont jamais partagées.
              </p>
            </div>

            <!-- Bouton d'envoi -->
            <div class="flex flex-col sm:flex-row gap-4 items-center justify-between">
              <button
                type="submit"
                :disabled="isSubmitting"
                class="action-button bg-black text-white px-8 py-3 font-normal tracking-wider hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                <span v-if="!isSubmitting">Envoyer le message</span>
                <span v-else>Envoi en cours...</span>
                <svg v-if="isSubmitting" class="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </button>

              <!-- Contact direct -->
              <a
                href="mailto:theatebrice@gmail.com"
                class="text-sm text-gray-600 hover:text-black transition-colors underline"
              >
                ou écrivez directement à theatebrice@gmail.com
              </a>
            </div>

            <!-- Message de confirmation -->
            <div v-if="showSuccess" class="mt-6 p-4 bg-green-50 border border-green-200 text-green-800 text-center">
              ✓ Votre message a été envoyé avec succès ! Je vous répondrai dans les plus brefs délais.
            </div>

            <div v-if="showError" class="mt-6 p-4 bg-red-50 border border-red-200 text-red-800 text-center">
              ✗ Une erreur s'est produite. Veuillez réessayer ou envoyer un email directement.
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue';

// État du formulaire
const form = ref({
  name: '',
  email: '',
  subject: '',
  message: ''
});

const isSubmitting = ref(false);
const showSuccess = ref(false);
const showError = ref(false);

// Fonction de gestion de l'envoi
const handleSubmit = async () => {
  // Validation simple côté client
  if (!form.value.name || !form.value.email || !form.value.subject || !form.value.message) {
    showError.value = true;
    setTimeout(() => showError.value = false, 5000);
    return;
  }

  isSubmitting.value = true;
  showError.value = false;
  showSuccess.value = false;

  try {
    // Pour Vercel, on va utiliser la méthode mailto enrichie
    // ou vous pouvez intégrer EmailJS ici
    
    // Option 1: Redirection vers le client email
    const subject = encodeURIComponent(form.value.subject);
    const body = encodeURIComponent(
      `Nom: ${form.value.name}\n` +
      `Email: ${form.value.email}\n\n` +
      `Message:\n${form.value.message}`
    );
    
    // Simuler un envoi avec un délai
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Ouvrir le client email
    window.location.href = `mailto:theatebrice@gmail.com?subject=${subject}&body=${body}`;
    
    // Afficher le message de succès
    showSuccess.value = true;
    
    // Réinitialiser le formulaire
    form.value = {
      name: '',
      email: '',
      subject: '',
      message: ''
    };
    
  } catch (error) {
    console.error('Erreur lors de l\'envoi:', error);
    showError.value = true;
  } finally {
    isSubmitting.value = false;
    
    // Masquer les messages après 5 secondes
    setTimeout(() => {
      showSuccess.value = false;
      showError.value = false;
    }, 5000);
  }
};
</script>
