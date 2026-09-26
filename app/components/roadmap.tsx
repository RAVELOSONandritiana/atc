import { Link } from "react-router";
import {
  dependentsOf,
  prerequisitesOf,
  type Formation,
} from "~/data/formations";
import { SiteIcon } from "./site-icon";

function Connector({ reverse = false }: { reverse?: boolean }) {
  return (
    <div
      aria-hidden="true"
      className="hidden shrink-0 flex-col items-center justify-center md:flex"
    >
      <div className="h-px w-10 bg-brand-300 dark:bg-brand-700" />
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`h-4 w-4 text-brand-500 dark:text-brand-400 ${
          reverse ? "rotate-180" : ""
        }`}
      >
        <path d="m9 18 6-6-6-6" />
      </svg>
    </div>
  );
}

const pillBase =
  "group flex w-full items-center gap-2.5 rounded-lg border px-3.5 py-2.5 text-sm font-medium transition-colors";

/**
 * Diagramme de parcours d'une formation :
 * prérequis (à gauche) → formation → formations qui en dépendent (à droite).
 */
export function Roadmap({
  formation,
  className = "",
}: {
  formation: Formation;
  className?: string;
}) {
  const prereqs = prerequisitesOf(formation);
  const dependents = dependentsOf(formation.slug);

  return (
    <div className={className}>
      <div className="flex flex-col items-stretch gap-5 md:flex-row md:items-center md:justify-center md:gap-2">
        {/* Prérequis */}
        <div className="flex flex-1 flex-col items-center justify-center gap-3 md:w-44 md:flex-none">
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-zinc-500 dark:text-zinc-400">
            Prérequis
          </p>
          {prereqs.length > 0 ? (
            prereqs.map(({ formation: f, required }) => (
              <Link
                key={f.slug}
                to={`/formations/${f.slug}`}
                prefetch="intent"
                className={`${pillBase} border-brand-200/80 bg-brand-50 text-brand-900 hover:border-brand-400 dark:border-brand-800/70 dark:bg-brand-950/50 dark:text-brand-100 dark:hover:border-brand-600`}
              >
                <SiteIcon
                  markup={f.icon}
                  className="h-4 w-4 shrink-0 text-brand-600 dark:text-brand-400"
                />
                <span className="flex-1 text-left leading-tight">
                  {f.shortName}
                </span>
                <span
                  className={`rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${
                    required
                      ? "bg-brand-600 text-white"
                      : "bg-brand-100 text-brand-700 dark:bg-brand-900 dark:text-brand-300"
                  }`}
                >
                  {required ? "requis" : "conseillé"}
                </span>
              </Link>
            ))
          ) : (
            <p className="rounded-xl border border-dashed border-zinc-300 px-4 py-2.5 text-center text-xs text-zinc-500 dark:border-zinc-700 dark:text-zinc-400">
              Aucun prérequis — accessible à tous
            </p>
          )}
        </div>

        <Connector />

        {/* Formation courante */}
        <div className="relative mx-auto w-full max-w-xs md:mx-0 md:w-56 md:max-w-none md:flex-none">
          <div className="relative flex items-center gap-3.5 rounded-2xl bg-brand-600 p-4 text-white">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-white/15">
              <SiteIcon markup={formation.icon} className="h-6 w-6" />
            </span>
            <span className="leading-tight">
              <span className="block text-[10px] font-semibold uppercase tracking-[0.16em] text-white/70">
                Vous êtes ici
              </span>
              <span className="block text-base font-bold">
                {formation.name}
              </span>
            </span>
          </div>
        </div>

        <Connector reverse />

        {/* Formations ouvertes */}
        <div className="flex flex-1 flex-col items-center justify-center gap-3 md:w-44 md:flex-none">
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-zinc-500 dark:text-zinc-400">
            S'ouvre vers
          </p>
          {dependents.length > 0 ? (
            dependents.map((f) => (
              <Link
                key={f.slug}
                to={`/formations/${f.slug}`}
                prefetch="intent"
                className={`${pillBase} border-zinc-200 bg-white text-zinc-800 hover:border-brand-300 hover:text-brand-700 dark:border-zinc-700/80 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:border-brand-600 dark:hover:text-brand-300`}
              >
                <SiteIcon
                  markup={f.icon}
                  className="h-4 w-4 shrink-0 text-brand-600 dark:text-brand-400"
                />
                <span className="flex-1 text-left leading-tight">
                  {f.shortName}
                </span>
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4 shrink-0 text-brand-400 transition group-hover:translate-x-0.5"
                >
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </Link>
            ))
          ) : (
            <p className="rounded-xl border border-dashed border-zinc-300 px-4 py-2.5 text-center text-xs text-zinc-500 dark:border-zinc-700 dark:text-zinc-400">
              Compétence finale — spécialisez-vous librement
            </p>
          )}
        </div>
      </div>

      <p className="mt-5 text-center text-xs text-zinc-500 dark:text-zinc-400">
        Cliquez sur une formation du schéma pour découvrir son programme.
      </p>
    </div>
  );
}
