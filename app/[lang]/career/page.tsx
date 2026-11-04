import { redirect } from "next/navigation";
import { localizeHref } from "@/lib/i18n/config";
import { getLocale } from "@/lib/i18n/server";
import { pagePaths } from "@/lib/pages";

// There is no careers listing page: /career goes to the careers section of the Join page.
export default async function CareerIndex() {
  redirect(localizeHref(`${pagePaths.join}#careers`, await getLocale()));
}
