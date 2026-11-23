import type { NextConfig } from "next";

/*
 * Drupal files (/sites/default/files/…) can be served through this site at /drupal-files/…
 * The browser then loads them over this site's https, which fixes images on Vercel when
 * Drupal itself is only on http (browsers block http images on an https page).
 * On or off: DRUPAL_FILES_PROXY=true / false — by default on when running on Vercel and
 * DRUPAL_ORIGIN is http (see absoluteUrl in lib/drupal.ts).
 */
const drupalBase = process.env.DRUPAL_BASE_URL?.replace(/\/+$/, "");

const nextConfig: NextConfig = {
  allowedDevOrigins: [
    "192.168.100.158",
    "localhost",
    "127.0.0.1",
  ],
  images: {
    remotePatterns: [
      { protocol: "http", hostname: "localhost", pathname: "/ewa/sites/default/files/**" },
    ],
  },
  async rewrites() {
    return drupalBase
      ? [{ source: "/drupal-files/:path*", destination: `${drupalBase}/sites/default/files/:path*` }]
      : [];
  },
};

export default nextConfig;