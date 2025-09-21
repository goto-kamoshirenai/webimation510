# webimation510 仕様書（現状）

_最終更新日: 2025-09-21_

## 1. 概要
webimation510 は Next.js 15 App Router をベースに、GSAP や React Three Fiber を用いたモーションスタディを収集するギャラリーアプリです。トップのギャラリーでは代表的なアニメーションを一覧表示し、モーダルや詳細ページからソースコードを直接参照できます。Liquid Ribbon には派生バリエーションを用意し、親子構造で閲覧できるようになっています。

## 2. 技術スタック
- **フレームワーク:** Next.js 15 / React 19（サーバー＆クライアントコンポーネント混在）
- **スタイリング:** Tailwind CSS 4（`globals.css` → `@import "tailwindcss"`）
- **アニメーション:** GSAP、React Three Fiber、@react-three/drei
- **コード表示:** `react-syntax-highlighter`（Prism + Coldark Cold）
- **ナビゲーション:** 固定ヘッダー＋クリック制御のドロップダウン（`HeaderNav`）

### npm スクリプト
- `npm run dev` – 開発サーバー（Turbopack）
- `npm run lint` – ESLint（必須）
- `npm run build` / `npm run start` – 本番ビルドと起動

## 3. ディレクトリ構成（一部）
```
src/
  animations/
    types.ts              // AnimationDefinition 型（parentSlug を含む）
    index.ts              // アニメーションレジストリ + ヘルパー
    liquid-ribbon/
      LiquidRibbonPreview.tsx
      index.ts            // 親定義
      aurora/
        LiquidRibbonAuroraPreview.tsx
        index.ts          // 親 slug に liquid-ribbon を設定
      sunset/
        …
      micro/
        …
    pulse-grid/
    stellar-orbits/
  components/
    GalleryGrid.tsx       // 親アニメーションだけを一覧表示
    HeaderNav.tsx         // GitHub アイコン + ドキュメントドロップダウン
    SourceTabs.tsx        // Prism を使ったタブ切り替え
  app/
    layout.tsx            // 固定ヘッダーとレイアウト
    page.tsx              // ギャラリー表示（親のみ）
    animations/[slug]/
      page.tsx            // 詳細ページ（派生カード付き）
public/
  icons/github.svg
  icons/chevron-down.svg
```

## 4. AnimationDefinition
`src/animations/types.ts` で定義。主なプロパティ:
- `slug` – URL に使用する識別子
- `title` – 表示名
- `preview` – プレビューコンポーネント（`variant` で高さ切替）
- `frameworks` – 利用ライブラリの配列
- `createdAt` – 表示並び替え用文字列
- `accent` – 今後のテーマ利用を想定したカラー
- `sourceFiles` – 詳細ページで読み込むファイル情報
- `parentSlug` – 派生の場合に親スラッグを指定（任意）

トップギャラリーでは `parentSlug` を持たないエントリのみ表示します。詳細ページでは `parentSlug` を参照して親リンクを表示し、逆に子エントリをカードとして並べます。

### 登録済みアニメーション（2025-09 現在）
| スラッグ | タイトル | フレームワーク | 親 | プレビューコード |
| --- | --- | --- | --- | --- |
| `pulse-grid` | Pulse Grid | GSAP | なし | `src/animations/pulse-grid/PulseGridPreview.tsx`
| `liquid-ribbon` | Liquid Ribbon | GSAP | なし | `src/animations/liquid-ribbon/LiquidRibbonPreview.tsx`
| `liquid-ribbon-aurora` | Liquid Ribbon Aurora | GSAP | `liquid-ribbon` | `src/animations/liquid-ribbon/aurora/LiquidRibbonAuroraPreview.tsx`
| `liquid-ribbon-sunset` | Liquid Ribbon Sunset | GSAP | `liquid-ribbon` | `src/animations/liquid-ribbon/sunset/LiquidRibbonSunsetPreview.tsx`
| `liquid-ribbon-micro` | Liquid Ribbon Micro | GSAP | `liquid-ribbon` | `src/animations/liquid-ribbon/micro/LiquidRibbonMicroPreview.tsx`
| `stellar-orbits` | Stellar Orbits | WebGL, Three.js | なし | `src/animations/stellar-orbits/StellarOrbitsPreview.tsx`

