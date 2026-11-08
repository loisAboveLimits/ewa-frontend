import { NextResponse, type NextRequest } from "next/server";

/**
 * POST /api/auth/password/reset  { uid, ts, hash, password }
 * Sets the new password with Drupal (ewa_content_api) using the one-time link from the e-mail.
 * Errors: "weak" (too short), "invalid" (wrong / expired / used link), "unavailable".
 */
export async function POST(request: NextRequest) {
  const base = process.env.DRUPAL_BASE_URL;
  if (!base) return NextResponse.json({ error: "unavailable" }, { status: 503 });

  const body = await request.json().catch(() => ({}));
  const payload = {
    uid: Number(body.uid) || 0,
    ts: Number(body.ts) || 0,
    hash: String(body.hash ?? ""),
    password: String(body.password ?? ""),
  };
  if (!payload.uid || !payload.ts || !payload.hash) return NextResponse.json({ error: "invalid" }, { status: 403 });
  if (payload.password.length < 8) return NextResponse.json({ error: "weak" }, { status: 400 });

  try {
    const res = await fetch(`${base}/api/auth/password/reset?_format=json`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(payload),
      cache: "no-store",
    });
    if (res.ok) return NextResponse.json({ ok: true });
    const data = await res.json().catch(() => ({}));
    const error = data.error === "weak" ? "weak" : res.status === 403 ? "invalid" : "unavailable";
    return NextResponse.json({ error }, { status: res.status === 400 || res.status === 403 ? res.status : 503 });
  } catch (error) {
    console.error("Drupal password reset failed", error);
    return NextResponse.json({ error: "unavailable" }, { status: 503 });
  }
}
