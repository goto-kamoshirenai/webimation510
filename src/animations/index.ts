import type { AnimationDefinition } from "./types";
import { liquidRibbonAnimation } from "./liquid-ribbon";
import { liquidRibbonAuroraAnimation } from "./liquid-ribbon/aurora";
import { liquidRibbonSunsetAnimation } from "./liquid-ribbon/sunset";
import { liquidRibbonMicroAnimation } from "./liquid-ribbon/micro";
import { morrisOrnamentAnimation } from "./morris-ornament";
import { pulseGridAnimation } from "./pulse-grid";
import { stellarOrbitsAnimation } from "./stellar-orbits";
import { textFlutterAnimation } from "./text-flutter";
import { textFlutterCascadeAnimation } from "./text-flutter/cascade";
import { textFlutterFocusAnimation } from "./text-flutter/focus";
import { textFlutterNeonAnimation } from "./text-flutter/neon";
import { w510LogoAnimation } from "./w510-logo";
import { w510LogoNeonAnimation } from "./w510-logo/neon";
import { w510LogoOutlineAnimation } from "./w510-logo/outline";
import { w510LogoParticleAnimation } from "./w510-logo/particle";

// エントリの追加順は任意。createdAt の値で降順ソートし、最新アニメーションが先頭に来るようにしている。
// parentSlug を持つ派生アニメーションも同じ配列に登録し、詳細ページ側で親子関係を解決できるようにする。
export const animations: AnimationDefinition[] = [
  pulseGridAnimation,
  liquidRibbonAnimation,
  liquidRibbonAuroraAnimation,
  liquidRibbonSunsetAnimation,
  liquidRibbonMicroAnimation,
  morrisOrnamentAnimation,
  stellarOrbitsAnimation,
  textFlutterAnimation,
  textFlutterNeonAnimation,
  textFlutterCascadeAnimation,
  textFlutterFocusAnimation,
  w510LogoAnimation,
  w510LogoNeonAnimation,
  w510LogoOutlineAnimation,
  w510LogoParticleAnimation,
].sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));

// slug でアニメーションを検索するヘルパー。派生／親を問わず同じ場所から取得できるように一元化している。
export function getAnimationBySlug(slug: string) {
  return animations.find((animation) => animation.slug === slug);
}
