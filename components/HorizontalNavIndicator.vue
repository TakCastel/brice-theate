<template>
  <div class="horizontal-nav-indicator fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50 hidden md:block">
    <div class="flex space-x-2 bg-black/20 backdrop-blur-sm rounded-full px-4 py-2">
      <button
        v-for="(section, index) in sections"
        :key="section.id"
        @click="scrollToSection(section.id)"
        :class="[
          'w-3 h-3 rounded-full transition-all duration-300',
          currentSection === index 
            ? 'bg-black scale-125' 
            : 'bg-gray-400 hover:bg-gray-600'
        ]"
        :title="section.title"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useScrollToSection } from '~/composables/useScrollToSection';

const { scrollToSection } = useScrollToSection();

const sections = [
  { id: 'hero', title: 'Accueil' },
  { id: 'biographie', title: 'Biographie' },
  { id: 'creative', title: 'Approche créative' },
  { id: 'scripts', title: 'Scénarios' },
  { id: 'contact', title: 'Contact' }
];

const currentSection = ref(0);

const updateCurrentSection = () => {
  const container = document.querySelector('.horizontal-container');
  if (container && window.innerWidth > 768) {
    const scrollLeft = container.scrollLeft;
    const sectionWidth = window.innerWidth;
    const newSection = Math.round(scrollLeft / sectionWidth);
    currentSection.value = Math.max(0, Math.min(newSection, sections.length - 1));
  }
};

onMounted(() => {
  const container = document.querySelector('.horizontal-container');
  if (container) {
    container.addEventListener('scroll', updateCurrentSection);
    window.addEventListener('resize', updateCurrentSection);
    updateCurrentSection();
  }
});

onUnmounted(() => {
  const container = document.querySelector('.horizontal-container');
  if (container) {
    container.removeEventListener('scroll', updateCurrentSection);
    window.removeEventListener('resize', updateCurrentSection);
  }
});
</script>
