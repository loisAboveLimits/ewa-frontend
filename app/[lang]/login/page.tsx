import LoginForm from "@/components/login/LoginForm";
import PageBanner from "@/components/ui/PageBanner";
import { getI18n, pageMetadata } from "@/lib/i18n/server";

export const generateMetadata = () => pageMetadata("login");

export default async function Login() {
  const { t } = await getI18n();

  return (

    <div className="w-full wrapper bg-white">

      {/*<!--banner-->*/}
      <PageBanner page="login" image="/imgs/banners/banner-programs.png" title={t.pages.login.title} subtitle={t.pages.login.desc} />

      {/*<!--content-body-->*/}
      <section id="content-body" className="relative -top-10 md:-top-15">

        <div className="container mx-auto px-4">
          <LoginForm registerHref="/join/registration" forgotHref="#" redirectTo="/" />
        </div>

        <div className="spacer-40"></div>
      </section>

    </div>
  );
}
