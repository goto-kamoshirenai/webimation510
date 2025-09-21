"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import type { AnimationPreviewProps } from "../../types";

// マイクロインタラクションを意識した短いリボン群。高さは親と同等だがcontentの密度が高い。
const VARIANT_HEIGHT: Record<NonNullable<AnimationPreviewProps["variant"]>, string> = {
  thumbnail: "h-44",
  modal: "h-80",
  detail: "h-[28rem]",
};

// 小ぶりなリボンのセット。offsetPercentとheightPercentを調整することで層を詰めたり間隔を空けたりできる。
const SMALL_RIBBON_CONFIG = [
  {
    gradient: "from-sky-300/80 via-blue-400/70 to-transparent",
    blur: "blur-[1px]",
    offsetPercent: 28,
    heightPercent: 18,
    duration: 3.6,
  },
  {
    gradient: "from-indigo-400/70 via-purple-500/60 to-transparent",
    blur: "blur-none",
    offsetPercent: 40,
    heightPercent: 15,
    duration: 4.0,
  },
  {
    gradient: "from-sky-200/70 via-cyan-300/60 to-transparent",
    blur: "blur-[1px]",
    offsetPercent: 52,
    heightPercent: 16,
    duration: 4.4,
  },
  {
    gradient: "from-violet-400/70 via-indigo-500/60 to-transparent",
    blur: "blur-none",
    offsetPercent: 64,
    heightPercent: 14,
    duration: 4.8,
  },
  {
    gradient: "from-sky-300/65 via-blue-400/55 to-transparent",
    blur: "blur-[1px]",
    offsetPercent: 76,
    heightPercent: 13,
    duration: 5.2,
  },
];

export function LiquidRibbonMicroPreview({
  className = "",
  variant = "thumbnail",
}: AnimationPreviewProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;

    const ribbons = Array.from(element.querySelectorAll<HTMLElement>("[data-ribbon]"));

    // 小さなリズムで呼吸する動き。durationを3以下にすると忙しくなり、視認性が落ちるので3.0〜6.0の間が扱いやすい。
    const tweens = ribbons.map((ribbon, index) =>
      gsap.to(ribbon, {
        xPercent: index % 2 === 0 ? 14 : -18,
        yPercent: index % 2 === 0 ? -10 : 12,
        rotate: index % 2 === 0 ? 4 : -6,
        duration: SMALL_RIBBON_CONFIG[index]?.duration ?? 4,
        repeat: -1,
        ease: "sine.inOut",
        yoyo: true,
      }),
    );

    // 光量はやや控えめに。0.6より大きくすると小さいリボンが背景に埋もれがち。
    const pulse = gsap.to(element, {
      "--glow": 0.6,
      duration: 4,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    return () => {
      tweens.forEach((tween) => tween.kill());
      pulse.kill();
    };
  }, []);

  const heightClass = VARIANT_HEIGHT[variant];

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden rounded-3xl border border-white/10 bg-slate-950/90 ${heightClass} ${className}`}
      style={{
        background:
          "radial-gradient(circle at 50% 50%, rgba(99,102,241,0.25), transparent 65%), radial-gradient(circle at 15% 20%, rgba(56,189,248,0.18), transparent 55%)",
        boxShadow: "0 25px 70px rgba(67,56,202,0.45)",
      }}
    >
      <div className="absolute inset-0" style={{ mixBlendMode: "screen", opacity: 0.75 }}>
        <div
          className="absolute inset-0 blur-[110px] opacity-[var(--glow,0.45)]"
          style={{
            background:
              "radial-gradient(circle at 30% 40%, rgba(59,130,246,0.35), transparent 60%), radial-gradient(circle at 70% 60%, rgba(129,140,248,0.35), transparent 55%)",
          }}
        />
      </div>
      <div className="relative flex h-full items-center justify-center">
        <div className="relative h-[150%] w-[150%]">
          {/* offsetPercentはtopの位置をそのまま%指定する。値が近すぎるとリボン同士が重なり、色が濁るので5%以上空けるのがおすすめ。 */}
          {SMALL_RIBBON_CONFIG.map((config, index) => (
            <div
              key={index}
              data-ribbon
              className={`absolute left-1/2 w-[130%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r ${config.gradient} ${config.blur}`}
              style={{
                top: `${config.offsetPercent}%`,
                height: `${config.heightPercent}%`,
              }}
            />
          ))}
        </div>
      </div>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-slate-950 via-transparent" />
    </div>
  );
}
