<template>
  <div class="relative">
    <!-- Image volante au premier plan -->
    <div
      v-if="project.image"
      class="absolute -left-6 -top-6 z-20 hidden md:block"
    >
      <img
        :src="project.image"
        :alt="`Affiche - ${project.title}`"
        class="w-40 h-60 object-cover border border-black transform -rotate-2"
      />
    </div>

    <!-- Rectangle fictif au premier plan -->
    <div v-else class="absolute -left-6 -top-6 z-20 hidden md:block">
      <div
        class="w-40 h-60 border border-black bg-gray-100 transform -rotate-2 flex items-center justify-center"
      >
        <span class="text-gray-400 font-bold uppercase tracking-wider text-sm">
          Pas d'image
        </span>
      </div>
    </div>

    <!-- Image mobile en haut -->
    <div v-if="project.image" class="md:hidden mb-4">
      <img
        :src="project.image"
        :alt="`Affiche - ${project.title}`"
        class="w-28 h-40 object-cover border border-black mx-auto"
      />
    </div>

    <!-- Rectangle mobile en haut -->
    <div v-else class="md:hidden mb-4">
      <div
        class="w-28 h-40 border border-black bg-gray-100 mx-auto flex items-center justify-center"
      >
        <span class="text-gray-400 font-bold uppercase tracking-wider text-xs">
          Pas d'image
        </span>
      </div>
    </div>

    <!-- Carte au premier plan -->
    <div
      class="relative z-10 bg-white border border-black p-3 pl-12 md:pl-20 w-80"
      :class="project.image ? 'ml-0 md:ml-24' : 'ml-0 md:ml-24'"
    >
      <div class="absolute top-2 right-2 w-3 h-3 bg-black"></div>
      <h3 class="text-2xl font-black mb-2 uppercase tracking-tight">
        {{ project.title }}
      </h3>
      <p class="text-sm font-bold text-gray-600 mb-3 uppercase tracking-wider">
        {{ project.year }}
      </p>
      <p class="text-lg mb-4">{{ project.description }}</p>
      <p v-if="project.duration" class="text-sm text-gray-600 mb-4">
        Durée : {{ project.duration }}
      </p>
      <a
        v-if="project.link"
        :href="project.link"
        target="_blank"
        rel="noopener noreferrer"
        class="inline-block bg-black text-white px-4 py-2 font-bold uppercase tracking-wider hover:bg-gray-800"
      >
        Voir le film
      </a>
      <button
        v-else
        disabled
        class="inline-block bg-gray-300 text-gray-500 px-4 py-2 font-bold uppercase tracking-wider cursor-not-allowed"
      >
        Bientôt disponible
      </button>
    </div>
  </div>
</template>

<script setup>
defineProps({
  project: {
    type: Object,
    required: true,
  },
});
</script>
