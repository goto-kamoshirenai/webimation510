import type { AnimationDefinition } from "../types";
import { TextFlutterPreview } from "./TextFlutterPreview";

export const textFlutterAnimation: AnimationDefinition = {
  slug: "text-flutter",
  title: "Text Flutter",
  preview: TextFlutterPreview,
  frameworks: ["GSAP"],
  createdAt: "2024-09-24",
  accent: "#7dd3fc",
  sourceFiles: [
    {
      label: "TextFlutterPreview.tsx",
      path: "src/animations/text-flutter/TextFlutterPreview.tsx",
      language: "tsx",
    },
  ],
};
