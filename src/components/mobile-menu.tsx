"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { buildNavLinks, isActive, type NavLabels } from "./nav-config";

export default function MobileMenu({ isAdmin, labels }: { isAdmin: boolean; labels: NavLabels }) {
  const pathname = usePathname();
  const links = buildNavLinks(labels, isAdmin);

  // Close the dropdown after tapping a link (daisyUI closes on blur).
  const close = () => (document.activeElement as HTMLElement | null)?.blur();

  return (
    <div className="dropdown sm:hidden">
      <div tabIndex={0} role="button" aria-label="Menu" className="btn btn-ghost btn-sm btn-circle text-base-content/60">
        <Menu size={18} />
      </div>
      <ul
        tabIndex={0}
        className="dropdown-content menu glass z-50 mt-3 w-44 rounded-2xl p-2 shadow-xl"
      >
        {links.map(({ href, label }) => (
          <li key={href}>
            <Link
              href={href}
              onClick={close}
              className={isActive(pathname, href) ? "text-pink-600 font-medium" : ""}
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
