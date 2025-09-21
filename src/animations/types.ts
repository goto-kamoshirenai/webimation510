import type { ComponentType } from "react";

// 利用するライブラリの分類。必要に応じて追加するが、命名はGalleryなどと整合させる。
export type AnimationFramework = "GSAP" | "WebGL" | "Three.js" | "Canvas" | "Shaders";

// プレビューコンポーネントはvariantによってレイアウトが大きく変わるため、サイズ調整のためのclassNameとvariantを受け取る。
export interface AnimationPreviewProps {
  className?: string;
  variant?: "thumbnail" | "modal" | "detail";
}

// 詳細ページでタブ表示するソースファイルの情報。languageを指定するとシンタックスハイライトの切り替えがしやすい。
export interface AnimationSourceFile {
  label: string;
  path: string; // リポジトリルートからの相対パス。誤ると詳細ページで読み込みエラーになるので注意。
  language?: string;
}

// アニメーションのメタ定義。派生バリエーションを扱うためparentSlugを追加している。
export interface AnimationDefinition {
  slug: string; // `/animations/<slug>` にマッピングされる。
  title: string; // ギャラリーカードや詳細ページに表示する名称。
  preview: ComponentType<AnimationPreviewProps>; // プレビュー用Reactコンポーネント。variantに応じた高さをサポートすること。
  frameworks: AnimationFramework[]; // 使用ライブラリのラベル。フィルタを追加する際にも流用できる。
  createdAt: string; // ISO風文字列。レジストリで降順ソートするため、`YYYY-MM-DD` 形式を推奨。
  accent: string; // 将来的なUI差し色用。現在は未使用だが、タグやバッジ色に流用可能。
  sourceFiles: AnimationSourceFile[]; // 詳細ページで参照されるファイル一覧。
  parentSlug?: string; // 派生アニメーションの場合に親を指す。ギャラリーは親のみ表示する仕様なので、必ず親側のslugを指定。
}
