import Link from "next/link";
import { notFound } from "next/navigation";
import { auth } from "@/auth";
import Navbar from "@/components/navbar";

export const metadata = { title: "Admin" };

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  if (!session?.user || session.user.role !== "admin" || session.user.status !== "active") {
    notFound();
  }

  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-6xl px-4 py-8">
        <div className="flex gap-2 mb-6">
          <Link href="/admin/users" className="btn btn-sm btn-ghost border border-pink-200 bg-white/60">Users</Link>
          <Link href="/admin/invites" className="btn btn-sm btn-ghost border border-pink-200 bg-white/60">Invites</Link>
          <Link href="/admin/bans" className="btn btn-sm btn-ghost border border-pink-200 bg-white/60">Bans</Link>
          <Link href="/admin/news" className="btn btn-sm btn-ghost border border-pink-200 bg-white/60">News</Link>
          <Link href="/admin/settings" className="btn btn-sm btn-ghost border border-pink-200 bg-white/60">Settings</Link>
        </div>
        {children}
      </main>
    </>
  );
}
