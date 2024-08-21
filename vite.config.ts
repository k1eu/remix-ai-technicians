import { vitePlugin as remix } from "@remix-run/dev";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [
    remix({
      routes(defineRoutes) {
        return defineRoutes(async (defineRoute) => {
          defineRoute("api/technicians", "modules/api/technicians.api.ts");
          defineRoute("/", "modules/homepage/homepage.layout.tsx", () => {
            defineRoute("/", "modules/homepage/homepage.page.tsx", {
              index: true,
            });
            defineRoute("about", "modules/homepage/about.page.tsx");
            defineRoute("fixit", "modules/fixit/fixit.page.tsx");
            defineRoute("skills", "modules/fixit/skills.page.tsx");
          });
        });
      },
      future: {
        v3_fetcherPersist: true,
        v3_relativeSplatPath: true,
        v3_throwAbortReason: true,
        unstable_singleFetch: true,
        unstable_lazyRouteDiscovery: true,
      },
    }),
    tsconfigPaths(),
  ],
});
