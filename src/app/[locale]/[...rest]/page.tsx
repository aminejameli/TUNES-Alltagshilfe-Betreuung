import { notFound } from "next/navigation";

// Routes unknown paths under a locale to the localized not-found page (with header and footer).
// Always renders the 404 boundary, so there is no instant UI to validate.
export const instant = false;

export default function CatchAllPage() {
  notFound();
}
