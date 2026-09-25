import { unsplash } from "./site";

export type FormationSlug =
  | "programmation"
  | "developpement-web"
  | "developpement-mobile"
  | "administration-systeme-et-reseaux"
  | "intelligence-artificielle"
  | "cybersecurite"
  | "arduino"
  | "bureautique";

export interface ProgramStep {
  /** Titre du module, affiché dans la fiche technique et le diagramme. */
  title: string;
  /** Ce que l'apprenant sait faire à la fin du module. */
  detail: string;
}

export interface Formation {
  slug: FormationSlug;
  name: string;
  /** Nom court affiché sur les nœuds du diagramme de parcours. */
  shortName: string;
  /** Marquage SVG (viewBox 0 0 24 24, trait). */
  icon: string;
  tagline: string;
  description: string;
  level: string;
  keywords: string[];
  program: ProgramStep[];
  /** Débouchés possibles dans le monde professionnel. */
  outcomes: string[];
  prerequisites: { slug: FormationSlug; required: boolean }[];
  image: { id: string; alt: string };
}

export const formations: Formation[] = [
  {
    slug: "programmation",
    name: "Programmation",
    shortName: "Programmation",
    icon: '<polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>',
    tagline: "La base de toutes les carrières tech.",
    description:
      "Apprenez à penser comme un développeur : algorithmique, logique, structures de données et programmation orientée objet. C'est la porte d'entrée recommandée avant le web, le mobile ou l'intelligence artificielle.",
    level: "Débutant — aucune expérience requise",
    keywords: [
      "cours de programmation Antananarivo",
      "apprendre à coder Madagascar",
      "algorithmique",
      "initiation développement",
    ],
    program: [
      {
        title: "Penser comme une machine",
        detail:
          "Algorithmique, logique, décomposition d'un problème en étapes.",
      },
      {
        title: "Variables et conditions",
        detail: "Types de données, opérateurs, tests et boucles.",
      },
      {
        title: "Fonctions et structures de données",
        detail: "Réutiliser du code, listes, dictionnaires, tableaux.",
      },
      {
        title: "Programmation orientée objet",
        detail: "Classes, objets, héritage — organiser un vrai programme.",
      },
      {
        title: "Débogage et bonnes pratiques",
        detail: "Lire une erreur, tester, nommer, documenter.",
      },
      {
        title: "Projet final",
        detail: "Une application console complète, conçue de A à Z.",
      },
    ],
    outcomes: [
      "Développeur / développeuse junior",
      "Base solide pour toutes les spécialités tech",
      "Automatisation de tâches au bureau",
      "Freelance et missions en ligne",
    ],
    prerequisites: [],
    image: {
      id: "1484417894907-623942c8ee29",
      alt: "Programmation sur ordinateur portable, éditeur de code à l'écran",
    },
  },
  {
    slug: "developpement-web",
    name: "Développement Web",
    shortName: "Web",
    icon: '<circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>',
    tagline: "Créez des sites et applications pour le monde entier.",
    description:
      "De la première page HTML à une application web complète : design responsive, interactivité JavaScript, frameworks modernes, connexion à une API et mise en ligne. Un métier praticable en télétravail depuis Madagascar.",
    level: "Bases de programmation requises",
    keywords: [
      "formation développement web Madagascar",
      "cours HTML CSS JavaScript Antananarivo",
      "React",
      "créer un site web",
    ],
    program: [
      {
        title: "HTML & CSS",
        detail: "Structurer une page et la rendre belle sur tout écran.",
      },
      {
        title: "JavaScript interactif",
        detail: "Événements, manipulation du DOM, formulaires vivants.",
      },
      {
        title: "Un framework moderne",
        detail: "Composants, routage et état avec React.",
      },
      {
        title: "API et données",
        detail: "Consommer une API REST, authentification simple.",
      },
      {
        title: "Bases de données",
        detail: "Stocker et retrouver l'information proprement.",
      },
      {
        title: "Mise en production",
        detail: "Nom de domaine, hébergement, bonnes pratiques SEO.",
      },
    ],
    outcomes: [
      "Développeur front-end / back-end / full-stack",
      "Création de sites pour entreprises et associations",
      "Freelance international (télétravail)",
      "E-commerce et vitrines en ligne",
    ],
    prerequisites: [{ slug: "programmation", required: true }],
    image: {
      id: "1515879218367-8466d910aaa4",
      alt: "Développement web : code HTML et CSS à l'écran",
    },
  },
  {
    slug: "developpement-mobile",
    name: "Développement Mobile",
    shortName: "Mobile",
    icon: '<rect x="5" y="2" width="14" height="20" rx="2"/><path d="M12 18h.01"/>',
    tagline: "Vos applications dans la poche de tout un pays.",
    description:
      "Concevez et publiez de vraies applications Android et iOS : interfaces fluides, navigation, données en ligne et publication sur les stores. Le mobile est le premier écran de Madagascar — c'est un marché immense.",
    level: "Bases de programmation requises",
    keywords: [
      "formation développement mobile Madagascar",
      "cours Flutter Android Antananarivo",
      "créer une application mobile",
    ],
    program: [
      {
        title: "UI / UX mobile",
        detail: "Concevoir des écrans clairs et agréables.",
      },
      {
        title: "Flutter & Dart",
        detail: "Widgets, mise en page, thème responsive.",
      },
      {
        title: "Navigation et état",
        detail: "Multi-écrans, données partagées, cycle de vie.",
      },
      {
        title: "Connexion à une API",
        detail: "Listes dynamiques, authentification, images distantes.",
      },
      {
        title: "Stockage local",
        detail: "Préférences, base embarquée, mode hors ligne.",
      },
      {
        title: "Publication",
        detail: "Icônes, versionnage, dépôt sur Play Store.",
      },
    ],
    outcomes: [
      "Développeur d'applications Android / iOS",
      "Emplois dans les startups et studios mobiles",
      "Applications métiers pour PME locales",
      "Freelance et publication de vos propres apps",
    ],
    prerequisites: [{ slug: "programmation", required: true }],
    image: {
      id: "1551721434-8b94ddff0e6d",
      alt: "Développement d'une application mobile sur smartphone",
    },
  },
  {
    slug: "administration-systeme-et-reseaux",
    name: "Administration Système & Réseaux",
    shortName: "Systèmes & Réseaux",
    icon: '<rect x="2" y="2" width="20" height="8" rx="2"/><rect x="2" y="14" width="20" height="8" rx="2"/><path d="M6 6h.01"/><path d="M6 18h.01"/>',
    tagline: "Faites tourner les machines qui font tout fonctionner.",
    description:
      "Installez, configurez et sécurisez des ordinateurs et des réseaux : systèmes Windows et Linux, adressage IP, serveurs, sauvegardes. La compétence la plus demandée par les entreprises, et le socle de la cybersécurité.",
    level: "Débutant accepté",
    keywords: [
      "formation réseaux informatiques Madagascar",
      "cours Linux Windows serveur Antananarivo",
      "administrateur système réseau",
      "TCP IP",
    ],
    program: [
      {
        title: "Comprendre l'ordinateur",
        detail: "Composants, systèmes d'exploitation, système de fichiers.",
      },
      {
        title: "Windows & Linux",
        detail: "Installation, configuration, ligne de commande.",
      },
      {
        title: "Réseaux TCP/IP",
        detail: "Adressage, masques, routage, Wi-Fi.",
      },
      {
        title: "Services essentiels",
        detail: "DNS, DHCP, partage, serveur web de base.",
      },
      {
        title: "Sauvegardes & sécurité",
        detail: "Protéger, sauvegarder, restaurer.",
      },
      {
        title: "Dépannage réel",
        detail: "Diagnostic méthodique d'un parc informatique.",
      },
    ],
    outcomes: [
      "Technicien support informatique",
      "Administrateur systèmes & réseaux",
      "Gestion de parc et helpdesk",
      "Technicien datacenter / FAI",
    ],
    prerequisites: [],
    image: {
      id: "1544197150-b99a580bb7a8",
      alt: "Câblage réseau et équipements de connexion",
    },
  },
  {
    slug: "intelligence-artificielle",
    name: "Intelligence Artificielle",
    shortName: "IA",
    icon: '<rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><path d="M9 1v3"/><path d="M15 1v3"/><path d="M9 20v3"/><path d="M15 20v3"/><path d="M20 9h3"/><path d="M20 14h3"/><path d="M1 9h3"/><path d="M1 14h3"/>',
    tagline: "Comprenez la technologie qui transforme le monde.",
    description:
      "Découvrez comment les machines apprennent : manipulation de données avec Python, machine learning, réseaux de neurones et IA générative. Une formation concrète, orientée usage réel et projets.",
    level: "Bases de programmation requises",
    keywords: [
      "formation intelligence artificielle Madagascar",
      "cours machine learning Python Antananarivo",
      "data science débutant",
    ],
    program: [
      {
        title: "Panorama de l'IA",
        detail: "Usages réels, limites, éthique et opportunités.",
      },
      {
        title: "Python pour les données",
        detail: "Notebooks, tableaux, premiers graphiques.",
      },
      {
        title: "Machine learning",
        detail: "Entraîner un modèle, mesurer sa qualité.",
      },
      {
        title: "Réseaux de neurones",
        detail: "Intuition, architecture de base, démonstration.",
      },
      {
        title: "IA générative",
        detail: "LLM, prompting efficace, outils du quotidien.",
      },
      {
        title: "Projet appliqué",
        detail: "Prédiction ou classification sur un vrai jeu de données.",
      },
    ],
    outcomes: [
      "Data analyst junior",
      "Ingénieur machine learning (après spécialisation)",
      "Automatisation et analyse pour entreprises",
      "Utilisation experte des outils d'IA générative",
    ],
    prerequisites: [{ slug: "programmation", required: true }],
    image: {
      id: "1485827404703-89b55fcc595e",
      alt: "Robot humanoïde, symbole de l'intelligence artificielle",
    },
  },
  {
    slug: "cybersecurite",
    name: "Cybersécurité",
    shortName: "Cybersécurité",
    icon: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>',
    tagline: "Protéger les personnes, les systèmes et les données.",
    description:
      "Comprenez comment on attaque — et surtout comment on défend : sécurité des systèmes et des réseaux, chiffrement, attaques courantes et bonnes pratiques. Formation strictement éducative et défensive, à but pédagogique.",
    level: "Systèmes & réseaux + programmation recommandés",
    keywords: [
      "formation cybersécurité Madagascar",
      "cours sécurité informatique Antananarivo",
      "sécurité réseaux",
      "SOC analyste",
    ],
    program: [
      {
        title: "Fondamentaux",
        detail: "Confidentialité, intégrité, disponibilité, menaces.",
      },
      {
        title: "Sécurité des systèmes",
        detail: "Mots de passe, droits, mises à jour, durcissement.",
      },
      {
        title: "Réseaux sécurisés",
        detail: "Pare-feu, VPN, chiffrement, trafic suspect.",
      },
      {
        title: "Attaques courantes",
        detail: "Phishing, malwares, ingénierie sociale — pour s'en défendre.",
      },
      {
        title: "Introduction aux tests éthiques",
        detail: "Méthodologie encadrée, légalité, bonnes pratiques.",
      },
      {
        title: "Réagir à l'incident",
        detail: "Détection, réponse, plan de sauvegarde, veille.",
      },
    ],
    outcomes: [
      "Analyste SOC / surveillance de sécurité",
      "Technicien sécurité informatique",
      "Auditeur junior (bonnes pratiques)",
      "Administrateur sécurité des réseaux",
    ],
    prerequisites: [
      { slug: "administration-systeme-et-reseaux", required: true },
      { slug: "programmation", required: true },
    ],
    image: {
      id: "1563013544-824ae1b704d3",
      alt: "Cadenas symbolisant la sécurité des données",
    },
  },
  {
    slug: "arduino",
    name: "Arduino & Électronique",
    shortName: "Arduino",
    icon: '<path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z"/>',
    tagline: "Du code qui bouge le monde réel.",
    description:
      "Donnez vie à vos idées : capteurs, moteurs, LED, domotique et petits robots. Vous programmez des cartes Arduino et montez vos propres circuits — la porte d'entrée de l'IoT et de la robotique.",
    level: "Débutant accepté — bases de programmation conseillées",
    keywords: [
      "formation Arduino Madagascar",
      "cours électronique robotique Antananarivo",
      "IoT domotique",
    ],
    program: [
      {
        title: "Électricité de base",
        detail: "Tension, courant, composants, montage sans danger.",
      },
      {
        title: "Premiers montages",
        detail: "Breadboard, LED, boutons, première programmation.",
      },
      {
        title: "Capteurs",
        detail: "Température, lumière, distance — lire le monde réel.",
      },
      {
        title: "Actionneurs",
        detail: "Servos, moteurs, relais — agir sur le monde réel.",
      },
      {
        title: "Projets domotique",
        detail: "Luminaires connectés, alarmes, suivi de mesures.",
      },
      {
        title: "Du prototype au produit",
        detail: "Câblage propre, boîtier, documentation du projet.",
      },
    ],
    outcomes: [
      "Technicien électronique",
      "Projets IoT et domotique",
      "Robotique éducative et concours",
      "Prototypage pour entreprises et inventeurs",
    ],
    prerequisites: [{ slug: "programmation", required: false }],
    image: {
      id: "1553408226-42ecf81a214c",
      alt: "Carte Arduino et composants électroniques sur une table de travail",
    },
  },
  {
    slug: "bureautique",
    name: "Bureautique",
    shortName: "Bureautique",
    icon: '<rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>',
    tagline: "L'ordinateur maîtrisé, un atout pour chaque métier.",
    description:
      "Devenez autonome et rapide sur ordinateur : documents, tableaux de calcul, présentations, e-mails professionnels et outils collaboratifs. La compétence qui ouvre la porte de presque tous les bureaux.",
    level: "Débutant — aucune expérience requise",
    keywords: [
      "formation bureautique Madagascar",
      "cours Excel Word Antananarivo",
      "informatique bureautique débutant",
    ],
    program: [
      {
        title: "Prendre en main l'ordinateur",
        detail: "Windows, fichiers, dossiers, raccourcis utiles.",
      },
      {
        title: "Traitement de texte",
        detail: "Documents propres : CV, courriers, rapports.",
      },
      {
        title: "Tableur",
        detail: "Formules, tri, tableaux croisés, budgets.",
      },
      {
        title: "Présentations",
        detail: "Diapositives efficaces pour convaincre.",
      },
      {
        title: "Internet & e-mail",
        detail: "Recherche fiable, messagerie pro, sécurité de base.",
      },
      {
        title: "Outils collaboratifs",
        detail: "Cloud, partage de documents, visioconférence.",
      },
    ],
    outcomes: [
      "Secrétariat et assistance de direction",
      "Gestion administrative et comptable de base",
      "Saisie et gestion de données",
      "Atout direct pour l'emploi dans tous les secteurs",
    ],
    prerequisites: [],
    image: {
      id: "1544006658-89bde88e87c6",
      alt: "Tableur et documents de travail sur un ordinateur portable",
    },
  },
];

export function getFormation(slug: string): Formation | undefined {
  return formations.find((f) => f.slug === slug);
}

/** Formations dont celle-ci dépend, résolues en objets complets. */
export function prerequisitesOf(formation: Formation): {
  formation: Formation;
  required: boolean;
}[] {
  return formation.prerequisites
    .map((p) => {
      const f = getFormation(p.slug);
      return f ? { formation: f, required: p.required } : null;
    })
    .filter((x): x is { formation: Formation; required: boolean } => x !== null);
}

/** Formations qui reposent sur celle-ci (pour « cette formation ouvre vers… »). */
export function dependentsOf(slug: FormationSlug): Formation[] {
  return formations.filter((f) =>
    f.prerequisites.some((p) => p.slug === slug)
  );
}
