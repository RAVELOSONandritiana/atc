import { Link } from "react-router";
import { SiteHeader } from "~/components/site-header";
import { SiteFooter } from "~/components/site-footer";
import { Reveal } from "~/components/reveal";
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
  const title = `${site.name} — Formations informatiques à Antananarivo`;
  const description =
    "Formations en informatique à Antananarivo (Madagascar) : programmation, web, mobile, bases de données, réseaux, IA, cybersécurité, Arduino et bureautique. 10 000 Ar la séance, sans engagement.";

  return [
    { title },
    { name: "description", content: description },
    { property: "og:type", content: "website" },
    { property: "og:site_name", content: site.name },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:url", content: `${origin}/` },
    { property: "og:image", content: `${origin}/logo.png` },
    { property: "og:locale", content: "fr_FR" },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
    { tag: "link", rel: "canonical", href: `${origin}/` },
  ];
}

export function loader({ request }: Route.LoaderArgs) {
  const origin = canonicalOrigin(
    request.headers.get("X-Forwarded-Proto")
      ? `${request.headers.get("X-Forwarded-Proto")}://${request.headers.get("host")}`
      : request.url
  );

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Où se déroulent les formations ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Actuellement, les séances se déroulent à domicile : le formateur se déplace chez vous, dans tout Antananarivo. Une salle de formation est en préparation.",
        },
      },
      {
        "@type": "Question",
        name: "Quel est le prix d'une séance ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: `Chaque séance coûte ${site.pricePerSession.toLocaleString("fr-FR")} ${site.currencyLabel}, quel que soit le domaine choisi.`,
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
  { value: "9", label: "formations au choix" },
  { value: "10 000 Ar", label: "la séance" },
  { value: "6", label: "modules par formation" },
];

const steps = [
  {
    icon: "fa-solid fa-list-check",
    title: "Choisissez votre formation",
    text: "Huit domaines, du bureautique à l'intelligence artificielle. Si vous hésitez, la programmation est le meilleur point de départ : elle prépare à presque tout le reste.",
  },
  {
    icon: "fa-solid fa-user-tie",
    title: "Un formateur dédié",
    text: "Séances individuelles, sur votre propre ordinateur, avec des horaires à convenir avec le formateur. Une salle de formation est aussi en préparation pour les cours en présentiel.",
  },
  {
    icon: "fa-solid fa-laptop-code",
    title: "Vous pratiquez, séance après séance",
    text: "Chaque module se termine par un exercice concret : une page web, un petit programme, un montage électronique. Vous avancez à votre rythme, le nombre de séances s'adapte à votre niveau.",
  },
];

const whyUs = [
  {
    icon: "fa-solid fa-chalkboard-user",
    title: "Un formateur, un apprenant",
    text: "Les séances sont individuelles. Le rythme s'ajuste à votre niveau : on ralentit sur les points difficiles, on accélère sur ce que vous maîtrisez déjà.",
  },
  {
    icon: "fa-solid fa-laptop",
    title: "Sur votre matériel, en conditions réelles",
    text: "On configure et on travaille directement sur votre ordinateur, comme vous le ferez après la formation — à domicile aujourd'hui, en salle demain.",
  },
  {
    icon: "fa-solid fa-file-invoice",
    title: "Un programme clair",
    text: "Chaque formation est découpée en 6 modules annoncés à l'avance. Vous savez ce qui est vu à chaque séance et où vous en êtes.",
  },
  {
    icon: "fa-solid fa-graduation-cap",
    title: "Vers de vraies compétences",
    text: "Le programme vise les compétences utilisées en entreprise et en freelance, à Madagascar comme à l'étranger.",
  },
];

