# Masahiro Kono's portfolio

GitHub Pagesで公開する、ビルド不要のHTML・CSS・JavaScriptサイトです。

本文・日英の翻訳・リンクは `database/data.js` で管理します。プロフィールリンクは `links.items`、メールアドレスは `links.emails` が設定元です。リンクプレビュー用の固定メタ情報は各HTMLの `<head>` にも記載しています。

論文は `year` の降順で表示し、同年内は `papers` の記載順を保ちます。番号はフィルタ後の一覧内で新しいものから降順に振ります。

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

セクション描画の例外隔離、DOM要素の欠落、`stack` 未指定、スクロールの間引き、レーティングJSONの取得成功・失敗も確認します。ブラウザテストで遮断する外部通信はGoogle Fontsだけです。

## 外部リンクの検査

```sh
npm run test:links
```

`data.js` のリンク・日英の本文内リンクと各HTMLのアンカーを収集し、実際にHTTPで検査します。HEADに対応しないサイト等はGETで再確認します。結果は `OK`、`BROKEN`（404/410）、`UNVERIFIED`（アクセス制限・タイムアウトなど）で出力し、終了コードはそれぞれ0、1、2です（混在時は1を優先）。本文やURLは自動変更しません。

外部サイトの稼働状況に依存するため、通常の `npm test` とは別に実行します。GitHub Actionsの「Check Portfolio」を手動実行する際も `check_external_links` を有効にすると検査できます。

カード画像はWebPを使用し、元のPNGは保持しています。`assets/og-image.png` はSNSのリンクプレビュー画像、`assets/favicon.svg` はサイトアイコンです。
