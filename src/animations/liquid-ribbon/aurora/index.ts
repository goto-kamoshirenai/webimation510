import type { AnimationDefinition } from "../../types";
import { LiquidRibbonAuroraPreview } from "./LiquidRibbonAuroraPreview";

export const liquidRibbonAuroraAnimation: AnimationDefinition = {
  slug: "liquid-ribbon-aurora",
  title: "Liquid Ribbon Aurora",
  preview: LiquidRibbonAuroraPreview,
  frameworks: ["GSAP"],
  createdAt: "2024-09-21",
  accent: "#22d3ee",
  sourceFiles: [
    {
      label: "LiquidRibbonAuroraPreview.tsx",
      path: "src/animations/liquid-ribbon/aurora/LiquidRibbonAuroraPreview.tsx",
      language: "tsx",
    },
  ],
  parentSlug: "liquid-ribbon", // 親アニメーションのスラッグ。詳細ページでパンくず的に表示される。
};
