"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavLinks({ isAdmin }: { isAdmin: boolean }) {
  const pathname = usePathname();
  const links = [
    { href: "/", label: "Home" },
    { href: "/news", label: "News" },
    { href: "/docs", label: "Docs" },
    { href: "/about", label: "About" },
    ...(isAdmin ? [{ href: "/admin", label: "Admin" }] : []),
  ];

  return (
    <nav className="flex items-center gap-1">
      {links.map(({ href, label }) => {
        const active = href === "/" ? pathname === "/" : pathname.startsWith(href);
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
