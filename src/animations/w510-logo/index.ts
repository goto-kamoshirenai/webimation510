import type { AnimationDefinition } from "../types";
import { W510LogoPreview } from "./W510LogoPreview";

export const w510LogoAnimation: AnimationDefinition = {
  slug: "w510-logo",
  title: "w510 Line Sign",
  preview: W510LogoPreview,
  frameworks: ["GSAP"],
  createdAt: "2024-09-28",
  accent: "#38bdf8",
  sourceFiles: [
    {
      label: "W510LogoPreview.tsx",
      path: "src/animations/w510-logo/W510LogoPreview.tsx",
      language: "tsx",
    },
  ],
};