const faqs = [
  {
    q: "Où se déroulent les formations ?",
    a: "Actuellement à domicile : le formateur se déplace chez vous, dans tout Antananarivo, sur votre propre ordinateur. Une salle de formation est en préparation pour les cours en présentiel.",
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
    a: "Chaque formation est découpée en 6 modules, mais le nombre de séances dépend de votre niveau et de votre rythme : certains vont plus vite, d'autres reviennent sur les points difficiles. Vous décidez avec le formateur.",
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
        <section className="relative isolate overflow-hidden bg-zinc-950">
          <img
            src={unsplash("1522071820081-009f0129c71c", 1600)}
            alt=""
            aria-hidden="true"
            width={1600}
            height={900}
            fetchPriority="high"
            className="absolute inset-0 -z-10 h-full w-full object-cover opacity-40"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10 bg-zinc-950/70"
          />

          <div className="mx-auto max-w-6xl px-4 pb-20 pt-32 sm:px-6 sm:pt-40 lg:pb-28">
            <div className="max-w-3xl">
              <Reveal>
                <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-zinc-300">
                  <i
                    className="fa-solid fa-location-dot text-brand-400"
                    aria-hidden="true"
                  />
                  Antananarivo, Madagascar — centre de formation technologique
                </p>
              </Reveal>
              <Reveal delay={100}>
                <h1 className="mt-6 text-4xl font-bold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-6xl">
                  Ne soyez plus un simple{" "}
                  <span className="text-brand-400">spectateur</span>.
                </h1>
              </Reveal>
              <Reveal delay={200}>
                <p className="mt-6 max-w-2xl text-lg leading-relaxed text-zinc-300">
                  Apprenez à programmer, créer des sites et des applications,
                  administrer des réseaux ou maîtriser l'ordinateur. Un
                  formateur dédié vous accompagne, une séance à la fois.
                </p>
              </Reveal>
              <Reveal delay={300}>
                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <a
                    href={whatsappLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-md bg-brand-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-500"
                  >
                    <i className="fa-brands fa-whatsapp mr-2" aria-hidden="true" />
                    Écrire sur WhatsApp
                  </a>
                  <Link
                    to="/formations"
                    className="rounded-md border border-zinc-500 px-6 py-3 text-sm font-semibold text-white transition-colors hover:border-zinc-300 hover:bg-white/10"
                  >
                    Voir les 9 formations
                  </Link>
                </div>
              </Reveal>
              <Reveal delay={400}>
                <dl className="mt-12 grid max-w-xl grid-cols-3 gap-6 border-t border-white/15 pt-8">
                  {stats.map((s) => (
                    <div key={s.label}>
                      <dt className="sr-only">{s.label}</dt>
                      <dd className="text-2xl font-bold text-white sm:text-3xl">
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
              className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-3xl"
            >
              Comment ça se passe
            </h2>
            <p className="mt-3 max-w-2xl text-zinc-600 dark:text-zinc-400">
              Pas de diplôme requis pour commencer, pas d'engagement : vous
              avancez séance par séance.
            </p>
          </Reveal>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {steps.map((step, i) => (
              <Reveal key={step.title} delay={i * 100}>
                <div className="h-full rounded-lg border border-zinc-200 p-6 dark:border-zinc-800">
                  <div className="flex items-center justify-between">
                    <i
                      className={`${step.icon} text-xl text-brand-600 dark:text-brand-400`}
                      aria-hidden="true"
                    />
                    <span className="text-sm font-semibold text-zinc-400 dark:text-zinc-500">
                      0{i + 1}
                    </span>
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-zinc-900 dark:text-white">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
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
          className="border-y border-zinc-200 bg-zinc-50 py-20 dark:border-zinc-800 dark:bg-zinc-900/40"
          aria-labelledby="parcours-title"
        >
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <Reveal>
              <h2
                id="parcours-title"
                className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-3xl"
              >
                Les formations et leurs dépendances
              </h2>
              <p className="mt-3 max-w-2xl text-zinc-600 dark:text-zinc-400">
                Trois formations se suivent sans prérequis. Les autres
                s'ouvrent une fois les bases acquises — chaque fiche détaille
                son propre schéma de dépendances.
              </p>
            </Reveal>

            <div className="mt-10 space-y-8">
              {/* Niveau 1 : bases */}
              <Reveal>
                <div>
                  <p className="mb-4 text-xs font-semibold uppercase tracking-[0.14em] text-zinc-500 dark:text-zinc-400">
                    Sans prérequis
                  </p>
                  <div className="flex flex-wrap items-stretch gap-3">
                    {baseFormations.map((f) => (
                      <Link
                        key={f.slug}
                        to={`/formations/${f.slug}`}
                        prefetch="intent"
                        className="flex items-center gap-3 rounded-lg border border-zinc-200 bg-white px-5 py-4 transition-colors hover:border-brand-400 dark:border-zinc-700 dark:bg-zinc-900 dark:hover:border-brand-500"
                      >
                        <span>
                          <span className="block text-sm font-semibold text-zinc-900 dark:text-white">
                            {f.name}
                          </span>
                          <span className="block text-xs text-zinc-500 dark:text-zinc-400">
                            Accessible à tous
                          </span>
                        </span>
                        <i
                          className="fa-solid fa-arrow-right ml-2 text-xs text-zinc-400"
                          aria-hidden="true"
                        />
                      </Link>
                    ))}
                  </div>
                </div>
              </Reveal>

              {/* Séparateur */}
              <Reveal>
                <div aria-hidden="true" className="flex items-center gap-3">
                  <span className="h-px flex-1 bg-zinc-200 dark:bg-zinc-700" />
                  <i
                    className="fa-solid fa-arrow-down text-sm text-zinc-400"
                    aria-hidden="true"
                  />
                  <span className="text-xs font-medium uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                    puis
                  </span>
                  <span className="h-px flex-1 bg-zinc-200 dark:bg-zinc-700" />
                </div>
              </Reveal>

              {/* Niveau 2 : spécialités */}
              <Reveal delay={100}>
                <div>
                  <p className="mb-4 text-xs font-semibold uppercase tracking-[0.14em] text-zinc-500 dark:text-zinc-400">
                    Avec prérequis
                  </p>
                  <div className="flex flex-wrap items-stretch gap-3">
                    {advancedFormations.map((f) => {
                      const prereqNames = f.prerequisites
                        .map(
                          (p) =>
                            `${getFormation(p.slug)?.shortName ?? ""}${
                              p.required ? "" : " (conseillé)"
                            }`
                        )
                        .filter(Boolean)
                        .join(" + ");
                      return (
                        <Link
                          key={f.slug}
                          to={`/formations/${f.slug}`}
                          prefetch="intent"
                          className="flex items-center gap-3 rounded-lg border border-zinc-200 bg-white px-5 py-4 transition-colors hover:border-brand-400 dark:border-zinc-700 dark:bg-zinc-900 dark:hover:border-brand-500"
                        >
                          <span>
                            <span className="block text-sm font-semibold text-zinc-900 dark:text-white">
                              {f.name}
                            </span>
                            <span className="block text-xs text-zinc-500 dark:text-zinc-400">
                              {prereqNames
                                ? `Prérequis : ${prereqNames}`
                                : "Accessible à tous"}
                            </span>
                          </span>
                          <i
                            className="fa-solid fa-arrow-right ml-2 text-xs text-zinc-400"
                            aria-hidden="true"
                          />
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
              className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-3xl"
            >
              Pourquoi apprendre avec nous
            </h2>
          </Reveal>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {whyUs.map((item, i) => (
              <Reveal key={item.title} delay={i * 80}>
                <div className="h-full rounded-lg border border-zinc-200 p-6 dark:border-zinc-800">
                  <i
                    className={`${item.icon} text-xl text-brand-600 dark:text-brand-400`}
                    aria-hidden="true"
                  />
                  <h3 className="mt-4 text-base font-semibold text-zinc-900 dark:text-white">
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
            <div className="rounded-lg border border-zinc-200 bg-white px-6 py-12 text-center dark:border-zinc-800 dark:bg-zinc-900 sm:px-12">
              <h2
                id="tarif-title"
                className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-3xl"
              >
                {site.pricePerSession.toLocaleString("fr-FR")}{" "}
                {site.currencyLabel} la séance
              </h2>
              <p className="mx-auto mt-3 max-w-xl text-zinc-600 dark:text-zinc-400">
                Le même tarif pour les 9 formations. Vous payez après chaque
                séance, sans forfait ni engagement — vous arrêtez ou changez
                de formation quand vous voulez.
              </p>
              <dl className="mx-auto mt-8 grid max-w-2xl gap-6 text-left sm:grid-cols-3">
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                    Format
                  </dt>
                  <dd className="mt-1 text-sm font-medium text-zinc-900 dark:text-white">
                    Individuel — salle en préparation
                  </dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                    Zone
                  </dt>
                  <dd className="mt-1 text-sm font-medium text-zinc-900 dark:text-white">
                    Antananarivo, Madagascar
                  </dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                    Durée
                  </dt>
                  <dd className="mt-1 text-sm font-medium text-zinc-900 dark:text-white">
                    ~2 h par séance, à votre rythme
                  </dd>
                </div>
              </dl>
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-block rounded-md bg-brand-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-500"
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
                className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-3xl"
              >
                Questions fréquentes
              </h2>
            </Reveal>
            <div className="mt-8 space-y-3">
              {faqs.map((faq, i) => (
                <Reveal key={faq.q} delay={i * 60}>
                  <details className="group rounded-lg border border-zinc-200 bg-white transition-colors hover:border-brand-300 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-brand-700">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-sm font-semibold text-zinc-900 dark:text-white [&::-webkit-details-marker]:hidden">
                      {faq.q}
                      <i
                        className="fa-solid fa-plus text-xs text-brand-500 transition-transform duration-200 group-open:rotate-45"
                        aria-hidden="true"
                      />
                    </summary>
                    <p className="px-5 pb-5 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
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
              className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-3xl"
            >
              Pour s'inscrire ou demander conseil
            </h2>
            <p className="mt-3 max-w-2xl text-zinc-600 dark:text-zinc-400">
              Un message suffit : dites-nous ce que vous voulez apprendre et
              votre niveau actuel, nous vous répondons avec un plan de départ.
            </p>
          </Reveal>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Reveal>
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="block h-full rounded-lg border border-zinc-200 p-5 transition-colors hover:border-emerald-400 dark:border-zinc-800 dark:hover:border-emerald-500"
              >
                <img
                  src="/whatsapp.svg"
                  alt=""
                  aria-hidden="true"
                  width={24}
                  height={24}
                  loading="lazy"
                  className="h-6 w-6 object-contain"
                />
                <p className="mt-3 text-sm font-semibold text-zinc-900 dark:text-white">
                  WhatsApp
                </p>
                <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                  {site.whatsapp.display}
                </p>
              </a>
            </Reveal>
            {site.phones.map((p, i) => (
              <Reveal key={p.tel} delay={(i + 1) * 80}>
                <a
                  href={`tel:${p.tel}`}
                  className="block h-full rounded-lg border border-zinc-200 p-5 transition-colors hover:border-brand-400 dark:border-zinc-800 dark:hover:border-brand-500"
                >
                  <img
                    src="/phone-apple-iphone.svg"
                    alt=""
                    aria-hidden="true"
                    width={24}
                    height={24}
                    loading="lazy"
                    className="h-6 w-6 object-contain"
                  />
                  <p className="mt-3 text-sm font-semibold text-zinc-900 dark:text-white">
                    Appel direct
                  </p>
                  <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                    {p.display}
                  </p>
                </a>
              </Reveal>
            ))}
            <Reveal delay={160}>
              <a
                href={`mailto:${site.email}`}
                className="block h-full rounded-lg border border-zinc-200 p-5 transition-colors hover:border-brand-400 dark:border-zinc-800 dark:hover:border-brand-500"
              >
                <img
                  src="/gmail.svg"
                  alt=""
                  aria-hidden="true"
                  width={24}
                  height={24}
                  loading="lazy"
                  className="h-6 w-6 object-contain"
                />
                <p className="mt-3 text-sm font-semibold text-zinc-900 dark:text-white">
                  E-mail
                </p>
                <p className="mt-1 break-all text-sm text-zinc-600 dark:text-zinc-400">
                  {site.email}
                </p>
              </a>
            </Reveal>
          </div>
          <Reveal delay={150}>
            <p className="mt-8 flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400">
              <img
                src="/facebook.svg"
                alt=""
                aria-hidden="true"
                width={20}
                height={20}
                loading="lazy"
                className="h-5 w-5 object-contain"
              />
              <span>
                Actualités et annonces sur{" "}
                <a
                  href={site.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-brand-600 underline underline-offset-4 transition-colors hover:text-brand-700 dark:text-brand-400 dark:hover:text-brand-300"
                >
                  notre page Facebook
                </a>{" "}
                — {site.fullAddress}
              </span>
            </p>
          </Reveal>
        </section>
      </main>
    </>
  );
}
