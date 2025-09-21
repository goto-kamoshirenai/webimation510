"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import SplitType from "split-type";
import type { AnimationPreviewProps } from "../../types";

const VARIANT_HEIGHT: Record<NonNullable<AnimationPreviewProps["variant"]>, string> = {
  thumbnail: "h-44",
  modal: "h-80",
  detail: "h-[24rem]",
};

// 焦点を当てるように一文字ずつ光を当てていくアニメーション。
export function TextFlutterFocusPreview({ className = "", variant = "thumbnail" }: AnimationPreviewProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;

    const target = element.querySelector("[data-text]") as HTMLElement;
    const split = new SplitType(target, { types: "chars" });

    const spotlight = gsap.to(split.chars, {
      color: "#f9fafb",
      textShadow: "0 0 20px rgba(250,250,250,0.9)",
      duration: 0.6,
      stagger: {
        each: 0.08,
        repeat: -1,
        repeatDelay: 0.6,
        yoyo: true,
      },
      ease: "sine.inOut",
    });

    const linePulse = gsap.to(element.querySelector("[data-line]") as HTMLElement, {
      scaleX: 1.05,
      duration: 1.4,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
    });

    return () => {
      spotlight.kill();
      linePulse.kill();
      split.revert();
    };
  }, []);

  const heightClass = VARIANT_HEIGHT[variant];

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900 via-slate-950 to-black p-8 text-white shadow-[0_25px_70px_rgba(15,15,30,0.55)] ${heightClass} ${className}`}
    >
      <div className="relative flex h-full flex-col items-center justify-center gap-6 text-center">
        <h2
          data-text
          className="text-3xl font-semibold leading-tight tracking-wide sm:text-4xl"
        >
          focus on every single letter
        </h2>
        <div className="relative h-1 w-48 overflow-hidden rounded-full bg-white/10">
          <span
            data-line
            className="absolute inset-y-0 left-0 w-full origin-center scale-x-0 bg-gradient-to-r from-white via-slate-200 to-white"
          />
        </div>
        <p className="max-w-md text-sm text-slate-300">
          文字ひとつひとつにスポットライトを当てることで、読み手の視線を誘導する。staggerを調整すると光の速度が変わる。
        </p>
      </div>
    </div>
  );
}
