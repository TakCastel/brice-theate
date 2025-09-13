<template>
  <section
    id="scripts"
    class="section-page projects-section w-screen h-full flex-shrink-0 py-24 bg-white z-10 border-l-[0.25px] border-black flex items-center justify-center"
  >
    <div class="max-w-4xl mx-auto px-4 lg:px-6">
      <div>
        <h2
          class="section-title text-3xl md:text-4xl font-normal tracking-tight mb-16 text-center animate-on-scroll"
        >
          Scénarios
        </h2>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <ProjectCard
            v-for="(script, index) in scripts"
            :key="script.title"
            :project="script"
            :class="`animate-on-scroll stagger-${index + 1}`"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import ProjectCard from "./ProjectCard.vue";

const scripts = [
  {
    title: "Tel esprit qui croyait prendre",
    year: "2025",
    description: "L'histoire d'une session de spiritisme",
    image: "/images/tel-esprit-qui-croyait-prendre.jpg",
  },
  {
    title: "Belître",
    year: "Avril 2024",
    description: "Court métrage - Histoire d'un robot IA qui pète un plomb",
    image: "/images/belitre.jpg",
  },
  {
    title: "Pour une poignée de fromage",
    year: "2023",
    description: "Western fromager absurde",
    duration: "4:17",
    link: "https://www.youtube.com/watch?v=JxgDb3LFVfU",
  },
  {
    title: "La goutte de trop",
    year: "2022",
    description: "Parodie de comédie romantique",
    duration: "5:12",
    link: "https://www.youtube.com/watch?v=tOCUrUkwJyA",
    image: "/images/la-goutte-de-trop.jpg",
  },
];
</script>
