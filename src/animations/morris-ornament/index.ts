import type { AnimationDefinition } from "../types";
import { MorrisOrnamentPreview } from "./MorrisOrnamentPreview";

export const morrisOrnamentAnimation: AnimationDefinition = {
  slug: "morris-ornament",
  title: "Morris Ornament Lines",
  preview: MorrisOrnamentPreview,
  frameworks: ["GSAP"],
  createdAt: "2024-10-17",
  accent: "#3d4f2a",
  sourceFiles: [
    {
      label: "MorrisOrnamentPreview.tsx",
      path: "src/animations/morris-ornament/MorrisOrnamentPreview.tsx",
      language: "tsx",
    },
    {
      label: "morris.svg",
      path: "public/morris.svg",
      language: "svg",
    },
  ],
};
