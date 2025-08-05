<template>
  <footer id="contact" class="py-16 bg-gray-900 text-white">
    <div class="max-w-6xl mx-auto px-6">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
        <!-- Contact -->
        <div>
          <h3 class="text-lg font-black uppercase tracking-tight mb-6">
            Contact
          </h3>
          <p class="text-gray-300">
            <a
              href="mailto:theatebrice@gmail.com"
              class="hover:text-white transition-colors"
            >
              theatebrice@gmail.com
            </a>
          </p>
        </div>

        <!-- Liens utiles -->
        <div>
          <h3 class="text-lg font-black uppercase tracking-tight mb-6">
            Liens
          </h3>
          <ul class="space-y-3">
            <li>
              <a
                href="/mentions-legales"
                class="text-gray-300 hover:text-white transition-colors"
              >
                Mentions légales
              </a>
            </li>
            <li>
              <a
                href="/politique-confidentialite"
                class="text-gray-300 hover:text-white transition-colors"
              >
                Politique de confidentialité
              </a>
            </li>
            <li>
              <a
                href="/cgv"
                class="text-gray-300 hover:text-white transition-colors"
              >
                CGV
              </a>
            </li>
          </ul>
        </div>

        <!-- Partager -->
        <div>
          <h3 class="text-lg font-black uppercase tracking-tight mb-6">
            Partager
          </h3>
          <div class="flex gap-6">
            <a
              href="https://www.facebook.com/sharer/sharer.php?u=https://brice-theate.com"
              target="_blank"
              rel="noopener noreferrer"
              class="text-gray-300 hover:text-white transition-colors"
            >
              <Icon name="mdi:facebook" class="w-6 h-6" />
            </a>
            <a
              href="https://twitter.com/intent/tweet?text=Découvrez le travail de Brice Théâte, scénariste&url=https://brice-theate.com"
              target="_blank"
              rel="noopener noreferrer"
              class="text-gray-300 hover:text-white transition-colors"
            >
              <svg class="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                <path
                  d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"
                />
              </svg>
            </a>
            <a
              href="https://www.linkedin.com/sharing/share-offsite/?url=https://brice-theate.com"
              target="_blank"
              rel="noopener noreferrer"
              class="text-gray-300 hover:text-white transition-colors"
            >
              <Icon name="mdi:linkedin" class="w-6 h-6" />
            </a>
          </div>
        </div>
      </div>

      <!-- Copyright -->
      <div class="border-t border-gray-700 pt-8">
        <p class="text-sm text-gray-400 text-center">
          © 2024 Brice Théâte. Tous droits réservés.
        </p>
      </div>
    </div>
  </footer>
</template>
