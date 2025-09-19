import type { AnimationDefinition } from "./types";
import { liquidRibbonAnimation } from "./liquid-ribbon";
import { pulseGridAnimation } from "./pulse-grid";
import { stellarOrbitsAnimation } from "./stellar-orbits";

export const animations: AnimationDefinition[] = [
  pulseGridAnimation,
  liquidRibbonAnimation,
  stellarOrbitsAnimation,
].sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));

export function getAnimationBySlug(slug: string) {
  return animations.find((animation) => animation.slug === slug);
}
