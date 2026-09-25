import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";

import type { Route } from "./+types/root";
import { site } from "~/data/site";
import "./app.css";

export const links: Route.LinksFunction = () => [
  { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
  { rel: "preconnect", href: "https://cdnjs.cloudflare.com" },
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css",
    integrity:
      "sha512-SnH5WK+bZxgPHs44uWIX+LLJAJ9/2PkPKZ5QiAj6Ta86w+fsb2TkcmfRyVX3pBnMFcV7oQPJkl9QevSCWr3W6A==",
    crossOrigin: "anonymous",
    referrerPolicy: "no-referrer",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

/**
 * En-têtes de sécurité de base sur chaque réponse.
 * Une CSP complète sera activée lors de la mise en production
 * (elle doit être adaptée au domaine final).
 */
export function headers(): HeadersInit {
  return {
    "X-Content-Type-Options": "nosniff",
    "Referrer-Policy": "strict-origin-when-cross-origin",
    "X-Frame-Options": "DENY",
    "Permissions-Policy": "camera=(), microphone=(), geolocation=()",
  };
}

/**
 * Applique le thème enregistré AVANT le premier rendu — aucun flash
 * de mauvais thème, aucune classe sur le serveur.
 */
const themeScript = `(function(){try{var t=localStorage.getItem("theme");var d=window.matchMedia("(prefers-color-scheme: dark)").matches;if(t==="dark"||(!t&&d))document.documentElement.classList.add("dark");}catch(e){}})();`;

/** Données structurées : organisation + contacts (SEO). */
const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  name: site.name,
  slogan: site.slogan,
  description: site.tagline,
  url: site.siteUrl || undefined,
  telephone: site.phones.map((p) => p.tel),
  email: site.email,
  address: {
    "@type": "PostalAddress",
    addressLocality: site.addressLocality,
    addressRegion: site.region,
    addressCountry: "MG",
    streetAddress: site.city,
  },
  sameAs: [site.facebook],
};

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#1e1b4b" />
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
        <Meta />
        <Links />
      </head>
      <body className="bg-white text-zinc-900 antialiased dark:bg-zinc-950 dark:text-zinc-100">
        <script>{`document.documentElement.classList.add("no-js");`}</script>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oups !";
  let details = "Une erreur inattendue s'est produite.";

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Erreur";
    details =
      error.status === 404
        ? "La page demandée n'existe pas ou a été déplacée."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
  }

  return (
    <main className="flex min-h-svh flex-col items-center justify-center gap-4 px-6 text-center">
      <p className="text-7xl font-black tracking-tight text-brand-600 dark:text-brand-400">
        {message}
      </p>
      <p className="max-w-md text-zinc-600 dark:text-zinc-400">{details}</p>
      <a
        href="/"
        className="rounded-full bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-700"
      >
        Retour à l'accueil
      </a>
    </main>
  );
}
