import { notFound } from "next/navigation";

// Routes unknown paths under a locale to the localized not-found page (with header and footer).
export default function CatchAllPage() {
  notFound();
}
