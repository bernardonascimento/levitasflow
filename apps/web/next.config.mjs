/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // MUITO importante para monorepo
  transpilePackages: ["@repo/shared", "@repo/supabase"]
};

export default nextConfig;
