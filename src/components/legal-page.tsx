import { getDict } from "@/lib/i18n";

/** Shared shell for Terms / Privacy style documents. */
export default async function LegalPage({
  title,
  updated,
  children,
}: {
  title: React.ReactNode;
  updated: string;
  children: React.ReactNode;
}) {
  const { t } = await getDict();
  return (
    <div className="fade-up mx-auto max-w-3xl pt-6">
      <h1 className="text-center text-4xl font-extrabold tracking-tight">{title}</h1>
      <p className="mt-3 text-center text-sm text-base-content/40">{t.legal.lastUpdated} {updated}</p>
      <div className="glass-card prose prose-pink mt-10 max-w-none p-8 prose-headings:tracking-tight prose-h2:mt-8 prose-h2:text-xl prose-a:text-pink-600 sm:p-10">
        {children}
      </div>
    </div>
  );
}
