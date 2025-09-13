import { ref, computed } from 'vue'

// État global pour la gestion des cookies
const cookieConsent = ref(null)
const cookiePreferences = ref({
  essential: true,
  analytics: false,
  marketing: false
})

// Clés pour le localStorage
const CONSENT_KEY = 'brice-theatre-cookie-consent'
const PREFERENCES_KEY = 'brice-theatre-cookie-preferences'

export const useCookieConsent = () => {
  // Vérifier si l'utilisateur a donné son consentement
  const hasConsent = computed(() => {
    if (process.client) {
      return localStorage.getItem(CONSENT_KEY) !== null
    }
    return false
  })

  // Obtenir les préférences actuelles
  const getPreferences = () => {
    if (process.client) {
      const stored = localStorage.getItem(PREFERENCES_KEY)
      if (stored) {
        return JSON.parse(stored)
      }
    }
    return {
      essential: true,
      analytics: false,
      marketing: false
    }
  }

  // Sauvegarder les préférences
  const savePreferences = (preferences) => {
    if (process.client) {
      const timestamp = new Date().toISOString()
      localStorage.setItem(CONSENT_KEY, timestamp)
      localStorage.setItem(PREFERENCES_KEY, JSON.stringify(preferences))
      cookiePreferences.value = preferences
      applyCookieSettings(preferences)
      
      // Notifier GTM des changements de consentement
      notifyGTMConsentChange(preferences)
    }
  }

  // Notifier GTM des changements de consentement
  const notifyGTMConsentChange = (preferences) => {
    if (process.client && window.dataLayer) {
      // Utiliser le plugin GTM si disponible
      const { $gtm } = useNuxtApp()
      if ($gtm && $gtm.updateConsent) {
        $gtm.updateConsent(preferences)
      }
    }
  }

  // Appliquer les paramètres selon les préférences
  const applyCookieSettings = (preferences) => {
    if (process.client) {
      // Gestion Google Analytics ou autres services d'analytics
      if (preferences.analytics) {
        enableAnalytics()
      } else {
        disableAnalytics()
      }

      // Gestion des cookies marketing
      if (preferences.marketing) {
        enableMarketing()
      } else {
        disableMarketing()
      }
    }
  }

  // Activer Google Analytics
  const enableAnalytics = () => {
    if (process.client && window.dataLayer) {
      // GTM gère maintenant les analytics
      window.dataLayer.push({
        event: 'analytics_consent_granted'
      })
    }
  }

  // Désactiver Google Analytics
  const disableAnalytics = () => {
    if (process.client && window.dataLayer) {
      // GTM gère maintenant les analytics
      window.dataLayer.push({
        event: 'analytics_consent_denied'
      })
    }
  }

  // Activer le marketing
  const enableMarketing = () => {
    if (process.client && window.dataLayer) {
      window.dataLayer.push({
        event: 'marketing_consent_granted'
      })
    }
  }

  // Désactiver le marketing
  const disableMarketing = () => {
    if (process.client && window.dataLayer) {
      window.dataLayer.push({
        event: 'marketing_consent_denied'
      })
    }
  }

  // Vérifier si un type de cookie est autorisé
  const isAllowed = (cookieType) => {
    const prefs = getPreferences()
    return prefs[cookieType] || false
  }

  // Réinitialiser le consentement (pour debug)
  const resetConsent = () => {
    if (process.client) {
      localStorage.removeItem(CONSENT_KEY)
      localStorage.removeItem(PREFERENCES_KEY)
      cookiePreferences.value = {
        essential: true,
        analytics: false,
        marketing: false
      }
      
      // Notifier GTM du reset
      if (window.dataLayer) {
        window.dataLayer.push({
          event: 'consent_reset'
        })
      }
    }
  }

  // Initialiser les paramètres au chargement
  const initializeCookies = () => {
    if (process.client) {
      const preferences = getPreferences()
      cookiePreferences.value = preferences
      if (hasConsent.value) {
        applyCookieSettings(preferences)
      }
    }
  }

  // Obtenir des informations sur le consentement
  const getConsentInfo = () => {
    if (process.client) {
      const consentDate = localStorage.getItem(CONSENT_KEY)
      const preferences = getPreferences()
      
      return {
        hasConsent: hasConsent.value,
        consentDate: consentDate ? new Date(consentDate) : null,
        preferences: preferences
      }
    }
    return null
  }

  // Fonctions utiles pour GTM
  const trackEvent = (eventName, parameters = {}) => {
    if (process.client && isAllowed('analytics')) {
      const { $gtm } = useNuxtApp()
      if ($gtm && $gtm.trackEvent) {
        $gtm.trackEvent(eventName, parameters)
      }
    }
  }

  const trackPageView = (path) => {
    if (process.client && isAllowed('analytics')) {
      const { $gtm } = useNuxtApp()
      if ($gtm && $gtm.trackPageView) {
        $gtm.trackPageView(path)
      }
    }
  }

  return {
    hasConsent,
    cookiePreferences,
    getPreferences,
    savePreferences,
    applyCookieSettings,
    isAllowed,
    resetConsent,
    initializeCookies,
    getConsentInfo,
    trackEvent,
    trackPageView
  }
}

// Fonction utilitaire pour définir un cookie de manière conditionnelle
export const setCookieIfAllowed = (name, value, options = {}, requiredConsent = 'analytics') => {
  const { isAllowed } = useCookieConsent()
  
  if (isAllowed(requiredConsent) || requiredConsent === 'essential') {
    if (process.client) {
      document.cookie = `${name}=${value}; ${Object.entries(options).map(([k, v]) => `${k}=${v}`).join('; ')}`
    }
  }
}

// Fonction utilitaire pour obtenir un cookie
export const getCookie = (name) => {
  if (process.client) {
    const value = `; ${document.cookie}`
    const parts = value.split(`; ${name}=`)
    if (parts.length === 2) return parts.pop().split(';').shift()
  }
  return null
}