import { Link } from "react-router";
import { SiteHeader } from "~/components/site-header";
import { SiteFooter } from "~/components/site-footer";
import { Reveal } from "~/components/reveal";
import { SiteIcon } from "~/components/site-icon";
import {
  formations,
  getFormation,
} from "~/data/formations";
import {
  site,
  unsplash,
  whatsappLink,
  canonicalOrigin,
} from "~/data/site";
import type { Route } from "./+types/home";

export function meta({ loaderData }: Route.MetaArgs) {
  const origin = loaderData?.origin ?? "http://localhost:5173";
  const title = `${site.name} — Formations informatiques à domicile à Alasora, Antananarivo`;
  const description =
    "Ne soyez plus un simple spectateur : programmation, web, mobile, IA, cybersécurité, réseaux, Arduino et bureautique. 15 000 Ar la séance à domicile à Alasora, Antananarivo.";

  return [
    { title },
    { name: "description", content: description },
    { property: "og:type", content: "website" },
    { property: "og:site_name", content: site.name },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:url", content: `${origin}/` },
    { property: "og:image", content: unsplash("1522071820081-009f0129c71c", 1200) },
    { property: "og:locale", content: "fr_FR" },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
    { tag: "link", rel: "canonical", href: `${origin}/` },
  ];
}

export function loader({ request }: Route.LoaderArgs) {
  const origin = canonicalOrigin(request.headers.get("X-Forwarded-Proto")
    ? `${request.headers.get("X-Forwarded-Proto")}://${request.headers.get("host")}`
    : request.url);

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Où se déroulent les formations ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Les séances se déroulent à domicile : le formateur se déplace chez vous, à Alasora et dans tout Antananarivo.",
        },
      },
      {
        "@type": "Question",
        name: "Quel est le prix d'une séance ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: `Chaque séance à domicile coûte ${site.pricePerSession.toLocaleString("fr-FR")} ${site.currencyLabel}, quel que soit le domaine choisi.`,
        },
      },
      {
        "@type": "Question",
        name: "Faut-il déjà savoir programmer ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Non. Programmation, bureautique et Arduino sont accessibles aux débutants. Les autres formations reposent sur des prérequis clairement indiqués sur chaque page.",
        },
      },
      {
        "@type": "Question",
        name: "Y a-t-il un certificat à la fin ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Les formations sont proposées à but éducatif. Les certificats officiels seront délivrés à l'ouverture des cours en salle.",
        },
      },
    ],
  };

  const coursesJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: formations.map((f, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Course",
        name: `${f.name} — ${site.name}`,
        description: f.description,
        url: `${origin}/formations/${f.slug}`,
        provider: {
          "@type": "EducationalOrganization",
          name: site.name,
          sameAs: site.siteUrl || undefined,
        },
        offers: {
          "@type": "Offer",
          price: site.pricePerSession,
          priceCurrency: site.currency,
        },
      },
    })),
  };

  return { origin, faqJsonLd, coursesJsonLd };
}

const stats = [
  { value: "8", label: "formations au choix" },
  { value: "15 000 Ar", label: "la séance à domicile" },
  { value: "100 %", label: "pratique, à votre rythme" },
];

const steps = [
  {
    icon: '<path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/>',
    title: "Choisissez votre formation",
    text: "Parcourez les 8 domaines et leur parcours détaillé. Pas sûr ? Commencez par la programmation : elle ouvre toutes les portes.",
  },
  {
    icon: '<circle cx="12" cy="12" r="10"/><path d="M12 8v4l2.5 2.5"/>',
    title: "Le formateur vient chez vous",
    text: "Des séances à domicile, à votre rythme, sur votre propre matériel — à Alasora et dans tout Antananarivo.",
  },
  {
    icon: '<path d="M20 6 9 17l-5-5"/>',
    title: "Pratiquez sur de vrais projets",
    text: "Chaque module aboutit à un projet concret : site web, application, montage électronique, tableau de bord.",
  },
];

