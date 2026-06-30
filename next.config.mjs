/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    // Linting is run separately; never block production builds on it.
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
