import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Cyrene Launcher",
    template: "%s · Cyrene Launcher",
  },
  description: "Cyrene Launcher — Honkai: Star Rail private server launcher",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="light">
      <body>{children}</body>
    </html>
  );
}