const whyUs = [
  {
    icon: '<path d="M12 21s-8-4-8-10V5l8-3 8 3v6c0 6-8 10-8 10z"/>',
    title: "Apprentissage à domicile",
    text: "Zéro transport, zéro stress : vous apprenez dans votre environnement, avec un suivi personnel.",
  },
  {
    icon: '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
    title: "Suivi individualisé",
    text: "Un formateur pour vous seul : le rythme s'adapte à votre niveau, vos questions, vos objectifs.",
  },
  {
    icon: '<circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>',
    title: "Compétences mondiales",
    text: "Un programme aligné sur les métiers d'ici et de l'international : freelance, télétravail, entreprises locales.",
  },
  {
    icon: '<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M7 7h10M7 12h10M7 17h6"/>',
    title: "Parcours transparents",
    text: "Chaque formation affiche son programme complet, ses débouchés et ses prérequis avant l'inscription.",
  },
];

const faqs = [
  {
    q: "Où se déroulent les formations ?",
    a: "À domicile : le formateur se déplace chez vous, à Alasora et dans tout Antananarivo, sur votre propre ordinateur.",
  },
  {
    q: "Quel est le prix d'une séance ?",
    a: `${site.pricePerSession.toLocaleString("fr-FR")} ${site.currencyLabel} la séance, quel que soit le domaine. Vous payez séance par séance, sans engagement.`,
  },
  {
    q: "Faut-il déjà savoir programmer ?",
    a: "Non. Programmation, bureautique et Arduino sont accessibles aux débutants. Les autres formations indiquent clairement leurs prérequis et vers quoi elles ouvrent.",
  },
  {
    q: "Combien de séances faut-il ?",
    a: "Chaque formation compte 6 modules ; comptez une séance par module, avec la possibilité de revenir sur les points difficiles. Le rythme reste le vôtre.",
  },
  {
    q: "Y a-t-il un certificat à la fin ?",
    a: "Les formations sont proposées à but éducatif. Les certificats officiels seront délivrés à l'ouverture des cours en salle.",
  },
];

