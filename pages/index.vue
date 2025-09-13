<template>
  <div class="min-h-screen text-black bg-white">
    <!-- Header -->
    <AppHeader />

    <!-- Main horizontal container -->
    <main class="horizontal-container pt-20 pb-16 h-screen overflow-x-auto overflow-y-hidden">
      <div class="horizontal-sections flex h-full">
        <!-- Hero Section -->
        <HeroSection />

        <!-- Section Biographie -->
        <BiographySection />

        <!-- Section Approche créative -->
        <CreativeApproachSection />

        <!-- Projets -->
        <ProjectsSection />

        <!-- Contact -->
        <ContactSection />
      </div>
    </main>

    <!-- Indicateurs de navigation horizontale -->
    <HorizontalNavIndicator />

    <!-- Barre de navigation vers footer -->
    <div 
      class="footer-scroll-bar absolute bottom-0 left-0 right-0 h-16 z-10 border-t-[0.25px] border-black transition-all duration-300 hidden md:block"
      style="background-color: #f8f7f4"
      @mouseenter="enableFooterScrollMode"
      @mouseleave="disableFooterScrollMode"
    >
    </div>

    <!-- Footer -->
    <AppFooter />
  </div>
</template>

<script setup>
import AppHeader from "~/components/AppHeader.vue";
import HeroSection from "~/components/HeroSection.vue";
import BiographySection from "~/components/BiographySection.vue";
import CreativeApproachSection from "~/components/CreativeApproachSection.vue";
import ProjectsSection from "~/components/ProjectsSection.vue";
import ContactSection from "~/components/ContactSection.vue";
import AppFooter from "~/components/AppFooter.vue";
import HorizontalNavIndicator from "~/components/HorizontalNavIndicator.vue";
import { useScrollToSection } from "~/composables/useScrollToSection";

// Variables pour la navigation au scroll
let currentSectionIndex = ref(0);
let lastSectionBeforeFooter = 0; // Sauvegarde de la section avant d'aller au footer
let isScrolling = false;
let isFooterScrollMode = ref(false);
const SCROLL_DEBOUNCE = 600; // Délai en ms entre les scrolls (réduit pour plus de fluidité)
let navigationTimeout = null;

// Variable pour éviter les appels récursifs
let isHandlingHashNavigation = false;

// Gérer la navigation depuis une ancre URL
const handleHashNavigation = () => {
  // Éviter les appels récursifs
  if (isHandlingHashNavigation) {
    return;
  }
  
  const hash = window.location.hash.substring(1); // Enlever le #
  if (hash) {
    isHandlingHashNavigation = true;
    
    // S'assurer qu'on reste en haut de la page d'abord
    window.scrollTo(0, 0);
    
    // Mettre à jour les indices de section selon la destination
    const sectionPositions = {
      'hero': 0,
      'biographie': 1,
      'creative': 2,
      'scripts': 3,
      'contact': 4
    };
    
    if (sectionPositions.hasOwnProperty(hash)) {
      currentSectionIndex.value = sectionPositions[hash];
      lastSectionBeforeFooter = currentSectionIndex.value;
    }
    
    // Attendre que le DOM soit prêt et que la page soit stabilisée
    setTimeout(() => {
      const { scrollToSection } = useScrollToSection();
      scrollToSection(hash);
      
      // Libérer le verrou après un délai
      setTimeout(() => {
        isHandlingHashNavigation = false;
      }, 1000);
    }, 200);
  }
};

// Navigation et gestion des événements
onMounted(() => {
  // Gérer la navigation depuis l'URL avec ancre au premier chargement seulement
  handleHashNavigation();
  
  // Écouter les changements d'ancre (pour navigation depuis d'autres pages)
  window.addEventListener('hashchange', handleHashNavigation);
  
  // Navigation au scroll avec la molette
  setupWheelNavigation();
});

