<template>
  <div
    class="project-card bg-white border-[0.25px] border-black p-6 hover:shadow-lg transition-all duration-300"
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
          class="project-image w-16 h-20 border-[0.25px] border-black bg-gray-100 flex items-center justify-center animate-on-scroll stagger-3"
        >
          <span
            class="text-gray-400 text-xs font-normal tracking-wider text-center"
          >
            Pas d'image
          </span>
        </div>
      </div>
    </div>

    <!-- Description -->
    <p
      class="text-line text-gray-700 mb-4 leading-relaxed animate-on-scroll stagger-4"
    >
      {{ project.description }}
    </p>

    <!-- Durée si disponible -->
    <p
      v-if="project.duration"
      class="text-line text-sm text-gray-600 mb-4 animate-on-scroll stagger-5"
    >
      Durée : {{ project.duration }}
    </p>

    <!-- Bouton d'action -->
    <div class="mt-6">
      <a
        v-if="project.link"
        :href="project.link"
        target="_blank"
        rel="noopener noreferrer"
        class="action-button inline-flex items-center bg-black text-white px-4 py-2 text-sm font-normal tracking-wider hover:bg-gray-800 transition-colors animate-on-scroll stagger-6"
      >
        Voir le court
        <svg
          class="w-4 h-4 ml-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
          ></path>
        </svg>
      </a>
      <button
        v-else
        disabled
        class="action-button inline-flex items-center bg-gray-100 text-gray-400 px-4 py-2 text-sm font-normal tracking-wider cursor-not-allowed animate-on-scroll stagger-6"
      >
        Bientôt disponible
        <svg
          class="w-4 h-4 ml-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          ></path>
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup>
const { $openPhotoSwipe } = useNuxtApp();

const props = defineProps({
  project: {
    type: Object,
    required: true,
  },
});

const openImage = () => {
  if (props.project.image) {
    const items = [
      {
        src: props.project.image,
        width: 800,
        height: 1200,
        title: `${props.project.title} (${props.project.year})`,
      },
    ];
    $openPhotoSwipe(items, 0);
  }
};
</script>
