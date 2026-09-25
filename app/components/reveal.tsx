import { useEffect, type CSSProperties, type ReactNode } from "react";

let observer: IntersectionObserver | null = null;

function getObserver(): IntersectionObserver {
  observer ??= new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer?.unobserve(entry.target);
        }
      }
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
  );
  return observer;
}

interface RevealProps {
  /** Élément HTML à rendre (div par défaut). */
  as?: "div" | "section" | "article" | "li" | "header";
  className?: string;
  /** Délai en ms avant l'apparition (effet cascade). */
  delay?: number;
  children: ReactNode;
}

/**
 * Révèle son contenu à l'entrée dans le viewport.
 * Fonctionne aussi sans JavaScript : la classe `.no-js` est retirée
 * à l'hydratation, et le CSS affiche tout si elle est présente.
 */
export function Reveal({
  as: Tag = "div",
  className = "",
  delay = 0,
  children,
}: RevealProps) {
  useEffect(() => {
    document.documentElement.classList.remove("no-js");
  }, []);

  return (
    <Tag
      ref={(node: HTMLElement | null) => {
        if (!node) return;
        if (typeof IntersectionObserver === "undefined") {
          node.classList.add("is-visible");
          return;
        }
        getObserver().observe(node);
      }}
      className={`reveal ${className}`}
      style={{ "--reveal-delay": `${delay}ms` } as CSSProperties}
    >
      {children}
    </Tag>
  );
}
