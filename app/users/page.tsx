// Old route copy — the live page is app/[lang]/users/page.tsx (proxy.ts serves every URL from [lang]).
// Re-exported so this file stays in sync and doesn't break `next build` type checks.
export { default, generateMetadata } from "../[lang]/users/page";
