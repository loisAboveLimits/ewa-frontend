import type { ReactNode } from "react";
import Breadcrumbs from "@/components/Breadcrumbs";
import PageBanner from "@/components/ui/PageBanner";
import TraineeSidebar from "@/components/trainee/TraineeSidebar";
import { requireTrainee } from "@/lib/auth";
import { getI18n } from "@/lib/i18n/server";
import type { Localized } from "@/lib/i18n/config";

const unavailable: Localized<string> = {
  en: "Your dashboard can't be loaded right now. Please try again in a few minutes.",
  ar: "تعذّر تحميل لوحتك حاليًا. يرجى المحاولة مرة أخرى بعد دقائق.",
};

/**
 * Trainee area (/users/dashboard/*), signed-in only: proxy.ts sends visitors without a sign-in
 * cookie to /login, and the session is checked with Drupal here (ended → sign in again).
 * Banner, breadcrumbs, then #profile: the trainee menu (left in English, right in Arabic, like
 * the programs page) and the page content.
 */
export default async function TraineeLayout({ children }: { children: ReactNode }) {
  const { locale, t } = await getI18n();
  const user = await requireTrainee(locale);

  return (
    <div className="w-full wrapper bg-white">

      {/*<!--banner-->*/}
      <PageBanner image="/imgs/banners/banner-users.png" title={t.pages.dashboard.title} subtitle={t.pages.dashboard.desc} />

      {/*<!--breadcrumbs-->*/}
      <section className="breadcrumps">
        <div className="spacer-20"></div>
        <div className="container mx-auto h-full px-4">
          <Breadcrumbs />
        </div>
        <div className="spacer-20"></div>
      </section>

      {/*<!--trainee menu + page-->*/}
      <section id="profile" className="relative pb-[5%]">
        <div className="spacer-40"></div>

        <div className="container mx-auto px-4">
          {user ? (
            <div className="flex flex-col gap-6 lg:flex-row lg:gap-0">
              <div className="lg:w-[30%] lg:p-8 lg:ps-0 flex flex-col min-w-0">
                <TraineeSidebar name={user.profile?.firstName || user.display_name || user.name} />
              </div>
              <div className="lg:w-[70%] lg:p-8 lg:pe-0 flex flex-col min-w-0">{children}</div>
            </div>
          ) : (
            <p role="status" className="rounded-2xl bg-[#C8ECEA] px-6 py-5 text-lg text-[#14989A]">
              {unavailable[locale]}
            </p>
          )}
        </div>

        <div className="spacer-40"></div>
      </section>
    </div>
  );
}
