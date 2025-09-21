"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import type { AnimationPreviewProps } from "../../types";

const VARIANT_HEIGHT: Record<NonNullable<AnimationPreviewProps["variant"]>, string> = {
  thumbnail: "h-44",
  modal: "h-80",
  detail: "h-[28rem]",
};

const RIBBON_CONFIG = [
  {
    gradient: "from-amber-300/90 via-orange-400/70 to-red-500/20",
    blur: "blur-[1px]",
    offsetY: "top-1/2",
    duration: 5.5,
  },
  {
    gradient: "from-red-400/80 via-rose-400/70 to-transparent",
    blur: "blur-none",
    offsetY: "top-[38%]",
    duration: 6.2,
  },
  {
    gradient: "from-orange-200/65 via-amber-300/55 to-transparent",
    blur: "blur-[2px]",
    offsetY: "top-[65%]",
    duration: 7.1,
  },
];

export function LiquidRibbonSunsetPreview({
  className = "",
  variant = "thumbnail",
}: AnimationPreviewProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;

    const ribbons = Array.from(element.querySelectorAll<HTMLElement>("[data-ribbon]"));

    const timelines = ribbons.map((ribbon, index) =>
      gsap.to(ribbon, {
        xPercent: index % 2 === 0 ? 22 : -26,
        yPercent: index % 2 === 0 ? -14 : 16,
        rotate: index % 2 === 0 ? 6 : -10,
        duration: (RIBBON_CONFIG[index]?.duration ?? 6) + index * 0.6,
        repeat: -1,
        ease: "sine.inOut",
        yoyo: true,
      }),
    );

    const glow = gsap.to(element, {
      "--glow": 0.7,
      duration: 5,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    return () => {
      timelines.forEach((timeline) => timeline.kill());
      glow.kill();
    };
  }, []);

  const heightClass = VARIANT_HEIGHT[variant];

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden rounded-3xl border border-white/10 bg-[#2a1c1b] ${heightClass} ${className}`}
      style={{
        background:
          "radial-gradient(circle at 50% 0%, rgba(234,88,12,0.4), transparent 60%), radial-gradient(circle at 10% 70%, rgba(249,115,22,0.25), transparent 55%)",
        boxShadow: "0 30px 90px rgba(127,29,29,0.55)",
      }}
    >
      <div className="absolute inset-0" style={{ mixBlendMode: "screen", opacity: 0.7 }}>
        <div
          className="absolute inset-0 blur-[140px] opacity-[var(--glow,0.4)]"
          style={{
            background:
              "radial-gradient(circle at 40% 35%, rgba(248,113,113,0.35), transparent 60%), radial-gradient(circle at 70% 65%, rgba(251,191,36,0.35), transparent 55%)",
          }}
        />
      </div>
      <div className="relative flex h-full items-center justify-center">
        <div className="relative h-[140%] w-[140%]">
          {RIBBON_CONFIG.map((config, index) => (
            <div
              key={index}
              data-ribbon
              className={`absolute left-1/2 ${config.offsetY} h-1/3 w-[145%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r ${config.gradient} ${config.blur}`}
            />
          ))}
        </div>
      </div>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/60 via-transparent" />
    </div>
  );
}
