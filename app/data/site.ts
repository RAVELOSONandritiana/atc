/**
 * Informations centrales du site — un seul endroit à modifier.
 */

export const site = {
  name: "Alasora Tech Center",
  shortName: "ATC",
  slogan: "Ne soyez plus un simple spectateur",
  tagline:
    "Formations technologiques à domicile à Alasora, Antananarivo — programmation, web, mobile, IA, cybersécurité, réseaux, Arduino et bureautique.",

  city: "Alasora",
  region: "Analamanga",
  country: "Madagascar",
  addressLocality: "Antananarivo",
  fullAddress: "Alasora, Antananarivo, Madagascar",

  /** Prix d'une séance de formation à domicile, en Ariary. */
  pricePerSession: 15_000,
  currency: "MGA",
  currencyLabel: "Ar",

  email: "hgbmichel@gmail.com",
  phones: [
    { display: "+261 33 73 292 04", tel: "+261337329204" },
    { display: "+261 38 32 062 18", tel: "+261383206218" },
  ],
  whatsapp: {
    /** Numéro affiché. */
    display: "+261 32 87 543 06",
    /** Format international sans « + » pour les liens wa.me. */
    number: "261328754306",
  },
  facebook:
    "https://www.facebook.com/profile.php?id=61552273513133",

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
    `Bonjour Alasora Tech Center !${modelLine} Comment s'inscrire ?`
  );
  return `https://wa.me/${site.whatsapp.number}?text=${text}`;
}

/** URL d'image Unsplash optimisée. */
export function unsplash(id: string, width: number, quality = 80): string {
  return `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${width}&q=${quality}`;
}
