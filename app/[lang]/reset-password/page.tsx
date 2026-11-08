import type { Metadata } from "next";
import PageBanner from "@/components/ui/PageBanner";
import { ResetPasswordForm } from "@/components/login/PasswordResetForms";
import { getI18n, pageMetadata } from "@/lib/i18n/server";

export async function generateMetadata(): Promise<Metadata> {
  return { ...(await pageMetadata("reset")), robots: { index: false, follow: false } };
}

type Props = { searchParams: Promise<{ uid?: string; ts?: string; hash?: string }> };

/** Opened from the reset e-mail: /reset-password?uid=…&ts=…&hash=… → choose a new password. */
export default async function ResetPassword({ searchParams }: Props) {
  const { t } = await getI18n();
  const { uid, ts, hash } = await searchParams;
  const clean = (v?: string) => (typeof v === "string" && /^[\w-]{1,200}$/.test(v) ? v : undefined);

  return (
    <div className="w-full wrapper bg-white">

      {/*<!--banner-->*/}
      <PageBanner image="/imgs/banners/banner-programs.png" title={t.pages.reset.title} subtitle={t.pages.reset.desc} />

      {/*<!--content-body-->*/}
      <section id="content-body" className="relative -top-10 md:-top-15">
        <div className="container mx-auto px-4">
          <ResetPasswordForm uid={clean(uid)} ts={clean(ts)} hash={clean(hash)} />
        </div>
        <div className="spacer-40"></div>
      </section>

    </div>
  );
}
