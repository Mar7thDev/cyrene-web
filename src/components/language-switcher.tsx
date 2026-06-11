"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { Languages } from "lucide-react";
import { setLocale } from "@/lib/i18n/actions";
import type { Locale } from "@/lib/i18n/config";

const NEXT: Record<Locale, Locale> = { en: "zh", zh: "en" };
// What each button shows is the language it will switch *to*.
const LABEL: Record<Locale, string> = { en: "EN", zh: "中" };

export default function LanguageSwitcher({ locale }: { locale: Locale }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const next = NEXT[locale];

  function toggle() {
    startTransition(async () => {
      await setLocale(next);
      router.refresh();
    });
  }

  return (
    <button
      type="button"
      onClick={toggle}
      disabled={pending}
      aria-label={`Switch language to ${LABEL[next]}`}
      title={`Switch language to ${LABEL[next]}`}
      className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm text-base-content/60 transition-colors hover:bg-pink-500/5 hover:text-pink-600 disabled:opacity-50"
    >
      <Languages size={15} />
      <span className="font-medium">{LABEL[next]}</span>
    </button>
  );
}
