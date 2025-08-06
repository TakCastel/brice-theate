<template>
  <div class="min-h-screen text-black bg-white">
    <!-- Header -->
    <AppHeader />

    <!-- Main content -->
    <main class="pt-20">
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
    </main>

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
</style>
