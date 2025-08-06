<template>
  <div class="min-h-screen text-black bg-white">
    <!-- Header -->
    <AppHeader />

    <!-- Main content -->
    <main class="pt-20">
      <section class="py-24">
        <div class="max-w-4xl mx-auto">
          <h1
            class="text-3xl md:text-4xl font-normal tracking-tight mb-16 text-center"
          >
            Conditions Générales de Vente
          </h1>

          <div class="space-y-8">
            <!-- Article 1 -->
            <div class="border-[0.5px] border-black p-8 bg-white">
              <h2 class="text-xl font-normal mb-4 tracking-tight">
                Article 1 - Objet
              </h2>
              <p class="text-gray-700 leading-relaxed">
                Les présentes conditions générales de vente s'appliquent à
                toutes les prestations de services conclues par Brice Théâte,
                scénariste, auprès de ses clients professionnels et
                particuliers, sans restriction ni réserve à tous les services
                proposés par Brice Théâte sur son site.
              </p>
            </div>

            <!-- Article 2 -->
            <div class="border-[0.5px] border-black p-8 bg-white">
              <h2 class="text-xl font-normal mb-4 tracking-tight">
                Article 2 - Services
              </h2>
              <p class="text-gray-700 leading-relaxed mb-4">
                Brice Théâte propose des services de scénarisation pour :
              </p>
              <ul
                class="text-gray-700 leading-relaxed list-disc list-inside space-y-2"
              >
                <li>Courts-métrages</li>
                <li>Longs-métrages</li>
                <li>Documentaires</li>
                <li>Contenus audiovisuels divers</li>
              </ul>
            </div>

            <!-- Article 3 -->
            <div class="border-[0.5px] border-black p-8 bg-white">
              <h2 class="text-xl font-normal mb-4 tracking-tight">
                Article 3 - Tarifs
              </h2>
              <p class="text-gray-700 leading-relaxed">
                Les tarifs sont établis en fonction de la complexité du projet,
                de sa durée et des spécificités demandées. Un devis détaillé
                sera établi pour chaque projet avant engagement.
              </p>
            </div>

            <!-- Article 4 -->
            <div class="border-[0.5px] border-black p-8 bg-white">
              <h2 class="text-xl font-normal mb-4 tracking-tight">
                Article 4 - Modalités de paiement
              </h2>
              <p class="text-gray-700 leading-relaxed">
                Le paiement s'effectue selon les modalités définies dans le
                devis accepté. Un acompte de 50% est généralement demandé à la
                commande, le solde étant dû à la livraison du projet final.
              </p>
            </div>

            <!-- Article 5 -->
            <div class="border-[0.5px] border-black p-8 bg-white">
              <h2 class="text-xl font-normal mb-4 tracking-tight">
                Article 5 - Délais d'exécution
              </h2>
              <p class="text-gray-700 leading-relaxed">
                Les délais d'exécution sont donnés à titre indicatif. Ils
                dépendent de la complexité du projet et de la disponibilité de
                Brice Théâte. Tout retard ne pourra donner lieu à dommages et
                intérêts.
              </p>
            </div>

            <!-- Article 6 -->
            <div class="border-[0.5px] border-black p-8 bg-white">
              <h2 class="text-xl font-normal mb-4 tracking-tight">
                Article 6 - Propriété intellectuelle
              </h2>
              <p class="text-gray-700 leading-relaxed">
                Les droits d'auteur sur les scénarios créés par Brice Théâte lui
                appartiennent jusqu'au paiement intégral des sommes dues. La
                cession des droits sera formalisée par un contrat spécifique.
              </p>
            </div>
          </div>

          <!-- Contact -->
          <div class="mt-16 text-center">
            <p class="text-gray-700 mb-4">
              Pour toute question concernant ces conditions générales de vente :
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
