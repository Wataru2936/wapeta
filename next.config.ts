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
  // 外部画像ホストを許可
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.sourire.win',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'wataru2936.github.io',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '**',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
