import type { AnimationDefinition } from "../../types";
import { W510LogoParticlePreview } from "./W510LogoParticlePreview";

export const w510LogoParticleAnimation: AnimationDefinition = {
  slug: "w510-logo-particle",
  title: "w510 Particle Orbit",
  preview: W510LogoParticlePreview,
  frameworks: ["GSAP"],
  createdAt: "2024-09-30",
  accent: "#38bdf8",
  sourceFiles: [
    {
      label: "W510LogoParticlePreview.tsx",
      path: "src/animations/w510-logo/particle/W510LogoParticlePreview.tsx",
      language: "tsx",
    },
  ],
  parentSlug: "w510-logo",
};
