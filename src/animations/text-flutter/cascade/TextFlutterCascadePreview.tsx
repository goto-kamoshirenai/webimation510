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

// Cascade は単語単位で階段状に落とす演出。SplitType で words を使い、個別にディレイを付与。
export function TextFlutterCascadePreview({
  className = "",
  variant = "thumbnail",
}: AnimationPreviewProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;

    const target = element.querySelector("[data-text]") as HTMLElement;
    const split = new SplitType(target, { types: "words" });

    const wave = gsap.fromTo(
      split.words,
      {
        y: 40,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 1.4,
        ease: "power2.out",
        repeat: -1,
        repeatDelay: 0.8,
        stagger: 0.2, // 値を小さくすると階段が急になる。0.4以上だと間延びする。
      },
    );

    const underline = gsap.to(element.querySelector("[data-accent]") as HTMLElement, {
      scaleX: 1,
      duration: 1.2,
      repeat: -1,
      repeatDelay: 1,
      ease: "power1.inOut",
      yoyo: true,
    });

    return () => {
      wave.kill();
      underline.kill();
      split.revert();
    };
  }, []);

  const heightClass = VARIANT_HEIGHT[variant];

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden rounded-3xl border border-white/10 bg-slate-950/85 p-6 text-white shadow-[0_30px_70px_rgba(24,24,27,0.55)] ${heightClass} ${className}`}
    >
      <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-slate-900 via-slate-900/0 to-transparent" />
      <div className="relative flex h-full flex-col justify-center gap-5">
        <h3
          data-text
          className="text-balance text-3xl font-semibold leading-tight tracking-tight sm:text-4xl"
        >
          words tumble forward with a cascading spark
        </h3>
        <div className="relative h-px w-full overflow-hidden rounded-full bg-white/10">
          <span
            data-accent
            className="absolute left-0 top-0 h-full origin-left scale-x-0 bg-gradient-to-r from-sky-400 via-cyan-400 to-emerald-400"
          />
        </div>
        <p className="max-w-xl text-sm text-slate-300">
          単語ごとに微妙な遅延を付けるだけで、静的な文章にも序列とリズムが生まれる。値を変えて階段を細かくしたり、大胆に崩すことも可能。
        </p>
      </div>
    </div>
  );
}
