"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { buildNavLinks, isActive, type NavLabels } from "./nav-config";

export default function NavLinks({ isAdmin, labels }: { isAdmin: boolean; labels: NavLabels }) {
  const pathname = usePathname();
  const links = buildNavLinks(labels, isAdmin);

  return (
    <nav className="flex items-center gap-1">
      {links.map(({ href, label }) => {
        const active = isActive(pathname, href);
        return (
          <Link
            key={href}
            href={href}
            className={`px-3.5 py-1.5 rounded-full text-sm transition-colors ${
              active
                ? "bg-pink-500/10 text-pink-600 font-medium"
                : "text-base-content/60 hover:text-pink-600 hover:bg-pink-500/5"
            }`}
          >
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
