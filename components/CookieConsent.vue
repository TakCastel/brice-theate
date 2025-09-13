<template>
  <Transition
    enter-active-class="transition-all duration-500 ease-out"
    enter-from-class="opacity-0 transform translate-y-full"
    enter-to-class="opacity-100 transform translate-y-0"
    leave-active-class="transition-all duration-300 ease-in"
    leave-from-class="opacity-100 transform translate-y-0"
    leave-to-class="opacity-0 transform translate-y-full"
  >
    <div
      v-if="showConsent"
      class="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:max-w-md z-50"
    >
      <div class="cookie-consent-card relief-card-border bg-white p-4 rounded-none">
        <!-- Titre avec style scénariste -->
        <div class="mb-3">
          <h3 class="text-sm font-medium text-gray-900 mb-1 screenplay-title">
            Gestion des cookies
          </h3>
          <p class="text-xs text-gray-600 leading-relaxed">
            Ce site utilise des cookies pour améliorer votre expérience de navigation et analyser nos performances. 
            Comme dans un bon scénario, chaque détail a son importance.
          </p>
        </div>

        <!-- Boutons d'action -->
        <div class="flex flex-col sm:flex-row gap-2 mt-4">
          <button
            @click="acceptAll"
            class="screenplay-button-primary flex-1 px-3 py-2 bg-black text-white text-xs font-medium hover:bg-gray-800 transition-colors duration-200"
          >
            Accepter tout
          </button>
          <button
            @click="showDetails = !showDetails"
            class="screenplay-button-secondary px-3 py-2 border border-gray-300 text-gray-700 text-xs font-medium hover:bg-gray-50 transition-colors duration-200"
          >
            {{ showDetails ? 'Masquer' : 'Personnaliser' }}
          </button>
          <button
            @click="refuseAll"
            class="screenplay-button-refuse px-3 py-2 text-gray-500 text-xs font-medium hover:text-gray-700 transition-colors duration-200"
          >
            Refuser
          </button>
        </div>

        <!-- Détails des cookies (déplié) -->
        <Transition
          enter-active-class="transition-all duration-300 ease-out"
          enter-from-class="opacity-0 max-h-0"
          enter-to-class="opacity-100 max-h-96"
          leave-active-class="transition-all duration-200 ease-in"
          leave-from-class="opacity-100 max-h-96"
          leave-to-class="opacity-0 max-h-0"
        >
          <div v-if="showDetails" class="mt-4 pt-4 border-t border-gray-200 overflow-hidden">
            <div class="space-y-3">
              <!-- Cookies essentiels -->
              <div class="cookie-category">
                <div class="flex items-center justify-between">
                  <label class="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      v-model="localPreferences.essential"
                      disabled
                      class="sr-only"
                    >
                    <div class="custom-checkbox essential mr-2"></div>
                    <span class="text-xs font-medium text-gray-900">Essentiels</span>
                  </label>
                  <span class="text-xs text-gray-500">Obligatoire</span>
                </div>
                <p class="text-xs text-gray-500 mt-1 ml-6">
                  Nécessaires au fonctionnement du site (sécurité, préférences)
                </p>
              </div>

              <!-- Cookies analytiques -->
              <div class="cookie-category">
                <div class="flex items-center justify-between">
                  <label class="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      v-model="localPreferences.analytics"
                      class="sr-only"
                    >
                    <div class="custom-checkbox" :class="{ active: localPreferences.analytics }"></div>
                    <span class="text-xs font-medium text-gray-900 ml-2">Analytiques</span>
                  </label>
                </div>
                <p class="text-xs text-gray-500 mt-1 ml-6">
                  Nous aident à comprendre comment vous utilisez le site
                </p>
              </div>

              <!-- Cookies marketing -->
              <div class="cookie-category">
                <div class="flex items-center justify-between">
                  <label class="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      v-model="localPreferences.marketing"
                      class="sr-only"
                    >
                    <div class="custom-checkbox" :class="{ active: localPreferences.marketing }"></div>
                    <span class="text-xs font-medium text-gray-900 ml-2">Marketing</span>
                  </label>
                </div>
                <p class="text-xs text-gray-500 mt-1 ml-6">
                  Pour personnaliser et améliorer nos communications
                </p>
              </div>
            </div>

            <!-- Boutons de validation pour les préférences -->
            <div class="flex gap-2 mt-4">
              <button
                @click="savePreferences"
                class="screenplay-button-primary flex-1 px-3 py-2 bg-black text-white text-xs font-medium hover:bg-gray-800 transition-colors duration-200"
              >
                Sauvegarder mes choix
              </button>
            </div>
          </div>
        </Transition>

        <!-- Liens légaux -->
        <div class="flex gap-3 mt-3 pt-3 border-t border-gray-100">
          <a
            href="/politique-confidentialite"
            class="text-xs text-gray-500 hover:text-gray-700 transition-colors"
          >
            Politique de confidentialité
          </a>
          <a
            href="/mentions-legales"
            class="text-xs text-gray-500 hover:text-gray-700 transition-colors"
          >
            Mentions légales
          </a>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useCookieConsent } from '~/composables/useCookieConsent'

// État de la bannière
const showConsent = ref(false)
const showDetails = ref(false)

// Utiliser le composable de gestion des cookies
const { 
  hasConsent, 
  cookiePreferences,
  getPreferences, 
  savePreferences: saveCookiePreferences,
  initializeCookies,
  resetConsent
} = useCookieConsent()

