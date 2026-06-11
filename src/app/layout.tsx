import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  title: {
    default: "Cyrene Launcher",
    template: "%s · Cyrene Launcher",
  },
  description: "A clean, fast launcher for Honkai: Star Rail private servers.",
  icons: { icon: "/appicon.png" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="light">
      <body className={inter.className}>
        <div className="ambient" aria-hidden="true">
          <div className="ambient-blob pink" />
          <div className="ambient-blob sky" />
          <div className="ambient-blob violet" />
        </div>
        {children}
      </body>
    </html>
  );
}
