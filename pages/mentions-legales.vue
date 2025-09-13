<template>
  <div class="min-h-screen text-black bg-white">
    <!-- Header -->
    <AppHeader />

    <!-- Main content -->
    <main class="pt-20">
      <section class="py-24">
        <div class="max-w-4xl mx-auto px-4 lg:px-6">
          <h1
            class="text-3xl md:text-4xl font-normal tracking-tight mb-16 text-center"
          >
            Mentions légales
          </h1>

          <div class="space-y-8">
            <!-- Éditeur -->
            <div class="border-[0.5px] border-black p-8 bg-white">
              <h2 class="text-xl font-normal mb-4 tracking-tight">
                Éditeur du site
              </h2>
              <p class="text-gray-700 leading-relaxed">
                Ce site est édité par moi, Brice Théâte, scénariste.<br />
                Adresse : Avignon, France<br />
                Email : theatebrice@gmail.com
              </p>
            </div>

            <!-- Hébergement -->
            <div class="border-[0.5px] border-black p-8 bg-white">
              <h2 class="text-xl font-normal mb-4 tracking-tight">
                Hébergement
              </h2>
              <p class="text-gray-700 leading-relaxed">
                Ce site est hébergé par Vercel Inc.<br />
                340 S Lemon Ave #4133<br />
                Walnut, CA 91789<br />
                États-Unis
              </p>
            </div>

            <!-- Propriété intellectuelle -->
            <div class="border-[0.5px] border-black p-8 bg-white">
              <h2 class="text-xl font-normal mb-4 tracking-tight">
                Propriété intellectuelle
              </h2>
              <p class="text-gray-700 leading-relaxed mb-4">
                L'ensemble de ce site relève de la législation française et
                internationale sur le droit d'auteur et la propriété
                intellectuelle. Tous les droits de reproduction sont réservés, y
                compris pour les documents téléchargeables et les
                représentations iconographiques et photographiques.
              </p>
              <p class="text-gray-700 leading-relaxed">
                La reproduction de tout ou partie de ce site sur un support
                électronique quel qu'il soit est formellement interdite sauf
                autorisation expresse du directeur de la publication.
              </p>
            </div>

            <!-- Liens hypertextes -->
            <div class="border-[0.5px] border-black p-8 bg-white">
              <h2 class="text-xl font-normal mb-4 tracking-tight">
                Liens hypertextes
              </h2>
              <p class="text-gray-700 leading-relaxed">
                Les liens hypertextes mis en place dans le cadre du présent site
                web en direction d'autres ressources présentes sur le réseau
                Internet ne sauraient engager ma responsabilité.
              </p>
            </div>

            <!-- Cookies -->
            <div class="border-[0.5px] border-black p-8 bg-white">
              <h2 class="text-xl font-normal mb-4 tracking-tight">Cookies</h2>
              <p class="text-gray-700 leading-relaxed">
                Ce site n'utilise pas de cookies de tracking. Seuls des cookies
                techniques peuvent être utilisés pour le bon fonctionnement du
                site.
              </p>
            </div>

            <!-- Droit applicable -->
            <div class="border-[0.5px] border-black p-8 bg-white">
              <h2 class="text-xl font-normal mb-4 tracking-tight">
                Droit applicable
              </h2>
              <p class="text-gray-700 leading-relaxed">
                Tout litige en relation avec l'utilisation du site
                brice-theate.com est soumis au droit français. En dehors des cas
                où la loi ne le permet pas, il est fait attribution exclusive de
                juridiction aux tribunaux compétents d'Avignon.
              </p>
            </div>
          </div>

          <!-- Contact -->
          <div class="mt-16 text-center">
            <p class="text-gray-700 mb-4">
              Pour toute question concernant ces mentions légales :
            </p>
            <a
              href="mailto:theatebrice@gmail.com"
              class="inline-block bg-black text-white px-6 py-3 font-normal tracking-wider hover:bg-gray-800 transition-colors"
            >
              theatebrice@gmail.com
            </a>
          </div>
        </div>
      </section>
    </main>

    <!-- Footer -->
    <AppFooter />
  </div>
</template>

<script setup>
import AppHeader from "~/components/AppHeader.vue";
import AppFooter from "~/components/AppFooter.vue";
</script>
