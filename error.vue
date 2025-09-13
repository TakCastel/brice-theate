<template>
  <div class="min-h-screen text-black bg-white">
    <!-- Header -->
    <AppHeader />

    <!-- Contenu de la page 404 -->
    <main class="flex items-center justify-center min-h-screen pt-20 pb-16">
      <div class="text-center max-w-2xl mx-auto px-4 lg:px-6">
        <!-- Code d'erreur -->
        <div class="mb-8">
          <h1 class="text-8xl md:text-9xl font-light tracking-tight text-black mb-4">
            404
          </h1>
          <div class="w-16 h-0.5 bg-black mx-auto mb-8"></div>
        </div>

        <!-- Message principal -->
        <div class="mb-12">
          <h2 class="text-2xl md:text-3xl font-light tracking-wide mb-6">
            Page introuvable
          </h2>
          <p class="text-base md:text-lg text-gray-600 leading-relaxed max-w-lg mx-auto">
            La page que vous recherchez n'existe pas ou a été déplacée. 
            Peut-être qu'un autre scénario vous attend sur le site ?
          </p>
        </div>

        <!-- Actions -->
        <div class="space-y-4 md:space-y-0 md:space-x-6 md:flex md:justify-center">
          <!-- Bouton retour accueil -->
          <NuxtLink 
            to="/"
            class="inline-block px-8 py-3 border border-black text-black hover:bg-black hover:text-white transition-all duration-300 text-sm uppercase tracking-wider font-normal"
          >
            Retour à l'accueil
          </NuxtLink>

          <!-- Bouton retour précédent -->
          <button 
            @click="goBack"
            class="inline-block px-8 py-3 bg-black text-white hover:bg-gray-800 transition-all duration-300 text-sm uppercase tracking-wider font-normal"
          >
            Page précédente
          </button>
        </div>
      </div>
    </main>

    <!-- Footer -->
    <AppFooter :showTopBorder="true" />
  </div>
</template>

<script setup>
import AppHeader from "~/components/AppHeader.vue";
import AppFooter from "~/components/AppFooter.vue";

// Configuration de la page
useHead({
  title: '404 - Page introuvable | Brice Théâte',
  meta: [
    { name: 'description', content: 'Page introuvable sur le site de Brice Théâte, scénariste.' },
    { name: 'robots', content: 'noindex' }
  ]
});

// Définir la prop error
const props = defineProps({
  error: Object
});

// Fonction pour revenir à la page précédente
const goBack = () => {
  if (window.history.length > 1) {
    window.history.back();
  } else {
    navigateTo('/');
  }
};

// Gestion automatique des erreurs 404 dans Nuxt 3
if (props.error?.statusCode === 404) {
  console.log('Page 404 détectée');
}
</script>

<style scoped>
/* Animations subtiles */
main > div {
  animation: fadeInUp 0.8s ease-out;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Effet hover sur les boutons */
button, a {
  position: relative;
  overflow: hidden;
}

button::before, a::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
  transition: left 0.5s;
}

button:hover::before, a:hover::before {
  left: 100%;
}
</style>
