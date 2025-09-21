import type { Metadata } from "next";
import Link from "next/link";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { HeaderNav } from "../components/HeaderNav";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "webimation510",
    template: "%s | webimation510",
  },
  description:
    "GSAPとWebGLで制作したモーションスタディを収集したギャラリーサイトです。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const year = new Date().getFullYear();

  return (
    <html lang="ja">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-slate-950 text-slate-100`}
      >
        <div className="flex min-h-screen flex-col">
          <header className="sticky top-0 z-40 border-b border-white/10 bg-slate-900/70 backdrop-blur">
            <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
              <Link href="/" className="text-lg font-semibold tracking-tight">
                webimation510
              </Link>
              <HeaderNav />
            </div>
          </header>
          <main className="mx-auto w-full max-w-6xl flex-1 px-6 pb-10 pt-8 sm:pt-8 sm:pb-14">
            {children}
          </main>
          <footer className="border-t border-white/10 bg-slate-900/50 text-sm text-slate-400">
            <div className="mx-auto w-full max-w-6xl px-6 py-4">
              Copyright {year} webimation510 - webサイトの動きを探求する。
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
