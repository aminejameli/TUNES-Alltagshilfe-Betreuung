import { siteConfig } from "@/config/site";

export function buildMailto(subject: string, email: string = siteConfig.email) {
  return `mailto:${email}?subject=${encodeURIComponent(subject)}`;
}
