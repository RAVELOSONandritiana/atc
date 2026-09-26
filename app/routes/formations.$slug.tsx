import { Link } from "react-router";
import { SiteHeader } from "~/components/site-header";
import { SiteFooter } from "~/components/site-footer";
import { Reveal } from "~/components/reveal";
import { SiteIcon } from "~/components/site-icon";
import { Roadmap } from "~/components/roadmap";
import {
  formations,
  getFormation,
  prerequisitesOf,
} from "~/data/formations";
import {
  site,
  unsplash,
  whatsappLink,
  canonicalOrigin,
} from "~/data/site";
import type { Route } from "./+types/formations.$slug";

export function loader({ params, request }: Route.LoaderArgs) {
  const formation = getFormation(params.slug ?? "");
  if (!formation) {
    throw new Response("Formation introuvable", { status: 404 });
  }

  const origin = canonicalOrigin(
    request.headers.get("X-Forwarded-Proto")
      ? `${request.headers.get("X-Forwarded-Proto")}://${request.headers.get("host")}`
      : request.url
  );

  return { formation, origin };
}

export function meta({ loaderData }: Route.MetaArgs) {
  if (!loaderData) {
    return [{ title: `Formation introuvable — ${site.name}` }];
  }
  const { formation, origin } = loaderData;
  const title = `Formation ${formation.name} à domicile — ${site.pricePerSession.toLocaleString("fr-FR")} ${site.currencyLabel} / séance | ${site.name}`;
  const description = `${formation.tagline} ${formation.description.slice(0, 120)}… Programme complet, débouchés et prérequis. Séances à domicile dans tout Antananarivo.`;

  return [
    { title },
    { name: "description", content: description },
    { name: "keywords", content: formation.keywords.join(", ") },
    { property: "og:type", content: "website" },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:url", content: `${origin}/formations/${formation.slug}` },
    { property: "og:image", content: unsplash(formation.image.id, 1200) },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
    {
      tag: "link",
      rel: "canonical",
      href: `${origin}/formations/${formation.slug}`,
    },
  ];
}

const breadcrumbsJsonLd = (formationName: string, url: string) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Accueil",
      item: url.replace(/\/formations\/[^/]+$/, "") || url,
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Formations",
      item: url.replace(/\/[^/]+$/, ""),
    },
    { "@type": "ListItem", position: 3, name: formationName, item: url },
  ],
});

