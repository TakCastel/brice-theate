<template>
  <div class="min-h-screen text-black bg-white">
    <!-- Header -->
    <AppHeader />

    <!-- Main horizontal container -->
    <main class="horizontal-container pt-20 h-screen overflow-x-auto overflow-y-hidden">
      <div class="horizontal-sections flex h-full">
        <!-- Hero Section -->
        <div class="section-page w-screen h-full flex-shrink-0">
          <HeroSection />
        </div>

        <!-- Section Biographie -->
        <div class="section-page w-screen h-full flex-shrink-0">
          <BiographySection />
        </div>

        <!-- Section Approche créative -->
        <div class="section-page w-screen h-full flex-shrink-0">
          <CreativeApproachSection />
        </div>

        <!-- Projets -->
        <div class="section-page w-screen h-full flex-shrink-0">
          <ProjectsSection />
        </div>

        <!-- Contact -->
        <div class="section-page w-screen h-full flex-shrink-0">
          <ContactSection />
        </div>
      </div>
    </main>

    <!-- Indicateurs de navigation horizontale -->
    <HorizontalNavIndicator />

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

// Intersection Observer pour les animations au scroll
onMounted(() => {
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
});
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
  }
  
  .horizontal-container {
    scroll-snap-type: y mandatory;
  }
}
</style>
