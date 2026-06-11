import Link from "next/link";
import Image from "next/image";
import { auth, signOut } from "@/auth";
import { LogIn } from "lucide-react";
import { getDict } from "@/lib/i18n";
import NavLinks from "./nav-links";
import MobileMenu from "./mobile-menu";
import LanguageSwitcher from "./language-switcher";

export default async function Navbar() {
  const session = await auth();
  const { locale, t } = await getDict();

  return (
    <header className="sticky top-0 z-50 px-4 pt-3">
      <div className="glass mx-auto flex h-14 max-w-5xl items-center justify-between rounded-2xl px-1.5 sm:px-4">
        <div className="flex items-center gap-1">
          <MobileMenu isAdmin={session?.user.role === "admin"} labels={t.nav} />
          <Link href="/" className="flex items-center gap-2.5 px-1">
            <Image src="/appicon.png" alt="" width={32} height={32} className="rounded-lg shadow-sm" />
            <span className="text-brand text-[15px] font-bold tracking-tight">Cyrene Launcher</span>
          </Link>
        </div>

        <div className="hidden sm:block">
          <NavLinks isAdmin={session?.user.role === "admin"} labels={t.nav} />
        </div>

        <div className="flex items-center gap-1">
          <LanguageSwitcher locale={locale} />
          {session?.user ? (
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                <div className="w-9 rounded-full ring-2 ring-pink-200/80">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={session.user.image ?? "/avatar-fallback.svg"} alt={session.user.name ?? "avatar"} />
                </div>
              </div>
              <ul tabIndex={0} className="dropdown-content menu glass z-10 mt-3 w-48 rounded-2xl p-2 shadow-xl">
                <li className="menu-title truncate">{session.user.name}</li>
                <li><Link href="/profile">{t.nav.profile}</Link></li>
                <li>
                  <form
                    action={async () => {
                      "use server";
                      await signOut({ redirectTo: "/" });
                    }}
                  >
                    <button type="submit" className="w-full text-left">{t.nav.signOut}</button>
                  </form>
                </li>
              </ul>
            </div>
          ) : (
            <Link href="/login" className="btn btn-sm btn-brand rounded-full px-4">
              <LogIn size={15} /> {t.nav.signIn}
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
