import { NextRequest, NextResponse } from 'next/server';
import geoip from 'geoip-lite';

// 国コードと言語のマッピング
const countryToLocale: { [key: string]: string } = {
  'JP': 'ja', // 日本
  'KR': 'ko', // 韓国
  'CN': 'zh', // 中国
  'TW': 'zh', // 台湾
  'HK': 'zh', // 香港
  'MO': 'zh', // マカオ
};

export async function GET(request: NextRequest) {
  try {
    // クライアントのIPアドレスを取得
    const forwarded = request.headers.get('x-forwarded-for');
    const realIp = request.headers.get('x-real-ip');
    const clientIp = forwarded?.split(',')[0] || realIp || '127.0.0.1';
    
    console.log('Detecting locale for IP:', clientIp);
    
    // 開発環境やローカルIPの場合はデフォルト言語を返す
    if (clientIp === '127.0.0.1' || clientIp === '::1' || clientIp.startsWith('192.168.') || clientIp.startsWith('10.')) {
      console.log('Local IP detected, using default locale');
      return NextResponse.json({
        locale: 'ja',
        country: 'JP',
        ip: clientIp,
        detected: false
      });
    }
    
    // IPアドレスから地理的情報を取得
    const geo = geoip.lookup(clientIp);
    console.log('Geo lookup result:', geo);
    
    if (!geo || !geo.country) {
      console.log('No geo information found, using default locale');
      // 地理的情報が取得できない場合は英語をデフォルトとする
      return NextResponse.json({
        locale: 'en',
        country: 'unknown',
        ip: clientIp,
        detected: false
      });
    }
    
    // 国コードに基づいて言語を決定
    const locale = countryToLocale[geo.country] || 'en';
    console.log('Selected locale:', locale, 'for country:', geo.country);
    
    return NextResponse.json({
      locale,
      country: geo.country,
      ip: clientIp,
      detected: true,
      geo: {
        city: geo.city,
        region: geo.region,
        timezone: geo.timezone
      }
    });
    
  } catch (error) {
    console.error('Locale detection error:', error);
    
    // エラーの場合は日本語をデフォルトとする
    return NextResponse.json({
      locale: 'ja',
      country: 'JP',
      ip: 'unknown',
      detected: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
} 