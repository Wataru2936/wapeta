'use client';

import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Image from 'next/image';
import { 
  FaHome, 
  FaCogs, 
  FaUserTie, 
  FaEnvelope, 
  FaGlobe, 
  FaEnvelopeOpen,
  FaTimes
} from 'react-icons/fa';
import '../i18n';

// 構造化データ（JSON-LD）
const structuredData = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Wapeta",
  "description": "小学生社長が運営するITソリューション会社",
  "url": "https://wapeta.com",
  "logo": "https://wapeta.com/Wapeta.png",
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "customer service",
    "email": "info@wapeta.us"
  },
  "address": {
    "@type": "PostalAddress",
    "addressRegion": "福岡県"
  },
  "founder": {
    "@type": "Person",
    "name": "白石亘",
    "jobTitle": "小学生社長"
  },
  "serviceType": [
    "ホームページ作成",
    "IT機器購入代行",
    "OSサポート",
    "ITコンサルティング"
  ],
  "areaServed": "福岡県",
  "priceRange": "¥¥"
};

// 言語切り替えコンポーネント
const LanguageSelector = () => {
  const { i18n } = useTranslation();
  
  const languages = [
    { code: 'ja', name: '日本語', flag: '🇯🇵' },
    { code: 'ko', name: '한국어', flag: '🇰🇷' },
    { code: 'zh', name: '中文', flag: '🇨🇳' },
    { code: 'en', name: 'English', flag: '🇺🇸' },
  ];
  
  return (
    <div className="flex flex-wrap gap-2 justify-center">
      {languages.map((lang) => (
        <button
          key={lang.code}
          onClick={() => i18n.changeLanguage(lang.code)}
          className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
            i18n.language === lang.code
              ? 'bg-blue-600 text-white shadow-lg'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          <span className="text-lg">{lang.flag}</span>
        </button>
      ))}
    </div>
  );
};