const setupWheelNavigation = () => {
  const horizontalContainer = document.querySelector('.horizontal-container');
  const sections = document.querySelectorAll('.section-page');
  const footer = document.querySelector('footer');
  
  if (!horizontalContainer || !sections.length) return;

  // Variable pour détecter si l'utilisateur utilise le touch
  let isUsingTouch = false;
  
  // Détecter l'utilisation du touch pour désactiver temporairement la navigation wheel
  const handleTouchStart = () => {
    isUsingTouch = true;
    setTimeout(() => {
      isUsingTouch = false;
    }, 500); // Reset après 500ms sans touch
  };
  
  document.addEventListener('touchstart', handleTouchStart, { passive: true });

  // Fonction pour détecter la section actuelle basée sur la position de scroll
  const updateCurrentSection = () => {
    const scrollLeft = horizontalContainer.scrollLeft;
    const sectionWidth = window.innerWidth;
    const newIndex = Math.round(scrollLeft / sectionWidth);
    
    if (newIndex !== currentSectionIndex.value && newIndex >= 0 && newIndex < sections.length) {
      currentSectionIndex.value = newIndex;
      lastSectionBeforeFooter = newIndex;
    }
  };

  // Écouter les changements de scroll pour mettre à jour la position
  let scrollTimeout;
  horizontalContainer.addEventListener('scroll', () => {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(updateCurrentSection, 100);
  });

  const handleWheel = (e) => {
    // Éviter les scrolls trop rapides
    if (isScrolling) {
      e.preventDefault();
      return;
    }

    // Si l'utilisateur vient d'utiliser le touch, ignorer temporairement
    if (isUsingTouch) {
      return;
    }

    // Protection contre les gestes de swipe horizontaux sur trackpad
    // Les utilisateurs peuvent instinctivement essayer de swiper gauche/droite
    // mais cela génère des événements wheel avec deltaX qui peuvent perturber la navigation
    const deltaX = Math.abs(e.deltaX);
    const deltaY = Math.abs(e.deltaY);
    
    // Si le mouvement horizontal domine (swipe gauche/droite), on l'ignore
    // Seuil de 10px pour éviter les faux positifs sur les mouvements diagonaux légers
    if (deltaX > deltaY && deltaX > 10) {
      // C'est un swipe horizontal intentionnel, on l'ignore pour éviter les bugs
      e.preventDefault();
      return;
    }
    
    // Ignorer les mouvements verticaux trop faibles (tremblements, micro-mouvements)
    // Seuil de 5px pour filtrer les gestes involontaires
    if (deltaY < 5) {
      return;
    }

    // Mode footer : scroll vers le footer uniquement
    if (isFooterScrollMode.value) {
      e.preventDefault();
      const deltaYValue = e.deltaY;
      
      if (deltaYValue > 0) {
        // Scroll vers le bas -> aller au footer
        if (window.pageYOffset === 0) {
          lastSectionBeforeFooter = currentSectionIndex.value; // Sauvegarder la section actuelle
          scrollToFooter();
        }
      } else {
        // Scroll vers le haut -> revenir du footer
        if (window.pageYOffset > 0) {
          scrollBackFromFooter();
        }
      }
      return;
    }

    // Mode navigation horizontale normal
    const deltaYValue = e.deltaY;
    const isScrollingDown = deltaYValue > 0;
    const isScrollingUp = deltaYValue < 0;

    // Navigation vers la droite (scroll vers le bas)
    if (isScrollingDown) {
      if (currentSectionIndex.value < sections.length - 1) {
        e.preventDefault();
        currentSectionIndex.value++;
        lastSectionBeforeFooter = currentSectionIndex.value; // Sauvegarder la section actuelle
        scrollToSection(currentSectionIndex.value);
      } else if (currentSectionIndex.value === sections.length - 1) {
        // À la dernière section, scroll vers le footer
        e.preventDefault();
        lastSectionBeforeFooter = currentSectionIndex.value; // Sauvegarder la section actuelle
        scrollToFooter();
      }
    }
    // Navigation vers la gauche (scroll vers le haut)
    else if (isScrollingUp) {
      // Si on est au footer, revenir à la dernière section
      if (window.pageYOffset > 0) {
        e.preventDefault();
        scrollBackFromFooter();
      } else if (currentSectionIndex.value > 0) {
        e.preventDefault();
        currentSectionIndex.value--;
        lastSectionBeforeFooter = currentSectionIndex.value; // Sauvegarder la section actuelle
        scrollToSection(currentSectionIndex.value);
      }
    }
  };

  const scrollToSection = (index) => {
    if (isScrolling) return;
    
    isScrolling = true;
    const targetScrollLeft = index * window.innerWidth;
    
    // Annuler tout timeout de navigation précédent
    if (navigationTimeout) {
      clearTimeout(navigationTimeout);
    }
    
    horizontalContainer.scrollTo({
      left: targetScrollLeft,
      behavior: 'smooth'
    });

    navigationTimeout = setTimeout(() => {
      isScrolling = false;
      // Vérifier et corriger la position finale
      const actualIndex = Math.round(horizontalContainer.scrollLeft / window.innerWidth);
      if (actualIndex !== currentSectionIndex.value) {
        currentSectionIndex.value = actualIndex;
        lastSectionBeforeFooter = actualIndex;
      }
    }, SCROLL_DEBOUNCE);
  };

  const scrollToFooter = () => {
    isScrolling = true;
    
    // Scroll vertical vers le footer
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    });

    setTimeout(() => {
      isScrolling = false;
    }, SCROLL_DEBOUNCE);
  };

  const scrollBackFromFooter = () => {
    if (isScrolling) return;
    
    isScrolling = true;
    currentSectionIndex.value = lastSectionBeforeFooter; // Revenir à la section sauvegardée
    
    // Revenir en haut de page et à la dernière section affichée
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });

    setTimeout(() => {
      const targetScrollLeft = currentSectionIndex.value * window.innerWidth;
      horizontalContainer.scrollTo({
        left: targetScrollLeft,
        behavior: 'smooth'
      });
      
      setTimeout(() => {
        isScrolling = false;
      }, 300);
    }, 300);
  };

  // Écouter les événements de scroll sur desktop uniquement
  if (window.innerWidth > 768) {
    // Utiliser { passive: false } pour pouvoir faire preventDefault sur les swipes horizontaux
    document.addEventListener('wheel', handleWheel, { passive: false });
    
    // Nettoyer l'event listener au démontage
    onUnmounted(() => {
      document.removeEventListener('wheel', handleWheel);
      document.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('hashchange', handleHashNavigation);
    });
  }
};

