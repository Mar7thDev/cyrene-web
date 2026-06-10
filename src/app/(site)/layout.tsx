import Navbar from "@/components/navbar";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-5xl px-4 py-8">{children}</main>
    </>
  );
}
