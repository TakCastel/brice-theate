export const useScrollToSection = () => {
  const scrollToSection = (sectionId) => {
    // Vérifier si on est sur la page d'accueil de manière plus robuste
    const currentPath = window.location.pathname;
    const isHomePage = currentPath === '/' || currentPath === '/index.html' || currentPath === '';
    
    // Vérifier si on a déjà une ancre dans l'URL pour éviter les boucles
    const currentHash = window.location.hash.substring(1);
    
    // Si on n'est pas sur la page d'accueil, rediriger vers l'accueil avec l'ancre
    if (!isHomePage) {
      // Utiliser navigateTo de Nuxt pour une navigation propre
      if (process.client) {
        // Rediriger vers l'accueil avec l'ancre
        window.location.href = `/#${sectionId}`;
      }
      return;
    }
    
    // Si on est déjà sur la bonne section avec l'ancre, ne pas refaire l'action
    if (currentHash === sectionId) {
      return;
    }
    
    // Mapping des sections avec leurs positions horizontales (index × largeur de viewport)
    const sectionPositions = {
      'hero': 0,         // Page d'accueil
      'biographie': 1,   // 1ère page après hero
      'creative': 2,     // 2ème page - approche créative
      'scripts': 3,      // 3ème page - projets  
      'contact': 4       // 4ème page - contact
    };
    
    // Vérifier si on est sur mobile (scroll vertical)
    const isMobile = window.innerWidth <= 768;
    
    if (isMobile) {
      // Sur mobile, scroll vertical classique
      const element = document.getElementById(sectionId);
      if (element) {
        const headerHeight = 61;
        element.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }
    } else {
      // Sur desktop, scroll horizontal
      const container = document.querySelector('.horizontal-container');
      if (container && sectionPositions.hasOwnProperty(sectionId)) {
        const pageIndex = sectionPositions[sectionId];
        const targetX = pageIndex * window.innerWidth;
        
        container.scrollTo({
          left: targetX,
          behavior: 'smooth'
        });
      }
    }
  };

  return {
    scrollToSection
  };
};