<template>
  <div class="typewriter-container">
    <h1
      class="text-5xl md:text-7xl font-normal uppercase tracking-tight mb-6 h-20 flex items-center justify-center"
    >
      <span
        v-for="(letter, index) in titleLetters"
        :key="index"
        class="letter"
        :style="{ opacity: letter.visible ? 1 : 0 }"
      >
        {{ letter.char }}
      </span>
      <span class="cursor">|</span>
    </h1>
    <p
      class="text-xl md:text-2xl font-normal uppercase tracking-wider text-gray-600 mb-8 h-8 flex items-center justify-center"
    >
      <span
        v-for="(letter, index) in subtitleLetters"
        :key="index"
        class="letter"
        :style="{ opacity: letter.visible ? 1 : 0 }"
      >
        {{ letter.char }}
      </span>
    </p>
    <div class="w-24 h-px bg-black mx-auto"></div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { gsap } from "gsap";

const titleText = "BRICE THÉÂTE";
const subtitleText = "SCÉNARISTE";

const titleLetters = ref([]);
const subtitleLetters = ref([]);

onMounted(() => {
  // Préparer les lettres du titre
  titleLetters.value = titleText.split("").map((char) => ({
    char: char === " " ? "\u00A0" : char,
    visible: false,
  }));

  // Préparer les lettres du sous-titre
  subtitleLetters.value = subtitleText.split("").map((char) => ({
    char: char === " " ? "\u00A0" : char,
    visible: false,
  }));

  // Animation du titre
  const titleTimeline = gsap.timeline();

  titleLetters.value.forEach((letter, index) => {
    titleTimeline.to(letter, {
      visible: true,
      duration: 0.008,
      delay: index * 0.012,
    });
  });

  // Animation du sous-titre après le titre
  titleTimeline.to({}, { duration: 0.08 }); // Pause

  subtitleLetters.value.forEach((letter, index) => {
    titleTimeline.to(letter, {
      visible: true,
      duration: 0.008,
      delay: index * 0.01,
    });
  });

  // Masquer le curseur à la fin de l'animation
  titleTimeline.to({}, { duration: 0.2 }); // Pause finale
  titleTimeline.to(".cursor", {
    opacity: 0,
    duration: 0.3,
  });
});
</script>

<style scoped>
.cursor {
  animation: blink 1s infinite;
}

@keyframes blink {
  0%,
  50% {
    opacity: 1;
  }
  51%,
  100% {
    opacity: 0;
  }
}

.letter {
  transition: opacity 0.1s ease-in-out;
}
</style>
