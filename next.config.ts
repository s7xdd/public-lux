import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['tomsher.co'], // Add 'tomsher.co' to the list of allowed domains
  },
};

export default nextConfig;
