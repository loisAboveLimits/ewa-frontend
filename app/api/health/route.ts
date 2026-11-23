import { NextResponse } from "next/server";

/**
 * GET /api/health — quick check of the Drupal connection on any deployment (Vercel or local).
 * Shows whether the environment variables are set (host only, never full values or secrets)
 * and whether the server can reach Drupal, with the error if it can't.
 * Safe to keep, or delete this folder once everything works.
 */
export const dynamic = "force-dynamic";

const hostOf = (url?: string) => {
  if (!url) return null;
  try {
    return new URL(url).host + new URL(url).pathname.replace(/\/+$/, "");
  } catch {
    return "invalid URL";
  }
};

export async function GET() {
  const base = process.env.DRUPAL_BASE_URL;
  const result: Record<string, unknown> = {
    env: {
      DRUPAL_BASE_URL: base ? hostOf(base) : "NOT SET",
      DRUPAL_ORIGIN: process.env.DRUPAL_ORIGIN ? hostOf(process.env.DRUPAL_ORIGIN) : "NOT SET",
      VERCEL_ENV: process.env.VERCEL_ENV ?? "(not on Vercel)",
      VERCEL_REGION: process.env.VERCEL_REGION ?? null,
      branch: process.env.VERCEL_GIT_COMMIT_REF ?? null,
      commit: process.env.VERCEL_GIT_COMMIT_SHA?.slice(0, 7) ?? null,
    },
  };

  if (base) {
    const started = Date.now();
    try {
      const res = await fetch(`${base}/api/menu/front/en`, { cache: "no-store", signal: AbortSignal.timeout(15_000) });
      result.drupal = { reachable: true, status: res.status, ms: Date.now() - started };
    } catch (error) {
      const e = error as Error & { cause?: { code?: string; message?: string } };
      result.drupal = {
        reachable: false,
        ms: Date.now() - started,
        error: e.name === "TimeoutError" ? "timed out after 15s" : e.message,
        cause: e.cause?.code ?? e.cause?.message ?? null,
      };
    }
  }

  return NextResponse.json(result, { headers: { "Cache-Control": "no-store" } });
}
