// Plugin pour gérer les animations au scroll avec Intersection Observer
export default defineNuxtPlugin(() => {
  if (process.client) {
    const initScrollAnimations = () => {
      // Configuration de l'Intersection Observer
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("visible");
              // Optionnel : arrêter d'observer une fois visible
              observer.unobserve(entry.target);
            }
          });
        },
        {
          threshold: 0.1, // 10% visible
          rootMargin: "0px 0px -50px 0px", // Déclencher un peu avant
        }
      );

      // Observer tous les éléments avec la classe animate-on-scroll
      const animatedElements = document.querySelectorAll(".animate-on-scroll");
      animatedElements.forEach((el) => {
        observer.observe(el);
      });

      // Retourner la fonction de nettoyage
      return () => {
        observer.disconnect();
      };
    };

    // Initialiser les animations au chargement de la page
    const initAnimations = () => {
      // Attendre que le DOM soit prêt
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initScrollAnimations);
      } else {
        initScrollAnimations();
      }
    };

    // Réinitialiser les animations lors de la navigation (SPA)
    const router = useRouter();
    router.afterEach(() => {
      // Petit délai pour laisser le temps au DOM de se mettre à jour
      setTimeout(() => {
        initScrollAnimations();
      }, 100);
    });

    // Initialiser immédiatement
    initAnimations();
  }
});
