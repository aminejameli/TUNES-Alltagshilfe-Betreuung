import type { Metadata, Viewport } from "next";
import Script from "next/script";
import localFont from "next/font/local";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getTranslations } from "next-intl/server";
import { getSiteUrl, isProduction } from "@/config/site";
import { routing } from "@/i18n/routing";
import { openGraphBase } from "@/lib/seo";
import { themeInitScript } from "@/components/theme/theme-store";
import { ThemeSync } from "@/components/theme/theme-sync";
import { InlineScript } from "@/components/theme/inline-script";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteHeader } from "@/components/site/site-header";
import "../globals.css";

const inter = localFont({
  src: "../../fonts/InterVariable-latin.woff2",
  variable: "--font-inter",
  weight: "100 900",
  display: "swap",
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f7f8f4" },
    { media: "(prefers-color-scheme: dark)", color: "#0e1b24" },
  ],
  colorScheme: "light dark",
};

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const t = await getTranslations("Metadata");
  return {
    metadataBase: getSiteUrl(),
    title: { default: t("title"), template: `%s | ${t("siteName")}` },
    description: t("description"),
    applicationName: t("siteName"),
    openGraph: openGraphBase(locale, t("siteName")),
    twitter: { card: "summary_large_image" },
    robots: isProduction ? { index: true, follow: true } : { index: false, follow: false },
    formatDetection: { telephone: false, address: false, email: false },
  };
}

export default async function LocaleLayout({ children }: LayoutProps<"/[locale]">) {
  const locale = await getLocale();
  const t = await getTranslations("Common");

  return (
    <html lang={locale} className={inter.variable} data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        <InlineScript html={themeInitScript} />
        <Script
          src="https://www.googletagmanager.com/gtm.js?id=GTM-MM3T3RHF"
          strategy="afterInteractive"
        />
        <Script id="gtm-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
          `}
        </Script>
      </head>
      <body className="flex min-h-dvh flex-col">
        <NextIntlClientProvider>
          <a
            href="#main"
            className="sr-only z-50 rounded-lg bg-primary px-4 py-3 font-semibold text-primary-foreground focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
          >
            {t("skipToContent")}
          </a>
          <SiteHeader />
          <main id="main" tabIndex={-1} className="flex-1 outline-none">
            {children}
          </main>
          <SiteFooter />
          <ThemeSync />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
