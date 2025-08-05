<template>
  <section id="scripts" class="py-24 px-6">
    <div class="max-w-4xl mx-auto">
      <h2
        class="text-3xl md:text-4xl font-black uppercase tracking-tight mb-16 text-center"
      >
        Scripts
      </h2>

      <div class="space-y-16 flex flex-col items-center">
        <ProjectCard
          v-for="script in scripts"
          :key="script.title"
          :project="script"
        />
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
