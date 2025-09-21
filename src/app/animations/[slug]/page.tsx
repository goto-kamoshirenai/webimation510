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
  const parentAnimation = animation.parentSlug
    ? getAnimationBySlug(animation.parentSlug)
    : null;
  const childAnimations = animations.filter(
    (entry) => entry.parentSlug === animation.slug
  );

  return (
    <div className="space-y-12">
      <div className="flex flex-wrap items-center gap-3">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-slate-300 transition hover:text-white"
        >
          {"\u2190"} コレクションへ戻る
        </Link>
        {parentAnimation ? (
          <Link
            href={`/animations/${parentAnimation.slug}`}
            className="inline-flex items-center gap-2 text-xs text-slate-400 transition hover:text-white"
          >
            Parent: {parentAnimation.title}
          </Link>
        ) : null}
      </div>

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

      {childAnimations.length > 0 ? (
        <section className="space-y-6">
          <div className="flex flex-col gap-2">
            <h2 className="text-xl font-semibold text-white">\Variations</h2>
            <p className="text-sm text-slate-300">
              {animation.title}
              をベースにしたアレンジです。カードを選ぶと、それぞれのソースコードが確認できます。
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {childAnimations.map((child) => {
              const Preview = child.preview;
              return (
                <Link
                  key={child.slug}
                  href={`/animations/${child.slug}`}
                  className="group relative flex flex-col gap-4 rounded-3xl border border-white/10 bg-slate-900/60 p-4 transition hover:-translate-y-1 hover:border-white/20 hover:shadow-[0_25px_80px_rgba(15,23,42,0.55)]"
                >
                  <div className="overflow-hidden rounded-2xl border border-white/10">
                    <Preview variant="thumbnail" className="w-full" />
                  </div>
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-semibold text-white">
                      {child.title}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {child.frameworks.map((framework) => (
                        <span
                          key={framework}
                          className="rounded-full border border-white/10 bg-white/5 px-2 py-1 text-[11px] font-medium text-slate-200"
                        >
                          {framework}
                        </span>
                      ))}
                    </div>
                  </div>
                  <span className="pointer-events-none absolute inset-x-0 bottom-0 block h-16 translate-y-10 bg-gradient-to-t from-slate-950 via-transparent opacity-0 transition-opacity duration-500 group-hover:translate-y-0 group-hover:opacity-100" />
                </Link>
              );
            })}
          </div>
        </section>
      ) : null}
    </div>
  );
}
