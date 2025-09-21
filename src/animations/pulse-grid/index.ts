import type { AnimationDefinition } from "../types";
import { PulseGridPreview } from "./PulseGridPreview";

export const pulseGridAnimation: AnimationDefinition = {
  slug: "pulse-grid",
  title: "Pulse Grid",
  preview: PulseGridPreview,
  frameworks: ["GSAP"],
  createdAt: "2024-09-10",
  accent: "#38bdf8",
  sourceFiles: [
    {
      label: "PulseGridPreview.tsx",
      path: "src/animations/pulse-grid/PulseGridPreview.tsx",
      language: "tsx",
    },
  ],
  // このアニメーションは親として扱うため parentSlug は設定しない。
};
