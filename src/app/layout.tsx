import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Wapeta - ITソリューション・ホームページ作成・小学生社長",
  description: "Wapetaは小学生社長が運営するITソリューション会社です。ホームページ作成、IT機器購入代行、OSサポート、ITコンサルティングを提供。福岡県で高品質・低価格なサービスをお届けします。",
  keywords: "Wapeta, ITソリューション, ホームページ作成, 小学生社長, IT機器購入代行, OSサポート, ITコンサルティング, 福岡県",
  authors: [{ name: "Wapeta" }],
  creator: "Wapeta",
  publisher: "Wapeta",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://wapeta.us'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Wapeta - ITソリューション・ホームページ作成・小学生社長",
    description: "Wapetaは小学生社長が運営するITソリューション会社です。ホームページ作成、IT機器購入代行、OSサポート、ITコンサルティングを提供。",
    url: 'https://wapeta.us',
    siteName: 'Wapeta',
    images: [
      {
        url: '/Wapeta.png',
        width: 1200,
        height: 630,
        alt: 'Wapeta Logo',
      },
    ],
    locale: 'ja_JP',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Wapeta - ITソリューション・ホームページ作成・小学生社長",
    description: "Wapetaは小学生社長が運営するITソリューション会社です。",
    images: ['/Wapeta.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      {
        url: "/favicon.ico",
        sizes: "any",
      },
    ],
  },
  other: {
    "Cache-Control": "no-cache, no-store, must-revalidate",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <head>
        <link rel="canonical" href="https://wapeta.us" />
        <meta name="google-site-verification" content="your-verification-code" />
        {/* Google Analytics */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-57KBBJZTR6"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-57KBBJZTR6');
            `,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
