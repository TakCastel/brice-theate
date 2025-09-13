<template>
  <div
    class="project-card border border-gray-300 p-6 hover:border-black hover:shadow-lg transition-all duration-500 ease-in-out"
  >
    <!-- Header de la card -->
    <div class="flex items-start justify-between mb-4">
      <div class="flex-1">
        <h3
          class="section-title text-xl font-normal mb-1 tracking-tight animate-on-scroll stagger-1"
        >
          {{ project.title }}
        </h3>
        <p
          class="text-line text-sm text-gray-600 mb-2 tracking-wider animate-on-scroll stagger-2"
        >
          {{ project.year }}
        </p>
      </div>

      <!-- Image ou placeholder -->
      <div class="ml-4 flex-shrink-0">
        <div
          v-if="project.image"
          class="project-image w-16 h-20 cursor-pointer animate-on-scroll stagger-3"
          @click="openImage"
        >
          <img
            :src="project.image"
            :alt="`Affiche - ${project.title}`"
            class="w-full h-full object-cover border-[0.25px] border-black hover:opacity-80 transition-opacity"
          />
        </div>
        <div
          v-else
          class="w-16 h-20 border-[0.25px] border-gray-400 bg-gray-50 flex items-center justify-center"
        >
          <span class="text-xs text-gray-400">Image</span>
        </div>
      </div>
    </div>

    <!-- Synopsis -->
    <div class="mb-4">
      <p
        class="text-line text-sm text-gray-700 leading-relaxed animate-on-scroll stagger-4"
      >
        {{ project.synopsis }}
      </p>
    </div>

    <!-- Informations supplémentaires -->
    <div class="space-y-2">
      <div
        v-if="project.genre"
        class="text-line text-xs text-gray-600 animate-on-scroll stagger-5"
      >
        <span class="font-medium">Genre :</span> {{ project.genre }}
      </div>
      <div
        v-if="project.format"
        class="text-line text-xs text-gray-600 animate-on-scroll stagger-6"
      >
        <span class="font-medium">Format :</span> {{ project.format }}
      </div>
      <div
        v-if="project.production"
        class="text-line text-xs text-gray-600 animate-on-scroll stagger-7"
      >
        <span class="font-medium">Production :</span> {{ project.production }}
      </div>
      <div
        v-if="project.status"
        class="text-line text-xs text-gray-600 animate-on-scroll stagger-8"
      >
        <span class="font-medium">Statut :</span> {{ project.status }}
      </div>
    </div>

    <!-- Actions optionnelles -->
    <div v-if="project.links && project.links.length > 0" class="mt-4 pt-4 border-t border-gray-200">
      <div class="flex flex-wrap gap-2">
        <a
          v-for="link in project.links"
          :key="link.title"
          :href="link.url"
          target="_blank"
          rel="noopener noreferrer"
          class="text-xs px-3 py-1 border border-gray-300 text-gray-700 hover:border-black hover:text-black transition-colors animate-on-scroll stagger-9"
          @click="trackProjectLink(link.title)"
        >
          {{ link.title }}
        </a>
      </div>
    </div>

    <!-- Note de bas de card -->
    <div v-if="project.note" class="mt-4 pt-3 border-t border-gray-100">
      <p class="text-xs text-gray-500 italic animate-on-scroll stagger-10">
        {{ project.note }}
      </p>
    </div>
  </div>
</template>

<script setup>
import { useCookieConsent } from '~/composables/useCookieConsent'

const { $openPhotoSwipe } = useNuxtApp()

// Ajout du tracking
const { trackEvent } = useCookieConsent()

const props = defineProps({
  project: {
    type: Object,
    required: true,
  },
})

// Fonction pour tracker l'ouverture d'image
const openImage = () => {
  if (props.project.image) {
    // Tracker l'événement avant d'ouvrir l'image
    trackEvent('project_image_view', {
      project_title: props.project.title,
      project_year: props.project.year,
      action: 'image_open'
    })

    const items = [
      {
        src: props.project.image,
        width: 800,
        height: 1200,
        title: `${props.project.title} (${props.project.year})`,
      },
    ]
    $openPhotoSwipe(items, 0)
  }
}

// Fonction pour tracker les clics sur les liens de projet
const trackProjectLink = (linkTitle) => {
  trackEvent('project_link_click', {
    project_title: props.project.title,
    project_year: props.project.year,
    link_title: linkTitle,
    action: 'external_link'
  })
}

// Tracker quand la card entre dans le viewport (optionnel)
import { onMounted } from 'vue'

onMounted(() => {
  // Observer pour tracker quand le projet est vu
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          trackEvent('project_view', {
            project_title: props.project.title,
            project_year: props.project.year,
            action: 'card_viewed'
          })
          // Désactiver l'observer après le premier view
          observer.unobserve(entry.target)
        }
      })
    },
    {
      threshold: 0.5, // 50% visible
      rootMargin: '0px 0px -50px 0px'
    }
  )

  // Observer la card actuelle
  const cardElement = document.querySelector('.project-card')
  if (cardElement) {
    observer.observe(cardElement)
  }
})
</script>

<style scoped>
/* Animations pour la project card */
.project-card {
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.project-card.visible {
  opacity: 1;
  transform: translateY(0);
}

/* Styles de base pour les éléments animés */
.text-line,
.section-title {
  opacity: 0;
  transform: translateY(15px);
  transition: all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.text-line.visible,
.section-title.visible {
  opacity: 1;
  transform: translateY(0);
}

/* Delays en escalier pour l'animation */
.stagger-1.visible { transition-delay: 0.1s; }
.stagger-2.visible { transition-delay: 0.2s; }
.stagger-3.visible { transition-delay: 0.3s; }
.stagger-4.visible { transition-delay: 0.4s; }
.stagger-5.visible { transition-delay: 0.5s; }
.stagger-6.visible { transition-delay: 0.6s; }
.stagger-7.visible { transition-delay: 0.7s; }
.stagger-8.visible { transition-delay: 0.8s; }
.stagger-9.visible { transition-delay: 0.9s; }
.stagger-10.visible { transition-delay: 1.0s; }

/* Animation de hover pour l'image */
.project-image {
  transition: transform 0.3s ease;
}

.project-image:hover {
  transform: scale(1.05);
}

/* Responsive */
@media (max-width: 768px) {
  .project-card {
    padding: 1rem;
  }
  
  .project-image {
    width: 3rem;
    height: 4rem;
  }
}
</style>