# TUNES website – publication checklist & validation results

Status: **local review build only, not ready to publish.** The production build is
intentionally blocked (`NEXT_PUBLIC_SITE_ENV=production`) until the final domain and approved
legal texts exist.

## 1. Missing inputs before publication

| # | Input needed from TUNES | Where it goes | Why it blocks |
| --- | --- | --- | --- |
| 1 | Full legal company name and legal form | Impressum, `Organization` JSON-LD | Impressum is legally required in Germany (§ 5 DDG) |
| 2 | Authorised representative / responsible person | Impressum | Legally required |
| 3 | Registered business address | Impressum, Datenschutz, future `LocalBusiness` data | Legally required. Not shown anywhere until verified |
| 4 | Register and tax details (if applicable) | Impressum | Legally required where applicable |
| 5 | Reviewed and approved Impressum text | `src/app/[locale]/impressum/page.tsx` | Placeholder page is preview-only. Production build fails without it |
| 6 | Reviewed and approved Datenschutz text (hosting, server logs, email contact, data subject rights) | `src/app/[locale]/datenschutz/page.tsx` | Same as above. Must reflect the final hosting provider |
| 7 | Final domain | `NEXT_PUBLIC_SITE_URL` | Canonicals, hreflang, sitemap, OG and JSON-LD need the real origin. The build fails without it |
| 8 | Service city and coverage radius | `siteConfig.serviceArea`, visible copy, `LocalBusiness` JSON-LD | No location claims are made until confirmed |
| 9 | Confirmed pricing and funding arrangements | FAQ copy | FAQ currently says costs and cost coverage are discussed personally, with no promise of eligibility |
| 10 | Real team information (founder/team bio) | About section | Figma comment: add only after client confirmation |
| 11 | Rights-cleared, consented photographs of real staff or service situations | `src/assets/images/` (`pnpm assets:images`) | The current photos are AI-generated illustrative scenes labelled "Symbolbild" |
| 12 | Decision on the phone number (+49 155 65350177 appears in Figma) | Header, contact, footer | Not published: the brief's email-only override replaces the Figma phone CTA. Confirm whether to show it as secondary information |
| 13 | Review the English copy and the English descriptor "Everyday Assistance & Companionship" | `messages/en.json` | Wording review |

When 1–7 are done: set `siteConfig.legalContentApproved = true` and deploy with
`NEXT_PUBLIC_SITE_ENV=production` and `NEXT_PUBLIC_SITE_URL=https://<domain>`. Then submit
the sitemap in Google Search Console.

## 2. Content decisions taken (please confirm)

- **Email-only contact:** every primary CTA ("E-Mail schreiben" / "Send an email",
  "Unterstützung anfragen") opens `mailto:betreuung@tunesalltagshilfe.de` with a localized
  subject. Process step 1 was adapted from "Rufen Sie uns an oder schreiben Sie uns eine
  E-Mail." to "Schreiben Sie uns eine E-Mail mit Ihrem Anliegen."
- **Hero visual:** the approved logo illustration, as the Figma comment requests, until a
  consented real photo is available.
- **FAQ:** six questions built from the Figma topics: services, how to enquire, enquiring
  for a relative, the four spoken languages, costs (Figma copy) and cost coverage (Figma copy).
- **English values:** Reliable · Discreet · Compassionate · Tailored to you.
- **`/` always redirects to `/de`** (no browser-language detection), with `x-default` set to `/de`.

## 3. Validation results (2026-10-09, local)

| Check | Result |
| --- | --- |
| `pnpm lint` | Pass, 0 problems |
| `pnpm typecheck` | Pass |
| `pnpm build` (preview) | Pass. `/de`, `/en`, legal pages, sitemap, robots, icons and OG images are statically prerendered |
| Production guard | Build fails with a list of missing inputs when the URL or legal approval is missing (verified) |
| axe-core (WCAG 2.0/2.1/2.2 A+AA + best practice) | 0 violations on `/de`, `/en`, `/de/impressum`, `/en/privacy` and the 404 page, in light and dark |
| Colour contrast (tokens) | Light: body 10.6:1, headings 8.7:1, secondary 5.9:1, primary button 9.2:1, icons 4.2–4.9:1. Dark: body 13.6:1, secondary 8.6:1, button 10.5:1, focus ring 10.5:1. The green logo heart (2.6:1 on light) is a logo, so it's exempt |
| Horizontal overflow / clipping | None at 320, 360, 375, 390, 414, 768, 1024, 1280, 1440 and 1920 px on `/de`, `/en`, `/de/impressum` and `/en/legal-notice` (checked per element) |
| Mobile menu | `aria-expanded` toggles, focus is trapped in the dialog, Escape closes it, focus returns to the trigger, and menu links scroll to the section |
| FAQ accordion | Keyboard operable with `aria-expanded`. Closed answers stay in the server HTML but are hidden from assistive tech |
| Theme | Light/Dark/System. Persists across reloads and is applied before first paint (no flash), "System" follows OS changes live, the radio group supports arrow keys, and there are no hydration warnings |
| Language switch | Keeps the equivalent page (`/de/impressum` ↔ `/en/legal-notice`) and `<html lang>` updates |
| Contact | All contact links are the same `mailto:` link. 0 forms, 0 `tel:` links. The copy button announces the result through a live region |
| Keyboard | The first Tab reaches the visible "Zum Inhalt springen" skip link. 3px focus outlines use theme tokens |
| Console | No errors or warnings on any page (except the expected 404 status on the 404 test page) |
| SEO | Localized `<title>`/description; `lang` set; canonical + reciprocal hreflang de/en + `x-default`→`/de`; OG/Twitter tags with a localized OG image and alt text; JSON-LD `Organization` + `WebSite` + `FAQPage` (visible facts only, no address or reviews); `sitemap.xml` with alternates; unknown URLs return a localized 404 |
| Draft protection | Preview sends a `noindex,nofollow` meta tag and `X-Robots-Tag` header, robots.txt is `Disallow: /`, `llms.txt` returns 404, and a preview banner is shown |
| Configured origin | With `NEXT_PUBLIC_SITE_URL` set, canonicals and hreflang use that origin and no `localhost` appears |

**Known limitations:** the OG image uses the default `next/og` font, not Inter, because
Satori can't read the self-hosted woff2. The `FAQPage` markup is accurate, but Google only
shows FAQ rich results for a few site types.
