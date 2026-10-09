import { isProduction, siteConfig } from "@/config/site";
import { absoluteUrl, localizedPath } from "@/lib/seo";
import de from "../../../messages/de.json";
import en from "../../../messages/en.json";

const serviceKeys = ["household", "errands", "accompaniment", "companionship"] as const;

// Supplementary summary for answer engines. Only served once the production origin is configured.
export function GET() {
  if (!isProduction || !process.env.NEXT_PUBLIC_SITE_URL) {
    return new Response("Not found", { status: 404 });
  }

  const body = [
    `# ${de.Metadata.siteName}`,
    "",
    `> ${de.Metadata.description}`,
    "",
    `${en.Metadata.description}`,
    "",
    "## Leistungen / Services",
    ...serviceKeys.map(
      (k) => `- ${de.Services.items[k].title} (${en.Services.items[k].title}): ${de.Services.items[k].body}`,
    ),
    "",
    "## Kontakt / Contact",
    `- E-Mail: ${siteConfig.email}`,
    `- ${de.Common.serviceLanguages}`,
    "",
    "## Seiten / Pages",
    `- [Deutsch](${absoluteUrl(localizedPath("de", "/"))})`,
    `- [English](${absoluteUrl(localizedPath("en", "/"))})`,
    "",
  ].join("\n");

  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
