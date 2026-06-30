// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - tanstackStart, viteReact, tailwindcss, tsConfigPaths, cloudflare (build-only),
//     componentTagger (dev-only), VITE_* env injection, @ path alias, React/TanStack dedupe,
//     error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... } }) if needed.
//
// Vercel sets VERCEL=1 during build. We then disable the Cloudflare plugin and use Nitro so SSR
// is emitted as Vercel Functions: https://vercel.com/docs/frameworks/full-stack/tanstack-start
// Default builds (local / Wrangler) keep src/server.ts as the Cloudflare Worker entry.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";
import { nitro } from "nitro/vite";

const isVercel = process.env.VERCEL === "1";

export default defineConfig({
  cloudflare: isVercel ? false : undefined,
  plugins: isVercel ? [nitro()] : [],
  tanstackStart: isVercel
    ? {}
    : {
        server: { entry: "server" },
      },
});
