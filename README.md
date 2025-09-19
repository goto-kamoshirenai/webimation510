# webimation510

GSAP や WebGL を使ったアニメーションの実装例をまとめた Next.js アプリです。ギャラリーを閲覧しながら、各アニメーションのソースコードをすぐに確認できます。

## 使い方
1. 依存をインストール: `npm install`
2. アプリを起動: `npm run dev`
3. ブラウザで `http://localhost:3000` を開き、カードをクリックしてモーダルから詳細ページへ遷移してください。
4. 詳細ページでは「Source Tabs」で実際のコードを確認できます。

## ソースコードの場所
- アニメーション定義とプレビュー: `src/animations/`
- ギャラリーとモーダル: `src/components/GalleryGrid.tsx`
- ソースコード表示タブ: `src/components/SourceTabs.tsx`
- 詳細ページルート: `src/app/animations/[slug]/page.tsx`

アニメーション研究用のリファレンスとしてご利用ください。
