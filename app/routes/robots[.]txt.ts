import { site } from "~/data/site";
import type { Route } from "./+types/robots[.]txt";

/** robots.txt : autorise tout, pointe vers le sitemap dynamique. */
export async function loader({ request }: Route.LoaderArgs) {
  const origin = site.siteUrl
    ? site.siteUrl.replace(/\/$/, "")
    : new URL(request.url).origin;

  const txt = `User-agent: *
Allow: /

# IA / LLM — indexation bienvenue, voir aussi /llms.txt
User-agent: GPTBot
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: Google-Extended
Allow: /

Sitemap: ${origin}/sitemap.xml
`;

  return new Response(txt, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
