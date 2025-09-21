import type { AnimationDefinition } from "../types";
import { LiquidRibbonPreview } from "./LiquidRibbonPreview";

// Liquid Ribbon 親エントリ。派生は同ディレクトリ内のサブフォルダで管理する。
export const liquidRibbonAnimation: AnimationDefinition = {
  slug: "liquid-ribbon",
  title: "Liquid Ribbon",
  preview: LiquidRibbonPreview,
  frameworks: ["GSAP"],
  createdAt: "2024-09-14",
  accent: "#60a5fa",
  sourceFiles: [
    {
      label: "LiquidRibbonPreview.tsx",
      path: "src/animations/liquid-ribbon/LiquidRibbonPreview.tsx",
      language: "tsx",
    },
  ],
  // 親なので parentSlug は設定しない。派生側でこの slug を指定する。
};