export default function FormationDetail({
  loaderData,
}: Route.ComponentProps) {
  const { formation, origin } = loaderData;
  const prereqs = prerequisitesOf(formation);
  const others = formations.filter((f) => f.slug !== formation.slug);

  const courseJsonLd = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: `Formation ${formation.name}`,
    description: formation.description,
    url: `${origin}/formations/${formation.slug}`,
    educationalLevel: formation.level,
    teaches: formation.program.map((p) => p.title),
    provider: {
      "@type": "EducationalOrganization",
      name: site.name,
      address: {
        "@type": "PostalAddress",
        addressLocality: site.addressLocality,
        addressRegion: site.region,
        addressCountry: "MG",
      },
    },
    offers: {
      "@type": "Offer",
      price: site.pricePerSession,
      priceCurrency: site.currency,
      category: "Séance à domicile",
    },
  };

  return (
    <>
      <SiteHeader />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbsJsonLd(
              formation.name,
              `${origin}/formations/${formation.slug}`
            )
          ),
        }}
      />
      <main id="main">
        {/* ── HERO formation ───────────────────────────────── */}
        <section className="relative isolate overflow-hidden">
          <img
            src={unsplash(formation.image.id, 1600)}
            alt={formation.image.alt}
            width={1600}
            height={900}
            fetchPriority="high"
            className="absolute inset-0 -z-10 h-full w-full object-cover opacity-30"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10 bg-zinc-950/80"
          />
          <div className="mx-auto max-w-6xl px-4 pb-16 pt-28 sm:px-6 sm:pt-36">
            {/* Fil d'Ariane */}
            <nav aria-label="Fil d'Ariane" className="animate-fade-in">
              <ol className="flex flex-wrap items-center gap-1.5 text-xs text-zinc-400">
                <li>
                  <Link to="/" className="transition hover:text-brand-300">
                    Accueil
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li>
                  <Link
                    to="/formations"
                    className="transition hover:text-brand-300"
                  >
                    Formations
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li aria-current="page" className="font-semibold text-brand-300">
                  {formation.name}
                </li>
              </ol>
            </nav>

            <div className="mt-8 grid items-center gap-10 lg:grid-cols-[1.2fr_1fr]">
              <div>
                <div className="animate-fade-up flex items-center gap-3">
                  <span className="flex h-12 w-12 items-center justify-center rounded-lg bg-brand-600 text-white">
                    <SiteIcon markup={formation.icon} className="h-6 w-6" />
                  </span>
                  <span className="rounded-md border border-white/25 px-3 py-1.5 text-xs font-medium text-zinc-200">
                    {formation.level}
                  </span>
                </div>
                <h1 className="animate-fade-up mt-5 text-4xl font-black tracking-tight text-white sm:text-5xl">
                  {formation.name}
                </h1>
                <p className="mt-3 text-xl font-semibold text-brand-300">
                  {formation.tagline}
                </p>
                <p className="mt-4 max-w-2xl leading-relaxed text-zinc-300">
                  {formation.description}
                </p>
                <div className="mt-7 flex flex-wrap items-center gap-4">
                  <a
                    href={whatsappLink(formation.name)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-md bg-brand-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-500"
                  >
                    S'inscrire à cette formation
                  </a>
                  <a
                    href="#programme"
                    className="rounded-md border border-zinc-500 px-6 py-3 text-sm font-semibold text-white transition-colors hover:border-zinc-300 hover:bg-white/10"
                  >
                    Voir le programme
                  </a>
                </div>
              </div>

              {/* Carte prix */}
              <div className="animate-fade-up mx-auto w-full max-w-sm">
                <div className="rounded-lg border border-white/20 bg-zinc-900/60 p-7 backdrop-blur">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-zinc-400">
                    Séance à domicile
                  </p>
                  <p className="mt-3">
                    <span className="text-4xl font-bold text-white">
                      {site.pricePerSession.toLocaleString("fr-FR")}
                    </span>{" "}
                    <span className="text-lg font-semibold text-zinc-300">
                      {site.currencyLabel} / séance
                    </span>
                  </p>
                  <ul className="mt-5 space-y-2.5 text-sm text-zinc-200">
                    <li className="flex items-start gap-2">
                      <span aria-hidden="true" className="text-emerald-400">
                        <i className="fa-solid fa-check" />
                      </span>
                      Le formateur se déplace chez vous
                    </li>
                    <li className="flex items-start gap-2">
                      <span aria-hidden="true" className="text-emerald-400">
                        <i className="fa-solid fa-check" />
                      </span>
                      6 modules pratiques, à votre rythme
                    </li>
                    <li className="flex items-start gap-2">
                      <span aria-hidden="true" className="text-emerald-400">
                        <i className="fa-solid fa-check" />
                      </span>
                      Antananarivo, à votre domicile
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── DIAGRAMME DE PARCOURS ────────────────────────── */}
        <section
          id="parcours"
          className="border-b border-zinc-200 bg-zinc-50 py-16 dark:border-zinc-800 dark:bg-zinc-900/40"
          aria-labelledby="parcours-title"
        >
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <Reveal>
              <h2
                id="parcours-title"
                className="text-center text-2xl font-black tracking-tight text-zinc-900 dark:text-white sm:text-3xl"
              >
                Où cette formation se situe dans votre parcours
              </h2>
              <p className="mx-auto mt-3 max-w-2xl text-center text-sm text-zinc-600 dark:text-zinc-400">
                Ce que vous devez maîtriser avant de commencer, et ce que
                cette formation vous ouvre ensuite.
              </p>
            </Reveal>
            <Reveal delay={150}>
              <Roadmap formation={formation} className="mt-10" />
            </Reveal>
          </div>
        </section>

        {/* ── PROGRAMME (fiche technique) ──────────────────── */}
        <section
          id="programme"
          className="mx-auto max-w-6xl scroll-mt-20 px-4 py-16 sm:px-6"
          aria-labelledby="programme-title"
        >
          <div className="grid gap-10 lg:grid-cols-[1.3fr_1fr]">
            {/* Modules */}
            <div>
              <Reveal>
                <h2
                  id="programme-title"
                  className="text-2xl font-black tracking-tight text-zinc-900 dark:text-white sm:text-3xl"
                >
                  Programme détaillé
                </h2>
                <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-400">
                  6 modules progressifs, à travailler au rythme qui vous
                  convient — le nombre de séances s'adapte à votre niveau.
                </p>
              </Reveal>
              <ol className="mt-8 space-y-4">
                {formation.program.map((step, i) => (
                  <Reveal key={step.title} delay={i * 90}>
                    <li className="group relative flex gap-4 rounded-lg border border-zinc-200 p-5 transition-colors hover:border-brand-300 dark:border-zinc-800 dark:hover:border-brand-700">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-600 text-sm font-bold text-white">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div>
                        <h3 className="font-bold text-zinc-900 dark:text-white">
                          {step.title}
                        </h3>
                        <p className="mt-1 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                          {step.detail}
                        </p>
                      </div>
                    </li>
                  </Reveal>
                ))}
              </ol>
            </div>

            {/* Fiche technique latérale */}
            <div>
              <Reveal delay={120}>
                <div className="sticky top-24 rounded-lg border border-zinc-200 p-7 dark:border-zinc-800">
                  <h3 className="text-sm font-bold uppercase tracking-[0.14em] text-zinc-500 dark:text-zinc-400">
                    Fiche technique
                  </h3>
                  <dl className="mt-5 space-y-4 text-sm">
                    <div className="flex items-start justify-between gap-4">
                      <dt className="text-zinc-500 dark:text-zinc-400">Format</dt>
                      <dd className="text-right font-semibold text-zinc-900 dark:text-white">
                        À domicile
                      </dd>
                    </div>
                    <div className="flex items-start justify-between gap-4">
                      <dt className="text-zinc-500 dark:text-zinc-400">Tarif</dt>
                      <dd className="text-right font-semibold text-zinc-900 dark:text-white">
                        {site.pricePerSession.toLocaleString("fr-FR")}{" "}
                        {site.currencyLabel} / séance
                      </dd>
                    </div>
                    <div className="flex items-start justify-between gap-4">
                      <dt className="text-zinc-500 dark:text-zinc-400">Niveau</dt>
                      <dd className="text-right font-semibold text-zinc-900 dark:text-white">
                        {formation.level}
                      </dd>
                    </div>
                    <div className="border-t border-zinc-100 pt-4 dark:border-zinc-800">
                      <dt className="text-zinc-500 dark:text-zinc-400">
                        Prérequis
                      </dt>
                      <dd className="mt-2 flex flex-wrap gap-2">
                        {prereqs.length > 0 ? (
                          prereqs.map(({ formation: f, required }) => (
                            <Link
                              key={f.slug}
                              to={`/formations/${f.slug}`}
                              prefetch="intent"
                              className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold transition hover:-translate-y-px ${
                                required
                                  ? "border-brand-300 bg-brand-50 text-brand-700 hover:border-brand-500 dark:border-brand-700 dark:bg-brand-950/60 dark:text-brand-300"
                                  : "border-zinc-300 bg-zinc-50 text-zinc-600 hover:border-brand-300 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
                              }`}
                            >
                              {f.shortName}
                              {required ? "" : " (conseillé)"}
                            </Link>
                          ))
                        ) : (
                          <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400">
                            Aucun — accessible aux débutants
                          </span>
                        )}
                      </dd>
                    </div>
                    <div className="border-t border-zinc-100 pt-4 dark:border-zinc-800">
                      <dt className="text-zinc-500 dark:text-zinc-400">Zone</dt>
                      <dd className="mt-1 font-semibold text-zinc-900 dark:text-white">
                        {site.fullAddress}
                      </dd>
                    </div>
                  </dl>
                  <a
                    href={whatsappLink(formation.name)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 block rounded-md bg-brand-600 px-5 py-3 text-center text-sm font-semibold text-white transition-colors hover:bg-brand-500"
                  >
                    S'inscrire sur WhatsApp
                  </a>
                  <p className="mt-4 flex items-center justify-center gap-2 text-center text-xs text-zinc-500 dark:text-zinc-400">
                    <i className="fa-solid fa-phone" aria-hidden="true" />
                    {site.phones.map((p) => p.display).join(" · ")}
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ── DÉBOUCHÉS ────────────────────────────────────── */}
        <section
          className="border-y border-zinc-200 bg-zinc-50 py-16 dark:border-zinc-800 dark:bg-zinc-900/40"
          aria-labelledby="debouches-title"
        >
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <Reveal>
              <h2
                id="debouches-title"
                className="text-center text-2xl font-black tracking-tight text-zinc-900 dark:text-white sm:text-3xl"
              >
                Débouchés possibles
              </h2>
              <p className="mx-auto mt-3 max-w-2xl text-center text-sm text-zinc-600 dark:text-zinc-400">
                Des compétences recherchées à Madagascar comme à
                l'international — en entreprise, en freelance ou en
                télétravail.
              </p>
            </Reveal>
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {formation.outcomes.map((outcome, i) => (
                <Reveal key={outcome} delay={i * 100}>
                  <div className="flex h-full items-start gap-3 rounded-lg border border-zinc-200 p-5 transition-colors hover:border-brand-300 dark:border-zinc-800 dark:hover:border-brand-700">
                    <span
                      aria-hidden="true"
                      className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-600 text-xs text-white"
                    >
                      <i className="fa-solid fa-arrow-right text-[10px]" />
                    </span>
                    <p className="text-sm font-medium leading-relaxed text-zinc-800 dark:text-zinc-200">
                      {outcome}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal delay={200}>
              <p className="mx-auto mt-10 max-w-3xl rounded-lg border border-amber-300 bg-amber-50 px-6 py-4 text-center text-sm leading-relaxed text-amber-900 dark:border-amber-800 dark:bg-amber-950/40 dark:text-amber-200">
                <i className="fa-solid fa-circle-info mr-2" aria-hidden="true" />
                {site.disclaimer}
              </p>
            </Reveal>
          </div>
        </section>

        {/* ── AUTRES FORMATIONS ────────────────────────────── */}
        <section
          className="mx-auto max-w-6xl px-4 py-16 sm:px-6"
          aria-labelledby="autres-title"
        >
          <Reveal>
            <h2
              id="autres-title"
              className="text-center text-2xl font-black tracking-tight text-zinc-900 dark:text-white sm:text-3xl"
            >
              Continuer le parcours
            </h2>
          </Reveal>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {others.slice(0, 4).map((f, i) => (
              <Reveal key={f.slug} delay={i * 90}>
                <Link
                  to={`/formations/${f.slug}`}
                  prefetch="intent"
                  className="group flex h-full items-center gap-3 rounded-lg border border-zinc-200 p-4 transition-colors hover:border-brand-400 dark:border-zinc-800 dark:hover:border-brand-500"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-zinc-200 text-brand-600 transition-colors group-hover:bg-brand-600 group-hover:text-white dark:border-zinc-700 dark:text-brand-400">
                    <SiteIcon markup={f.icon} className="h-5 w-5" />
                  </span>
                  <span className="text-sm font-bold leading-snug text-zinc-900 group-hover:text-brand-700 dark:text-white dark:group-hover:text-brand-300">
                    {f.name}
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
          <Reveal delay={150}>
            <div className="mt-8 text-center">
              <Link
                to="/formations"
                className="inline-flex items-center gap-2 rounded-md border border-zinc-300 px-6 py-2.5 text-sm font-semibold text-zinc-700 transition-colors hover:border-brand-400 hover:text-brand-700 dark:border-zinc-700 dark:text-zinc-300 dark:hover:border-brand-500 dark:hover:text-brand-300"
              >
                Toutes les formations
              </Link>
            </div>
          </Reveal>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
