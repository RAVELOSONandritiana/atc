import { Link } from "react-router";
import { formations } from "~/data/formations";
import { site, whatsappLink } from "~/data/site";

function SocialLink(props: {
  href: string;
  label: string;
  /** Image du dossier /public (ex. "/whatsapp.svg"). */
  icon: string;
  external?: boolean;
}) {
  return (
    <a
      href={props.href}
      aria-label={props.label}
      title={props.label}
      {...(props.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className="inline-flex items-center justify-center transition hover:-translate-y-0.5"
    >
      <img
        src={props.icon}
        alt=""
        aria-hidden="true"
        width={32}
        height={32}
        loading="lazy"
        className="h-8 w-8 object-contain"
      />
    </a>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900/40">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr]">
        {/* Marque + contacts */}
        <div>
          <div className="flex items-center gap-2.5">
            <img
              src="/logo.png"
              alt="Logo LR Tech Center"
              width={36}
              height={36}
              loading="lazy"
              className="h-16 w-16 rounded-lg object-contain"
            />
            <div className="leading-tight">
              <p className="text-md font-bold text-zinc-900 dark:text-white">
                {site.name}
              </p>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                {site.city}, Madagascar
              </p>
            </div>
          </div>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
            {site.tagline}
          </p>
          <div className="mt-5 flex items-center gap-4">
            <SocialLink
              href={`mailto:${site.email}`}
              label="Envoyer un e-mail"
              icon="/gmail.svg"
            />
            {site.phones.map((p) => (
              <SocialLink
                key={p.tel}
                href={`tel:${p.tel}`}
                label={`Appeler le ${p.display}`}
                icon="/phone-apple-iphone.svg"
              />
            ))}
            <SocialLink
              href={whatsappLink()}
              label="Discuter sur WhatsApp"
              icon="/whatsapp.svg"
              external
            />
            <SocialLink
              href={site.facebook}
              label="Page Facebook LR Tech Center"
              icon="/facebook.svg"
              external
            />
          </div>
          <p className="mt-3 text-xs text-zinc-500 dark:text-zinc-400">
            WhatsApp : {site.whatsapp.display} — Appels :{" "}
            {site.phones.map((p) => p.display).join(" · ")}
          </p>
        </div>

        {/* Formations */}
        <nav aria-label="Nos formations">
          <p className="text-sm font-semibold text-zinc-900 dark:text-white">
            Nos formations
          </p>
          <ul className="mt-4 space-y-2.5">
            <li>
              <Link
                to="/formations"
                className="text-sm text-zinc-600 transition hover:text-brand-600 dark:text-zinc-400 dark:hover:text-brand-400"
              >
                Toutes les formations
              </Link>
            </li>
            {formations.slice(0, 6).map((f) => (
              <li key={f.slug}>
                <Link
                  to={`/formations/${f.slug}`}
                  prefetch="intent"
                  className="text-sm text-zinc-600 transition hover:text-brand-600 dark:text-zinc-400 dark:hover:text-brand-400"
                >
                  {f.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Infos pratiques */}
        <div>
          <p className="text-sm font-semibold text-zinc-900 dark:text-white">
            Infos pratiques
          </p>
          <ul className="mt-4 space-y-3 text-sm text-zinc-600 dark:text-zinc-400">
            <li className="flex items-start gap-2.5">
              <i
                className="fa-solid fa-location-dot mt-0.5 w-4 text-center text-brand-600 dark:text-brand-400"
                aria-hidden="true"
              />
              <span>{site.fullAddress}</span>
            </li>
            <li className="flex items-start gap-2.5">
              <i
                className="fa-solid fa-chalkboard-user mt-0.5 w-4 text-center text-brand-600 dark:text-brand-400"
                aria-hidden="true"
              />
              <span>
                Séances à domicile — une salle de formation est en préparation.
              </span>
            </li>
            <li className="flex items-start gap-2.5">
              <i
                className="fa-solid fa-coins mt-0.5 w-4 text-center text-brand-600 dark:text-brand-400"
                aria-hidden="true"
              />
              <span>
                {site.pricePerSession.toLocaleString("fr-FR")}{" "}
                {site.currencyLabel} la séance
              </span>
            </li>
            <li className="flex items-start gap-2.5">
              <i
                className="fa-solid fa-envelope mt-0.5 w-4 text-center text-brand-600 dark:text-brand-400"
                aria-hidden="true"
              />
              <a
                href={`mailto:${site.email}`}
                className="transition hover:text-brand-600 dark:hover:text-brand-400"
              >
                {site.email}
              </a>
            </li>
          </ul>
          <p className="mt-5 rounded-lg border border-brand-200 bg-brand-50 px-4 py-3 text-xs leading-relaxed text-brand-900 dark:border-brand-800 dark:bg-brand-950/40 dark:text-brand-200">
            {site.disclaimer}
          </p>
        </div>
      </div>
      <div className="border-t border-zinc-200 py-5 text-center text-xs text-zinc-500 dark:border-zinc-800 dark:text-zinc-400">
        © {new Date().getFullYear()} {site.name} — Tous droits réservés.
      </div>
    </footer>
  );
}
