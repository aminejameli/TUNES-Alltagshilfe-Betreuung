import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";
import { getTranslations } from "next-intl/server";
import { hasLocale } from "next-intl";
import { routing } from "@/i18n/routing";

const size = { width: 1200, height: 630 };

function resolveLocale(param: string) {
  return hasLocale(routing.locales, param) ? param : routing.defaultLocale;
}

export async function generateImageMetadata({ params }: { params: { locale: string } }) {
  const t = await getTranslations({ locale: resolveLocale(params.locale), namespace: "Metadata" });
  return [{ id: "default", alt: t("ogImageAlt"), size, contentType: "image/png" }];
}

export default async function OpenGraphImage({ params }: { params: Promise<{ locale: string }> }) {
  const locale = resolveLocale((await params).locale);
  const t = await getTranslations({ locale, namespace: "Common" });
  const tm = await getTranslations({ locale, namespace: "Services" });
  const lockup = await readFile(path.join(process.cwd(), "src/assets/brand/logo-lockup.svg"));
  const logoSrc = `data:image/svg+xml;base64,${lockup.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#F7F8F4",
          padding: "72px 80px",
          borderBottom: "16px solid #79A85A",
        }}
      >
        <img src={logoSrc} width={597} height={132} alt="" />
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ fontSize: 68, fontWeight: 700, color: "#174B70", lineHeight: 1.1 }}>
            {t("slogan")}
          </div>
          <div style={{ fontSize: 30, color: "#263E48" }}>
            {(["household", "errands", "accompaniment", "companionship"] as const)
              .map((k) => tm(`items.${k}.title`))
              .join(" · ")}
          </div>
        </div>
      </div>
    ),
    size,
  );
}