export default function Home({ loaderData }: Route.ComponentProps) {
  const baseFormations = [
    getFormation("programmation")!,
    getFormation("administration-systeme-et-reseaux")!,
    getFormation("bureautique")!,
  ];
  const advancedFormations = formations.filter(
    (f) =>
      !["programmation", "administration-systeme-et-reseaux", "bureautique"].includes(
        f.slug
      )
  );

  return (
    <>
      <SiteHeader />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(loaderData.faqJsonLd),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(loaderData.coursesJsonLd),
        }}
      />
      <main id="main">
        {/* ── HERO ─────────────────────────────────────────── */}
        <section className="relative isolate overflow-hidden">
          <img
            src={unsplash("1522071820081-009f0129c71c", 1600)}
            alt=""
            aria-hidden="true"
            width={1600}
            height={900}
            fetchPriority="high"
            className="absolute inset-0 -z-10 h-full w-full object-cover"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10 bg-gradient-to-br from-zinc-950/95 via-zinc-950/85 to-brand-950/80"
          />
          <div
            aria-hidden="true"
            className="animate-gradient absolute inset-0 -z-10 bg-[linear-gradient(120deg,rgba(79,70,229,0.25),rgba(168,85,247,0.18),rgba(79,70,229,0.25))] bg-[length:200%_200%] opacity-70"
          />

          <div className="mx-auto max-w-6xl px-4 pb-20 pt-32 sm:px-6 sm:pt-40 lg:pb-28">
            <div className="max-w-3xl">
              <Reveal>
                <p className="animate-fade-in inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-brand-200 backdrop-blur">
                  <span className="animate-pulse-soft inline-block h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  Inscriptions ouvertes · Alasora, Antananarivo
                </p>
              </Reveal>
              <Reveal delay={120}>
                <h1 className="mt-6 text-4xl font-black leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-6xl">
                  Ne soyez plus un simple{" "}
                  <span className="bg-gradient-to-r from-brand-300 via-accent-400 to-brand-300 bg-clip-text text-transparent">
                    spectateur
                  </span>
                  .
                </h1>
              </Reveal>
              <Reveal delay={240}>
                <p className="mt-6 max-w-2xl text-lg leading-relaxed text-zinc-300">
                  {site.name} forme aux compétences numériques qui recrutent,
                  du premier code au machine learning — des séances à domicile,
                  à votre rythme, avec de vrais projets.
                </p>
              </Reveal>
              <Reveal delay={360}>
                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <a
                    href={whatsappLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full bg-gradient-to-r from-brand-500 to-accent-500 px-7 py-3.5 text-sm font-bold text-white shadow-xl shadow-brand-600/30 transition hover:-translate-y-0.5 hover:shadow-2xl"
                  >
                    S'inscrire sur WhatsApp
                  </a>
                  <Link
                    to="/formations"
                    className="rounded-full border border-white/25 bg-white/5 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur transition hover:border-white/50 hover:bg-white/10"
                  >
                    Découvrir les formations
                  </Link>
                </div>
              </Reveal>
              <Reveal delay={480}>
                <dl className="mt-12 grid max-w-xl grid-cols-3 gap-6">
                  {stats.map((s) => (
                    <div key={s.label}>
                      <dt className="sr-only">{s.label}</dt>
                      <dd className="text-2xl font-black text-white sm:text-3xl">
                        {s.value}
                      </dd>
                      <dd className="mt-1 text-xs leading-snug text-zinc-400 sm:text-sm">
                        {s.label}
                      </dd>
                    </div>
                  ))}
                </dl>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ── COMMENT ÇA MARCHE ────────────────────────────── */}
        <section
          id="methode"
          className="mx-auto max-w-6xl px-4 py-20 sm:px-6"
          aria-labelledby="methode-title"
        >
          <Reveal>
            <h2
              id="methode-title"
              className="text-center text-3xl font-black tracking-tight text-zinc-900 dark:text-white sm:text-4xl"
            >
              Comment ça se passe
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-center text-zinc-600 dark:text-zinc-400">
              Trois étapes simples, du premier contact à votre premier projet
              terminé.
            </p>
          </Reveal>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {steps.map((step, i) => (
              <Reveal key={step.title} delay={i * 140}>
                <div className="group relative h-full rounded-2xl border border-zinc-200 bg-white p-7 transition duration-300 hover:-translate-y-1 hover:border-brand-300 hover:shadow-xl hover:shadow-brand-600/5 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-brand-700">
                  <span className="absolute -top-3.5 left-6 flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-brand-600 to-accent-500 text-sm font-black text-white shadow-md">
                    {i + 1}
                  </span>
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-600 transition group-hover:scale-110 dark:bg-brand-950/60 dark:text-brand-400">
                    <SiteIcon markup={step.icon} className="h-6 w-6" />
                  </span>
                  <h3 className="mt-5 text-lg font-bold text-zinc-900 dark:text-white">
                    {step.title}
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                    {step.text}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ── PARCOURS (DIAGRAMME GLOBAL) ──────────────────── */}
        <section
          id="parcours"
          className="border-y border-zinc-200 bg-gradient-to-b from-zinc-50 to-white py-20 dark:border-zinc-800 dark:from-zinc-900/60 dark:to-zinc-950"
          aria-labelledby="parcours-title"
        >
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <Reveal>
              <h2
                id="parcours-title"
                className="text-center text-3xl font-black tracking-tight text-zinc-900 dark:text-white sm:text-4xl"
              >
                Votre parcours, étape par étape
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-center text-zinc-600 dark:text-zinc-400">
                Les formations se complètent. Les bases s'atteignent
                directement ; les spécialités s'ouvrent une fois les
                prérequis maîtrisés. Chaque fiche détaillée affiche son
                propre diagramme de dépendances.
              </p>
            </Reveal>

            <div className="mt-12 space-y-8">
              {/* Niveau 1 : bases */}
              <Reveal>
                <div>
                  <p className="mb-4 text-center text-xs font-bold uppercase tracking-[0.18em] text-brand-600 dark:text-brand-400">
                    Niveau 1 · Les bases — accessibles à tous
                  </p>
                  <div className="flex flex-wrap items-stretch justify-center gap-3">
                    {baseFormations.map((f) => (
                      <Link
                        key={f.slug}
                        to={`/formations/${f.slug}`}
                        prefetch="intent"
                        className="group flex items-center gap-3 rounded-2xl border border-brand-200 bg-white px-5 py-4 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg dark:border-brand-800 dark:bg-zinc-900"
                      >
                        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-brand-600 to-accent-500 text-white">
                          <SiteIcon markup={f.icon} className="h-5 w-5" />
                        </span>
                        <span>
                          <span className="block text-sm font-bold text-zinc-900 dark:text-white">
                            {f.name}
                          </span>
                          <span className="block text-xs text-zinc-500 dark:text-zinc-400">
                            Aucun prérequis
                          </span>
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              </Reveal>

              {/* Flèche descendante */}
              <Reveal>
                <div aria-hidden="true" className="flex justify-center">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-7 w-7 animate-float text-brand-400"
                  >
                    <path d="M12 5v14" />
                    <path d="m19 12-7 7-7-7" />
                  </svg>
                </div>
              </Reveal>

              {/* Niveau 2 : spécialités */}
              <Reveal delay={120}>
                <div>
                  <p className="mb-4 text-center text-xs font-bold uppercase tracking-[0.18em] text-accent-600 dark:text-accent-400">
                    Niveau 2 · Les spécialités
                  </p>
                  <div className="flex flex-wrap items-stretch justify-center gap-3">
                    {advancedFormations.map((f) => {
                      const prereqNames = f.prerequisites
                        .map((p) => getFormation(p.slug)?.shortName)
                        .filter(Boolean)
                        .join(" + ");
                      return (
                        <Link
                          key={f.slug}
                          to={`/formations/${f.slug}`}
                          prefetch="intent"
                          className="group flex items-center gap-3 rounded-2xl border border-zinc-200 bg-white px-5 py-4 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-accent-400 hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-accent-500"
                        >
                          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-100 text-brand-600 transition group-hover:bg-brand-600 group-hover:text-white dark:bg-zinc-800 dark:text-brand-400">
                            <SiteIcon markup={f.icon} className="h-5 w-5" />
                          </span>
                          <span>
                            <span className="block text-sm font-bold text-zinc-900 dark:text-white">
                              {f.name}
                            </span>
                            <span className="block text-xs text-zinc-500 dark:text-zinc-400">
                              {prereqNames
                                ? `Prérequis : ${prereqNames}`
                                : "Aucun prérequis"}
                            </span>
                          </span>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ── POURQUOI NOUS ────────────────────────────────── */}
        <section
          id="pourquoi"
          className="mx-auto max-w-6xl px-4 py-20 sm:px-6"
          aria-labelledby="pourquoi-title"
        >
          <Reveal>
            <h2
              id="pourquoi-title"
              className="text-center text-3xl font-black tracking-tight text-zinc-900 dark:text-white sm:text-4xl"
            >
              Pourquoi {site.name} ?
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {whyUs.map((item, i) => (
              <Reveal key={item.title} delay={i * 120}>
                <div className="h-full rounded-2xl border border-zinc-200 bg-white p-6 transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-brand-600/5 dark:border-zinc-800 dark:bg-zinc-900">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-brand-600 to-accent-500 text-white">
                    <SiteIcon markup={item.icon} className="h-5.5 w-5.5" />
                  </span>
                  <h3 className="mt-4 text-base font-bold text-zinc-900 dark:text-white">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                    {item.text}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ── PRIX ─────────────────────────────────────────── */}
        <section
          id="tarif"
          className="mx-auto max-w-6xl px-4 pb-20 sm:px-6"
          aria-labelledby="tarif-title"
        >
          <Reveal>
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-brand-700 via-brand-600 to-accent-600 px-6 py-14 text-center shadow-2xl shadow-brand-600/25 sm:px-12">
              <div
                aria-hidden="true"
                className="animate-gradient absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,0.12),transparent,rgba(255,255,255,0.12))] bg-[length:200%_200%]"
              />
              <h2
                id="tarif-title"
                className="relative text-3xl font-black tracking-tight text-white sm:text-4xl"
              >
                Un tarif simple et transparent
              </h2>
              <p className="relative mt-4 text-lg text-brand-100">
                Séance à domicile, tous domaines confondus
              </p>
              <p className="relative mt-6">
                <span className="text-6xl font-black tracking-tight text-white">
                  15 000
                </span>{" "}
                <span className="text-2xl font-bold text-brand-200">Ar</span>{" "}
                <span className="text-lg text-brand-200">/ séance</span>
              </p>
              <p className="relative mx-auto mt-4 max-w-md text-sm text-brand-100">
                Paiement séance par séance, sans engagement. Le formateur se
                déplace avec un plan de séance clair et un objectif concret.
              </p>
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="relative mt-8 inline-block rounded-full bg-white px-8 py-3.5 text-sm font-bold text-brand-700 shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl"
              >
                Réserver une première séance
              </a>
            </div>
          </Reveal>
        </section>

        {/* ── FAQ ──────────────────────────────────────────── */}
        <section
          id="faq"
          className="border-t border-zinc-200 bg-zinc-50 py-20 dark:border-zinc-800 dark:bg-zinc-900/40"
          aria-labelledby="faq-title"
        >
          <div className="mx-auto max-w-3xl px-4 sm:px-6">
            <Reveal>
              <h2
                id="faq-title"
                className="text-center text-3xl font-black tracking-tight text-zinc-900 dark:text-white sm:text-4xl"
              >
                Questions fréquentes
              </h2>
            </Reveal>
            <div className="mt-10 space-y-3">
              {faqs.map((faq, i) => (
                <Reveal key={faq.q} delay={i * 80}>
                  <details className="group rounded-2xl border border-zinc-200 bg-white transition hover:border-brand-300 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-brand-700">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-4.5 text-sm font-semibold text-zinc-900 dark:text-white [&::-webkit-details-marker]:hidden">
                      {faq.q}
                      <svg
                        aria-hidden="true"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-4.5 w-4.5 shrink-0 text-brand-500 transition-transform duration-300 group-open:rotate-45"
                      >
                        <path d="M12 5v14" />
                        <path d="M5 12h14" />
                      </svg>
                    </summary>
                    <p className="px-6 pb-5 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                      {faq.a}
                    </p>
                  </details>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── CONTACT ──────────────────────────────────────── */}
        <section
          id="contact"
          className="mx-auto max-w-6xl scroll-mt-20 px-4 py-20 sm:px-6"
          aria-labelledby="contact-title"
        >
          <Reveal>
            <h2
              id="contact-title"
              className="text-center text-3xl font-black tracking-tight text-zinc-900 dark:text-white sm:text-4xl"
            >
              Prêt à passer de l'autre côté ?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-center text-zinc-600 dark:text-zinc-400">
              Écrivez-nous sur WhatsApp ou appelez directement : nous
              vous conseillons la formation adaptée à votre objectif.
            </p>
          </Reveal>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <Reveal>
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="block h-full rounded-2xl border border-emerald-300/60 bg-emerald-50 p-6 text-center transition duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-emerald-800/60 dark:bg-emerald-950/40"
              >
                <span className="text-2xl" aria-hidden="true">💬</span>
                <p className="mt-3 text-sm font-bold text-zinc-900 dark:text-white">
                  WhatsApp
                </p>
                <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                  {site.whatsapp.display}
                </p>
              </a>
            </Reveal>
            {site.phones.map((p, i) => (
              <Reveal key={p.tel} delay={(i + 1) * 120}>
                <a
                  href={`tel:${p.tel}`}
                  className="block h-full rounded-2xl border border-zinc-200 bg-white p-6 text-center transition duration-300 hover:-translate-y-1 hover:border-brand-300 hover:shadow-xl dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-brand-700"
                >
                  <span className="text-2xl" aria-hidden="true">📞</span>
                  <p className="mt-3 text-sm font-bold text-zinc-900 dark:text-white">
                    Appel direct
                  </p>
                  <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                    {p.display}
                  </p>
                </a>
              </Reveal>
            ))}
            <Reveal delay={360}>
              <a
                href={`mailto:${site.email}`}
                className="block h-full rounded-2xl border border-zinc-200 bg-white p-6 text-center transition duration-300 hover:-translate-y-1 hover:border-brand-300 hover:shadow-xl dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-brand-700"
              >
                <span className="text-2xl" aria-hidden="true">✉️</span>
                <p className="mt-3 text-sm font-bold text-zinc-900 dark:text-white">
                  E-mail
                </p>
                <p className="mt-1 break-all text-sm text-zinc-600 dark:text-zinc-400">
                  {site.email}
                </p>
              </a>
            </Reveal>
          </div>
          <Reveal delay={200}>
            <p className="mt-10 text-center text-sm text-zinc-500 dark:text-zinc-400">
              📍 {site.fullAddress} · Suivez-nous sur{" "}
              <a
                href={site.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-brand-600 underline decoration-brand-300 underline-offset-4 transition hover:text-brand-700 dark:text-brand-400"
              >
                Facebook
              </a>
            </p>
          </Reveal>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
