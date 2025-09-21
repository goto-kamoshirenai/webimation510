import type { AnimationDefinition } from "../../types";
import { TextFlutterCascadePreview } from "./TextFlutterCascadePreview";

export const textFlutterCascadeAnimation: AnimationDefinition = {
  slug: "text-flutter-cascade",
  title: "Text Flutter Cascade",
  preview: TextFlutterCascadePreview,
  frameworks: ["GSAP"],
  createdAt: "2024-09-26",
  accent: "#38bdf8",
  sourceFiles: [
    {
      label: "TextFlutterCascadePreview.tsx",
      path: "src/animations/text-flutter/cascade/TextFlutterCascadePreview.tsx",
      language: "tsx",
    },
  ],
  parentSlug: "text-flutter",
};
