/**
 * Informations centrales du site — un seul endroit à modifier.
 */

export const site = {
  name: "LR Tech Center",
  shortName: "LR",
  slogan: "Ne soyez plus un simple spectateur",
  tagline:
    "Formations technologiques à Antananarivo, Madagascar — programmation, web, mobile, bases de données, IA, cybersécurité, réseaux, Arduino et bureautique.",

  city: "Antananarivo",
  region: "Analamanga",
  country: "Madagascar",
  addressLocality: "Antananarivo",
  fullAddress: "Antananarivo, Madagascar",

  /** Prix d'une séance de formation, en Ariary. */
  pricePerSession: 10_000,
  currency: "MGA",
  currencyLabel: "Ar",

  email: "hgbmichel@gmail.com",
  /** L'unique numéro d'appel et de WhatsApp utilisé par le centre. */
  phones: [{ display: "+261 33 732 92 04", tel: "+261337329204" }],
  whatsapp: {
    /** Numéro affiché. */
    display: "+261 32 87 540 36",
    /** Format international sans « + » pour les liens wa.me. */
    number: "261328754036",
  },
  facebook:
    "https://www.facebook.com/profile.php?id=61594176264776",

  /**
   * Domaine définitif, à compléter lors de la mise en ligne
   * (ex. "https://mondomaine.mg"). Tant que la valeur est vide,
   * les URLs canoniques sont relatives et le sitemap se construit
   * à partir de l'URL reçue par le serveur.
   */
  siteUrl: "" as string,

  /** Note légale affichée sur chaque fiche formation. */
  disclaimer:
    "Formations proposées à but éducatif. Les certificats officiels seront délivrés à l'ouverture des cours en salle.",

  /** Équipe fondatrice du centre. */
  founders: [
    "RAVELOSON Andritiana Michel",
    "RAKOTOBE Amboara Fehizoro",
    "Irintsoa Aina",
  ],
} as const;

/** Origine canonique du site : domaine configuré ou URL reçue par le serveur. */
export function canonicalOrigin(requestUrl: string | undefined): string {
  if (site.siteUrl) return site.siteUrl.replace(/\/$/, "");
  try {
    const url = new URL(requestUrl ?? "http://localhost");
    return `${url.protocol}//${url.host}`;
  } catch {
    return "http://localhost";
  }
}

/** Lien WhatsApp pré-rempli avec le message d'inscription. */
export function whatsappLink(model?: string): string {
  const modelLine = model
    ? ` Je suis intéressé par la formation « ${model} ».`
    : "";
  const text = encodeURIComponent(
    `Bonjour LR Tech Center !${modelLine} Comment s'inscrire ?`
  );
  return `https://wa.me/${site.whatsapp.number}?text=${text}`;
}

/** URL d'image Unsplash optimisée. */
export function unsplash(id: string, width: number, quality = 80): string {
  return `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${width}&q=${quality}`;
}
