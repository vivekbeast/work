import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ['lh3.googleusercontent.com']
  },
  eslint: {
    ignoreDuringBuilds: true,
},
// experimental: {
//   missingSuspenseWithCSRBailout: false,
// },
};

export default nextConfig;
