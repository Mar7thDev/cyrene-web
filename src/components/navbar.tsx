import Link from "next/link";
import { auth, signOut } from "@/auth";
import { LogIn } from "lucide-react";

export default async function Navbar() {
  const session = await auth();

  return (
    <div className="navbar sticky top-0 z-50 px-4 bg-white/60 backdrop-blur-xl border-b border-white/80">
      <div className="navbar-start">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-lg font-bold bg-clip-text text-transparent bg-linear-to-r from-pink-500 via-violet-500 to-sky-500">
            Cyrene Launcher
          </span>
        </Link>
      </div>
      <div className="navbar-center hidden sm:flex">
        <ul className="menu menu-horizontal gap-1">
          <li><Link href="/" className="hover:text-pink-500 rounded-lg">Home</Link></li>
          <li><Link href="/news" className="hover:text-pink-500 rounded-lg">News</Link></li>
          {session?.user.role === "admin" && (
            <li><Link href="/admin" className="hover:text-pink-500 rounded-lg">Admin</Link></li>
          )}
        </ul>
      </div>
      <div className="navbar-end">
        {session?.user ? (
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
              <div className="w-9 rounded-full ring-2 ring-pink-200">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={session.user.image ?? "/avatar-fallback.svg"} alt={session.user.name ?? "avatar"} />
              </div>
            </div>
            <ul tabIndex={0} className="menu dropdown-content bg-white/95 backdrop-blur-xl border border-pink-100 rounded-xl z-10 mt-3 w-48 p-2 shadow-xl">
              <li className="menu-title truncate">{session.user.name}</li>
              <li><Link href="/profile">Profile</Link></li>
              <li>
                <form
                  action={async () => {
                    "use server";
                    await signOut({ redirectTo: "/" });
                  }}
                >
                  <button type="submit" className="w-full text-left">Sign out</button>
                </form>
              </li>
            </ul>
          </div>
        ) : (
          <Link href="/login" className="btn btn-sm bg-linear-to-r from-pink-500 to-sky-500 border-none text-white shadow-md shadow-pink-200/50">
            <LogIn size={16} /> Sign in
          </Link>
        )}
      </div>
    </div>
  );
}
