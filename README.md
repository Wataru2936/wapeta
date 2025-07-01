# Wapeta社 コーポレートサイト

福岡県の小学生社長「白石亘」が運営するWapeta社の公式Webサイトです。

## 特徴

### 🌍 多言語対応
- IPアドレスベースの自動言語判定
- 4言語サポート：日本語、韓国語、中国語、英語
- 手動言語切り替え機能

### 📱 モバイル優先設計
- レスポンシブデザイン
- モバイル版：フッターナビゲーション
- デスクトップ版：固定ヘッダーナビゲーション

### 🚀 技術スタック
- **フレームワーク**: Next.js 15.3.4 (App Router)
- **言語**: TypeScript
- **スタイリング**: Tailwind CSS
- **多言語化**: react-i18next
- **IP判定**: geoip-lite

## サービス内容

Wapetaは以下のサービスを提供しています：

1. **ホームページ作成**
2. **イベント用サイト作成** (誕生日祝い、結婚祝いなど)
3. **PC・IT機器の購入代行サービス**
4. **Windows OS関連サポート**
5. **ITデバイスの選定・購入代行**
6. **ITコンサルティング業務**

## 会社情報

- **会社名**: Wapeta
- **代表者**: 白石亘（小学生社長）
- **所在地**: 福岡県
- **価格**: 基本60,000円〜（要相談）

### 営業時間
- **平日（月〜金）**: 14:00〜17:00
- **土日・休日**: 10:00〜17:00

**※重要**: 小学生社長のため、平日は学校の都合で対応が遅れる可能性があります。

## 開発環境のセットアップ

### 前提条件
- Node.js (v18以上)
- npm または yarn

### インストール

```bash
# リポジトリをクローン
git clone <repository-url>
cd wapeta-website

# 依存関係をインストール
npm install

# 開発サーバーを起動
npm run dev
```

### 利用可能なスクリプト

```bash
# 開発サーバー起動 (Turbopack使用)
npm run dev

# プロダクションビルド
npm run build

# プロダクションサーバー起動
npm start

# Linter実行
npm run lint
```

## プロジェクト構造

```
wapeta-website/
├── src/
│   ├── app/
│   │   ├── api/detect-locale/    # IP判定API
│   │   ├── layout.tsx           # アプリケーションレイアウト
│   │   └── page.tsx             # メインページ
│   └── i18n.ts                  # i18n設定
├── public/
│   └── locales/                 # 言語リソース
│       ├── ja/common.json       # 日本語
│       ├── ko/common.json       # 韓国語
│       ├── zh/common.json       # 中国語
│       └── en/common.json       # 英語
├── next.config.ts               # Next.js設定
└── package.json
```

## 多言語対応の仕組み

### 自動言語判定
1. クライアントのIPアドレスを取得
2. geoip-liteで地理的情報を解析
3. 国コードに基づいて適切な言語を選択

### 判定ルール
- **日本IP** → 日本語 (ja)
- **韓国IP** → 韓国語 (ko)
- **中国/台湾/香港/マカオIP** → 中国語 (zh)
- **その他の国** → 英語 (en)

## デプロイ

### Vercel (推奨)
```bash
# Vercel CLIをインストール
npm i -g vercel

# デプロイ
vercel
```

### その他のプラットフォーム
- Netlify
- AWS Amplify
- Digital Ocean App Platform

## お問い合わせ

ご質問やお仕事のご依頼は、以下のメールアドレスまでお気軽にお問い合わせください。

📧 **contact@wapeta.com**

---

© 2024 Wapeta. All rights reserved.
