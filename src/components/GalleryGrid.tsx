"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import type { AnimationDefinition } from "../animations/types";

interface GalleryGridProps {
  animations: AnimationDefinition[];
}

export function GalleryGrid({ animations }: GalleryGridProps) {
  const [activeSlug, setActiveSlug] = useState<string | null>(null);

  const activeAnimation = useMemo(
    () => animations.find((animation) => animation.slug === activeSlug) ?? null,
    [activeSlug, animations]
  );

  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveSlug(null);
      }
    };

    if (activeAnimation) {
      document.addEventListener("keydown", handler);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [activeAnimation]);

  return (
    <>
      <div id="collection" className="grid gap-8 sm:grid-cols-2 xl:grid-cols-3">
        {animations.map((animation) => (
          <button
            type="button"
            key={animation.slug}
            onClick={() => setActiveSlug(animation.slug)}
            className="group relative cursor-pointer flex flex-col gap-4 rounded-3xl border border-white/10 bg-slate-900/60 p-5 text-left shadow-[0_25px_80px_rgba(15,23,42,0.55)] transition hover:-translate-y-1 hover:border-white/20 hover:shadow-[0_35px_120px_rgba(15,23,42,0.65)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-400"
          >
            <div className="overflow-hidden ">
              <animation.preview variant="thumbnail" className="w-full" />
            </div>
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-white">
                {animation.title}
              </h3>
              <div className="flex flex-wrap gap-2">
                {animation.frameworks.map((framework) => (
                  <span
                    key={framework}
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-slate-200"
                  >
                    {framework}
                  </span>
                ))}
              </div>
            </div>
            <span className="pointer-events-none absolute inset-x-0 bottom-0 block h-24 translate-y-12 bg-gradient-to-t from-slate-950 via-transparent opacity-0 transition-opacity duration-500 group-hover:translate-y-0 " />
          </button>
        ))}
      </div>

      {activeAnimation ? (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-6 backdrop-blur"
        >
          <div className="relative w-full max-w-4xl overflow-hidden rounded-3xl border border-white/10 bg-slate-900/90 shadow-[0_40px_140px_rgba(15,23,42,0.85)]">
            <button
              type="button"
              onClick={() => setActiveSlug(null)}
              className="absolute right-5 top-5 z-10 h-10 w-10 rounded-full border border-white/20 bg-slate-900/80 text-xl text-slate-200 transition hover:text-white"
              aria-label="プレビューを閉じる"
            >
              {"\u00D7"}
            </button>
            <div className="overflow-hidden border-b border-white/10">
              <activeAnimation.preview variant="modal" className="w-full" />
            </div>
            <div className="flex flex-col gap-6 p-8 text-slate-200 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h3 className="text-2xl font-semibold text-white">
                  {activeAnimation.title}
                </h3>
              </div>
              <div className="flex flex-wrap justify-end gap-2 text-sm text-slate-300">
                {activeAnimation.frameworks.map((framework) => (
                  <span
                    key={framework}
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-3 text-xs text-slate-200"
                  >
                    {framework}
                  </span>
                ))}
                <Link
                  href={`/animations/${activeAnimation.slug}`}
                  className="inline-flex items-center justify-center rounded-full border border-sky-400/40 bg-sky-500/20 px-4 py-2 text-sm font-medium text-sky-100 transition hover:border-sky-300 hover:bg-sky-400/30 hover:text-white"
                  onClick={() => setActiveSlug(null)}
                >
                  コードを見る
                </Link>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
