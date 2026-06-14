import type { Metadata } from "next";
import { Geist } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const geist = Geist({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Head2Head — Rate Photos Side by Side",
  description: "Vote for your favorite photos in head-to-head matchups.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full">
      <body
        className={`${geist.className} min-h-full flex flex-col bg-zinc-950 text-white antialiased`}
      >
        <nav className="flex items-center justify-between px-6 py-4 border-b border-zinc-800">
          <Link
            href="/"
            className="text-xl font-black tracking-tight text-rose-500 hover:text-rose-400 transition-colors"
          >
            HEAD2HEAD
          </Link>
          <div className="flex gap-6 text-sm font-medium text-zinc-400">
            <Link href="/" className="hover:text-white transition-colors">Vote</Link>
            <Link href="/leaderboard" className="hover:text-white transition-colors">Leaderboard</Link>
          </div>
        </nav>
        <main className="flex-1 flex flex-col items-center py-10">{children}</main>
        <footer className="text-center text-zinc-700 text-xs py-4 border-t border-zinc-900">
          &copy; {new Date().getFullYear()} Head2Head
        </footer>
      </body>
    </html>
  );
}
