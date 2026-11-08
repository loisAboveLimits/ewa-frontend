import LoginForm from "@/components/login/LoginForm";
import PageBanner from "@/components/ui/PageBanner";
import { getI18n, pageMetadata } from "@/lib/i18n/server";
import { safeNext } from "@/lib/authCookies";

export const generateMetadata = () => pageMetadata("login");

export default async function Login({ searchParams }: { searchParams: Promise<{ next?: string }> }) {
  const { t } = await getI18n();
  // after signing in: the page the visitor came from (?next=, same site only), else the Trainee Dashboard
  const { next } = await searchParams;
  const redirectTo = safeNext(typeof next === "string" ? next : undefined);

  return (

    <div className="w-full wrapper bg-white">

      {/*<!--banner-->*/}
      <PageBanner page="login" image="/imgs/banners/banner-programs.png" title={t.pages.login.title} subtitle={t.pages.login.desc} />

      {/*<!--content-body-->*/}
      <section id="content-body" className="relative -top-10 md:-top-15">

        <div className="container mx-auto px-4">
          <LoginForm registerHref="/join/registration" forgotHref="/forgot-password" redirectTo={redirectTo} />
        </div>

        <div className="spacer-40"></div>
      </section>

    </div>
  );
}
