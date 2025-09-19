"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export function HeaderNav() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!dropdownRef.current || !buttonRef.current) return;
      if (
        !dropdownRef.current.contains(event.target as Node) &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKey);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKey);
    };
  }, []);

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };

  const handleSelect = () => {
    setIsOpen(false);
    buttonRef.current?.focus();
  };

  return (
    <nav className="flex items-center gap-4 text-sm text-slate-300">
      <Link
        href="https://github.com/goto-kamoshirenai/webimation510"
        target="_blank"
        rel="noreferrer"
        className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 transition hover:border-white/20 hover:text-white"
        aria-label="GitHubリポジトリ"
      >
        <Image src="/icons/github.svg" alt="GitHub" width={18} height={18} />
      </Link>
      <div className="relative" ref={dropdownRef}>
        <button
          ref={buttonRef}
          type="button"
          onClick={handleToggle}
          className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 transition hover:border-white/20 hover:text-white"
          aria-haspopup="true"
          aria-expanded={isOpen}
        >
          document
          <Image src="/icons/chevron-down.svg" alt="開閉" width={16} height={16} />
        </button>
        {isOpen ? (
          <div className="absolute right-0 top-12 w-56 rounded-2xl border border-white/10 bg-slate-900/90 p-3 shadow-[0_25px_60px_rgba(15,23,42,0.55)] backdrop-blur">
            <ul className="space-y-2 text-sm text-slate-200">
              <li>
                <Link
                  href="https://threejs.org/"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between rounded-xl px-3 py-2 transition hover:bg-white/10"
                  onClick={handleSelect}
                >
                  WebGLドキュメント
                  <span className="text-xs text-slate-400">three.js</span>
                </Link>
              </li>
              <li>
                <Link
                  href="https://docs.pmnd.rs/react-three-fiber/getting-started/introduction"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between rounded-xl px-3 py-2 transition hover:bg-white/10"
                  onClick={handleSelect}
                >
                  React Three Fiber
                  <span className="text-xs text-slate-400">Docs</span>
                </Link>
              </li>
              <li>
                <Link
                  href="https://greensock.com/docs/"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between rounded-xl px-3 py-2 transition hover:bg-white/10"
                  onClick={handleSelect}
                >
                  GSAPドキュメント
                  <span className="text-xs text-slate-400">greensock</span>
                </Link>
              </li>
            </ul>
          </div>
        ) : null}
      </div>
    </nav>
  );
}
