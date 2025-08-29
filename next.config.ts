import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  experimental: {
    optimizePackageImports: ["@iconify/react"],
  },
  webpack: (config, { dev }) => {
    // Disable filesystem cache in development to avoid corrupted cache issues
    if (dev) {
      config.cache = {
        type: "memory",
      } as any;
    }
    return config;
  },
};

export default nextConfig
