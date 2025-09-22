import type { AnimationDefinition } from "../../types";
import { W510LogoOutlinePreview } from "./W510LogoOutlinePreview";

export const w510LogoOutlineAnimation: AnimationDefinition = {
  slug: "w510-logo-outline",
  title: "w510 Draft Outline",
  preview: W510LogoOutlinePreview,
  frameworks: ["GSAP"],
  createdAt: "2024-09-29",
  accent: "#f8fafc",
  sourceFiles: [
    {
      label: "W510LogoOutlinePreview.tsx",
      path: "src/animations/w510-logo/outline/W510LogoOutlinePreview.tsx",
      language: "tsx",
    },
  ],
  parentSlug: "w510-logo",
};
