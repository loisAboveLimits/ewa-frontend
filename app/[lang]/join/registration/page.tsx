import RegistrationForm from "@/components/registration/RegistrationForm";
import PageBanner from "@/components/ui/PageBanner";
import { getI18n, pageMetadata } from "@/lib/i18n/server";

export const generateMetadata = () => pageMetadata("registration");

export default async function Registration() {
  const { t } = await getI18n();

  return (

    <div className="w-full wrapper bg-white">

      {/*<!--banner-->*/}
      <PageBanner page="registration" image="/imgs/banners/banner-programs.png" title={t.pages.registration.title} subtitle={t.pages.registration.desc} />

      {/*<!--content-body-->*/}
      <section id="content-body" className="relative -top-10 md:-top-15">

        <div className="container mx-auto px-4">
           <RegistrationForm signInHref="/login" homeHref="/" />
        </div>

        <div className="spacer-40"></div>
      </section>

    </div>
  );
}
