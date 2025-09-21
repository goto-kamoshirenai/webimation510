import type { AnimationDefinition } from "../../types";
import { LiquidRibbonSunsetPreview } from "./LiquidRibbonSunsetPreview";

export const liquidRibbonSunsetAnimation: AnimationDefinition = {
  slug: "liquid-ribbon-sunset",
  title: "Liquid Ribbon Sunset",
  preview: LiquidRibbonSunsetPreview,
  frameworks: ["GSAP"],
  createdAt: "2024-09-22",
  accent: "#f97316",
  sourceFiles: [
    {
      label: "LiquidRibbonSunsetPreview.tsx",
      path: "src/animations/liquid-ribbon/sunset/LiquidRibbonSunsetPreview.tsx",
      language: "tsx",
    },
  ],
  parentSlug: "liquid-ribbon", // 詳細ページで親のLiquid Ribbonと紐付ける。
};
