import type { AnimationDefinition } from "./types";
import { liquidRibbonAnimation } from "./liquid-ribbon";
import { liquidRibbonAuroraAnimation } from "./liquid-ribbon/aurora";
import { liquidRibbonSunsetAnimation } from "./liquid-ribbon/sunset";
import { liquidRibbonMicroAnimation } from "./liquid-ribbon/micro";
import { pulseGridAnimation } from "./pulse-grid";
import { stellarOrbitsAnimation } from "./stellar-orbits";

// 追加順は関係なく、createdAtで新しいものが先頭になるようソートしている。
// 派生（parentSlugあり）も含めてここに登録することで、詳細ページ側で親子関係を検索可能にしている。
export const animations: AnimationDefinition[] = [
  pulseGridAnimation,
  liquidRibbonAnimation,
  liquidRibbonAuroraAnimation,
  liquidRibbonSunsetAnimation,
  liquidRibbonMicroAnimation,
  stellarOrbitsAnimation,
].sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));

// slugベースでアニメーションを検索するヘルパー。派生も同じ配列から取得するため一元管理。
export function getAnimationBySlug(slug: string) {
  return animations.find((animation) => animation.slug === slug);
}
