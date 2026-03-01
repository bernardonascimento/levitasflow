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
      },
      // Outros subdomínios do Google (ex.: lh4, lh5, lh6) para fotos de perfil OAuth
      {
        protocol: "https",
        hostname: "**.googleusercontent.com"
      },
      // GitHub e outros provedores comuns de avatar
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com"
      },
      {
        protocol: "https",
        hostname: "cdn.discordapp.com"
      },
      // Supabase Storage (caso o avatar seja armazenado no projeto)
      {
        protocol: "https",
        hostname: "**.supabase.co",
        pathname: "/storage/v1/object/public/**"
      }
    ]
  },

  // MUITO importante para monorepo
  transpilePackages: ["@repo/shared", "@repo/supabase"]
};

export default nextConfig;
