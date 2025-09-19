import { readFile } from "fs/promises";
import path from "path";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { animations, getAnimationBySlug } from "../../../animations";
import type { AnimationSourceFile } from "../../../animations/types";
import { SourceTabs } from "../../../components/SourceTabs";

const workspaceRoot = process.cwd();

async function loadSourceFiles(files: AnimationSourceFile[]) {
  return Promise.all(
    files.map(async (file) => {
      const absolutePath = path.join(workspaceRoot, file.path);
      try {
        const content = await readFile(absolutePath, "utf-8");
        return {
          ...file,
          content,
        };
      } catch (error) {
        return {
          ...file,
          content: `// ソースの読み込みに失敗しました: ${String(error)}`,
        };
      }
    })
  );
}

export async function generateStaticParams() {
  return animations.map((animation) => ({ slug: animation.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const animation = getAnimationBySlug(params.slug);
  if (!animation) {
    return { title: "Not Found" };
  }

  return {
    title: `${animation.title} のソースコード`,
  };
}

export default async function AnimationDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const animation = getAnimationBySlug(params.slug);

  if (!animation) {
    notFound();
  }

  const sources = await loadSourceFiles(animation.sourceFiles);

  return (
    <div className="space-y-12">
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-sm text-slate-300 transition hover:text-white"
      >
        {"\u2190"} コレクションへ戻る
      </Link>

      <header className="space-y-6 rounded-3xl border border-white/10 bg-slate-900/70 p-10 shadow-[0_35px_120px_rgba(15,23,42,0.6)]">
        <div className="flex flex-wrap items-center justify-between gap-6">
          <h1 className="text-4xl font-semibold text-white">
            {animation.title}
          </h1>
          <div className="flex flex-wrap justify-end gap-2 text-sm text-slate-300">
            {animation.frameworks.map((framework) => (
              <span
                key={framework}
                className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-200"
              >
                {framework}
              </span>
            ))}
          </div>
        </div>
        <div className="overflow-hidden rounded-3xl border border-white/10">
          <animation.preview variant="detail" className="w-full" />
        </div>
      </header>

      <section className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold text-white">Source Code</h2>
        </div>
        <SourceTabs files={sources} />
      </section>
    </div>
  );
}
