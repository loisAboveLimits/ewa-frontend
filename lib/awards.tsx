import type { ReactNode } from "react";
import type { Locale, Localized } from "@/lib/i18n/config";

export type Award = {
  id: string;
  date: string;
  title: string;
  image: string;
  body: ReactNode;
};

type AwardCopy = Pick<Award, "date" | "title" | "body">;

const base = [
  { id: "itex", image: "/imgs/awards/awards1.png" },
  { id: "ewathon", image: "/imgs/awards/awards2.png" },
  { id: "siif", image: "/imgs/awards/awards3.png" },
  { id: "gptw", image: "/imgs/awards/awards4.png" },
] as const;

type AwardId = (typeof base)[number]["id"];

const copy: Localized<Record<AwardId, AwardCopy>> = {
  en: {
    itex: {
      date: "May 2025",
      title: "ITEX Exhibition",
      body: (
        <p className="fnt-green">
          Towards Empowerment Horizons... We are proud of global achievements by Saudi minds.{" "}
          <b className="fnt-green">EWA won five medals at ITEX 2025</b>, the Innovation and Inventions Expo in Kuala Lumpur,
          Malaysia.
        </p>
      ),
    },
    ewathon: {
      date: "MM/YYYY",
      title: "EWATHON",
      body: (
        <p className="fnt-green">
          Workshops were held to encourage participants to innovate sustainable solutions.{" "}
          <b className="fnt-green">The top three projects were awarded and honored.</b>
        </p>
      ),
    },
    siif: {
      date: "MM/YYYY",
      title: "SIIF",
      body: (
        <p className="fnt-green">
          <b className="fnt-green">EWA has secured six medals at SIIF2025, including gold, silver and bronze medals.</b>{" "}
          This achievement embodies our commitment to Vision2030 in supporting talents and empowering national capabilities.
        </p>
      ),
    },
    gptw: {
      date: "MM/YYYY",
      title: "Great Place to Work KSA",
      body: (
        <>
          <p className="fnt-green">
            <b className="fnt-green">
              EWA was Ranked #9 in 2026 (and #25 in 2025) for Best Workplaces in Saudi Arabia (Small &amp; Medium).
            </b>
          </p>
          <p className="fnt-green">
            <b className="fnt-green">#3 in 2025</b>
          </p>
          <p className="fnt-green">
            <b className="fnt-green">#1 in 2024 for Saudi Nationals, and #1 in the Public Sector (2024).</b>
          </p>
        </>
      ),
    },
  },
  ar: {
    itex: {
      date: "مايو 2025",
      title: "معرض ITEX",
      body: (
        <p className="fnt-green">
          نحو آفاق التمكين... نفخر بالإنجازات العالمية للعقول السعودية.{" "}
          <b className="fnt-green">حصدت الأكاديمية خمس ميداليات في معرض ITEX 2025</b> للابتكارات والاختراعات في كوالالمبور،
          ماليزيا.
        </p>
      ),
    },
    ewathon: {
      date: "MM/YYYY",
      title: "إيواثون",
      body: (
        <p className="fnt-green">
          أُقيمت ورش عمل لتحفيز المشاركين على ابتكار حلول مستدامة.{" "}
          <b className="fnt-green">وكُرّمت المشاريع الثلاثة الأولى ومُنحت جوائز.</b>
        </p>
      ),
    },
    siif: {
      date: "MM/YYYY",
      title: "معرض SIIF",
      body: (
        <p className="fnt-green">
          <b className="fnt-green">حصدت الأكاديمية ست ميداليات في معرض SIIF 2025، بين ذهبية وفضية وبرونزية.</b>{" "}
          ويجسّد هذا الإنجاز التزامنا برؤية 2030 في دعم المواهب وتمكين القدرات الوطنية.
        </p>
      ),
    },
    gptw: {
      date: "MM/YYYY",
      title: "أفضل بيئة عمل في السعودية",
      body: (
        <>
          <p className="fnt-green">
            <b className="fnt-green">
              حلّت الأكاديمية في المرتبة التاسعة عام 2026 (والمرتبة 25 عام 2025) ضمن أفضل بيئات العمل في المملكة العربية
              السعودية (فئة المنشآت الصغيرة والمتوسطة).
            </b>
          </p>
          <p className="fnt-green">
            <b className="fnt-green">المرتبة الثالثة عام 2025</b>
          </p>
          <p className="fnt-green">
            <b className="fnt-green">المرتبة الأولى عام 2024 للمواطنين السعوديين، والمرتبة الأولى في القطاع العام (2024).</b>
          </p>
        </>
      ),
    },
  },
};

export const getAwards = (locale: Locale): Award[] => base.map((a) => ({ ...a, ...copy[locale][a.id] }));