## 5. 主なコンポーネント
- **HeaderNav (`src/components/HeaderNav.tsx`)**: GitHub リンクとクリックで開閉するドキュメントドロップダウン。画面外クリックと `Esc` で閉じる。
- **GalleryGrid (`src/components/GalleryGrid.tsx`)**: 親アニメーションのみをカード表示し、モーダルでプレビュー。モーダルから詳細ページへ遷移できる。
- **Animation Detail (`src/app/animations/[slug]/page.tsx`)**:
  - 親リンク (`parentSlug`) の出し分け。
  - 子アニメーションのカードグリッド（Liquid Ribbon 系など）。
  - `SourceTabs` にソースファイル文字列を渡して表示。
- **SourceTabs (`src/components/SourceTabs.tsx`)**: Prism + Coldark テーマ、タブ切り替え、最大高さ 32rem。

## 6. スタイリングとレイアウト
- ダークテーマが基本。`layout.tsx` で固定ヘッダー（sticky）を実装。
- 背景に複数のラジアル／グラデーションレイヤーを用いて動きのある演出を追加。
- プレビューは `variant` に対応する高さクラス（thumbnail / modal / detail）を持つ。

## 7. 派生アニメーションの扱い
- Liquid Ribbon の派生は `src/animations/liquid-ribbon/` 以下のサブディレクトリに配置。
- 各派生の `sourceFiles` は新しいパスに合わせて管理。
- ギャラリーには表示されないが、親詳細ページの「派生バリエーション」カードからアクセスできる。

## 8. 新しいアニメーションを追加するには
1. 親の場合は新しいフォルダを `src/animations/<slug>/` として作成。派生の場合は親フォルダ内にサブフォルダを作成。プレビューと `index.ts` を配置する。
2. `index.ts` で `AnimationDefinition` をエクスポートし、`parentSlug` を必要に応じて設定。
3. `src/animations/index.ts` に定義を追加。配列は `createdAt` を元に降順ソートされるため、追加後も意図した順になるか確認する。
4. `npm run lint` を実行し、`npm run dev` でギャラリー・モーダル・詳細ページ・派生カードの挙動を確認する。

## 9. 既知の課題 / Todo
- アニメーション定義はハードコード。永続化や CMS 化は未対応。
- 視覚検証は手動。将来的にはビジュアルリグレッションテスト導入を検討。
- `accent` は reserve 属性。UI バッジ等への活用余地あり。
- 国際化は未対応（日本語 UI 前提）。

## 10. 参考リンク
- [GSAP Documentation](https://greensock.com/docs/)
- [React Three Fiber](https://docs.pmnd.rs/react-three-fiber/getting-started/introduction)
- [Next.js App Router](https://nextjs.org/docs/app)

変更が発生した際は本仕様書と `docs/codex-instructions.md` を同時に更新してください。

## 11. コミットメッセージ運用
- 参考: [Gitのコミットメッセージの書き方（ライト版）](https://qiita.com/itosho/items/9565c6ad2ffc24c09364)
- フォーマットは `種別: サマリ` を1行目に記載する。
- 使用する種別は `add` / `fix` / `update` / `remove` の4種類のみ。
- 詳細を追記する場合は1行空けて箇条書きにする。
- 意味単位でコミットを分け、タイプに沿ったメッセージを付ける。

## 12. 応答マーク運用
- ドキュメントを参照した証跡として、AI は最終回答末尾に `<!-- checked -->` を記載する。
- マークは回答本文に害を与えない位置（末尾の1行など）に挿入する。
- 運用上不要となった場合は利用者が削除してもよい。


