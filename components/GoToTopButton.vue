<template>
  <button
    id="goToTop"
    class="fixed bottom-8 right-8 z-40 bg-black text-white p-4 border-[0.5px] border-black shadow-lg hover:bg-gray-800 transition-all duration-300 opacity-0 pointer-events-none"
    @click="scrollToTop"
  >
    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M5 10l7-7m0 0l7 7m-7-7v18"
      ></path>
    </svg>
  </button>
</template>

<script setup>
import { onMounted, onUnmounted } from "vue";

const scrollToTop = () => {
  const container = document.querySelector(".snap-y");
  if (container) {
    container.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }
};

const handleScroll = () => {
  const goToTopButton = document.getElementById("goToTop");
  const container = document.querySelector(".snap-y");
  if (goToTopButton && container) {
    if (container.scrollTop > 300) {
      goToTopButton.classList.remove("opacity-0", "pointer-events-none");
      goToTopButton.classList.add("opacity-100");
    } else {
      goToTopButton.classList.add("opacity-0", "pointer-events-none");
      goToTopButton.classList.remove("opacity-100");
    }
  }
};

onMounted(() => {
  const container = document.querySelector(".snap-y");
  if (container) {
    container.addEventListener("scroll", handleScroll);
  }
});

onUnmounted(() => {
  const container = document.querySelector(".snap-y");
  if (container) {
    container.removeEventListener("scroll", handleScroll);
  }
});
</script>
