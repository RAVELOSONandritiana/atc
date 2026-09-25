import { formations } from "~/data/formations";
import { site, canonicalOrigin } from "~/data/site";
import type { Route } from "./+types/sitemap[.]xml";

/**
 * Sitemap dynamique : l'origine est déduite de la requête,
 * donc le sitemap reste correct quel que soit le domaine final.
 */
export async function loader({ request }: Route.LoaderArgs) {
  const origin = canonicalOrigin(
    request.headers.get("X-Forwarded-Proto")
      ? `${request.headers.get("X-Forwarded-Proto")}://${request.headers.get("host")}`
      : request.url
  );

  const today = new Date().toISOString().slice(0, 10);
  const urls = [
    { loc: `${origin}/`, priority: "1.0", changefreq: "weekly" },
    { loc: `${origin}/formations`, priority: "0.9", changefreq: "weekly" },
    ...formations.map((f) => ({
      loc: `${origin}/formations/${f.slug}`,
      priority: "0.8",
      changefreq: "monthly",
    })),
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) => `  <url>
    <loc>${u.loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`
  )
  .join("\n")}
</urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
