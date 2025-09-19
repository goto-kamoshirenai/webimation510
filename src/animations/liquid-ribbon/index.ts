import type { AnimationDefinition } from "../types";
import { LiquidRibbonPreview } from "./LiquidRibbonPreview";

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
};
