import { NextRequest, NextResponse } from 'next/server';

// 言語コードのマッピング
const languageToLocale: { [key: string]: string } = {
  'ja': 'ja', // 日本語
  'ko': 'ko', // 韓国語
  'zh': 'zh', // 中国語
  'en': 'en', // 英語
};

export async function GET(request: NextRequest) {
  try {
    // Accept-Languageヘッダーから言語を取得
    const acceptLanguage = request.headers.get('accept-language') || '';
    console.log('Accept-Language header:', acceptLanguage);
    
    // Accept-Languageヘッダーを解析
    const languages = acceptLanguage
      .split(',')
      .map(lang => {
        const [language, quality = '1'] = lang.trim().split(';q=');
        return {
          language: language.split('-')[0], // プライマリ言語コードを取得
          quality: parseFloat(quality)
        };
      })
      .sort((a, b) => b.quality - a.quality); // 品質順にソート
    
    console.log('Parsed languages:', languages);
    
    // サポートされている言語を探す
    let detectedLocale = 'en'; // デフォルトは英語
    let detected = false;
    
    for (const { language } of languages) {
      if (languageToLocale[language]) {
        detectedLocale = languageToLocale[language];
        detected = true;
        break;
      }
    }
    
    console.log('Detected locale:', detectedLocale, 'detected:', detected);
    
    return NextResponse.json({
      locale: detectedLocale,
      detected,
      acceptLanguage,
      languages: languages.map(l => l.language)
    });
    
  } catch (error) {
    console.error('Locale detection error:', error);
    
    // エラーの場合は英語をデフォルトとする
    return NextResponse.json({
      locale: 'en',
      detected: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
} 