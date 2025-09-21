"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import type { AnimationPreviewProps } from "../../types";

// オーロラを意識した寒色系とライトトレイル
const VARIANT_HEIGHT: Record<NonNullable<AnimationPreviewProps["variant"]>, string> = {
  thumbnail: "h-44",
  modal: "h-80",
  detail: "h-[28rem]",
};

const RIBBON_CONFIG = [
  {
    gradient: "from-emerald-300/70 via-sky-400/80 to-blue-900/0",
    blur: "blur-[3px]",
    offsetY: "top-1/2",
    duration: 7.5,
  },
  {
    gradient: "from-cyan-200/80 via-green-300/60 to-transparent",
    blur: "blur-[1px]",
    offsetY: "top-[40%]",
    duration: 5.8,
  },
  {
    gradient: "from-indigo-400/70 via-violet-500/60 to-transparent",
    blur: "blur-[2px]",
    offsetY: "top-[63%]",
    duration: 6.6,
  },
];

export function LiquidRibbonAuroraPreview({
  className = "",
  variant = "thumbnail",
}: AnimationPreviewProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;

    const ribbons = Array.from(element.querySelectorAll<HTMLElement>("[data-ribbon]"));

    const animations = ribbons.map((ribbon, index) =>
      gsap.to(ribbon, {
        xPercent: index % 2 === 0 ? 24 : -28,
        yPercent: index % 2 === 0 ? -18 : 18,
        rotate: index % 2 === 0 ? 10 : -14,
        duration: (RIBBON_CONFIG[index]?.duration ?? 6) + index * 0.8,
        repeat: -1,
        ease: "sine.inOut",
        yoyo: true,
      }),
    );

    const aura = gsap.to(element, {
      "--glow": 0.95,
      duration: 7,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    return () => {
      animations.forEach((animation) => animation.kill());
      aura.kill();
    };
  }, []);

  const heightClass = VARIANT_HEIGHT[variant];

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden rounded-3xl border border-white/10 bg-slate-950/80 ${heightClass} ${className}`}
      style={{
        background:
          "radial-gradient(circle at 20% 20%, rgba(56,189,248,0.28), transparent 60%), radial-gradient(circle at 80% 0%, rgba(16,185,129,0.18), transparent 55%)",
        boxShadow: "0 30px 80px rgba(12,74,110,0.55)",
      }}
    >
      <div className="absolute inset-0" style={{ mixBlendMode: "screen", opacity: 0.85 }}>
        <div
          className="absolute inset-0 blur-[120px] opacity-[var(--glow,0.6)]"
          style={{
            background:
              "radial-gradient(circle at 40% 30%, rgba(56,189,248,0.45), transparent 60%), radial-gradient(circle at 60% 70%, rgba(16,185,129,0.35), transparent 55%)",
          }}
        />
      </div>
      <div className="relative flex h-full items-center justify-center">
        <div className="relative h-[140%] w-[140%]">
          {RIBBON_CONFIG.map((config, index) => (
            <div
              key={index}
              data-ribbon
              className={`absolute left-1/2 ${config.offsetY} h-1/3 w-[150%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r ${config.gradient} ${config.blur}`}
            />
          ))}
        </div>
      </div>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-slate-950 via-transparent" />
    </div>
  );
}

