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
      class="footer-scroll-bar absolute bottom-0 left-0 right-0 h-16 z-10 border-t-[0.25px] border-black transition-all duration-300"
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
let currentSectionIndex = 0;
let lastSectionBeforeFooter = 0; // Sauvegarde de la section avant d'aller au footer
let isScrolling = false;
let isFooterScrollMode = ref(false);
const SCROLL_DEBOUNCE = 800; // Délai en ms entre les scrolls

// Gérer la navigation depuis une ancre URL
const handleHashNavigation = () => {
  const hash = window.location.hash.substring(1); // Enlever le #
  if (hash) {
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
      currentSectionIndex = sectionPositions[hash];
      lastSectionBeforeFooter = currentSectionIndex;
    }
    
    // Attendre que le DOM soit prêt et que la page soit stabilisée
    setTimeout(() => {
      const { scrollToSection } = useScrollToSection();
      scrollToSection(hash);
      // Nettoyer l'ancre pour éviter les conflits futurs
      history.replaceState(null, null, window.location.pathname);
    }, 200);
  }
};

// Intersection Observer pour les animations au scroll
onMounted(() => {
  // Gérer la navigation depuis l'URL avec ancre
  handleHashNavigation();
  
  // Écouter les changements d'ancre
  window.addEventListener('hashchange', handleHashNavigation);
  
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    }
  );

  // Observer tous les éléments avec la classe animate-on-scroll
  document.querySelectorAll(".animate-on-scroll").forEach((el) => {
    observer.observe(el);
  });

  // Navigation au scroll avec la molette
  setupWheelNavigation();
});

const setupWheelNavigation = () => {
  const horizontalContainer = document.querySelector('.horizontal-container');
  const sections = document.querySelectorAll('.section-page');
  const footer = document.querySelector('footer');
  
  if (!horizontalContainer || !sections.length) return;

  const handleWheel = (e) => {
    // Éviter les scrolls trop rapides
    if (isScrolling) {
      e.preventDefault();
      return;
    }

    // Mode footer : scroll vers le footer uniquement
    if (isFooterScrollMode.value) {
      e.preventDefault();
      const deltaY = e.deltaY;
      
      if (deltaY > 0) {
        // Scroll vers le bas -> aller au footer
        if (window.pageYOffset === 0) {
          lastSectionBeforeFooter = currentSectionIndex; // Sauvegarder la section actuelle
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
    const deltaY = e.deltaY;
    const isScrollingDown = deltaY > 0;
    const isScrollingUp = deltaY < 0;

    // Navigation vers la droite (scroll vers le bas)
    if (isScrollingDown) {
      if (currentSectionIndex < sections.length - 1) {
        e.preventDefault();
        currentSectionIndex++;
        lastSectionBeforeFooter = currentSectionIndex; // Sauvegarder la section actuelle
        scrollToSection(currentSectionIndex);
      } else if (currentSectionIndex === sections.length - 1) {
        // À la dernière section, scroll vers le footer
        e.preventDefault();
        lastSectionBeforeFooter = currentSectionIndex; // Sauvegarder la section actuelle
        scrollToFooter();
      }
    }
    // Navigation vers la gauche (scroll vers le haut)
    else if (isScrollingUp) {
      // Si on est au footer, revenir à la dernière section
      if (window.pageYOffset > 0) {
        e.preventDefault();
        scrollBackFromFooter();
      } else if (currentSectionIndex > 0) {
        e.preventDefault();
        currentSectionIndex--;
        lastSectionBeforeFooter = currentSectionIndex; // Sauvegarder la section actuelle
        scrollToSection(currentSectionIndex);
      }
    }
  };

  const scrollToSection = (index) => {
    isScrolling = true;
    const targetScrollLeft = index * window.innerWidth;
    
    horizontalContainer.scrollTo({
      left: targetScrollLeft,
      behavior: 'smooth'
    });

    setTimeout(() => {
      isScrolling = false;
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
    isScrolling = true;
    currentSectionIndex = lastSectionBeforeFooter; // Revenir à la section sauvegardée
    
    // Revenir en haut de page et à la dernière section affichée
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });

    setTimeout(() => {
      const targetScrollLeft = currentSectionIndex * window.innerWidth;
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
    document.addEventListener('wheel', handleWheel, { passive: false });
    
    // Nettoyer l'event listener au démontage
    onUnmounted(() => {
      document.removeEventListener('wheel', handleWheel);
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
    height: 100vh;
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
