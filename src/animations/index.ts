import type { AnimationDefinition } from "./types";
import { liquidRibbonAnimation } from "./liquid-ribbon";
import { liquidRibbonAuroraAnimation } from "./liquid-ribbon/aurora";
import { liquidRibbonSunsetAnimation } from "./liquid-ribbon/sunset";
import { liquidRibbonMicroAnimation } from "./liquid-ribbon/micro";
import { pulseGridAnimation } from "./pulse-grid";
import { stellarOrbitsAnimation } from "./stellar-orbits";

export const animations: AnimationDefinition[] = [
  pulseGridAnimation,
  liquidRibbonAnimation,
  liquidRibbonAuroraAnimation,
  liquidRibbonSunsetAnimation,
  liquidRibbonMicroAnimation,
  stellarOrbitsAnimation,
].sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));

export function getAnimationBySlug(slug: string) {
  return animations.find((animation) => animation.slug === slug);
}

