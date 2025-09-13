<template>
  <header
    class="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b-[0.25px] border-black"
  >
    <div class="max-w-4xl mx-auto px-4 lg:px-6 h-20">
      <div class="flex justify-between items-center h-full">
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
                @click.prevent="scrollToSection('biographie')"
                href="#biographie"
                class="hover:text-gray-600 transition-colors cursor-pointer"
              >
                Biographie
              </a>
            </li>
            <li>
              <a
                @click.prevent="scrollToSection('creative')"
                href="#creative"
                class="hover:text-gray-600 transition-colors cursor-pointer"
              >
                Approche
              </a>
            </li>
            <li>
              <a 
                @click.prevent="scrollToSection('scripts')"
                href="#scripts" 
                class="hover:text-gray-600 transition-colors cursor-pointer"
              >
                Scénarios
              </a>
            </li>
            <li>
              <a 
                @click.prevent="scrollToSection('contact')"
                href="#contact" 
                class="hover:text-gray-600 transition-colors cursor-pointer"
              >
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
      <transition
        enter-active-class="transition-all duration-300 ease-out"
        leave-active-class="transition-all duration-200 ease-in"
        enter-from-class="opacity-0 -translate-y-2"
        enter-to-class="opacity-100 translate-y-0"
        leave-from-class="opacity-100 translate-y-0"
        leave-to-class="opacity-0 -translate-y-2"
      >
        <nav
          v-show="isMenuOpen"
          class="md:hidden absolute top-full left-0 right-0 bg-white border-b-[0.25px] border-black shadow-lg backdrop-blur-sm"
        >
          <ul class="py-4 space-y-2">
            <li>
              <a
                href="/"
                @click="closeMenu"
                class="block px-6 py-3 text-sm font-normal uppercase tracking-wider hover:bg-gray-50 transition-all duration-200 border-l-2 border-transparent hover:border-black"
              >
                Accueil
              </a>
            </li>
            <li>
              <a
                @click.prevent="scrollToSection('biographie'); closeMenu()"
                href="#biographie"
                class="block px-6 py-3 text-sm font-normal uppercase tracking-wider hover:bg-gray-50 transition-all duration-200 cursor-pointer border-l-2 border-transparent hover:border-black"
              >
                Biographie
              </a>
            </li>
            <li>
              <a
                @click.prevent="scrollToSection('creative'); closeMenu()"
                href="#creative"
                class="block px-6 py-3 text-sm font-normal uppercase tracking-wider hover:bg-gray-50 transition-all duration-200 cursor-pointer border-l-2 border-transparent hover:border-black"
              >
                Approche
              </a>
            </li>
            <li>
              <a
                @click.prevent="scrollToSection('scripts'); closeMenu()"
                href="#scripts"
                class="block px-6 py-3 text-sm font-normal uppercase tracking-wider hover:bg-gray-50 transition-all duration-200 cursor-pointer border-l-2 border-transparent hover:border-black"
              >
                Scripts
              </a>
            </li>
            <li>
              <a
                @click.prevent="scrollToSection('contact'); closeMenu()"
                href="#contact"
                class="block px-6 py-3 text-sm font-normal uppercase tracking-wider hover:bg-gray-50 transition-all duration-200 cursor-pointer border-l-2 border-transparent hover:border-black"
              >
                Contact
              </a>
            </li>
          </ul>
        </nav>
      </transition>
    </div>
  </header>
</template>

<script setup>
import { ref } from "vue";
import { useScrollToSection } from "~/composables/useScrollToSection";

const { scrollToSection } = useScrollToSection();

const isMenuOpen = ref(false);

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

const closeMenu = () => {
  isMenuOpen.value = false;
};
</script>

<style scoped>
/* Animation du burger menu */
.menu-open span:nth-child(1) {
  transform: rotate(45deg) translate(3px, 3px);
}

.menu-open span:nth-child(2) {
  opacity: 0;
  transform: scale(0);
}

.menu-open span:nth-child(3) {
  transform: rotate(-45deg) translate(3px, -3px);
}

/* Animation des éléments du menu */
nav ul li {
  animation: slideInFromLeft 0.3s ease-out forwards;
  opacity: 0;
  transform: translateX(-20px);
}

nav ul li:nth-child(1) { animation-delay: 0.1s; }
nav ul li:nth-child(2) { animation-delay: 0.15s; }
nav ul li:nth-child(3) { animation-delay: 0.2s; }
nav ul li:nth-child(4) { animation-delay: 0.25s; }
nav ul li:nth-child(5) { animation-delay: 0.3s; }

@keyframes slideInFromLeft {
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
</style>
