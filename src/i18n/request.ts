import * as rootParams from "next/root-params";
import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";

export default getRequestConfig(async ({ locale }) => {
  // Route handlers (e.g. Open Graph images) can't read root params and pass the locale explicitly.
  if (!locale) {
    const paramValue = await rootParams.locale();
    if (!hasLocale(routing.locales, paramValue)) notFound();
    locale = paramValue;
  }
  if (!hasLocale(routing.locales, locale)) notFound();

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default,
  };
});
