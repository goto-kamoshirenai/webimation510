import type { AnimationDefinition } from "../../types";
import { LiquidRibbonMicroPreview } from "./LiquidRibbonMicroPreview";

export const liquidRibbonMicroAnimation: AnimationDefinition = {
  slug: "liquid-ribbon-micro",
  title: "Liquid Ribbon Micro",
  preview: LiquidRibbonMicroPreview,
  frameworks: ["GSAP"],
  createdAt: "2024-09-23",
  accent: "#6366f1",
  sourceFiles: [
    {
      label: "LiquidRibbonMicroPreview.tsx",
      path: "src/animations/liquid-ribbon/micro/LiquidRibbonMicroPreview.tsx",
      language: "tsx",
    },
  ],
  parentSlug: "liquid-ribbon",
};

