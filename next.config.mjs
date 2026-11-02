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
    // Addresses of the old dashboard and login pages (deleted from the code): they lead to the homepage,
    // so old links and bookmarks do not end on a 404.
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
    // Old pages with outdated prices and dashboard references (deleted from the code).
    const outdated = ["/documentation", "/api-docs", "/learn-more", "/demo-live"];
    // Old addresses that now have a Bulgarian page (permanent: these are the final addresses).
    const moved = [
      ["/about", "/za-nas"],
      ["/book-demo", "/razgovor"],
      ["/privacy", "/poveritelnost"],
      ["/gdpr", "/poveritelnost"],
      ["/legal", "/poveritelnost"],
      ["/terms", "/usloviya"],
      ["/cookies", "/biskvitki"],
    ];
    return [
      ...[...hidden, ...outdated].flatMap((source) => [
        { source, destination: "/", permanent: false },
        { source: `${source}/:path*`, destination: "/", permanent: false },
      ]),
      ...moved.map(([source, destination]) => ({ source, destination, permanent: true })),
    ];
  },
};

export default nextConfig;
