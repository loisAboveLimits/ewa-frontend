import type { Locale, Localized } from "@/lib/i18n/config";

/*
 * Built-in Privacy Policy — shown when Drupal has no privacy page (see PRIVACY_NID in
 * app/[lang]/privacy-policy/page.tsx). DRAFT TEXT: have it reviewed by EWA's legal /
 * data-protection team before publishing, and replace the contact details marked below.
 */

import type { PolicyText } from "@/components/policy/PolicyDocument";

export type PrivacyPolicy = PolicyText;

const UPDATED = "2026-11-05";

const policy: Localized<PrivacyPolicy> = {
  en: {
    updatedLabel: "Last updated",
    updated: UPDATED,
    tocTitle: "On this page",
    intro: [
      "The Energy & Water Academy (EWA) respects your privacy. This policy explains what personal data we collect when you use our website and services, why we collect it, how we protect it and the choices you have.",
      "We process personal data in line with the Personal Data Protection Law of the Kingdom of Saudi Arabia (PDPL) and its implementing regulations.",
    ],
    sections: [
      {
        id: "data-we-collect",
        title: "Information we collect",
        paragraphs: ["We only collect the information we need to provide our services. Depending on how you use the website, this may include:"],
        list: [
          "Identity and contact details, such as your name, national ID, date of birth, email address and mobile number.",
          "Registration and academic details you provide when applying for a program, such as qualifications, grades and selected courses.",
          "Job application details, such as your CV, experience and cover letter.",
          "Messages you send us through contact forms.",
          "Technical data, such as your IP address, browser type, device information and pages visited, collected automatically through cookies.",
        ],
      },
      {
        id: "how-we-use",
        title: "How we use your information",
        list: [
          "To process registrations, program applications and job applications.",
          "To communicate with you about your application, our programs, events and services.",
          "To manage your account and keep it secure.",
          "To improve our website and understand how it is used.",
          "To meet our legal and regulatory obligations.",
        ],
      },
      {
        id: "sharing",
        title: "Sharing your information",
        paragraphs: [
          "We do not sell your personal data. We share it only when needed: with sponsoring companies and partners involved in your training program, with service providers who help us run the website and our systems under confidentiality obligations, and with government authorities when the law requires it.",
        ],
      },
      {
        id: "cookies",
        title: "Cookies",
        paragraphs: [
          "Our website uses cookies to remember your language preference, keep you signed in and understand how visitors use the site. You can control or delete cookies in your browser settings; some parts of the website may not work properly without them.",
        ],
      },
      {
        id: "security",
        title: "Data security and retention",
        paragraphs: [
          "We use technical and organisational measures to protect your personal data against unauthorised access, loss or misuse. We keep personal data only for as long as needed for the purposes described in this policy or as required by law, and then delete or anonymise it securely.",
        ],
      },
      {
        id: "your-rights",
        title: "Your rights",
        paragraphs: ["Under the PDPL you have the right to:"],
        list: [
          "Be informed about how your personal data is collected and used.",
          "Access a copy of your personal data.",
          "Ask us to correct, complete or update your personal data.",
          "Ask us to delete your personal data when it is no longer needed.",
          "Withdraw your consent at any time, where processing is based on consent.",
        ],
      },
      {
        id: "children",
        title: "Children's privacy",
        paragraphs: [
          "Our services are intended for adults and trainees eligible for our programs. We do not knowingly collect personal data from children without the consent of a parent or guardian.",
        ],
      },
      {
        id: "changes",
        title: "Changes to this policy",
        paragraphs: [
          "We may update this policy from time to time. The latest version is always available on this page, with the date it was last updated.",
        ],
      },
      {
        id: "contact",
        title: "Contact us",
        paragraphs: [
          // TODO: replace with EWA's data-protection contact details
          "If you have any questions about this policy or wish to exercise your rights, please contact us through the",
        ],
      },
    ],
  },
  ar: {
    updatedLabel: "آخر تحديث",
    updated: UPDATED,
    tocTitle: "في هذه الصفحة",
    intro: [
      "تحترم أكاديمية الطاقة والمياه (EWA) خصوصيتك. توضح هذه السياسة البيانات الشخصية التي نجمعها عند استخدامك لموقعنا وخدماتنا، وأسباب جمعها، وكيفية حمايتها، والخيارات المتاحة لك.",
      "نعالج البيانات الشخصية وفقًا لنظام حماية البيانات الشخصية في المملكة العربية السعودية ولوائحه التنفيذية.",
    ],
    sections: [
      {
        id: "data-we-collect",
        title: "المعلومات التي نجمعها",
        paragraphs: ["نجمع فقط المعلومات اللازمة لتقديم خدماتنا. وبحسب طريقة استخدامك للموقع، قد تشمل:"],
        list: [
          "بيانات الهوية والتواصل، مثل الاسم ورقم الهوية الوطنية وتاريخ الميلاد والبريد الإلكتروني ورقم الجوال.",
          "بيانات التسجيل والبيانات الأكاديمية التي تقدمها عند التقديم على برنامج، مثل المؤهلات والدرجات والبرامج المختارة.",
          "بيانات طلبات التوظيف، مثل السيرة الذاتية والخبرات وخطاب التقديم.",
          "الرسائل التي ترسلها إلينا عبر نماذج التواصل.",
          "البيانات التقنية، مثل عنوان IP ونوع المتصفح ومعلومات الجهاز والصفحات التي تزورها، والتي تُجمع تلقائيًا عبر ملفات تعريف الارتباط.",
        ],
      },
      {
        id: "how-we-use",
        title: "كيف نستخدم معلوماتك",
        list: [
          "لمعالجة طلبات التسجيل والتقديم على البرامج والوظائف.",
          "للتواصل معك بشأن طلبك وبرامجنا وفعالياتنا وخدماتنا.",
          "لإدارة حسابك والحفاظ على أمانه.",
          "لتحسين موقعنا وفهم طريقة استخدامه.",
          "للوفاء بالتزاماتنا النظامية والتنظيمية.",
        ],
      },
      {
        id: "sharing",
        title: "مشاركة معلوماتك",
        paragraphs: [
          "لا نبيع بياناتك الشخصية. نشاركها فقط عند الحاجة: مع الشركات الراعية والشركاء المعنيين ببرنامجك التدريبي، ومع مزودي الخدمات الذين يساعدوننا في تشغيل الموقع وأنظمتنا وفق التزامات السرية، ومع الجهات الحكومية عندما يقتضي النظام ذلك.",
        ],
      },
      {
        id: "cookies",
        title: "ملفات تعريف الارتباط",
        paragraphs: [
          "يستخدم موقعنا ملفات تعريف الارتباط لتذكّر اللغة المفضلة لديك، وإبقائك مسجّل الدخول، وفهم طريقة استخدام الزوار للموقع. يمكنك التحكم في ملفات تعريف الارتباط أو حذفها من إعدادات المتصفح، وقد لا تعمل بعض أجزاء الموقع بشكل صحيح بدونها.",
        ],
      },
      {
        id: "security",
        title: "أمن البيانات والاحتفاظ بها",
        paragraphs: [
          "نتخذ تدابير تقنية وتنظيمية لحماية بياناتك الشخصية من الوصول غير المصرح به أو الفقدان أو سوء الاستخدام. ونحتفظ بالبيانات الشخصية للمدة اللازمة فقط لتحقيق الأغراض الموضحة في هذه السياسة أو وفق ما يتطلبه النظام، ثم نحذفها أو نجعلها مجهولة الهوية بشكل آمن.",
        ],
      },
      {
        id: "your-rights",
        title: "حقوقك",
        paragraphs: ["وفقًا لنظام حماية البيانات الشخصية، يحق لك:"],
        list: [
          "العلم بكيفية جمع بياناتك الشخصية واستخدامها.",
          "الحصول على نسخة من بياناتك الشخصية.",
          "طلب تصحيح بياناتك الشخصية أو استكمالها أو تحديثها.",
          "طلب حذف بياناتك الشخصية عند انتهاء الحاجة إليها.",
          "سحب موافقتك في أي وقت، متى كانت المعالجة قائمة على الموافقة.",
        ],
      },
      {
        id: "children",
        title: "خصوصية الأطفال",
        paragraphs: [
          "خدماتنا موجهة للبالغين والمتدربين المؤهلين لبرامجنا. ولا نجمع عن قصد بيانات شخصية من الأطفال دون موافقة ولي الأمر.",
        ],
      },
      {
        id: "changes",
        title: "التغييرات على هذه السياسة",
        paragraphs: ["قد نحدّث هذه السياسة من وقت لآخر. وتتوفر أحدث نسخة دائمًا في هذه الصفحة مع تاريخ آخر تحديث."],
      },
      {
        id: "contact",
        title: "تواصل معنا",
        paragraphs: [
          // TODO: replace with EWA's data-protection contact details
          "إذا كانت لديك أي أسئلة حول هذه السياسة أو رغبت في ممارسة حقوقك، يرجى التواصل معنا عبر صفحة",
        ],
      },
    ],
  },
};

export const getPrivacyPolicy = (locale: Locale): PrivacyPolicy => policy[locale];
