import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**"
      }
    ]
  },
  experimental: {
    optimizePackageImports: ["@iconify/react"]
  }
}

export default nextConfig
