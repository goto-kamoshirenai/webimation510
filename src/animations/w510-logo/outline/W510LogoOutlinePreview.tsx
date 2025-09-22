"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import type { AnimationPreviewProps } from "../../types";

const VARIANT_HEIGHT: Record<NonNullable<AnimationPreviewProps["variant"]>, string> = {
  thumbnail: "h-48",
  modal: "h-96",
  detail: "h-[28rem]",
};

// アウトライン版。線を二重にして内側だけ動かすことでドラフティング風の表現を作る。
export function W510LogoOutlinePreview({ className = "", variant = "thumbnail" }: AnimationPreviewProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const outer = Array.from(container.querySelectorAll<SVGPathElement>("[data-outer]") ?? []);
    const inner = Array.from(container.querySelectorAll<SVGPathElement>("[data-inner]") ?? []);

    // dash で線を表現。length に応じて dash 範囲を設定。
    outer.concat(inner).forEach((path) => {
      const length = path.getTotalLength();
      gsap.set(path, {
        strokeDasharray: length,
        strokeDashoffset: length,
      });
    });

    const drawOuter = gsap.to(outer, {
      strokeDashoffset: 0,
      duration: 1.4,
      ease: "power2.out",
      stagger: 0.1,
    });

    const dashLoop = gsap.to(inner, {
      strokeDashoffset: (i) => inner[i].getTotalLength(),
      duration: 2.4,
      ease: "none",
      repeat: -1,
    });

    return () => {
      drawOuter.kill();
      dashLoop.kill();
      outer.concat(inner).forEach((path) => gsap.set(path, { strokeDashoffset: 0 }));
    };
  }, []);

  const heightClass = VARIANT_HEIGHT[variant];

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden rounded-3xl border border-white/10 bg-slate-950/95 p-6 ${heightClass} ${className}`}
    >
      <div className="relative flex h-full items-center justify-center">
        <svg
          className="h-full w-auto"
          viewBox="0 0 167 78"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g strokeLinecap="round" strokeLinejoin="round">
            {/* 外側の線：落ち着いた色で固定描画 */}
            <path
              data-outer
              stroke="#e5e7eb"
              strokeWidth={2}
              d="M143.5 75C137.667 74 126 65.2 126 38C126 10.8 138.667 4 145 4C151.167 4.16667 163.5 11.2 163.5 38C163.5 64.8 151.833 73.8333 146 75"
            />
            <path
              data-outer
              stroke="#e5e7eb"
              strokeWidth={2}
              d="M96 3H93L91 5H74L68.5 33.5C75.6667 34 89.8 38.8 89 54C88.2 69.2 80 72.6667 76 72.5C74 72.5 71 71 68.5 66C66.5 62 61.5 65.5 63 68.5C64.5 71.5 69.5 75 75.5 75C81.5 75 95 70 96 54C96.8 41.2 90.5 30 73 27.5L76.5 10.5H93.5L96 4"
            />
            <path data-outer stroke="#e5e7eb" strokeWidth={2} d="M107 8.5H99.5V6.5L114 3V71.5H121V74H100V71.5H108V8.5" />
            <path
              data-outer
              stroke="#e5e7eb"
              strokeWidth={2}
              d="M144 72C140.167 72 132.6 65.2 133 38C133.4 10.8 141 6.5 144.5 6.5C149 6.5 157.4 12 157 38C156.592 64.5 150.5 72 146 72"
            />
            <path
              data-outer
              stroke="#e5e7eb"
              strokeWidth={2}
              d="M4 25V27H8L23 75L34 41L44 75L59.5 27H63V25H49V27H56L46 61L37.5 27H44V25H27V27H34L25 61L14.5 27H21V25H4.5"
            />
            {/* 内側の線：ティールの破線が常に巡回する。 */}
            <path
              data-inner
              stroke="#22d3ee"
              strokeWidth={1.2}
              d="M143.5 75C137.667 74 126 65.2 126 38C126 10.8 138.667 4 145 4C151.167 4.16667 163.5 11.2 163.5 38C163.5 64.8 151.833 73.8333 146 75"
            />
            <path
              data-inner
              stroke="#22d3ee"
              strokeWidth={1.2}
              d="M96 3H93L91 5H74L68.5 33.5C75.6667 34 89.8 38.8 89 54C88.2 69.2 80 72.6667 76 72.5C74 72.5 71 71 68.5 66C66.5 62 61.5 65.5 63 68.5C64.5 71.5 69.5 75 75.5 75C81.5 75 95 70 96 54C96.8 41.2 90.5 30 73 27.5L76.5 10.5H93.5L96 4"
            />
            <path data-inner stroke="#22d3ee" strokeWidth={1.2} d="M107 8.5H99.5V6.5L114 3V71.5H121V74H100V71.5H108V8.5" />
            <path
              data-inner
              stroke="#22d3ee"
              strokeWidth={1.2}
              d="M144 72C140.167 72 132.6 65.2 133 38C133.4 10.8 141 6.5 144.5 6.5C149 6.5 157.4 12 157 38C156.592 64.5 150.5 72 146 72"
            />
            <path
              data-inner
              stroke="#22d3ee"
              strokeWidth={1.2}
              d="M4 25V27H8L23 75L34 41L44 75L59.5 27H63V25H49V27H56L46 61L37.5 27H44V25H27V27H34L25 61L14.5 27H21V25H4.5"
            />
          </g>
        </svg>
      </div>
    </div>
  );
}
