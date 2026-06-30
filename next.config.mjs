/** @type {import('next').NextConfig} */
const nextConfig = {
  // Fully static site → export to /out and deploy as Cloudflare static assets
  // (no SSR / OpenNext, so no Next.js runtime-version constraints at deploy).
  output: "export",
  reactStrictMode: true,
  images: {
    // Required for `output: export`; this site uses plain <img> anyway.
    unoptimized: true,
  },
  eslint: {
    // Linting is run separately; never block production builds on it.
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
