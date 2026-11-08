// Server-side only (reads httpOnly cookies with next/headers).
import { cache } from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { LOGOUT_COOKIE, SESSION_COOKIE, USER_COOKIE } from "@/lib/authCookies";
import { getLocale } from "@/lib/i18n/server";

/** Registration values saved on the account (Drupal module ewa_trainee_fields); null = empty. */
export type TraineeProfile = {
  nationalId?: string | null;
  firstName?: string | null;
  fatherName?: string | null;
  grandfatherName?: string | null;
  lastName?: string | null;
  gender?: string | null;
  dob?: string | null;
  height?: number | null;
  weight?: number | null;
  mobile?: string | null;
  altMobile?: string | null;
  relation?: string | null;
  healthDeclaration?: boolean | null;
  qualification?: string | null;
  major?: string | null;
  graduationYear?: number | null;
  englishLevel?: string | null;
  stepGrade?: number | null;
  gpa?: number | null;
  university?: string | null;
  employed?: "yes" | "no" | null;
  socialInsurance?: "yes" | "no" | null;
  qiwa?: "yes" | "no" | null;
  commercialReg?: "yes" | "no" | null;
  hrdf?: "yes" | "no" | null;
  referral?: string | null;
  dataConfirm?: boolean | null;
  programs?: { tid: number; name: string; slug: string }[];
};

/** A signed-in Drupal user (GET /api/auth/me of the ewa_content_api module). */
export type DrupalUser = {
  uid: number;
  name: string;
  display_name: string;
  mail: string;
  roles: string[];
  langcode?: string;
  created?: string | null;
  access?: string | null;
  login?: string | null;
  /** registration fields (empty object when the trainee fields module isn't installed) */
  profile?: TraineeProfile;
};

const base = () => process.env.DRUPAL_BASE_URL;

/**
 * The signed-in user, checked with Drupal on every call (so a session that expired or was
 * ended in Drupal counts as signed out).
 *   { user }                         signed in
 *   { user: null, reason: "signed_out" }   no session / Drupal says it has ended
 *   { user: null, reason: "unavailable" }  Drupal could not be reached — don't sign the visitor out
 * Cached per request, so the trainee layout and page share one call to Drupal.
 */
export const getSession = cache(async (): Promise<
  { user: DrupalUser; reason?: undefined } | { user: null; reason: "signed_out" | "unavailable" }
> => {
  const session = (await cookies()).get(SESSION_COOKIE)?.value;
  if (!session) return { user: null, reason: "signed_out" };
  if (!base()) return { user: null, reason: "unavailable" };
  try {
    const lang = await getLocale();
    const res = await fetch(`${base()}/api/auth/me?_format=json&lang=${lang}`, {
      headers: { Cookie: session, Accept: "application/json" },
      cache: "no-store",
    });
    if (res.status === 401 || res.status === 403) return { user: null, reason: "signed_out" };
    if (!res.ok) return { user: null, reason: "unavailable" };
    const user: DrupalUser = await res.json();
    return user?.uid ? { user } : { user: null, reason: "signed_out" };
  } catch (error) {
    console.error("Drupal session check failed", error);
    return { user: null, reason: "unavailable" };
  }
});

/** The signed-in user, or null (signed out or Drupal unreachable). */
export async function getCurrentUser(): Promise<DrupalUser | null> {
  return (await getSession()).user;
}

/** Drupal's session cookie ("SESSxxx=value" or "SSESSxxx=value" on https) from a login response. */
export function drupalSessionFrom(res: Response): string | null {
  for (const c of res.headers.getSetCookie()) {
    const pair = c.split(";", 1)[0]?.trim();
    if (pair && /^S?SESS[0-9a-f]+=/i.test(pair)) return pair;
  }
  return null;
}

export const authCookieNames = { session: SESSION_COOKIE, logout: LOGOUT_COOKIE, user: USER_COOKIE };

/**
 * For the trainee pages: the signed-in user; redirects to sign in when the session has ended.
 * null = Drupal unreachable (the layout shows a notice instead of the page).
 */
export async function requireTrainee(locale: string, next = "/users/dashboard"): Promise<DrupalUser | null> {
  const { user, reason } = await getSession();
  if (!user && reason === "signed_out") redirect(`/api/auth/logout?lang=${locale}&next=${encodeURIComponent(next)}`);
  return user;
}
