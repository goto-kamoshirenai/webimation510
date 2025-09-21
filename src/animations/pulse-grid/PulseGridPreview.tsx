"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import type { AnimationPreviewProps } from "../types";

// 高さマップ。detailサイズを変更する場合はグリッドの行数と合わせて検討する。
const VARIANT_HEIGHT: Record<NonNullable<AnimationPreviewProps["variant"]>, string> = {
  thumbnail: "h-44",
  modal: "h-80",
  detail: "h-[28rem]",
};

// グラデーション色の候補。要素に対してCSSカスタムプロパティ `--hue` をランダム適用する。
const HUES = [210, 285, 165, 25];

export function PulseGridPreview({ className = "", variant = "thumbnail" }: AnimationPreviewProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;

    // gsap.context を使うことで、このコンポーネントがアンマウントされた際にすべてのトゥイーンがまとめて破棄される。
    const ctx = gsap.context(() => {
      // 背景全体の色相を時間とともに変更。HUES に色を追加すればパレットを簡単に拡張できる。
      gsap.to(element, {
        duration: 14,
        repeat: -1,
        ease: "none",
        "--hue": () => HUES[Math.floor(Math.random() * HUES.length)],
      });

      // グリッドセルの拡大縮小と透過。amountを増やすと波が広がる時間が長くなるが、1.6以上にすると同期が取りづらくなる。
      gsap.to("[data-cell]", {
        scale: 1.12,
        opacity: 1,
        filter: "blur(0)",
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        duration: 1.6,
        stagger: {
          amount: 1.6,
          from: "center",
          grid: "auto",
        },
      });

      // 回転アニメーション。durationを短くすると忙しい印象になり、長くすると波打つ動きが緩やかになる。
      gsap.to("[data-cell]", {
        rotate: 12,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        duration: 3.2,
        stagger: {
          amount: 2.4,
          from: "edges",
          grid: "auto",
        },
      });
    }, element);

    return () => ctx.revert();
  }, []);

  const accentClass = VARIANT_HEIGHT[variant];

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden rounded-3xl border border-white/10 bg-slate-900/60 p-4 shadow-[0_20px_45px_rgba(15,23,42,0.45)] transition will-change-transform ${accentClass} ${className}`}
      style={{
        backgroundImage:
          "radial-gradient(circle at 20% 20%, rgba(56, 189, 248, 0.18), transparent 55%), radial-gradient(circle at 80% 0%, rgba(129, 140, 248, 0.25), transparent 45%)",
      }}
    >
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-slate-900/0 via-slate-900/40 to-slate-950" />
      <div className="relative grid h-full w-full grid-cols-6 grid-rows-4 gap-3">
        {/* セル数を増やす場合は grid-cols/grid-rows と Array.from の length を揃える。 */}
        {Array.from({ length: 24 }).map((_, index) => (
          <div
            data-cell
            key={index}
            className="pulse-cell rounded-2xl border border-white/10 bg-white/5 shadow-[0_10px_25px_rgba(15,23,42,0.45)] transition"
            style={{
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
            }}
          />
        ))}
      </div>
      {/* 色相が変化するグラデーション。opacityを下げると落ち着きが出るが、0.5以下だと効果が薄くなる。 */}
      <div
        className="pointer-events-none absolute inset-0 origin-center mix-blend-screen opacity-90"
        style={{
          background:
            "conic-gradient(from 180deg at 50% 50%, rgba(56,189,248,0.18), rgba(251,191,36,0.25), rgba(244,114,182,0.18), rgba(56,189,248,0.18))",
        }}
      />
    </div>
  );
}
