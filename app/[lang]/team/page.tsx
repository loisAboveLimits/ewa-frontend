import { redirect } from "next/navigation";
import { localizeHref } from "@/lib/i18n/config";
import { getLocale } from "@/lib/i18n/server";
import { pagePaths } from "@/lib/pages";

// There is no team listing page: /team goes to the Board of Directors on the About page.
export default async function TeamIndex() {
  redirect(localizeHref(`${pagePaths.about}#directors`, await getLocale()));
}
