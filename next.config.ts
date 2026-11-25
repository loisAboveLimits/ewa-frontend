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
  // Programs moved from /why/programs to /programs: old links (Drupal menus, bookmarks, Google)
  // go to the new address, in both languages.
  async redirects() {
    return [
      { source: "/why/programs", destination: "/programs", permanent: true },
      { source: "/why/programs/:path*", destination: "/programs/:path*", permanent: true },
      { source: "/:lang(en|ar)/why/programs", destination: "/:lang/programs", permanent: true },
      { source: "/:lang(en|ar)/why/programs/:path*", destination: "/:lang/programs/:path*", permanent: true },
    ];
  },
  async rewrites() {
    return drupalBase
      ? [{ source: "/drupal-files/:path*", destination: `${drupalBase}/sites/default/files/:path*` }]
      : [];
  },
};

export default nextConfig;