// Fonctions pour gérer le mode de scroll vers le footer
const enableFooterScrollMode = () => {
  isFooterScrollMode.value = true;
};

const disableFooterScrollMode = () => {
  isFooterScrollMode.value = false;
};
</script>

<style>
@import "~/assets/css/animations.css";

/* Scroll horizontal avec snap points */
.horizontal-container {
  scroll-behavior: smooth;
  scroll-snap-type: x mandatory;
}

.section-page {
  scroll-snap-align: start;
}

/* Bordures des sections - Desktop: gauche/droite, Mobile: bas */
.section-page {
  border-right: 0.25px solid #000;
}

.section-page:first-child {
  border-left: 0.25px solid #000;
}

/* Masquer la scrollbar tout en gardant la fonctionnalité */
.horizontal-container::-webkit-scrollbar {
  display: none;
}

.horizontal-container {
  -ms-overflow-style: none;  /* IE et Edge */
  scrollbar-width: none;  /* Firefox */
}

/* Responsive: sur mobile, on revient au scroll vertical */
@media (max-width: 768px) {
  .horizontal-container {
    height: auto;
    overflow-x: hidden;
    overflow-y: auto;
  }
  
  .horizontal-sections {
    flex-direction: column;
    height: auto;
  }
  
  .section-page {
    width: 100vw;
    height: auto;
    min-height: 100vh;
    scroll-snap-align: start;
    border-right: none;
    border-left: none;
    border-bottom: 0.25px solid #000;
  }
  
  .section-page:first-child {
    border-left: none;
  }
  
  .section-page:last-child {
    border-bottom: none;
  }
  
  .horizontal-container {
    scroll-snap-type: y mandatory;
  }
}
</style>
