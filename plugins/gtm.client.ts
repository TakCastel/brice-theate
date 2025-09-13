// Google Tag Manager Plugin avec gestion du consentement cookies
export default defineNuxtPlugin(() => {
  const { isAllowed, hasConsent, getConsentInfo } = useCookieConsent()
  
  // Configuration GTM
  const GTM_ID = 'GTM-WCVF3GTS'
  
  // État du GTM
  let gtmLoaded = false
  let gtmInitialized = false
  
  // Initialiser le dataLayer (toujours nécessaire)
  const initializeDataLayer = () => {
    if (process.client && !window.dataLayer) {
      window.dataLayer = window.dataLayer || []
    }
  }
  
  // Charger Google Tag Manager
  const loadGTM = () => {
    if (process.client && !gtmLoaded) {
      
      // Script GTM
      const script = `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','${GTM_ID}');`
      
      // Créer et exécuter le script
      const scriptElement = document.createElement('script')
      scriptElement.innerHTML = script
      document.head.appendChild(scriptElement)
      
      gtmLoaded = true
      
      // Ajouter le noscript pour GTM
      addGTMNoscript()
    }
  }
  
  // Ajouter le noscript GTM
  const addGTMNoscript = () => {
    if (process.client && !document.querySelector('#gtm-noscript')) {
      const noscript = document.createElement('noscript')
      noscript.id = 'gtm-noscript'
      noscript.innerHTML = `<iframe src="https://www.googletagmanager.com/ns.html?id=${GTM_ID}" height="0" width="0" style="display:none;visibility:hidden"></iframe>`
      document.body.insertBefore(noscript, document.body.firstChild)
    }
  }
  
  // Configurer le consentement GTM
  const configureGTMConsent = (preferences: any) => {
    if (process.client && window.dataLayer) {
      // Configuration du consentement selon les préférences
      window.dataLayer.push({
        event: 'consent_update',
        consent: {
          analytics_storage: preferences.analytics ? 'granted' : 'denied',
          ad_storage: preferences.marketing ? 'granted' : 'denied',
          functionality_storage: 'granted', // Toujours autorisé pour les essentiels
          security_storage: 'granted', // Toujours autorisé pour les essentiels
          personalization_storage: preferences.marketing ? 'granted' : 'denied',
          wait_for_update: 500
        }
      })
    }
  }
  
  // Initialiser GTM selon les préférences
  const initializeGTM = () => {
    if (process.client) {
      const consentInfo = getConsentInfo()
      
      if (consentInfo?.hasConsent) {
        const preferences = consentInfo.preferences
        
        // Toujours initialiser le dataLayer
        initializeDataLayer()
        
        // Si analytics autorisés, charger GTM
        if (preferences.analytics) {
          loadGTM()
          
          // Attendre un peu que GTM se charge puis configurer le consentement
          setTimeout(() => {
            configureGTMConsent(preferences)
          }, 1000)
        } else {
          // Même sans analytics, on peut configurer le consentement pour plus tard
          configureGTMConsent(preferences)
        }
        
        gtmInitialized = true
      }
    }
  }
  
  // Fonction pour tracker des événements via GTM
  const trackGTMEvent = (eventName: string, parameters: any = {}) => {
    if (process.client && window.dataLayer && isAllowed('analytics')) {
      window.dataLayer.push({
        event: eventName,
        ...parameters
      })
    }
  }
  
  // Fonction pour tracker des pages vues
  const trackPageView = (page_path?: string) => {
    if (process.client && window.dataLayer && isAllowed('analytics')) {
      window.dataLayer.push({
        event: 'page_view',
        page_title: document.title,
        page_path: page_path || window.location.pathname,
        page_location: window.location.href
      })
    }
  }
  
  // Fonction pour mettre à jour le consentement
  const updateGTMConsent = (newPreferences: any) => {
    if (process.client) {
      // Si analytics vient d'être autorisé et GTM pas encore chargé
      if (newPreferences.analytics && !gtmLoaded) {
        loadGTM()
        setTimeout(() => {
          configureGTMConsent(newPreferences)
        }, 1000)
      } else if (window.dataLayer) {
        // Sinon juste mettre à jour le consentement
        configureGTMConsent(newPreferences)
      }
    }
  }
  
  // Écouter les changements de route pour tracker les pages
  const router = useRouter()
  if (process.client) {
    router.afterEach((to) => {
      // Attendre un peu que la page soit chargée
      setTimeout(() => {
        trackPageView(to.path)
      }, 500)
    })
  }
  
  // Initialiser au chargement
  initializeGTM()
  
  // Exposer les fonctions utiles
  return {
    provide: {
      gtm: {
        trackEvent: trackGTMEvent,
        trackPageView,
        updateConsent: updateGTMConsent,
        isLoaded: () => gtmLoaded,
        isInitialized: () => gtmInitialized
      }
    }
  }
})

// Types pour TypeScript
declare global {
  interface Window {
    dataLayer: any[]
  }
}
