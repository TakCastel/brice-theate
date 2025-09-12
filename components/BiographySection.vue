<template>
  <section
    id="biographie"
    class="biography-section h-full w-full py-24 bg-white z-10 border-l-[0.25px] border-black flex items-center justify-center"
  >
    <div class="max-w-4xl mx-auto px-4 lg:px-6">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <!-- Photo de Brice -->
        <div class="biography-photo order-2 lg:order-1 animate-on-scroll">
          <div class="aspect-square w-full max-w-md mx-auto lg:mx-0">
            <img
              src="https://picsum.photos/400/400?random=1&grayscale"
              alt="Photo de Brice Théâte"
              class="w-full h-full object-cover border-[0.25px] border-black bg-gray-200"
              loading="lazy"
            />
          </div>
          <p class="text-center text-sm text-gray-500 mt-2">
            Photo temporaire - À remplacer
          </p>
        </div>

        <!-- Contenu biographie -->
        <div
          class="biography-content decorative-card-border p-8 animate-on-scroll order-1 lg:order-2"
        >
          <!-- Coins décoratifs supplémentaires -->
          <div class="corner-top-right"></div>
          <div class="corner-bottom-left"></div>
          <h2
            class="section-title text-3xl md:text-4xl font-normal tracking-tight mb-8 animate-on-scroll stagger-1"
          >
            Biographie
          </h2>
          <p
            class="text-line text-lg leading-relaxed text-gray-700 animate-on-scroll stagger-2"
          >
            Brice Théâte est scénariste, installé à Avignon. Il aime écrire des
            histoires, surtout quand elles font sourire. C'est en répondant par
            hasard à une recherche de scénariste qu'il a commencé, avant de
            rejoindre le collectif Kino. Depuis, il a participé à plusieurs
            courts-métrages, souvent absurdes, parfois tendres, toujours un peu
            décalés. Ce qu'il cherche, c'est le bon angle pour faire rire,
            parfois avec presque rien.
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
