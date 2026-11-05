import type { Locale, Localized } from "@/lib/i18n/config";
import type { PolicyText } from "@/components/policy/PolicyDocument";

/*
 * Built-in Accessibility statement — shown when Drupal has no accessibility page (see
 * ACCESSIBILITY_NID in app/[lang]/accessibility/page.tsx). DRAFT TEXT: review it with EWA
 * before publishing, and update the "known limitations" section after an accessibility audit.
 */

const UPDATED = "2026-11-05";

const statement: Localized<PolicyText> = {
  en: {
    updatedLabel: "Last updated",
    updated: UPDATED,
    tocTitle: "On this page",
    intro: [
      "The Energy & Water Academy (EWA) wants everyone to be able to use our website, including people with disabilities. We are working to make the website accessible and easy to use for all visitors, in English and Arabic.",
    ],
    sections: [
      {
        id: "our-commitment",
        title: "Our commitment",
        paragraphs: [
          "We aim to meet the Web Content Accessibility Guidelines (WCAG) 2.1 at level AA. These guidelines explain how to make web content more accessible for people with visual, hearing, motor and cognitive disabilities.",
        ],
      },
      {
        id: "features",
        title: "Accessibility features",
        paragraphs: ["The website includes the following features:"],
        list: [
          "Full English and Arabic versions, with correct right-to-left layout for Arabic.",
          "A responsive design that works on phones, tablets and computers, and supports zooming up to 200%.",
          "Keyboard navigation for menus, sliders, forms and pop-ups, with visible focus outlines.",
          "Text alternatives for meaningful images and labels for form fields.",
          "Clear error messages in forms that are announced to screen readers.",
          "Reduced animations for visitors who turn on \"reduce motion\" in their device settings.",
          "Headings and page landmarks that help screen-reader users move around each page.",
        ],
      },
      {
        id: "assistive-technology",
        title: "Using assistive technology",
        paragraphs: [
          "The website is designed to work with current versions of popular browsers and with assistive technologies such as screen readers (for example NVDA, JAWS, VoiceOver and TalkBack), screen magnifiers and voice control.",
        ],
      },
      {
        id: "known-limitations",
        title: "Known limitations",
        paragraphs: [
          "Although we do our best, some parts of the website may not yet be fully accessible. For example, some older documents or images that contain text, and some content provided by third parties, may not meet every requirement. We are working to improve these areas.",
        ],
      },
      {
        id: "feedback",
        title: "Feedback and help",
        paragraphs: [
          "If you have difficulty using any part of the website, or need information in a different format, please let us know. Tell us the page address and the problem you faced, and we will do our best to help. Contact us through the",
        ],
      },
      {
        id: "continuous-improvement",
        title: "Continuous improvement",
        paragraphs: [
          "We review the accessibility of our website regularly as we add new content and features, and we will update this statement as improvements are made.",
        ],
      },
    ],
  },
  ar: {
    updatedLabel: "آخر تحديث",
    updated: UPDATED,
    tocTitle: "في هذه الصفحة",
    intro: [
      "تحرص أكاديمية الطاقة والمياه (EWA) على أن يتمكن الجميع من استخدام موقعها، بمن فيهم الأشخاص ذوو الإعاقة. ونعمل على أن يكون الموقع سهل الوصول والاستخدام لجميع الزوار باللغتين العربية والإنجليزية.",
    ],
    sections: [
      {
        id: "our-commitment",
        title: "التزامنا",
        paragraphs: [
          "نسعى إلى استيفاء إرشادات سهولة الوصول إلى محتوى الويب (WCAG) 2.1 بالمستوى AA، وهي إرشادات توضح كيفية جعل محتوى الويب أكثر سهولة للأشخاص ذوي الإعاقات البصرية والسمعية والحركية والإدراكية.",
        ],
      },
      {
        id: "features",
        title: "مزايا سهولة الوصول",
        paragraphs: ["يتضمن الموقع المزايا التالية:"],
        list: [
          "نسخة كاملة باللغتين العربية والإنجليزية، مع تخطيط صحيح من اليمين إلى اليسار للعربية.",
          "تصميم متجاوب يعمل على الهواتف والأجهزة اللوحية والحواسيب، ويدعم التكبير حتى 200%.",
          "التنقل بلوحة المفاتيح في القوائم وعروض الشرائح والنماذج والنوافذ المنبثقة، مع إطار تركيز واضح.",
          "نصوص بديلة للصور ذات المعنى، وعناوين واضحة لحقول النماذج.",
          "رسائل خطأ واضحة في النماذج تُقرأ عبر قارئات الشاشة.",
          "تقليل الحركة للزوار الذين يفعّلون خيار \"تقليل الحركة\" في إعدادات أجهزتهم.",
          "عناوين ومعالم للصفحات تساعد مستخدمي قارئات الشاشة على التنقل داخل كل صفحة.",
        ],
      },
      {
        id: "assistive-technology",
        title: "استخدام التقنيات المساعدة",
        paragraphs: [
          "صُمم الموقع ليعمل مع الإصدارات الحالية من المتصفحات الشائعة ومع التقنيات المساعدة، مثل قارئات الشاشة (ومنها NVDA وJAWS وVoiceOver وTalkBack) وأدوات تكبير الشاشة والتحكم بالصوت.",
        ],
      },
      {
        id: "known-limitations",
        title: "قيود معروفة",
        paragraphs: [
          "رغم حرصنا، قد لا تكون بعض أجزاء الموقع متاحة بالكامل بعد؛ فعلى سبيل المثال، قد لا تستوفي بعض المستندات القديمة أو الصور التي تحتوي على نصوص، وبعض المحتوى المقدم من أطراف أخرى، جميع المتطلبات. ونعمل على تحسين هذه الجوانب.",
        ],
      },
      {
        id: "feedback",
        title: "الملاحظات والمساعدة",
        paragraphs: [
          "إذا واجهت صعوبة في استخدام أي جزء من الموقع، أو احتجت إلى المعلومات بصيغة مختلفة، يرجى إبلاغنا بعنوان الصفحة والمشكلة التي واجهتها، وسنبذل قصارى جهدنا لمساعدتك. تواصل معنا عبر صفحة",
        ],
      },
      {
        id: "continuous-improvement",
        title: "التحسين المستمر",
        paragraphs: [
          "نراجع سهولة الوصول إلى موقعنا بانتظام عند إضافة محتوى أو مزايا جديدة، وسنحدّث هذا البيان مع كل تحسين.",
        ],
      },
    ],
  },
};

export const getAccessibilityStatement = (locale: Locale): PolicyText => statement[locale];
