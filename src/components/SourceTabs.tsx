"use client";

import { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { coldarkCold } from "react-syntax-highlighter/dist/esm/styles/prism";

interface SourceFileContent {
  label: string;
  path: string;
  language?: string;
  content: string;
}

interface SourceTabsProps {
  files: SourceFileContent[];
}

export function SourceTabs({ files }: SourceTabsProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeFile = files[activeIndex] ?? files[0];

  return (
    <div className="overflow-hidden rounded-3xl border border-white/10 bg-slate-950/80 shadow-[0_25px_80px_rgba(15,23,42,0.5)]">
      <div className="flex flex-wrap gap-2 border-b border-white/10 bg-slate-900/80 px-6 py-4">
        {files.map((file, index) => {
          const isActive = index === activeIndex;
          return (
            <button
              key={file.path}
              type="button"
              onClick={() => setActiveIndex(index)}
              className={`rounded-full border px-3 py-1 text-xs font-medium transition ${
                isActive
                  ? "border-sky-400/60 bg-sky-500/20 text-sky-100"
                  : "border-white/10 bg-white/5 text-slate-300 hover:border-white/20 hover:text-white"
              }`}
            >
              {file.label}
            </button>
          );
        })}
      </div>
      {activeFile ? (
        <div className="relative max-h-[32rem] overflow-auto">
          <SyntaxHighlighter
            language={activeFile.language ?? "tsx"}
            style={coldarkCold}
            customStyle={{
              margin: 0,
              background: "transparent",
              padding: "2.5rem 2rem 2rem 2rem",
              fontSize: "0.85rem",
            }}
            showLineNumbers
            wrapLines
          >
            {activeFile.content}
          </SyntaxHighlighter>
        </div>
      ) : null}
    </div>
  );
}
