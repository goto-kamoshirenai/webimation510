"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import type { AnimationPreviewProps } from "../types";

// variantごとに高さを切り替えるクラス。
// `detail` は最も縦が必要なので 28rem に設定しているが、これ以上大きくすると Three.js 系とバランスが崩れる可能性がある。
const VARIANT_HEIGHT: Record<NonNullable<AnimationPreviewProps["variant"]>, string> = {
  thumbnail: "h-44",
  modal: "h-80",
  detail: "h-[28rem]",
};

export function LiquidRibbonPreview({ className = "", variant = "thumbnail" }: AnimationPreviewProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;

    // data-ribbon属性を持つエレメントをすべて取得。派生では色数を増やしたい場合ここに配列を追加する。
    const ribbons = Array.from(element.querySelectorAll<HTMLElement>("[data-ribbon]"));

    // 各リボンの流体的なズレをGSAPで生成。
    // xPercent/yPercent/rotateを大きくしすぎると枠の外に出てしまうので、±40程度に収めると扱いやすい。
    const animations = ribbons.map((ribbon, index) =>
      gsap.to(ribbon, {
        xPercent: index % 2 === 0 ? 28 : -32,
        yPercent: index % 2 === 0 ? -16 : 22,
        rotate: index % 2 === 0 ? 8 : -12,
        duration: 6 + index * 1.2, // indexを増やすと遅延が大きくなる。派生で波長を短くしたい場合は係数を小さくするとよい。
        repeat: -1,
        ease: "sine.inOut",
        yoyo: true,
      }),
    );

    // CSSカスタムプロパティ `--glow` を揺らしてグロウの強さを制御。
    // 1.0以上にすると背景のブラーが強くなりすぎ、白飛びすることがある。
    const glow = gsap.to(element, {
      "--glow": 0.85,
      duration: 6,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    return () => {
      animations.forEach((animation) => animation.kill());
      glow.kill();
    };
  }, []);

  const accentClass = VARIANT_HEIGHT[variant];

  return (
    <div
      ref={containerRef}
      className={`group relative overflow-hidden rounded-3xl border border-white/10 bg-slate-950/80 transition duration-500 ${accentClass} ${className}`}
      style={{
        // ライトな青のグラデーションで背景を構成。角度や色を変えるだけで派生の雰囲気を簡単に変えられる。
        background:
          "linear-gradient(160deg, rgba(15,23,42,0.95) 12%, rgba(30,58,138,0.88) 85%)",
        boxShadow: "0 25px 90px rgba(15,23,42,0.55)",
        filter: "drop-shadow(0 25px 55px rgba(30, 64, 175, 0.45))",
      }}
    >
      {/* 背景のぼかし光。色や位置を変えるだけで空気感を演出できるが、opacityを上げすぎるとバンドが目立つので注意。 */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(96,165,250,0.25),transparent_65%)]" />
      <div className="absolute inset-0" style={{ mixBlendMode: "screen", opacity: 0.85 }}>
        <div
          className="absolute inset-0 blur-[120px] opacity-[var(--glow,0.6)]"
          style={{
            background:
              "radial-gradient(circle at 50% 30%, rgba(56, 189, 248, 0.45), transparent 50%), radial-gradient(circle at 30% 70%, rgba(129, 140, 248, 0.35), transparent 55%)",
          }}
        />
      </div>
      <div className="relative flex h-full items-center justify-center">
        <div className="relative h-[140%] w-[140%] scale-110">
          {/* data-ribbon エレメント。色や位置を差し替えることで派生バリエーションを量産できる。 */}
          <div
            data-ribbon
            className="absolute left-1/2 top-1/2 h-1/3 w-[140%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-cyan-400/80 via-sky-500/70 to-blue-900/0 blur-[2px]"
          />
          <div
            data-ribbon
            className="absolute left-1/2 top-[38%] h-1/3 w-[150%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-rose-400/70 via-fuchsia-500/60 to-indigo-900/0 opacity-90 blur-none"
          />
          <div
            data-ribbon
            className="absolute left-1/2 top-[62%] h-1/3 w-[145%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-amber-400/80 via-rose-500/70 to-purple-900/0 blur-[1px]"
          />
        </div>
      </div>
      {/* 下部のベタ塗りで画面の切れ端を整える。高さを上げると奥行きが強調されるが、情報量が減るのでバランスを見て調整する。 */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-slate-950 via-transparent" />
    </div>
  );
}
