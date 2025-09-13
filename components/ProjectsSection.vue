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
    synopsis: "L'histoire d'une session de spiritisme qui tourne mal quand les participants réalisent qu'ils ont invoqué plus qu'ils ne l'avaient prévu.",
    image: "/images/tel-esprit-qui-croyait-prendre.jpg",
    genre: "Thriller/Comédie",
    format: "Court métrage",
    status: "Terminé",
    production: "Collectif Kino"
  },
  {
    title: "Belître",
    year: "Avril 2024",
    synopsis: "Court métrage - Histoire d'un robot IA qui pète un plomb et découvre les joies et les peines de l'humanité de la pire des façons.",
    image: "/images/belitre.jpg",
    genre: "Science-fiction/Comédie",
    format: "Court métrage",
    status: "Terminé",
    production: "Collectif Kino"
  },
  {
    title: "Pour une poignée de fromage",
    year: "2023",
    synopsis: "Western fromager absurde où deux cow-boys se battent pour la dernière meule de comté dans un Far West décalé.",
    genre: "Western/Comédie",
    format: "Court métrage - 4:17",
    status: "Terminé",
    production: "Collectif Kino",
    links: [
      {
        title: "Voir sur YouTube",
        url: "https://www.youtube.com/watch?v=JxgDb3LFVfU"
      }
    ]
  },
  {
    title: "La goutte de trop",
    year: "2022",
    synopsis: "Parodie de comédie romantique où une histoire d'amour banale devient complètement absurde à cause d'un détail insignifiant.",
    image: "/images/la-goutte-de-trop.jpg",
    genre: "Comédie romantique/Parodie",
    format: "Court métrage - 5:12",
    status: "Terminé",
    production: "Collectif Kino",
    links: [
      {
        title: "Voir sur YouTube",
        url: "https://www.youtube.com/watch?v=tOCUrUkwJyA"
      }
    ]
  },
];
</script>
