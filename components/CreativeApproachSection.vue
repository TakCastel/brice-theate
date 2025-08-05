<template>
  <section class="py-24 px-6 bg-gray-50 relative">
    <!-- Image de fond fullscreen avec parallax -->
    <div class="absolute inset-0 z-0 overflow-hidden">
      <div class="absolute inset-0 w-full h-full">
        <img
          src="/images/storyboard-bg.webp"
          alt="Storyboard en arrière-plan"
          class="w-full h-full object-cover opacity-20 blur-sm brightness-150"
        />
      </div>
    </div>

    <div class="max-w-6xl mx-auto relative z-10">
      <h2
        class="text-3xl md:text-4xl font-black uppercase tracking-tight mb-16 text-center"
      >
        Approche créative
      </h2>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
        <!-- Processus d'écriture -->
        <div class="bg-white p-8 border border-black">
          <h3 class="text-xl font-black mb-4 uppercase tracking-tight">
            Processus d'écriture
          </h3>
          <p class="text-gray-700 leading-relaxed">
            Chaque histoire commence par une idée simple, souvent absurde. Je
            laisse l'idée mûrir, puis je développe les personnages et les
            situations. L'humour vient naturellement quand on pousse l'absurde
            jusqu'au bout.
          </p>
        </div>

        <!-- Influences -->
        <div class="bg-white p-8 border border-black">
          <h3 class="text-xl font-black mb-4 uppercase tracking-tight">
            Influences
          </h3>
          <p class="text-gray-700 leading-relaxed">
            <strong>Martin Scorsese</strong> pour sa maîtrise du rythme et sa
            capacité à raconter des histoires complexes avec simplicité.
            <strong>David Lynch</strong> pour son approche surréaliste et sa
            façon de mélanger l'étrange et le familier.
          </p>
        </div>

        <!-- Collaborations -->
        <div class="bg-white p-8 border border-black">
          <h3 class="text-xl font-black mb-4 uppercase tracking-tight">
            Collaborations
          </h3>
          <p class="text-gray-700 leading-relaxed mb-4">
            Je travaille régulièrement avec le collectif Kino d'Avignon, une
            communauté de cinéastes passionnés. Ces collaborations
            m'enrichissent et me poussent à explorer de nouvelles directions.
          </p>
          <p class="text-sm text-gray-500">
            Ouvert aux nouveaux projets et collaborations créatives.
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
