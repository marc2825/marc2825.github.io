# Masahiro Kono's portfolio

GitHub Pagesで公開する、ビルド不要のHTML・CSS・JavaScriptサイトです。

本文・日英の翻訳・リンクは `database/data.js` で管理します。プロフィールリンクは `links.items`、メールアドレスは `links.emails` が設定元です。リンクプレビュー用の固定メタ情報は各HTMLの `<head>` にも記載しています。

## ローカル表示

Node.js 24以降で実行します。

```sh
npm run preview
```

`http://127.0.0.1:4173` を開きます。

## ブラウザテスト

```sh
npm ci
npx playwright install chromium
npm test
```

Linuxで共有ライブラリが不足する場合は `npx playwright install --with-deps chromium` で必要な依存もインストールできます。

テスト時のローカルサーバーは自動で起動します。言語切り替え、非表示制御、論文フィルタ、モーダルのキーボード操作、モバイルメニュー、テーマ、静的メタ情報などをChromiumで確認します。GitHub Actionsでも実行します。

カード画像はWebPを使用し、元のPNGは保持しています。`assets/og-image.png` はSNSのリンクプレビュー画像、`assets/favicon.svg` はサイトアイコンです。
