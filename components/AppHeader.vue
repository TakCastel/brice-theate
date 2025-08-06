<template>
  <header
    class="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b-[0.25px] border-black"
  >
    <div class="max-w-4xl mx-auto px-4 lg:px-6 py-4">
      <div class="flex justify-between items-center">
        <!-- Logo/Titre -->
        <div class="-ml-0.5">
          <a href="/" class="hover:opacity-80 transition-opacity">
            <h1 class="text-xl font-normal uppercase tracking-tight">
              Brice Théâte
            </h1>
            <p
              class="text-xs font-normal uppercase tracking-wider text-gray-500"
            >
              Scénariste
            </p>
          </a>
        </div>

        <!-- Navigation Desktop -->
        <nav class="hidden md:block">
          <ul
            class="flex space-x-8 text-xs font-normal uppercase tracking-wider"
          >
            <li>
              <a href="/" class="hover:text-gray-600 transition-colors">
                Accueil
              </a>
            </li>
            <li>
              <a
                href="#biographie"
                class="hover:text-gray-600 transition-colors"
              >
                Biographie
              </a>
            </li>
            <li>
              <a href="#scripts" class="hover:text-gray-600 transition-colors">
                Scénarios
              </a>
            </li>
            <li>
              <a href="#contact" class="hover:text-gray-600 transition-colors">
                Contact
              </a>
            </li>
          </ul>
        </nav>

        <!-- Bouton Burger Mobile -->
        <button
          @click="toggleMenu"
          class="md:hidden flex flex-col justify-center items-center w-8 h-8 relative"
          :class="{ 'menu-open': isMenuOpen }"
        >
          <span class="w-6 h-0.5 bg-black transition-all duration-300 origin-center"></span>
          <span class="w-6 h-0.5 bg-black transition-all duration-300 origin-center mt-1"></span>
          <span class="w-6 h-0.5 bg-black transition-all duration-300 origin-center mt-1"></span>
        </button>
      </div>

      <!-- Menu Mobile -->
      <nav
        v-show="isMenuOpen"
        class="md:hidden absolute top-full left-0 right-0 bg-white border-b-[0.25px] border-black"
      >
        <ul class="py-4 space-y-4">
          <li>
            <a
              href="/"
              @click="closeMenu"
              class="block px-6 py-2 text-sm font-normal uppercase tracking-wider hover:bg-gray-50 transition-colors"
            >
              Accueil
            </a>
          </li>
          <li>
            <a
              href="#biographie"
              @click="closeMenu"
              class="block px-6 py-2 text-sm font-normal uppercase tracking-wider hover:bg-gray-50 transition-colors"
            >
              Biographie
            </a>
          </li>
          <li>
            <a
              href="#scripts"
              @click="closeMenu"
              class="block px-6 py-2 text-sm font-normal uppercase tracking-wider hover:bg-gray-50 transition-colors"
            >
              Scripts
            </a>
          </li>
          <li>
            <a
              href="#contact"
              @click="closeMenu"
              class="block px-6 py-2 text-sm font-normal uppercase tracking-wider hover:bg-gray-50 transition-colors"
            >
              Contact
            </a>
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<script setup>
import { ref } from "vue";

const isMenuOpen = ref(false);

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

const closeMenu = () => {
  isMenuOpen.value = false;
};
</script>

<style scoped>
.menu-open span:nth-child(1) {
  transform: rotate(45deg) translate(0, 0.5px);
}

.menu-open span:nth-child(2) {
  opacity: 0;
  transform: translateX(-100%);
}

.menu-open span:nth-child(3) {
  transform: rotate(-45deg) translate(0, -0.5px);
}
</style>
