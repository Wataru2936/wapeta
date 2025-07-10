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
  FaTimes,
  FaExternalLinkAlt,
  FaGlobeAmericas,
  FaGift,
  FaLaptop,
  FaTools,
  FaMobile,
  FaLightbulb,
  FaCopy
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
          <span className="text-lg mr-2">{lang.flag}</span>
          <span className="text-sm">{lang.name}</span>
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
              className={`w-full flex items-center p-4 rounded-lg transition-all ${
                i18n.language === lang.code
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <span className="text-2xl mr-4">{lang.flag}</span>
              <span className="text-lg font-medium">{lang.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

// サービスカードコンポーネント
const ServiceCard = ({ title, description }: { title: React.ReactNode; description: string }) => (
  <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
    <h3 className="text-lg font-semibold text-gray-800 mb-3">{title}</h3>
    <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
  </div>
);

// OGP情報の型定義
interface OGPData {
  title: string;
  description: string;
  image: string;
  url: string;
}

// OGP情報を取得するカスタムフック
const useOGPData = (url: string) => {
  const [ogpData, setOgpData] = useState<OGPData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOGP = async () => {
      try {
        // より安全なプロキシサーバーを使用
        const response = await fetch(`https://api.microlink.io?url=${encodeURIComponent(url)}&meta=true`);
        const data = await response.json();
        
        if (data.status === 'success' && data.data) {
          const { title, description, image } = data.data;
          
          setOgpData({
            title: title || '',
            description: description || '',
            image: image?.url || '',
            url
          });
        } else {
          // フォールバック: 別のプロキシサーバーを試す
          try {
            const fallbackResponse = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(url)}`);
            const fallbackData = await fallbackResponse.json();
            
            if (fallbackData.contents) {
              const html = fallbackData.contents;
              const parser = new DOMParser();
              const doc = parser.parseFromString(html, 'text/html');
              
              const title = doc.querySelector('meta[property="og:title"]')?.getAttribute('content') ||
                           doc.querySelector('title')?.textContent || '';
              const description = doc.querySelector('meta[property="og:description"]')?.getAttribute('content') ||
                                 doc.querySelector('meta[name="description"]')?.getAttribute('content') || '';
              const image = doc.querySelector('meta[property="og:image"]')?.getAttribute('content') || '';
              
              setOgpData({
                title,
                description,
                image,
                url
              });
            }
          } catch (fallbackError) {
            console.error('Fallback OGP fetch failed:', fallbackError);
          }
        }
      } catch (error) {
        console.error('Failed to fetch OGP data:', error);
      } finally {
        setLoading(false);
      }
    };

    if (url && typeof window !== 'undefined') {
      fetchOGP();
    }
  }, [url]);

  return { ogpData, loading };
};

// 実績カードコンポーネント
const WorkCard = ({ title, description, url }: { title: string; description: string; url: string }) => {
  const { ogpData, loading } = useOGPData(url);

  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <h3 className="text-lg font-semibold text-gray-800 mb-3">{title}</h3>
      <p className="text-gray-600 text-sm leading-relaxed mb-4">{description}</p>
      
      {/* OGP埋め込み */}
      <div className="mb-4">
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="block border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
        >
          {loading ? (
            <div className="w-full h-32 bg-gray-100 flex items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
          ) : ogpData?.image ? (
            <div className="w-full h-32 bg-gray-100 overflow-hidden">
              <Image
                src={ogpData.image.startsWith('http') ? ogpData.image : `${new URL(url).origin}${ogpData.image}`}
                alt={ogpData.title || title}
                width={400}
                height={200}
                className="w-full h-full object-cover"
                onError={(e) => {
                  // 画像読み込みエラー時の処理
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                }}
              />
            </div>
          ) : null}
          <div className="p-3">
            <div className="flex items-center space-x-2 mb-2">
              <div className="w-4 h-4 bg-blue-500 rounded"></div>
              <span className="text-xs text-gray-500 truncate">{url}</span>
            </div>
            <h4 className="text-sm font-medium text-gray-800 mb-1 line-clamp-2">
              {ogpData?.title || title}
            </h4>
            <p className="text-xs text-gray-600 line-clamp-2">
              {ogpData?.description || description}
            </p>
          </div>
        </a>
      </div>
      
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors text-sm font-medium"
      >
        <span>詳細を見る</span>
        <FaExternalLinkAlt className="ml-1 text-xs" />
      </a>
    </div>
  );
};

// セクションコンポーネント
const Section = ({ title, children, id }: { title: string; children: React.ReactNode; id?: string }) => (
  <section id={id} className="mb-12">
    <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">{title}</h2>
    {children}
  </section>
);

export default function Home() {
  const { t, i18n } = useTranslation();
  const [isLanguageModalOpen, setIsLanguageModalOpen] = useState(false);
  const [showCopyToast, setShowCopyToast] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [isClient, setIsClient] = useState(false);

  // クライアントサイドでのみ実行される処理
  useEffect(() => {
    setIsClient(true);
  }, []);

  // IPアドレスベースの言語判定（バックグラウンドで実行）
  useEffect(() => {
    if (!isClient) return;

    const detectLocale = async () => {
      try {
        const response = await fetch('/api/detect-locale');
        
        if (response.ok) {
          const data = await response.json();
          
          if (data.detected && data.locale && data.locale !== i18n.language) {
            await i18n.changeLanguage(data.locale);
          }
        }
      } catch (error) {
        console.error('Failed to detect locale:', error);
      }
    };

    // バックグラウンドで言語判定を実行
    detectLocale();
  }, [i18n, isClient]);

  // ナビゲーション関数
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // メールアドレスコピー関数
  const copyEmail = async () => {
    if (!isClient) return;
    
    try {
      await navigator.clipboard.writeText(t('contact.email'));
      setShowCopyToast(true);
      setTimeout(() => setShowCopyToast(false), 2000);
    } catch (err) {
      console.error('Failed to copy email:', err);
    }
  };

  // フォーム送信関数
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isClient) return;
    
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    
    try {
      // Googleフォームの送信先URL
      await fetch('https://docs.google.com/forms/d/e/1FAIpQLSfP6H-ZNjNOa4_D-rCPV0s5QtZKw8osfsllYEDNvWfwGPreBA/formResponse', {
        method: 'POST',
        body: formData,
        mode: 'no-cors'
      });

      setSubmitSuccess(true);
      
      // フォームリセット（安全に実行）
      const form = e.currentTarget;
      if (form) {
        form.reset();
      }
      
      setTimeout(() => setSubmitSuccess(false), 5000);
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };



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
                onClick={() => scrollToSection('works')}
                className="text-gray-700 hover:text-blue-600 transition-colors p-2"
                title={t('navigation.works')}
              >
                <FaCogs className="text-xl" />
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
                  width={500}
                  height={500}
                  className="h-40 md:h-64 w-auto"
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
                title={
                  <div className="flex items-center space-x-2">
                    <FaGlobeAmericas className="text-blue-600 text-xl" />
                    <span>ホームページ作成</span>
                  </div>
                }
                description={t('services.website')}
              />
              <ServiceCard
                title={
                  <div className="flex items-center space-x-2">
                    <FaGift className="text-pink-600 text-xl" />
                    <span>特別なイベント用サイト作成</span>
                  </div>
                }
                description={t('services.events')}
              />
              <ServiceCard
                title={
                  <div className="flex items-center space-x-2">
                    <FaLaptop className="text-green-600 text-xl" />
                    <span>パソコン・IT機器の購入代行</span>
                  </div>
                }
                description={t('services.procurement')}
              />
              <ServiceCard
                title={
                  <div className="flex items-center space-x-2">
                    <FaTools className="text-orange-600 text-xl" />
                    <span>Windows・OSのインストール／アップデート支援</span>
                  </div>
                }
                description={t('services.osSupport')}
              />
              <ServiceCard
                title={
                  <div className="flex items-center space-x-2">
                    <FaMobile className="text-purple-600 text-xl" />
                    <span>ITデバイスの選定・購入代行</span>
                  </div>
                }
                description={t('services.deviceSelection')}
              />
              <ServiceCard
                title={
                  <div className="flex items-center space-x-2">
                    <FaLightbulb className="text-yellow-600 text-xl" />
                    <span>ITコンサルティング業務</span>
                  </div>
                }
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

          {/* 制作実績 */}
          <Section title={t('works.title')} id="works">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <WorkCard
                title={t('works.sourire.title')}
                description={t('works.sourire.description')}
                url="https://www.sourire.win/"
              />
              <WorkCard
                title={t('works.maeda.title')}
                description={t('works.maeda.description')}
                url="https://wataru2936.github.io/Maeda/"
              />
              <WorkCard
                title={t('works.hachi.title')}
                description={t('works.hachi.description')}
                url="https://wataru2936.github.io/Hachi/"
              />
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
            <div className="max-w-4xl mx-auto space-y-8">
              {/* お問い合わせフォーム */}
              <div className="bg-white rounded-lg shadow-lg p-8">
                <h3 className="text-xl font-semibold text-gray-800 mb-6 text-center">
                  {t('contact.form.title')}
                </h3>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      {t('contact.form.name')} <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="entry.2077414200"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      {t('contact.form.email')} <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="entry.720374840"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                    />
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                      {t('contact.form.subject')} <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="subject"
                      name="entry.1057881299"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                    >
                      <option value="">選択してください</option>
                      <option value={t('contact.form.subjectOptions.website')}>
                        {t('contact.form.subjectOptions.website')}
                      </option>
                      <option value={t('contact.form.subjectOptions.procurement')}>
                        {t('contact.form.subjectOptions.procurement')}
                      </option>
                      <option value={t('contact.form.subjectOptions.support')}>
                        {t('contact.form.subjectOptions.support')}
                      </option>
                      <option value={t('contact.form.subjectOptions.consulting')}>
                        {t('contact.form.subjectOptions.consulting')}
                      </option>
                      <option value={t('contact.form.subjectOptions.other')}>
                        {t('contact.form.subjectOptions.other')}
                      </option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                      {t('contact.form.message')} <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="entry.1812658899"
                      required
                      rows={5}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-gray-900"
                    ></textarea>
                  </div>

                  <div className="text-center">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-medium"
                    >
                      {isSubmitting ? '送信中...' : t('contact.form.submit')}
                    </button>
                  </div>
                </form>

                {submitSuccess && (
                  <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg text-center">
                    <p className="text-green-800 font-medium">お問い合わせを送信しました。ありがとうございます。</p>
                  </div>
                )}
              </div>

              {/* メール連絡 */}
              <div className="bg-white rounded-lg shadow-lg p-8 text-center">
                <p className="text-gray-700 mb-6">{t('contact.method')}</p>
                <div className="bg-blue-50 rounded-lg p-6">
                  <div className="text-2xl mb-4">
                    <FaEnvelopeOpen className="text-blue-600 mx-auto" />
                  </div>
                  <div className="flex items-center justify-center space-x-3">
                    <a
                      href={`mailto:${t('contact.email')}`}
                      className="text-2xl font-semibold text-blue-600 hover:text-blue-800 transition-colors"
                    >
                      {t('contact.email')}
                    </a>
                    {isClient && (
                      <button
                        onClick={copyEmail}
                        className="flex items-center space-x-1 px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                      >
                        <FaCopy className="text-sm" />
                        <span className="hidden md:inline">コピー</span>
                      </button>
                    )}
                  </div>
                </div>
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
            onClick={() => scrollToSection('works')}
            className="flex flex-col items-center p-2 text-gray-600 hover:text-blue-600 transition-colors"
          >
            <FaCogs className="text-xl mb-1" />
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

      {/* コピー成功トースト */}
      {isClient && showCopyToast && (
        <div className="fixed bottom-20 md:bottom-8 left-1/2 transform -translate-x-1/2 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg z-50">
          コピーしました
        </div>
      )}

      {/* モバイル用言語選択モーダル */}
      <MobileLanguageModal 
        isOpen={isLanguageModalOpen} 
        onClose={() => setIsLanguageModalOpen(false)} 
      />
    </div>
  );
}
