"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import type { AnimationPreviewProps } from "../types";

// w510 ロゴを線画で描画するアニメーション。variant によって縦幅を切り替える。
// detail を大きくし過ぎると線の太さが相対的に細く見えるので、30rem以内に留めるのが目安。
const VARIANT_HEIGHT: Record<NonNullable<AnimationPreviewProps["variant"]>, string> = {
  thumbnail: "h-48",
  modal: "h-96",
  detail: "h-[28rem]",
};

export function W510LogoPreview({ className = "", variant = "thumbnail" }: AnimationPreviewProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const paths = Array.from(container.querySelectorAll<SVGPathElement>("[data-stroke]") ?? []);

    // 各パスの長さを取得して strokeDash を設定。DrawSVGPlugin を使わずに線描写を実現する。
    paths.forEach((path) => {
      const length = path.getTotalLength();
      gsap.set(path, {
        strokeDasharray: length,
        strokeDashoffset: length,
      });
    });

    // ロゴ全体の浮遊感。scale を大きくし過ぎると輪郭がぼやけるので ±2% 程度に抑える。
    const breathe = gsap.to(container.querySelector("[data-logo]") as SVGSVGElement, {
      scale: 1.03,
      duration: 4,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      transformOrigin: "50% 50%",
    });

    const timeline = gsap.timeline({
      repeat: -1,
      repeatDelay: 1.4,
      defaults: {
        ease: "power2.out",
      },
    });

    // 順番に線を描画し、最後にハイライトを入れる。stagger の値を調整すると描画スピードが変わる。
    paths.forEach((path, index) => {
      const length = path.getTotalLength();
      timeline.to(
        path,
        {
          strokeDashoffset: 0,
          duration: 1.1,
        },
        index * 0.2,
      );
      timeline.to(
        path,
        {
          strokeDashoffset: -length * 0.1,
          duration: 0.6,
        },
        index * 0.2 + 1.1,
      );
    });

    timeline.to(
      container.querySelector("[data-glow]") as HTMLElement,
      {
        opacity: 0.75,
        duration: 0.8,
        ease: "sine.inOut",
        yoyo: true,
        repeat: 1,
      },
      paths.length * 0.2,
    );

    return () => {
      breathe.kill();
      timeline.kill();
      paths.forEach((path) => gsap.set(path, { strokeDashoffset: 0 }));
    };
  }, []);

  const heightClass = VARIANT_HEIGHT[variant];

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-6 ${heightClass} ${className}`}
    >
      <div
        data-glow
        className="pointer-events-none absolute inset-0 opacity-0"
        style={{
          background:
            "radial-gradient(circle at 30% 30%, rgba(56,189,248,0.25), transparent 55%), radial-gradient(circle at 70% 70%, rgba(250,204,21,0.2), transparent 55%)",
          filter: "blur(60px)",
        }}
      />
      <div className="relative flex h-full items-center justify-center">
        <svg
          data-logo
          className="h-full w-auto stroke-[2]"
          viewBox="0 0 167 78"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* stroke色はCSSで上書きできる。派生バリエーションで別色を使う場合はクラスを追加する。 */}
          <g stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
            <path
              data-stroke
              d="M143.5 75C137.667 74 126 65.2 126 38C126 10.8 138.667 4 145 4C151.167 4.16667 163.5 11.2 163.5 38C163.5 64.8 151.833 73.8333 146 75"
            />
            <path
              data-stroke
              d="M96 3H93L91 5H74L68.5 33.5C75.6667 34 89.8 38.8 89 54C88.2 69.2 80 72.6667 76 72.5C74 72.5 71 71 68.5 66C66.5 62 61.5 65.5 63 68.5C64.5 71.5 69.5 75 75.5 75C81.5 75 95 70 96 54C96.8 41.2 90.5 30 73 27.5L76.5 10.5H93.5L96 4"
            />
            <path data-stroke d="M107 8.5H99.5V6.5L114 3V71.5H121V74H100V71.5H108V8.5" />
            <path
              data-stroke
              d="M144 72C140.167 72 132.6 65.2 133 38C133.4 10.8 141 6.5 144.5 6.5C149 6.5 157.4 12 157 38C156.592 64.5 150.5 72 146 72"
            />
            <path
              data-stroke
              d="M4 25V27H8L23 75L34 41L44 75L59.5 27H63V25H49V27H56L46 61L37.5 27H44V25H27V27H34L25 61L14.5 27H21V25H4.5"
            />
          </g>
        </svg>
      </div>
    </div>
  );
}