// モバイル用言語選択モーダル
const MobileLanguageModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const { i18n } = useTranslation();
  
  const languages = [
    { code: 'ja', name: '日本語', flag: '🇯🇵' },
    { code: 'ko', name: '한국어', flag: '🇰🇷' },
    { code: 'zh', name: '中文', flag: '🇨🇳' },
    { code: 'en', name: 'English', flag: '🇺🇸' },
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end">
      <div className="bg-white w-full rounded-t-3xl p-6 transform transition-transform duration-300 ease-out">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold text-gray-800">言語を選択</h3>
          <button
            onClick={onClose}
            className="p-2 text-gray-500 hover:text-gray-700"
          >
            <FaTimes className="text-xl" />
          </button>
        </div>
        <div className="space-y-3">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => {
                i18n.changeLanguage(lang.code);
                onClose();
              }}
              className={`w-full flex items-center justify-center p-4 rounded-lg transition-all ${
                i18n.language === lang.code
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <span className="text-3xl">{lang.flag}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

// サービスカードコンポーネント
const ServiceCard = ({ title, description }: { title: string; description: string }) => (
  <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
    <h3 className="text-lg font-semibold text-gray-800 mb-3">{title}</h3>
    <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
  </div>
);

// セクションコンポーネント
const Section = ({ title, children, id }: { title: string; children: React.ReactNode; id?: string }) => (
  <section id={id} className="mb-12">
    <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">{title}</h2>
    {children}
  </section>
);

export default function Home() {
  const { t, i18n } = useTranslation();
  const [isLoading, setIsLoading] = useState(true);
  const [isLanguageModalOpen, setIsLanguageModalOpen] = useState(false);

  // IPアドレスベースの言語判定
  useEffect(() => {
    const detectLocale = async () => {
      try {
        const response = await fetch('/api/detect-locale');
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (data.detected && data.locale) {
          await i18n.changeLanguage(data.locale);
        }
      } catch (error) {
        console.error('Failed to detect locale:', error);
        // エラーの場合はデフォルト言語（日本語）を使用
        await i18n.changeLanguage('ja');
      } finally {
        setIsLoading(false);
      }
    };

    detectLocale();
  }, [i18n]);

  // ナビゲーション関数
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* 構造化データ（JSON-LD） */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />
      {/* ヘッダー - デスクトップ版は固定 */}
      <header className="hidden md:block fixed top-0 left-0 right-0 bg-white shadow-md z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <h1 className="text-2xl font-bold text-blue-600">{t('company.name')}</h1>
            </div>
            <nav className="flex items-center space-x-6">
              <button
                onClick={() => scrollToSection('home')}
                className="text-gray-700 hover:text-blue-600 transition-colors p-2"
                title={t('navigation.home')}
              >
                <FaHome className="text-xl" />
              </button>
              <button
                onClick={() => scrollToSection('services')}
                className="text-gray-700 hover:text-blue-600 transition-colors p-2"
                title={t('navigation.services')}
              >
                <FaCogs className="text-xl" />
              </button>
              <button
                onClick={() => scrollToSection('about')}
                className="text-gray-700 hover:text-blue-600 transition-colors p-2"
                title={t('navigation.about')}
              >
                <FaUserTie className="text-xl" />
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="text-gray-700 hover:text-blue-600 transition-colors p-2"
                title={t('navigation.contact')}
              >
                <FaEnvelope className="text-xl" />
              </button>
              <LanguageSelector />
            </nav>
          </div>
        </div>
      </header>

      {/* メインコンテンツ */}
      <main className="md:pt-20 pb-20 md:pb-8">
        <div className="container mx-auto px-4 py-8">
          {/* ヒーローセクション */}
          <section id="home" className="text-center mb-16">
            <div className="mb-8">
              <div className="flex justify-center mb-6">
                <Image 
                  src="/Wapeta.png" 
                  alt="Wapeta Logo" 
                  width={200}
                  height={200}
                  className="h-32 md:h-48 w-auto"
                />
              </div>
              <div className="text-xl md:text-2xl text-gray-700 mb-2">
                <div>{t('company.ceo')}</div>
                <div>({t('company.ceoTitle')})</div>
              </div>
              <div className="text-gray-600">
                {t('company.location')} {t('company.locationNote')}
              </div>
            </div>
            
            {/* 重要なお知らせ */}
            <div className="flex justify-center mb-8">
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-lg max-w-2xl w-full">
                <div className="flex items-start">
                  <div className="ml-3">
                    <h3 className="text-sm font-bold text-yellow-800">
                      {t('notice.title')}
                    </h3>
                    <div className="mt-2 text-sm text-yellow-700 text-left">
                      {t('notice.content')}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* サービス内容 */}
          <Section title={t('services.title')} id="services">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <ServiceCard
                title="🌐 ホームページ作成"
                description={t('services.website')}
              />
              <ServiceCard
                title="🎉 特別なイベント用サイト作成"
                description={t('services.events')}
              />
              <ServiceCard
                title="💻 パソコン・IT機器の購入代行"
                description={t('services.procurement')}
              />
              <ServiceCard
                title="🛠 Windows・OSのインストール／アップデート支援"
                description={t('services.osSupport')}
              />
              <ServiceCard
                title="📱 ITデバイスの選定・購入代行"
                description={t('services.deviceSelection')}
              />
              <ServiceCard
                title="🧠 ITコンサルティング業務"
                description={t('services.consulting')}
              />
            </div>
          </Section>

          {/* 社長メッセージ */}
          <Section title={t('ceoMessage.title')} id="about">
            <div className="bg-white rounded-lg shadow-lg p-8 max-w-4xl mx-auto">
              <div className="text-center mb-6">
                <div className="w-32 h-32 mx-auto mb-4 overflow-hidden rounded-full border-4 border-blue-100 shadow-lg">
                  <Image 
                    src="/my.png" 
                    alt="社長写真" 
                    width={128}
                    height={128}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-semibold text-gray-800">
                  <div>{t('company.ceo')}</div>
                  <div>{t('company.ceoTitle')}</div>
                </h3>
              </div>
              <blockquote className="text-gray-700 text-lg leading-relaxed space-y-4">
                <p className="italic">&ldquo;{t('ceoMessage.message1')}&rdquo;</p>
                <p className="italic">&ldquo;{t('ceoMessage.message2')}&rdquo;</p>
              </blockquote>
            </div>
          </Section>

          {/* 価格・営業時間 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">{t('pricing.title')}</h2>
              <div className="space-y-3">
                <p className="text-lg font-semibold text-blue-600">{t('pricing.base')}</p>
                <p className="text-gray-600 text-sm">{t('pricing.note')}</p>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">{t('businessHours.title')}</h2>
              <div className="space-y-2">
                <p className="text-gray-700">{t('businessHours.weekdays')}</p>
                <p className="text-gray-700">{t('businessHours.weekends')}</p>
              </div>
            </div>
          </div>

          {/* お問い合わせ */}
          <Section title={t('contact.title')} id="contact">
            <div className="bg-white rounded-lg shadow-lg p-8 max-w-2xl mx-auto text-center">
              <p className="text-gray-700 mb-6">{t('contact.method')}</p>
              <div className="bg-blue-50 rounded-lg p-6">
                <div className="text-2xl mb-4">
                  <FaEnvelopeOpen className="text-blue-600 mx-auto" />
                </div>
                <a
                  href={`mailto:${t('contact.email')}`}
                  className="text-2xl font-semibold text-blue-600 hover:text-blue-800 transition-colors"
                >
                  {t('contact.email')}
                </a>
              </div>
            </div>
          </Section>
        </div>
      </main>

      {/* モバイル用フッターナビゲーション */}
      <footer className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg">
        <div className="flex items-center justify-around py-2">
          <button
            onClick={() => scrollToSection('home')}
            className="flex flex-col items-center p-2 text-gray-600 hover:text-blue-600 transition-colors"
          >
            <Image 
              src="/Wapeta.png" 
              alt="Wapeta Logo" 
              width={40}
              height={40}
              className="h-10 w-auto mb-1"
            />
          </button>
          <button
            onClick={() => scrollToSection('services')}
            className="flex flex-col items-center p-2 text-gray-600 hover:text-blue-600 transition-colors"
          >
            <FaCogs className="text-xl mb-1" />
          </button>
          <button
            onClick={() => scrollToSection('about')}
            className="flex flex-col items-center p-2 text-gray-600 hover:text-blue-600 transition-colors"
          >
            <FaUserTie className="text-xl mb-1" />
          </button>
          <button
            onClick={() => scrollToSection('contact')}
            className="flex flex-col items-center p-2 text-gray-600 hover:text-blue-600 transition-colors"
          >
            <FaEnvelope className="text-xl mb-1" />
          </button>
          <button
            onClick={() => setIsLanguageModalOpen(true)}
            className="flex flex-col items-center p-2 text-gray-600 hover:text-blue-600 transition-colors"
          >
            <FaGlobe className="text-xl mb-1" />
          </button>
        </div>
      </footer>

      {/* モバイル用言語選択モーダル */}
      <MobileLanguageModal 
        isOpen={isLanguageModalOpen} 
        onClose={() => setIsLanguageModalOpen(false)} 
      />
    </div>
  );
}
