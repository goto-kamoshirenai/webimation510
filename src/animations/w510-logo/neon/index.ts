import type { AnimationDefinition } from "../../types";
import { W510LogoNeonPreview } from "./W510LogoNeonPreview";

export const w510LogoNeonAnimation: AnimationDefinition = {
  slug: "w510-logo-neon",
  title: "w510 Neon Pulse",
  preview: W510LogoNeonPreview,
  frameworks: ["GSAP"],
  createdAt: "2024-09-29",
  accent: "#22d3ee",
  sourceFiles: [
    {
      label: "W510LogoNeonPreview.tsx",
      path: "src/animations/w510-logo/neon/W510LogoNeonPreview.tsx",
      language: "tsx",
    },
  ],
  parentSlug: "w510-logo",
};
