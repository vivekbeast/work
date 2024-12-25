import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ['lh3.googleusercontent.com']
  },
  eslint: {
    ignoreDuringBuilds: true,
},

};

export default nextConfig;
// next.config.js

module.exports = {
  eslint: {
    // Disable specific ESLint rules
    ignoreDuringBuilds: true, // Ignore ESLint during build, you can modify this if you prefer strict linting.
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-vars': 'warn', // Show a warning for unused variables
      '@typescript-eslint/explicit-function-return-type': 'off', // Disable explicit return type rule
      '@typescript-eslint/explicit-module-boundary-types': 'off', // Disable explicit return type for module boundaries
    },
  },
};
