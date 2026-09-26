import { Link } from "react-router";
import { SiteHeader } from "~/components/site-header";
import { SiteFooter } from "~/components/site-footer";
import { Reveal } from "~/components/reveal";
import { SiteIcon } from "~/components/site-icon";
import { formations, getFormation } from "~/data/formations";
import { site, unsplash, whatsappLink, canonicalOrigin } from "~/data/site";
import type { Route } from "./+types/formations._index";

export function meta({ loaderData }: Route.MetaArgs) {
  const origin = loaderData?.origin ?? "http://localhost:5173";
  const title = `Nos formations — ${site.name}`;
  const description =
    "8 formations technologiques à domicile à Alasora, Antananarivo : programmation, développement web et mobile, IA, cybersécurité, réseaux, Arduino et bureautique. 15 000 Ar la séance.";

  return [
    { title },
    { name: "description", content: description },
    { property: "og:type", content: "website" },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:url", content: `${origin}/formations` },
    {
      property: "og:image",
      content: unsplash("1522071820081-009f0129c71c", 1200),
    },
    { name: "twitter:card", content: "summary_large_image" },
    { tag: "link", rel: "canonical", href: `${origin}/formations` },
  ];
}

export function loader({ request }: Route.LoaderArgs) {
  return {
    origin: canonicalOrigin(
      request.headers.get("X-Forwarded-Proto")
        ? `${request.headers.get("X-Forwarded-Proto")}://${request.headers.get("host")}`
        : request.url
    ),
  };
}

export default function FormationsIndex({
  loaderData,
}: Route.ComponentProps) {
  return (
    <>
      <SiteHeader />
      <main id="main">
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
            className="absolute inset-0 -z-10 bg-zinc-950/80"
          />
          <div className="mx-auto max-w-6xl px-4 pb-16 pt-32 text-center sm:px-6 sm:pt-36">
            <p className="animate-fade-in text-xs font-bold uppercase tracking-[0.2em] text-brand-300">
              {site.name}
            </p>
            <h1 className="animate-fade-up mt-4 text-4xl font-black tracking-tight text-white sm:text-5xl">
              Choisissez votre compétence
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-lg text-zinc-300">
              8 formations à domicile, {site.pricePerSession.toLocaleString("fr-FR")}{" "}
              {site.currencyLabel} la séance. Chacune affiche son programme
              complet, ses débouchés et son parcours de dépendances.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {formations.map((f, i) => {
              const prereqNames = f.prerequisites
                .map((p) => getFormation(p.slug)?.shortName)
                .filter(Boolean)
                .join(" + ");
              return (
                <Reveal key={f.slug} delay={(i % 3) * 100}>
                  <Link
                    to={`/formations/${f.slug}`}
                    prefetch="intent"
                    className="group flex h-full flex-col overflow-hidden rounded-lg border border-zinc-200 bg-white transition-colors hover:border-brand-400 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-brand-500"
                  >
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <img
                        src={unsplash(f.image.id, 900)}
                        alt={f.image.alt}
                        width={900}
                        height={563}
                        loading="lazy"
                        decoding="async"
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                      />
                      <div
                        aria-hidden="true"
                        className="absolute inset-0 bg-zinc-950/30"
                    />
                      <span className="absolute bottom-3 left-3 rounded-md bg-white/90 px-2.5 py-1 text-xs font-medium text-zinc-800 backdrop-blur dark:bg-zinc-950/90 dark:text-zinc-200">
                        {f.level}
                      </span>
                      <span className="absolute right-3 top-3 rounded-md bg-zinc-900/85 px-2.5 py-1 text-xs font-semibold text-white backdrop-blur dark:bg-zinc-950/85">
                        15 000 Ar / séance
                      </span>
                    </div>
                    <div className="flex flex-1 flex-col p-6">
                      <h2 className="text-lg font-bold text-zinc-900 transition group-hover:text-brand-700 dark:text-white dark:group-hover:text-brand-300">
                        {f.name}
                      </h2>
                      <p className="mt-1.5 text-sm font-medium text-brand-600 dark:text-brand-400">
                        {f.tagline}
                      </p>
                      <p className="mt-3 line-clamp-3 flex-1 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                        {f.description}
                      </p>
                      <p className="mt-4 text-xs text-zinc-500 dark:text-zinc-400">
                        {prereqNames ? (
                          <>
                            <span className="font-semibold text-zinc-700 dark:text-zinc-300">
                              Prérequis :
                            </span>{" "}
                            {prereqNames}
                          </>
                        ) : (
                          "Aucun prérequis — accessible à tous"
                        )}
                      </p>
                      <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-brand-600 dark:text-brand-400">
                        Voir le programme
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-4 w-4 transition-transform group-hover:translate-x-1"
                        >
                          <path d="M5 12h14" />
                          <path d="m12 5 7 7-7 7" />
                        </svg>
                      </span>
                    </div>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </section>

        {/* Bandeau CTA */}
        <section className="mx-auto max-w-6xl px-4 pb-20 sm:px-6">
          <Reveal>
            <div className="rounded-3xl border border-brand-200 bg-brand-50 px-6 py-10 text-center dark:border-brand-800 dark:bg-brand-950/40">
              <h2 className="text-2xl font-black text-zinc-900 dark:text-white">
                Un doute sur la formation à choisir ?
              </h2>
              <p className="mx-auto mt-3 max-w-xl text-sm text-zinc-600 dark:text-zinc-400">
                Décrivez-nous votre objectif sur WhatsApp : nous vous
                orientons vers le bon parcours, même si vous partez de zéro.
              </p>
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-block rounded-md bg-brand-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-500"
              >
                Demander conseil
              </a>
            </div>
          </Reveal>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
