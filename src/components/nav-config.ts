export type NavLabels = {
  home: string;
  news: string;
  docs: string;
  about: string;
  admin: string;
};

export function buildNavLinks(labels: NavLabels, isAdmin: boolean) {
  return [
    { href: "/", label: labels.home },
    { href: "/news", label: labels.news },
    { href: "/docs", label: labels.docs },
    { href: "/about", label: labels.about },
    ...(isAdmin ? [{ href: "/admin", label: labels.admin }] : []),
  ];
}

export function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}
