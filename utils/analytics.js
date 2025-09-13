// Utilitaires pour le tracking Google Analytics/GTM
// Facilite l'utilisation du tracking dans toute l'application

/**
 * Raccourcis pour tracker des événements communs
 */

export const trackPageView = (pagePath) => {
  const { trackPageView } = useCookieConsent()
  trackPageView(pagePath)
}

export const trackContactInteraction = (method, location = 'unknown') => {
  const { trackEvent } = useCookieConsent()
  trackEvent('contact_interaction', {
    contact_method: method,
    location: location,
    timestamp: Date.now()
  })
}

export const trackProjectEngagement = (projectName, action) => {
  const { trackEvent } = useCookieConsent()
  trackEvent('project_engagement', {
    project_name: projectName,
    action: action,
    timestamp: Date.now()
  })
}

export const trackSocialShare = (platform, content = '') => {
  const { trackEvent } = useCookieConsent()
  trackEvent('social_share', {
    platform: platform,
    content_type: content,
    timestamp: Date.now()
  })
}

export const trackDocumentDownload = (fileName, fileType) => {
  const { trackEvent } = useCookieConsent()
  trackEvent('document_download', {
    file_name: fileName,
    file_type: fileType,
    timestamp: Date.now()
  })
}

export const trackSectionView = (sectionName, timeSpent = null) => {
  const { trackEvent } = useCookieConsent()
  trackEvent('section_view', {
    section_name: sectionName,
    time_spent: timeSpent,
    timestamp: Date.now()
  })
}

/**
 * Tracking des performances (à utiliser avec parcimonie)
 */
export const trackPerformance = (metricName, value, unit = 'ms') => {
  const { trackEvent } = useCookieConsent()
  trackEvent('performance_metric', {
    metric_name: metricName,
    value: value,
    unit: unit,
    timestamp: Date.now()
  })
}

/**
 * Tracking des erreurs
 */
export const trackError = (errorType, errorMessage, location = '') => {
  const { trackEvent } = useCookieConsent()
  trackEvent('error_occurred', {
    error_type: errorType,
    error_message: errorMessage,
    location: location,
    timestamp: Date.now()
  })
}

/**
 * Helper pour debugger le tracking
 */
export const debugTracking = () => {
  if (process.client) {
    console.group('🔍 Debug Tracking GTM')
    const { $gtm } = useNuxtApp()
    
    const { getConsentInfo } = useCookieConsent()
    const consentInfo = getConsentInfo()
    console.groupEnd()
  }
}
