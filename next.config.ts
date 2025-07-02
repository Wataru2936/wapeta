import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 実験的な機能を有効化
  experimental: {
    turbo: {
      rules: {
        '*.svg': {
          loaders: ['@svgr/webpack'],
          as: '*.js',
        },
      },
    },
  },
};

export default nextConfig;
