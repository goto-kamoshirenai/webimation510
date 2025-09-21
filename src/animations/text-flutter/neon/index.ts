import type { AnimationDefinition } from "../../types";
import { TextFlutterNeonPreview } from "./TextFlutterNeonPreview";

export const textFlutterNeonAnimation: AnimationDefinition = {
  slug: "text-flutter-neon",
  title: "Text Flutter Neon",
  preview: TextFlutterNeonPreview,
  frameworks: ["GSAP"],
  createdAt: "2024-09-25",
  accent: "#36c2f6",
  sourceFiles: [
    {
      label: "TextFlutterNeonPreview.tsx",
      path: "src/animations/text-flutter/neon/TextFlutterNeonPreview.tsx",
      language: "tsx",
    },
  ],
  parentSlug: "text-flutter",
};
