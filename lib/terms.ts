import type { Locale, Localized } from "@/lib/i18n/config";
import type { PolicyText } from "@/components/policy/PolicyDocument";

/*
 * Built-in Terms & Conditions — shown when Drupal has no terms page (see TERMS_NID in
 * app/[lang]/terms-conditions/page.tsx). DRAFT TEXT: have it reviewed by EWA's legal team
 * before publishing.
 */

const UPDATED = "2026-11-05";

const terms: Localized<PolicyText> = {
  en: {
    updatedLabel: "Last updated",
    updated: UPDATED,
    tocTitle: "On this page",
    intro: [
      "Welcome to the website of the Energy & Water Academy (EWA). These Terms & Conditions govern your use of this website and the online services offered through it, such as program registration, job applications and contact forms.",
      "By using the website you agree to these terms. If you do not agree, please do not use the website.",
    ],
    sections: [
      {
        id: "use-of-website",
        title: "Use of the website",
        paragraphs: ["You agree to use the website lawfully and only for its intended purposes. You must not:"],
        list: [
          "Use the website in a way that breaks any applicable law or regulation in the Kingdom of Saudi Arabia.",
          "Try to gain unauthorised access to the website, its servers or any connected systems.",
          "Upload or send viruses, malicious code or any content that could harm the website or other users.",
          "Copy, collect or reuse content or data from the website by automated means without our written permission.",
        ],
      },
      {
        id: "accounts",
        title: "Accounts and registration",
        paragraphs: [
          "Some services require you to create an account or submit an application. You are responsible for giving accurate and complete information, keeping your sign-in details confidential and for all activity under your account. Please tell us straight away if you believe your account has been used without your permission.",
        ],
      },
      {
        id: "applications",
        title: "Program and job applications",
        paragraphs: [
          "Submitting a registration or job application through the website does not guarantee admission to a program or employment. All applications are reviewed according to EWA's admission and recruitment criteria, which may change from time to time. Program details, schedules, seats and fees shown on the website are for information and may be updated without notice.",
        ],
      },
      {
        id: "intellectual-property",
        title: "Intellectual property",
        paragraphs: [
          "All content on the website — including text, images, logos, graphics, videos and design — is owned by EWA or its licensors and is protected by intellectual property laws. You may view and print content for your own personal, non-commercial use. Any other use requires our prior written permission.",
        ],
      },
      {
        id: "third-party-links",
        title: "Links to other websites",
        paragraphs: [
          "The website may contain links to websites run by partners or other third parties. We are not responsible for the content, availability or privacy practices of those websites, and a link does not mean we endorse them.",
        ],
      },
      {
        id: "liability",
        title: "Disclaimer and limitation of liability",
        paragraphs: [
          "We work to keep the website accurate and available, but it is provided \"as is\" without guarantees that it will be error-free or uninterrupted. To the extent permitted by law, EWA is not liable for any loss or damage arising from your use of, or inability to use, the website or its content.",
        ],
      },
      {
        id: "privacy",
        title: "Privacy",
        paragraphs: ["How we collect and use your personal data is explained in our"],
      },
      {
        id: "changes",
        title: "Changes to these terms",
        paragraphs: [
          "We may update these terms from time to time. The latest version is always available on this page, with the date it was last updated. Continuing to use the website after changes means you accept the updated terms.",
        ],
      },
      {
        id: "governing-law",
        title: "Governing law",
        paragraphs: [
          "These terms are governed by the laws of the Kingdom of Saudi Arabia. Any dispute relating to them falls under the jurisdiction of the competent courts in the Kingdom.",
        ],
      },
      {
        id: "contact",
        title: "Contact us",
        paragraphs: ["If you have any questions about these terms, please contact us through the"],
      },
    ],
  },
  ar: {
    updatedLabel: "آخر تحديث",
    updated: UPDATED,
    tocTitle: "في هذه الصفحة",
    intro: [
      "مرحبًا بك في موقع أكاديمية الطاقة والمياه (EWA). تنظّم هذه الشروط والأحكام استخدامك لهذا الموقع والخدمات الإلكترونية المقدمة من خلاله، مثل التسجيل في البرامج والتقديم على الوظائف ونماذج التواصل.",
      "باستخدامك للموقع فإنك توافق على هذه الشروط. وإذا كنت لا توافق عليها، يرجى عدم استخدام الموقع.",
    ],
    sections: [
      {
        id: "use-of-website",
        title: "استخدام الموقع",
        paragraphs: ["توافق على استخدام الموقع بطريقة نظامية وللأغراض المخصصة له فقط، ولا يجوز لك:"],
        list: [
          "استخدام الموقع بأي طريقة تخالف الأنظمة واللوائح المعمول بها في المملكة العربية السعودية.",
          "محاولة الوصول غير المصرح به إلى الموقع أو خوادمه أو أي أنظمة مرتبطة به.",
          "رفع أو إرسال فيروسات أو شيفرات ضارة أو أي محتوى قد يضر بالموقع أو بالمستخدمين الآخرين.",
          "نسخ محتوى الموقع أو بياناته أو جمعها أو إعادة استخدامها بوسائل آلية دون إذن كتابي منا.",
        ],
      },
      {
        id: "accounts",
        title: "الحسابات والتسجيل",
        paragraphs: [
          "تتطلب بعض الخدمات إنشاء حساب أو تقديم طلب. وتكون مسؤولًا عن تقديم معلومات صحيحة وكاملة، والحفاظ على سرية بيانات الدخول، وعن جميع الأنشطة التي تتم عبر حسابك. يرجى إبلاغنا فورًا إذا اعتقدت أن حسابك استُخدم دون إذنك.",
        ],
      },
      {
        id: "applications",
        title: "طلبات التسجيل في البرامج والتوظيف",
        paragraphs: [
          "لا يضمن تقديم طلب تسجيل أو توظيف عبر الموقع القبول في البرنامج أو الحصول على الوظيفة. وتُراجع جميع الطلبات وفق معايير القبول والتوظيف في الأكاديمية، والتي قد تتغير من وقت لآخر. كما أن تفاصيل البرامج ومواعيدها والمقاعد المتاحة والرسوم المعروضة على الموقع للعلم، وقد تُحدّث دون إشعار مسبق.",
        ],
      },
      {
        id: "intellectual-property",
        title: "الملكية الفكرية",
        paragraphs: [
          "جميع محتويات الموقع — بما فيها النصوص والصور والشعارات والرسومات ومقاطع الفيديو والتصميم — مملوكة للأكاديمية أو للجهات المرخِّصة لها، ومحمية بموجب أنظمة الملكية الفكرية. يمكنك عرض المحتوى وطباعته لاستخدامك الشخصي غير التجاري، ويتطلب أي استخدام آخر إذنًا كتابيًا مسبقًا منا.",
        ],
      },
      {
        id: "third-party-links",
        title: "روابط المواقع الأخرى",
        paragraphs: [
          "قد يحتوي الموقع على روابط لمواقع يديرها شركاء أو أطراف أخرى. ولسنا مسؤولين عن محتوى تلك المواقع أو توفرها أو ممارسات الخصوصية فيها، ولا يعني وجود الرابط أننا نؤيدها.",
        ],
      },
      {
        id: "liability",
        title: "إخلاء المسؤولية وحدودها",
        paragraphs: [
          "نسعى للحفاظ على دقة الموقع وتوفره، إلا أنه يُقدَّم \"كما هو\" دون ضمان خلوه من الأخطاء أو عدم انقطاعه. وفي الحدود التي يسمح بها النظام، لا تتحمل الأكاديمية المسؤولية عن أي خسارة أو ضرر ينتج عن استخدامك للموقع أو محتواه أو عدم قدرتك على استخدامه.",
        ],
      },
      {
        id: "privacy",
        title: "الخصوصية",
        paragraphs: ["نوضح كيفية جمع بياناتك الشخصية واستخدامها في"],
      },
      {
        id: "changes",
        title: "التغييرات على هذه الشروط",
        paragraphs: [
          "قد نحدّث هذه الشروط من وقت لآخر. وتتوفر أحدث نسخة دائمًا في هذه الصفحة مع تاريخ آخر تحديث، ويُعد استمرارك في استخدام الموقع بعد التغييرات قبولًا للشروط المحدّثة.",
        ],
      },
      {
        id: "governing-law",
        title: "النظام الواجب التطبيق",
        paragraphs: [
          "تخضع هذه الشروط لأنظمة المملكة العربية السعودية، ويختص بالنظر في أي نزاع يتعلق بها الجهات القضائية المختصة في المملكة.",
        ],
      },
      {
        id: "contact",
        title: "تواصل معنا",
        paragraphs: ["إذا كانت لديك أي أسئلة حول هذه الشروط، يرجى التواصل معنا عبر صفحة"],
      },
    ],
  },
};

export const getTerms = (locale: Locale): PolicyText => terms[locale];
