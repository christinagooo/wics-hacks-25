import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https", // Allows any HTTPS images
        hostname: "**",    // Wildcard for all domains
      },
    ],
  },

};

export default nextConfig;
