import { notFound } from "next/navigation";

/** Any unknown URL ("/xyz", "/ar/xyz") shows the 404 page inside the localized layout. */
export default function CatchAll() {
  notFound();
}
