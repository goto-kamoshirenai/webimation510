"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import SplitType from "split-type";
import type { AnimationPreviewProps } from "../../types";

const VARIANT_HEIGHT: Record<NonNullable<AnimationPreviewProps["variant"]>, string> = {
  thumbnail: "h-44",
  modal: "h-80",
  detail: "h-[26rem]",
};

// ネオン風に発光させる派生。colors/pulse系を強めにするとサイバーパンクな雰囲気に寄せられる。
export function TextFlutterNeonPreview({
  className = "",
  variant = "thumbnail",
}: AnimationPreviewProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;

    const target = element.querySelector("[data-text]") as HTMLElement;
    const split = new SplitType(target, { types: "chars" });

    // ネオンの点滅。opacityを0.2以下まで落とすと文字が消えたように見えるので注意。
    const glow = gsap.to(split.chars, {
      opacity: () => gsap.utils.random(0.6, 1),
      textShadow: () =>
        `0 0 12px rgba(59,130,246,0.8), 0 0 24px rgba(139,92,246,0.7)`,
      duration: () => gsap.utils.random(0.8, 1.4),
      stagger: {
        amount: 1.2,
        from: "random",
      },
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    // 背景のグリッド光。--neon-shift を変化させている。
    const shift = gsap.to(element, {
      "--neon-shift": 0.9,
      duration: 4,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    return () => {
      glow.kill();
      shift.kill();
      split.revert();
    };
  }, []);

  const heightClass = VARIANT_HEIGHT[variant];

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden rounded-3xl border border-cyan-400/40 bg-slate-950/90 p-6 text-white shadow-[0_35px_90px_rgba(8,47,73,0.6)] ${heightClass} ${className}`}
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, rgba(14,165,233,0.25), rgba(129,140,248,0.25))",
          mixBlendMode: "screen",
          opacity: "var(--neon-shift,0.6)",
          filter: "blur(45px)",
        }}
      />
      <div className="relative flex h-full flex-col items-center justify-center gap-4 text-center">
        <p
          data-text
          className="font-semibold uppercase tracking-[0.8em] text-xs text-cyan-200 drop-shadow-[0_0_6px_rgba(34,211,238,0.6)]"
        >
          neon pulse
        </p>
        <h2 className="text-3xl font-semibold leading-tight sm:text-4xl">
          <span className="block">glow the letters</span>
          <span className="mt-3 block text-base font-light text-cyan-100/80">
            文字を細かく分割して僅かな点滅を与えるだけで暗闇に揺れるサインの印象を作れる。
          </span>
        </h2>
      </div>
    </div>
  );
}
