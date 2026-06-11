import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { getLocale } from "@/lib/i18n";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], display: "swap", variable: "--font-inter" });

export const metadata: Metadata = {
  title: {
    default: "Cyrene Launcher",
    template: "%s · Cyrene Launcher",
  },
  description: "A clean, fast launcher for Honkai: Star Rail private servers.",
  icons: { icon: "/appicon.png" },
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const locale = await getLocale();
  return (
    <html lang={locale} data-theme="light">
      <body className={inter.variable}>
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
