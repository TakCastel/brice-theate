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
</script>
