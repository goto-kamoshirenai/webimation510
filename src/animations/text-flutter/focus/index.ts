import type { AnimationDefinition } from "../../types";
import { TextFlutterFocusPreview } from "./TextFlutterFocusPreview";

export const textFlutterFocusAnimation: AnimationDefinition = {
  slug: "text-flutter-focus",
  title: "Text Flutter Focus",
  preview: TextFlutterFocusPreview,
  frameworks: ["GSAP"],
  createdAt: "2024-09-27",
  accent: "#fbbf24",
  sourceFiles: [
    {
      label: "TextFlutterFocusPreview.tsx",
      path: "src/animations/text-flutter/focus/TextFlutterFocusPreview.tsx",
      language: "tsx",
    },
  ],
  parentSlug: "text-flutter",
};
