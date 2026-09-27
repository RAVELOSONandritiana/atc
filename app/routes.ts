import { type RouteConfig, index, layout, route } from "@react-router/dev/routes";
import { Children } from "react";

export default [
  layout('routes/layout.tsx',[
    index("routes/home.tsx"),
    route("formations", "routes/formations._index.tsx"),
    route("formations/:slug", "routes/formations.$slug.tsx"),
  ]),
  route("sitemap.xml", "routes/sitemap[.]xml.ts"),
  route("robots.txt", "routes/robots[.]txt.ts"),
] satisfies RouteConfig;
