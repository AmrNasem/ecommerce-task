"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";

export default function LangSwitcher() {
  const locale = useLocale(); // current lang
  const router = useRouter();
  const pathname = usePathname(); // current path without locale

  function switchLang() {
    router.replace(pathname, { locale: locale === "ar" ? "en" : "ar" });
  }

  return (
    <div className="flex items-center gap-2 text-xs font-semibold">
      <Button
        variant="link"
        onClick={() => switchLang()}
        className={`px-2 py-1 rounded text-[12px] cursor-pointer`}
      >
        {locale === "ar" ? "الإنجليزية" : "Arabic"}
      </Button>

    </div>
  );
}
