/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  compress: true,
  poweredByHeader: false,
  async redirects() {
    // No login or accounts at this stage (BRAND.md): the dashboard and auth pages stay in the code
    // but are hidden. Temporary (307) so they can come back by deleting these lines.
    const hidden = [
      "/login",
      "/register",
      "/overview",
      "/conversations",
      "/leads",
      "/knowledge",
      "/automations",
      "/booking",
      "/analytics",
      "/channels",
      "/settings",
    ];
    // Old pages with outdated prices and dashboard references (not in BRAND.md). Temporary until
    // step 5 adds the final redirects of all old addresses.
    const outdated = ["/documentation", "/api-docs"];
    return [...hidden, ...outdated].flatMap((source) => [
      { source, destination: "/", permanent: false },
      { source: `${source}/:path*`, destination: "/", permanent: false },
    ]);
  },
};

export default nextConfig;