// Préférences locales pour la gestion du formulaire
const localPreferences = ref({
  essential: true, // Toujours true, obligatoire
  analytics: false,
  marketing: false
})

// Initialiser les préférences locales
const initializeLocalPreferences = () => {
  const currentPrefs = getPreferences()
  localPreferences.value = { ...currentPrefs }
}

// Accepter tous les cookies
const acceptAll = () => {
  const allAccepted = {
    essential: true,
    analytics: true,
    marketing: true
  }
  saveCookiePreferences(allAccepted)
  showConsent.value = false
  
  // Afficher un message de confirmation
  if (process.client) {
  }
}

// Refuser tous les cookies (sauf essentiels)
const refuseAll = () => {
  const essentialOnly = {
    essential: true,
    analytics: false,
    marketing: false
  }
  saveCookiePreferences(essentialOnly)
  showConsent.value = false
  
  if (process.client) {
  }
}

// Sauvegarder les préférences personnalisées
const savePreferences = () => {
  saveCookiePreferences(localPreferences.value)
  showConsent.value = false
  showDetails.value = false
  
  if (process.client) {
  }
}

// Fonction utilitaire pour basculer les préférences
const togglePreference = (type) => {
  if (type !== 'essential') { // Essential ne peut pas être désactivé
    localPreferences.value[type] = !localPreferences.value[type]
  }
}

// Au montage du composant
onMounted(() => {
  // Initialiser le système de cookies
  initializeCookies()
  initializeLocalPreferences()
  
  // Vérifier si on doit afficher la bannière
  setTimeout(() => {
    if (!hasConsent.value) {
      showConsent.value = true
    }
  }, 2000) // Afficher après 2 secondes pour ne pas gêner l'UX initiale
})

// Exposer des fonctions globales pour le développement et les tests
if (process.client) {
  window.resetCookieConsent = () => {
    resetConsent()
    showConsent.value = true
    showDetails.value = false
    initializeLocalPreferences()
  }
  
  window.showCookieConsent = () => {
    showConsent.value = true
  }
}
</script>

<style scoped>
/* Styles pour le cookie consent avec thème écriture de scénarios */
.cookie-consent-card {
  font-family: "Work Sans", sans-serif;
  backdrop-filter: blur(8px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  background: linear-gradient(145deg, #ffffff 0%, #fafafa 100%);
}

/* Titre avec style scénariste */
.screenplay-title {
  position: relative;
  letter-spacing: 0.02em;
}

.screenplay-title::before {
  content: '';
  position: absolute;
  left: -8px;
  top: 50%;
  transform: translateY(-50%);
  width: 3px;
  height: 12px;
  background: linear-gradient(to bottom, #000 0%, #666 100%);
  border-radius: 1px;
}

/* Boutons avec style écriture */
.screenplay-button-primary {
  position: relative;
  border: 1px solid #000;
  transition: all 0.2s ease;
  font-weight: 500;
  letter-spacing: 0.01em;
}

.screenplay-button-primary:hover {
  transform: translateY(-1px);
  box-shadow: 2px 2px 0px #666;
  background: #1a1a1a;
}

.screenplay-button-secondary {
  position: relative;
  transition: all 0.2s ease;
  border: 1px solid #d1d5db;
  font-weight: 500;
  letter-spacing: 0.01em;
}

.screenplay-button-secondary:hover {
  transform: translateY(-1px);
  box-shadow: 1px 1px 0px #ccc;
  border-color: #9ca3af;
}

.screenplay-button-refuse {
  position: relative;
  transition: all 0.2s ease;
  font-weight: 400;
}

.screenplay-button-refuse:hover {
  text-decoration: underline;
  text-decoration-thickness: 1px;
  text-underline-offset: 2px;
}

/* Checkboxes personnalisées */
.custom-checkbox {
  width: 16px;
  height: 16px;
  border: 1px solid #000;
  background: white;
  position: relative;
  transition: all 0.2s ease;
  flex-shrink: 0;
}

.custom-checkbox.essential {
  background: #000;
  border-color: #000;
}

.custom-checkbox.essential::after {
  content: '✓';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  font-size: 10px;
  font-weight: bold;
}

.custom-checkbox.active {
  background: #000;
  border-color: #000;
}

.custom-checkbox.active::after {
  content: '✓';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  font-size: 10px;
  font-weight: bold;
}

/* Style pour les catégories de cookies */
.cookie-category {
  padding: 8px 0;
}

.cookie-category:not(:last-child) {
  border-bottom: 1px solid #f3f4f6;
}

/* Animation d'apparition style écriture */
.cookie-consent-card {
  animation: screenplay-entrance 0.6s ease-out;
}

@keyframes screenplay-entrance {
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  60% {
    opacity: 0.9;
    transform: translateY(-2px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Effet de frappe pour le titre */
.screenplay-title {
  animation: typewriter-effect 0.8s ease-out;
}

@keyframes typewriter-effect {
  0% {
    width: 0;
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    width: 100%;
    opacity: 1;
  }
}

/* Responsive adjustments */
@media (max-width: 640px) {
  .cookie-consent-card {
    margin: 0;
  }
  
  .theatre-button-primary,
  .theatre-button-secondary,
  .theatre-button-refuse {
    text-align: center;
  }
}
</style>
