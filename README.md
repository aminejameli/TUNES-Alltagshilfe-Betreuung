# TUNES – Alltagshilfe & Betreuung

Company website for TUNES, a German provider of everyday assistance and companionship. It's a
German-first one-page site (`/de`) with a full English version (`/en`), light/dark/system themes,
email-only contact, and placeholder routes for Impressum and Datenschutz.

**Stack:** Next.js 16 (App Router, Cache Components, Turbopack) · TypeScript · Tailwind CSS v4 ·
shadcn/ui (Radix) · next-intl 4 · pnpm. No CMS, database or backend email service.

## Getting started

Requires Node.js 20.9+ and pnpm 10.

```bash
pnpm install
pnpm dev            # http://localhost:4317 → redirects to /de
```

| Command | Purpose |
| --- | --- |
| `pnpm dev` | Dev server on port 4317 |
| `pnpm build` / `pnpm start` | Production build / serve it on port 4317 |
| `pnpm lint` | ESLint |
| `pnpm typecheck` | Generate route types and run `tsc --noEmit` |
| `pnpm assets:brand` | Rebuild favicons and raster logos from the Figma SVGs |
| `pnpm assets:images <dir>` | Resize new photos into `src/assets/images` |

## Environment variables

Copy `.env.example` to `.env.local` and adjust as needed.

| Variable | Default | Meaning |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_ENV` | `preview` | `production` makes the site indexable. Any other value is a preview: `noindex` meta tag, `X-Robots-Tag: noindex`, `Disallow: /` in robots.txt, and a visible preview banner. |
| `NEXT_PUBLIC_SITE_URL` | `http://localhost:4317` in preview | Final origin for canonical URLs, hreflang, sitemap, Open Graph and JSON-LD. **Required in production.** |

**Publication guard:** with `NEXT_PUBLIC_SITE_ENV=production`, `next build` fails until
`NEXT_PUBLIC_SITE_URL` is set and `siteConfig.legalContentApproved` is `true` (in
`src/config/site.ts`). This stops the site from going live without a legally required
Impressum/Datenschutz. See `docs/publication-checklist.md` for the full list of missing inputs.

## Netlify review deployment

`netlify.toml` configures a **review/preview** site only: it builds with `pnpm build`, uses the
Next.js runtime (`@netlify/plugin-nextjs`), forces `NEXT_PUBLIC_SITE_ENV=preview` and sends
`X-Robots-Tag: noindex, nofollow` on every response. Together with the preview meta tag and
`Disallow: /` in robots.txt, the review site is not indexable, and the Impressum/Datenschutz
placeholders stay visible.

To redeploy from the branch:

```bash
alias netlify="pnpm --package=netlify-cli dlx netlify"
netlify login                  # once, or set NETLIFY_AUTH_TOKEN
netlify link                   # once, pick the review site
netlify build --offline        # optional: local check of the Netlify build
netlify deploy --build         # draft deploy URL
netlify deploy --build --prod  # update the review site's main URL
```

The Netlify URL is **not** the canonical origin. `NEXT_PUBLIC_SITE_URL` stays unset, so
canonical, hreflang, sitemap and Open Graph URLs point at the localhost fallback. Do not switch
this site to `production` until the final domain and the approved legal texts exist.

## Project structure

```
messages/{de,en}.json          All copy, metadata and alt text (one key set, typed)
src/app/[locale]/              Root layout, homepage, Impressum, Datenschutz, 404, OG image
src/app/{sitemap,robots}.ts    SEO routes; llms.txt is served only in production
src/components/sections/       Hero, Services, About, Process, FAQ, Contact
src/components/site/           Header, mobile menu, language switcher, footer, email CTA
src/components/theme/          Theme store, pre-paint script, switcher
src/components/brand/          Logo components; paths exported from Figma (see below)
src/config/site.ts             Business facts, service area (unset), legal approval flag, origin
src/i18n/                      next-intl routing (localized legal paths), request config
src/assets/brand/              Raw SVG exports from Figma
src/assets/images/             Illustrative service photos (AI-generated, see below)
```

## Design notes

- **Logo:** exported from the approved Figma file (component `TUNES / Logo / Primary`, node
  3:22, and the mark, node 3:23) via the Figma API. The geometry in `logo-paths.ts` is verbatim;
  only colours are mapped to theme tokens (blue ink → near-white in dark mode, green heart
  unchanged).
- **Tokens:** semantic CSS variables in `src/app/globals.css` for both themes, aliased to the
  shadcn/ui names. Green is used only as an accent; text/background pairs meet WCAG AA.
- **Font:** Inter variable (latin subset), self-hosted via `next/font/local` (`src/fonts`, OFL).
- **Themes:** an inline script in `<head>` applies the stored choice before first paint; the
  choice persists in `localStorage` (`tunes-theme`) and "System" follows OS changes live.
- **i18n:** `/de` is primary and `/` always redirects to it. Language links keep the
  equivalent page (`/de/impressum` ↔ `/en/legal-notice`). Arabic and French are mentioned as
  spoken service languages only; there is no website translation for them.
- **Contact:** every contact action is a `mailto:` link with a localized subject. There's also
  a copy-to-clipboard button. There is no form, phone CTA or WhatsApp.
- **Images:** the four service photos are AI-generated illustrative scenes, labelled
  "Symbolbild"/"Illustrative image". They don't show real TUNES staff or clients and should
  be replaced with rights-cleared photography.
- **Motion:** scroll reveal uses CSS scroll-driven animations (progressive enhancement) and is
  disabled under `prefers-reduced-motion`.

## Adding verified business details

1. Service area: set `siteConfig.serviceArea` and then add the visible copy and
   `LocalBusiness` structured data at the same time.
2. Legal pages: replace `LegalPending` in `src/app/[locale]/{impressum,datenschutz}/page.tsx`
   with the approved texts, then set `legalContentApproved: true`. Legal pages are added to
   the sitemap automatically.
3. Deploy with `NEXT_PUBLIC_SITE_ENV=production` and `NEXT_PUBLIC_SITE_URL=https://<final-domain>`.
