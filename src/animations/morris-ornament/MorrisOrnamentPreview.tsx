"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import type { AnimationPreviewProps } from "../types";

const VARIANT_HEIGHT: Record<NonNullable<AnimationPreviewProps["variant"]>, string> = {
  thumbnail: "h-48",
  modal: "h-96",
  detail: "h-[32rem]",
};

const MORRIS_PATH = "/morris.svg";

export function MorrisOrnamentPreview({ className = "", variant = "thumbnail" }: AnimationPreviewProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const svgHostRef = useRef<HTMLDivElement | null>(null);
  const shimmerRef = useRef<HTMLDivElement | null>(null);
  const [markup, setMarkup] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    const loadSvg = async () => {
      try {
        const response = await fetch(MORRIS_PATH);
        if (!response.ok) {
          throw new Error(`failed to fetch morris.svg: ${response.status}`);
        }

        const text = await response.text();
        if (active) {
          setMarkup(text);
        }
      } catch (error) {
        console.error("Unable to load morris.svg", error);
      }
    };

    loadSvg();

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    const host = svgHostRef.current;

    if (!host || !markup) {
      return;
    }

    const svg = host.querySelector<SVGSVGElement>("svg");
    if (!svg) {
      return;
    }

    svg.setAttribute("preserveAspectRatio", "xMidYMid meet");
    svg.setAttribute("data-morris", "");
    svg.style.width = "100%";
    svg.style.height = "100%";

    const rect = svg.querySelector<SVGRectElement>("rect");
    if (rect) {
      rect.setAttribute("rx", "18");
      rect.setAttribute("ry", "18");
    }

    const paths = Array.from(svg.querySelectorAll<SVGPathElement>("path"));
    if (!paths.length) {
      return;
    }

    const lengths = paths.map((path) => path.getTotalLength());

    paths.forEach((path, index) => {
      const length = lengths[index];
      gsap.set(path, {
        stroke: "#37482d",
        strokeWidth: 1.1,
        strokeLinecap: "round",
        strokeLinejoin: "round",
        strokeDasharray: length,
        strokeDashoffset: length,
      });
    });

    const timeline = gsap.timeline({ repeat: -1, repeatDelay: 1.4 });

    timeline.to(paths, {
      strokeDashoffset: 0,
      duration: 4.2,
      ease: "power2.out",
      stagger: { each: 0.004, from: "edges" },
    });

    timeline.to(
      paths,
      {
        strokeDashoffset: (index) => -lengths[index] * 0.08,
        duration: 1.6,
        ease: "sine.inOut",
        stagger: { each: 0.004, from: "center" },
      },
      "-=1.2",
    );

    timeline.to(
      paths,
      {
        strokeDashoffset: 0,
        duration: 1.4,
        ease: "sine.inOut",
        stagger: { each: 0.004, from: "edges" },
      },
      "-=0.6",
    );

    const svgPulse = gsap.to(svg, {
      scale: 1.015,
      duration: 6,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true,
      transformOrigin: "50% 50%",
    });

    const shimmer = shimmerRef.current;
    let shimmerTween: gsap.core.Tween | undefined;
    if (shimmer) {
      shimmerTween = gsap.to(shimmer, {
        backgroundPosition: "120% 50%",
        duration: 5.5,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });
    }

    return () => {
      timeline.kill();
      svgPulse.kill();
      shimmerTween?.kill();
      paths.forEach((path) => {
        path.style.strokeDasharray = "";
        path.style.strokeDashoffset = "";
        path.style.stroke = "";
        path.style.strokeWidth = "";
        path.style.strokeLinecap = "";
        path.style.strokeLinejoin = "";
      });
      if (rect) {
        rect.removeAttribute("rx");
        rect.removeAttribute("ry");
      }
    };
  }, [markup]);

  const heightClass = VARIANT_HEIGHT[variant];

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden rounded-3xl border border-emerald-200/20 bg-gradient-to-br from-[#18210f] via-[#1f2a15] to-[#101509] p-4 text-emerald-100/90 shadow-[0_20px_50px_rgba(12,20,8,0.45)] ${heightClass} ${className}`}
    >
      <div
        ref={shimmerRef}
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          backgroundImage:
            "linear-gradient(115deg, rgba(243,230,167,0.0) 10%, rgba(243,230,167,0.18) 45%, rgba(205,232,210,0.0) 80%)",
          backgroundSize: "200% 200%",
        }}
      />
      <div className="relative flex h-full items-center justify-center rounded-[1.5rem] border border-white/5 bg-slate-900/10 p-3 backdrop-blur-sm">
        {markup ? (
          <div
            ref={svgHostRef}
            className="relative h-full w-full max-w-3xl"
            dangerouslySetInnerHTML={{ __html: markup }}
          />
        ) : (
          <div className="text-sm uppercase tracking-[0.3em] text-emerald-200/60">Loading pattern...</div>
        )}
      </div>
      <div className="pointer-events-none absolute inset-x-10 bottom-6 h-24 rounded-full bg-emerald-500/10 blur-3xl" />
    </div>
  );
}
