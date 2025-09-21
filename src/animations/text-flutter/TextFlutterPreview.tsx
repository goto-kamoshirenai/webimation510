"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import SplitType from "split-type";
import type { AnimationPreviewProps } from "../types";

// バリアントに応じて高さを変更。detailを大きく取りすぎると文字列の密度が薄く見えるため、30rem以内に調整する。
const VARIANT_HEIGHT: Record<
  NonNullable<AnimationPreviewProps["variant"]>,
  string
> = {
  thumbnail: "h-44",
  modal: "h-80",
  detail: "h-[26rem]",
};

// テキストベースのアニメーション。SplitTypeで文字を分解し、GSAPで波打たせる。
export function TextFlutterPreview({
  className = "",
  variant = "thumbnail",
}: AnimationPreviewProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;

    // SplitType はクライアントサイド専用。SSRでエラーにならないよう、useEffect 内で実行する。
    const split = new SplitType(
      element.querySelector("[data-text]") as HTMLElement,
      {
        types: "words,chars",
      }
    );

    // 文字の浮遊感。y値を大きくすると上下動が激しくなるが、±60を超えると読みづらくなる。
    const flutter = gsap.to(split.chars, {
      y: () => gsap.utils.random(-30, -50),
      opacity: 1,
      rotateX: () => gsap.utils.random(-45, 45),
      duration: () => gsap.utils.random(1.6, 2.2),
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true,
      stagger: {
        amount: 1.8,
        from: "center",
      },
    });

    // 背景のグラデーション色を時間で変える。角度を変えると光の流れが変わるので、演出変更がしやすい。
    const hueShift = gsap.to(element, {
      "--twinkle": 0.7,
      duration: 6,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    return () => {
      flutter.kill();
      hueShift.kill();
      split.revert();
    };
  }, []);

  const heightClass = VARIANT_HEIGHT[variant];

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden rounded-3xl border border-white/10 bg-slate-950/80 p-6 text-white shadow-[0_25px_70px_rgba(15,23,42,0.5)] ${heightClass} ${className}`}
      style={{
        background:
          "radial-gradient(circle at 20% 20%, rgba(56,189,248,0.2), transparent 55%), radial-gradient(circle at 80% 80%, rgba(147,51,234,0.2), transparent 55%)",
      }}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[var(--twinkle,0.5)]"
        style={{
          background:
            "linear-gradient(120deg, rgba(147,51,234,0.15), rgba(59,130,246,0.15), rgba(16,185,129,0.15))",
          filter: "blur(60px)",
        }}
      />
      <div className="relative flex h-full w-full flex-col items-center justify-center gap-4 text-center">
        {/* data-text を SplitType が参照して各文字の span を生成する。文字列を変更するときは英数字だけでなく記号も可。 */}
        <p
          data-text
          className="font-semibold tracking-[1em] text-xs uppercase text-slate-300"
        >
          text-based animation
        </p>
      </div>
    </div>
  );
}
