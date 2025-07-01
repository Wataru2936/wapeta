import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  i18n: {
    locales: ['ja', 'ko', 'zh', 'en'],
    defaultLocale: 'ja',
    localeDetection: false, // IPベースで手動制御
  },
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
