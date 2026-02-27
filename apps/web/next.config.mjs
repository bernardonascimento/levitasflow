/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com"
      }
    ]
  },

  // MUITO importante para monorepo
  transpilePackages: ["@repo/shared", "@repo/supabase"]
};

export default nextConfig;
