import { useEffect, useState } from "react";
import { Link } from "react-router";
import { site, whatsappLink } from "~/data/site";

const navLinks = [
  { to: "/", label: "Accueil" },
  { to: "/formations", label: "Formations" },
  { to: "/#contact", label: "Contact" },
];

/** Bascule clair/sombre — l'état visuel est géré en CSS par la classe .dark. */
function ThemeToggle() {
  function toggleTheme() {
    const isDark = document.documentElement.classList.toggle("dark");
    try {
      localStorage.setItem("theme", isDark ? "dark" : "light");
    } catch {
      /* stockage indisponible : le thème restera actif jusqu'au rechargement */
    }
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label="Basculer entre thème clair et sombre"
      title="Thème clair / sombre"
      className="flex h-9 w-9 items-center justify-center rounded-full text-zinc-600 transition hover:bg-zinc-100 hover:text-brand-600 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-brand-400"
    >
      {/* Soleil (mode clair) */}
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-5 w-5 dark:hidden"
      >
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2" />
        <path d="M12 20v2" />
        <path d="m4.93 4.93 1.41 1.41" />
        <path d="m17.66 17.66 1.41 1.41" />
        <path d="M2 12h2" />
        <path d="M20 12h2" />
        <path d="m6.34 17.66-1.41 1.41" />
        <path d="m19.07 4.93-1.41 1.41" />
      </svg>
      {/* Lune (mode sombre) */}
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="hidden h-5 w-5 dark:block"
      >
        <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
      </svg>
    </button>
  );
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-all duration-300 ${
        scrolled
          ? "border-zinc-200/80 bg-white/85 shadow-sm backdrop-blur-md dark:border-zinc-800/80 dark:bg-zinc-950/85"
          : "border-transparent bg-white/60 backdrop-blur-sm dark:bg-zinc-950/60"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link
          to="/"
          className="group flex items-center gap-2.5"
          onClick={() => setOpen(false)}
        >
          <img
            src="/logo.png"
            alt="Logo LR Tech Center"
            width={36}
            height={36}
            className="h-9 w-9 rounded-lg object-contain transition-colors group-hover:bg-brand-700/10"
          />
          <span className="leading-tight">
            <span className="block text-sm font-bold tracking-tight text-zinc-900 dark:text-white">
              {site.name}
            </span>
            <span className="block text-[11px] text-zinc-500 dark:text-zinc-400">
              Antananarivo, Madagascar
            </span>
          </span>
        </Link>

        {/* Navigation bureau */}
        <nav
          aria-label="Navigation principale"
          className="hidden items-center gap-1 md:flex"
        >
          {navLinks.map((link) => (
            <Link
              key={link.label}
              to={link.to}
              className="rounded-full px-3.5 py-2 text-sm font-medium text-zinc-600 transition hover:bg-zinc-100 hover:text-brand-700 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-brand-300"
            >
              {link.label}
            </Link>
          ))}
          <ThemeToggle />
          <a
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-2 rounded-full bg-brand-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand-700"
          >
            S'inscrire
          </a>
        </nav>

        {/* Commandes mobiles */}
        <div className="flex items-center gap-1 md:hidden">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
            className="flex h-9 w-9 items-center justify-center rounded-full text-zinc-700 transition hover:bg-zinc-100 dark:text-zinc-200 dark:hover:bg-zinc-800"
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              className="h-5 w-5"
            >
              {open ? (
                <path d="M18 6 6 18M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Menu mobile */}
      {open && (
        <nav
          aria-label="Navigation mobile"
          className="animate-fade-in border-t border-zinc-200 bg-white px-4 py-3 dark:border-zinc-800 dark:bg-zinc-950 md:hidden"
        >
          {navLinks.map((link) => (
            <Link
              key={link.label}
              to={link.to}
              onClick={() => setOpen(false)}
              className="block rounded-lg px-3 py-2.5 text-sm font-medium text-zinc-700 transition hover:bg-zinc-100 dark:text-zinc-200 dark:hover:bg-zinc-800"
            >
              {link.label}
            </Link>
          ))}
          <a
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 block rounded-lg bg-brand-600 px-3 py-2.5 text-center text-sm font-semibold text-white transition-colors hover:bg-brand-700"
          >
            S'inscrire sur WhatsApp
          </a>
        </nav>
      )}
    </header>
  );
}
