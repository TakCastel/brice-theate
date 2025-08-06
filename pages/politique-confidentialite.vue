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
            Politique de confidentialité
          </h1>

          <div class="space-y-8">
            <!-- Introduction -->
            <div class="border-[0.5px] border-black p-8 bg-white">
              <h2 class="text-xl font-normal mb-4 tracking-tight">
                Introduction
              </h2>
              <p class="text-gray-700 leading-relaxed">
                Cette politique de confidentialité décrit comment Brice Théâte
                collecte, utilise et protège les informations que vous
                fournissez lors de l'utilisation de ce site web. Nous nous
                engageons à protéger votre vie privée et à traiter vos données
                personnelles de manière transparente et sécurisée.
              </p>
            </div>

            <!-- Collecte des données -->
            <div class="border-[0.5px] border-black p-8 bg-white">
              <h2 class="text-xl font-normal mb-4 tracking-tight">
                Collecte des données
              </h2>
              <p class="text-gray-700 leading-relaxed mb-4">
                Nous collectons les informations suivantes :
              </p>
              <ul
                class="text-gray-700 leading-relaxed list-disc list-inside space-y-2"
              >
                <li>Adresse email (lorsque vous nous contactez)</li>
                <li>
                  Informations de navigation (adresse IP, type de navigateur)
                </li>
                <li>Données techniques (pages visitées, durée de visite)</li>
              </ul>
            </div>

            <!-- Utilisation des données -->
            <div class="border-[0.5px] border-black p-8 bg-white">
              <h2 class="text-xl font-normal mb-4 tracking-tight">
                Utilisation des données
              </h2>
              <p class="text-gray-700 leading-relaxed mb-4">
                Vos données sont utilisées pour :
              </p>
              <ul
                class="text-gray-700 leading-relaxed list-disc list-inside space-y-2"
              >
                <li>Répondre à vos demandes de contact</li>
                <li>Améliorer le fonctionnement du site</li>
                <li>Analyser l'utilisation du site (statistiques anonymes)</li>
                <li>Assurer la sécurité du site</li>
              </ul>
            </div>

            <!-- Cookies -->
            <div class="border-[0.5px] border-black p-8 bg-white">
              <h2 class="text-xl font-normal mb-4 tracking-tight">Cookies</h2>
              <p class="text-gray-700 leading-relaxed mb-4">
                Ce site utilise uniquement des cookies techniques nécessaires au
                bon fonctionnement du site. Aucun cookie de tracking ou de
                publicité n'est utilisé.
              </p>
              <p class="text-gray-700 leading-relaxed">
                Vous pouvez désactiver les cookies dans les paramètres de votre
                navigateur, mais cela peut affecter le fonctionnement du site.
              </p>
            </div>

            <!-- Partage des données -->
            <div class="border-[0.5px] border-black p-8 bg-white">
              <h2 class="text-xl font-normal mb-4 tracking-tight">
                Partage des données
              </h2>
              <p class="text-gray-700 leading-relaxed">
                Vos données personnelles ne sont jamais vendues, louées ou
                partagées avec des tiers à des fins commerciales. Elles peuvent
                être partagées uniquement si requis par la loi ou pour protéger
                nos droits légitimes.
              </p>
            </div>

            <!-- Sécurité -->
            <div class="border-[0.5px] border-black p-8 bg-white">
              <h2 class="text-xl font-normal mb-4 tracking-tight">
                Sécurité des données
              </h2>
              <p class="text-gray-700 leading-relaxed">
                Nous mettons en place des mesures de sécurité appropriées pour
                protéger vos données personnelles contre l'accès non autorisé,
                la modification, la divulgation ou la destruction. Le site
                utilise le protocole HTTPS pour sécuriser les transmissions.
              </p>
            </div>

            <!-- Vos droits -->
            <div class="border-[0.5px] border-black p-8 bg-white">
              <h2 class="text-xl font-normal mb-4 tracking-tight">
                Vos droits
              </h2>
              <p class="text-gray-700 leading-relaxed mb-4">
                Conformément au RGPD, vous disposez des droits suivants :
              </p>
              <ul
                class="text-gray-700 leading-relaxed list-disc list-inside space-y-2"
              >
                <li>Droit d'accès à vos données personnelles</li>
                <li>Droit de rectification des données inexactes</li>
                <li>Droit à l'effacement de vos données</li>
                <li>Droit à la limitation du traitement</li>
                <li>Droit à la portabilité de vos données</li>
              </ul>
            </div>

            <!-- Conservation -->
            <div class="border-[0.5px] border-black p-8 bg-white">
              <h2 class="text-xl font-normal mb-4 tracking-tight">
                Conservation des données
              </h2>
              <p class="text-gray-700 leading-relaxed">
                Vos données personnelles sont conservées uniquement le temps
                nécessaire aux finalités pour lesquelles elles ont été
                collectées. Les données de contact sont conservées pendant 3 ans
                à compter du dernier contact.
              </p>
            </div>

            <!-- Modifications -->
            <div class="border-[0.5px] border-black p-8 bg-white">
              <h2 class="text-xl font-normal mb-4 tracking-tight">
                Modifications de cette politique
              </h2>
              <p class="text-gray-700 leading-relaxed">
                Cette politique de confidentialité peut être mise à jour
                périodiquement. Les modifications importantes seront notifiées
                sur cette page. Nous vous encourageons à consulter régulièrement
                cette politique.
              </p>
            </div>
          </div>

          <!-- Contact -->
          <div class="mt-16 text-center">
            <p class="text-gray-700 mb-4">
              Pour toute question concernant cette politique de confidentialité
              :
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
