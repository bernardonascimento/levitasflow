/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com"
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com"
      }
    ]
  },

  // MUITO importante para monorepo
  transpilePackages: ["@repo/shared", "@repo/supabase"]
};

export default nextConfig;
