export default defineNuxtPlugin(() => {
  // Plugin pour gérer l'intégration des services analytiques selon les préférences cookies
  
  const { isAllowed, hasConsent, getConsentInfo } = useCookieConsent()
  
  // Initialiser Google Analytics si autorisé
  const initializeAnalytics = () => {
    if (hasConsent.value && isAllowed('analytics')) {
      
      // Exemple d'intégration Google Analytics
      // Remplacez 'GA_MEASUREMENT_ID' par votre vrai ID
      /*
      const script = document.createElement('script')
      script.async = true
      script.src = 'https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID'
      document.head.appendChild(script)
      
      window.dataLayer = window.dataLayer || []
      function gtag(...args: any[]) {
        window.dataLayer.push(args)
      }
      gtag('js', new Date())
      gtag('config', 'GA_MEASUREMENT_ID', {
        anonymize_ip: true,
        cookie_flags: 'max-age=7200;secure;samesite=none'
      })
      */
    }
  }
  
  // Initialiser d'autres services marketing si autorisés
  const initializeMarketing = () => {
    if (hasConsent.value && isAllowed('marketing')) {
      
      // Exemple d'intégration Facebook Pixel
      /*
      !(function(f, b, e, v, n, t, s) {
        if (f.fbq) return
        n = f.fbq = function() {
          n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments)
        }
        if (!f._fbq) f._fbq = n
        n.push = n
        n.loaded = !0
        n.version = '2.0'
        n.queue = []
        t = b.createElement(e)
        t.async = !0
        t.src = v
        s = b.getElementsByTagName(e)[0]
        s.parentNode.insertBefore(t, s)
      })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js')
      
      fbq('init', 'YOUR_PIXEL_ID')
      fbq('track', 'PageView')
      */
    }
  }
  
  // Écouter les changements de consentement
  const checkAndInitializeServices = () => {
    if (process.client) {
      const consentInfo = getConsentInfo()
      
      if (consentInfo?.hasConsent) {
        initializeAnalytics()
        initializeMarketing()
      }
    }
  }
  
  // Fonction pour tracker des événements de manière conditionnelle
  const trackEvent = (eventName: string, parameters: any = {}, requiredConsent: string = 'analytics') => {
    if (isAllowed(requiredConsent)) {
      
      // Exemple avec Google Analytics
      // if (window.gtag) {
      //   gtag('event', eventName, parameters)
      // }
      
      // Exemple avec Facebook Pixel pour le marketing
      // if (requiredConsent === 'marketing' && window.fbq) {
      //   fbq('track', eventName, parameters)
      // }
    }
  }
  
  // Initialiser les services au chargement
  checkAndInitializeServices()
  
  // Exposer des fonctions utiles globalement
  return {
    provide: {
      trackEvent,
      initializeAnalytics,
      initializeMarketing
    }
  }
})
