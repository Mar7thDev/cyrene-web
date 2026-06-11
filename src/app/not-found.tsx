import Link from "next/link";
import Navbar from "@/components/navbar";
import { getDict } from "@/lib/i18n";

export default async function NotFound() {
  const { t } = await getDict();
  const n = t.notFound;
  return (
    <>
      <Navbar />
      <main className="mx-auto flex max-w-md flex-col items-center px-4 py-28 text-center">
        <p className="text-brand fade-up text-7xl font-extrabold">404</p>
        <h1 className="fade-up d1 mt-4 text-xl font-semibold">{n.title}</h1>
        <p className="fade-up d2 mt-2 text-sm text-base-content/50">
          {n.body}
        </p>
        <Link href="/" className="btn btn-brand fade-up d3 mt-8 rounded-2xl px-6">
          {n.backHome}
        </Link>
      </main>
    </>
  );
}
