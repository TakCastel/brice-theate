export const useScenarios = () => {
  const scenarios = ref([
    {
      id: 1,
      title: "Tel esprit qui croyait prendre",
      year: "2025",
      description: "L'histoire d'une session de spiritisme",
      image: "/images/tel-esprit-qui-croyait-prendre.jpg",
    },
    {
      id: 2,
      title: "Belître",
      year: "Avril 2024",
      description: "Court métrage - Histoire d'un robot IA qui pète un plomb",
      image: "/images/belitre.jpg",
    },
    {
      id: 3,
      title: "Pour une poignée de fromage",
      year: "2023",
      description: "Western fromager absurde",
      duration: "4:17",
      link: "https://www.youtube.com/watch?v=JxgDb3LFVfU",
    },
    {
      id: 4,
      title: "La goutte de trop",
      year: "2022",
      description: "Parodie de comédie romantique",
      duration: "5:12",
      link: "https://www.youtube.com/watch?v=tOCUrUkwJyA",
      image: "/images/la-goutte-de-trop.jpg",
    },
  ]);

  return {
    scenarios
  };
}; 