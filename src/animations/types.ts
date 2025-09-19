import type { ComponentType } from "react";

export type AnimationFramework = "GSAP" | "WebGL" | "Three.js" | "Canvas" | "Shaders";

export interface AnimationPreviewProps {
  className?: string;
  variant?: "thumbnail" | "modal" | "detail";
}

export interface AnimationSourceFile {
  label: string;
  path: string; // workspace relative path for lookup
  language?: string;
}

export interface AnimationDefinition {
  slug: string;
  title: string;
  preview: ComponentType<AnimationPreviewProps>;
  frameworks: AnimationFramework[];
  createdAt: string;
  accent: string;
  sourceFiles: AnimationSourceFile[];
}
