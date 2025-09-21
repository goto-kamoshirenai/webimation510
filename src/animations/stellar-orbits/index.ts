import type { AnimationDefinition } from "../types";
import { StellarOrbitsPreview } from "./StellarOrbitsPreview";

export const stellarOrbitsAnimation: AnimationDefinition = {
  slug: "stellar-orbits",
  title: "Stellar Orbits",
  preview: StellarOrbitsPreview,
  frameworks: ["WebGL", "Three.js"],
  createdAt: "2024-09-18",
  accent: "#a855f7",
  sourceFiles: [
    {
      label: "StellarOrbitsPreview.tsx",
      path: "src/animations/stellar-orbits/StellarOrbitsPreview.tsx",
      language: "tsx",
    },
  ],
  // Three.js 系のサンプルなので parentSlug は持たない。派生を作る場合は別 slug を用意して parentSlug をこの値に設定。
};
