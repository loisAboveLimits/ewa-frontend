// Cookie names for the Drupal sign-in — no server-only imports, so proxy.ts can use it too.

/** httpOnly: the Drupal session cookie as "NAME=value" (sent to Drupal by the Next.js server) */
export const SESSION_COOKIE = "ewa_session";
/** httpOnly: Drupal's logout token (core POST /user/logout?token=…) */
export const LOGOUT_COOKIE = "ewa_logout";
/** readable by the browser: the signed-in user's display name, for the header greeting only */
export const USER_COOKIE = "ewa_user";

/** Pages that need a signed-in user (paths without the language prefix). */
export const PROTECTED_PATHS = ["/users/dashboard"];
export const DASHBOARD_PATH = "/users/dashboard";

export const isProtectedPath = (path: string) =>
  PROTECTED_PATHS.some((p) => path === p || path.startsWith(p + "/"));

/** Only same-site paths are allowed after sign-in (no "//evil.com" or "https://…"). */
export const safeNext = (next: string | null | undefined, fallback = DASHBOARD_PATH) =>
  next && next.startsWith("/") && !next.startsWith("//") && !next.startsWith("/\\") ? next : fallback;
