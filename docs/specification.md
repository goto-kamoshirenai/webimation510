# Webimation Library 仕様書（現状）

_最終更新日: 2025-09-19_

## 1. 概要
Webimation Library は Next.js 15 を用いたモーションスタディのアーカイブサイトです。GSAP や WebGL 系ライブラリで作成したアニメーションを一覧表示し、モーダルで拡大プレビュー、詳細ページでソースコードを閲覧できます。

## 2. 技術スタック
- **フレームワーク:** Next.js 15（App Router, TypeScript）
- **UI:** React 19（サーバー／クライアントコンポーネント混在）
- **スタイリング:** Tailwind CSS 4（`globals.css` で `@import "tailwindcss"`）
- **アニメーション:** GSAP / React Three Fiber（`@react-three/fiber`）/ Drei
- **コード表示:** `react-syntax-highlighter`（Prism + Coldark Cold テーマ）

### npmスクリプト
- `npm run dev` – 開発サーバー（Turbopack）
- `npm run build` – 本番ビルド（Turbopack）
- `npm run start` – 本番ビルドの起動
- `npm run lint` – ESLint（実行必須）

## 3. 主なディレクトリ構成
```
src/
  animations/
    types.ts              // アニメーション定義の型
    <slug>/
      <Name>Preview.tsx   // プレビュー用クライアントコンポーネント
      index.ts            // AnimationDefinition をエクスポート
    index.ts              // レジストリと検索ヘルパー
  components/
    GalleryGrid.tsx       // 一覧＋モーダル制御
    SourceTabs.tsx        // ソースコードタブ
  app/
    layout.tsx            // 共通レイアウト
    globals.css           // グローバルテーマ
    page.tsx              // トップページ
    animations/[slug]/
      page.tsx            // 詳細ページ
public/
  ... 必要に応じた静的アセット
/docs/
  codex-instructions.md   // Codex運用ガイド
  specification.md        // 本書
```

## 4. アニメーションレジストリ
`AnimationDefinition`（`src/animations/types.ts`）の主な項目:
- `slug`: ルーティング用ID（`/animations/<slug>`）
- `title`: 表示タイトル
- `preview`: プレビューコンポーネント（`variant: thumbnail | modal | detail`）
- `frameworks`: 使用ライブラリのタグ
- `createdAt`: 表示順序用の日付（文字列）
- `accent`: アクセントカラー（将来の装飾用）
- `sourceFiles`: 詳細ページで表示するファイル一覧

### 登録済みアニメーション
| スラッグ | タイトル | フレームワーク | ソース |
| --- | --- | --- | --- |
| `pulse-grid` | Pulse Grid | GSAP | `src/animations/pulse-grid/PulseGridPreview.tsx` |
| `liquid-ribbon` | Liquid Ribbon | GSAP | `src/animations/liquid-ribbon/LiquidRibbonPreview.tsx` |
| `stellar-orbits` | Stellar Orbits | WebGL, Three.js | `src/animations/stellar-orbits/StellarOrbitsPreview.tsx` |

`src/animations/index.ts` で配列を新しい順に並べ替え、`getAnimationBySlug` を提供しています。

## 5. ページ／コンポーネント概要
### 5.1 トップページ（`src/app/page.tsx`）
- サーバーコンポーネント。
- ヒーローセクションでアニメーション数と使用ライブラリを表示。
- `GalleryGrid` にアニメーション一覧を渡す。

### 5.2 GalleryGrid（`src/components/GalleryGrid.tsx`）
- クライアントコンポーネント。
- サムネイル表示とモーダルの状態管理（`activeSlug`）。
- モーダルでは拡大プレビュー、タイトル、使用ライブラリ、詳細ページへのリンクを表示。

### 5.3 詳細ページ（`src/app/animations/[slug]/page.tsx`）
- サーバーコンポーネント。
- `generateStaticParams` と `generateMetadata` で静的生成・SEO情報を定義。
- `loadSourceFiles` で `sourceFiles` に記載されたファイルを読み込み `SourceTabs` に渡す。

### 5.4 SourceTabs（`src/components/SourceTabs.tsx`）
- クライアントコンポーネント。
- タブボタンでアクティブファイルを切替、Prismテーマで構文ハイライトを表示。
- `max-h-[32rem]` でスクロール領域を制限。

## 6. スタイリング
- 既定はダークテーマ。`globals.css` で背景グラデーションとフォントを設定。
- レイアウトは最大幅 `max-w-6xl` の中央揃え。ヘッダー／フッターは半透明のボーダー表現。
- プレビューコンポーネントは `variant` に応じて高さ・余白を切り替える実装を推奨。

## 7. ソースファイル読み込み
- `fs/promises.readFile` でリポジトリルート（`process.cwd()`）からパスを解決。
- 読み込み失敗時はメッセージ文字列を返し、UIが崩れないようにしている。
- `sourceFiles` は常にリポジトリ相対パスで指定すること。

## 8. 新規アニメーション追加フロー
1. `src/animations/` にフォルダを追加し、プレビューコンポーネントと `index.ts` を作成。
2. `slug`, `title`, `frameworks`, `createdAt`, `sourceFiles` を入力。
3. `src/animations/index.ts` の配列にエクスポートを追加（必要なら並び替え）。
4. ギャラリーのサムネイル／モーダル、詳細ページで正常に表示されるか確認。
5. `npm run lint` を実行し、問題がないことを確かめる。

## 9. 既知の課題・今後の改善点
- 永続化は未実装。データはコードにハードコーディングされている。
- ビジュアルリグレッション等の自動テストは未整備。手動確認が前提。
- `accent` カラーは現在未使用。今後バッジやテーマへの活用余地あり。
- 多言語対応は未実装。必要に応じて国際化対応を検討。
- コード表示ファイルが増えた場合はパフォーマンス最適化（プリロード等）を検討。

## 10. 参考リンク
- [GSAP Documentation](https://greensock.com/docs/)
- [React Three Fiber](https://docs.pmnd.rs/react-three-fiber/getting-started/introduction)
- [Next.js App Router](https://nextjs.org/docs/app)

変更加筆時は本仕様書と `codex-instructions.md` を合わせて更新してください。
