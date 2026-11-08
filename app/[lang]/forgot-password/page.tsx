import type { Metadata } from "next";
import PageBanner from "@/components/ui/PageBanner";
import { ForgotPasswordForm } from "@/components/login/PasswordResetForms";
import { getI18n, pageMetadata } from "@/lib/i18n/server";

export async function generateMetadata(): Promise<Metadata> {
  return { ...(await pageMetadata("forgot")), robots: { index: false, follow: false } };
}

/** "Forgot password?" — asks Drupal to e-mail a one-time link to /reset-password. */
export default async function ForgotPassword() {
  const { t } = await getI18n();

  return (
    <div className="w-full wrapper bg-white">

      {/*<!--banner-->*/}
      <PageBanner image="/imgs/banners/banner-programs.png" title={t.pages.forgot.title} subtitle={t.pages.forgot.desc} />

      {/*<!--content-body-->*/}
      <section id="content-body" className="relative -top-10 md:-top-15">
        <div className="container mx-auto px-4">
          <ForgotPasswordForm />
        </div>
        <div className="spacer-40"></div>
      </section>

    </div>
  );
}
