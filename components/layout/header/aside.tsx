"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { createPortal } from "react-dom";

export default function MobileAside({ className }: { className?: string; }) {
  const [open, setOpen] = useState(false);
  const locale = useLocale();
  const t = useTranslations("header");

  return (
    <div className={cn(className)}>
      <button
        onClick={() => setOpen(true)}
        className="hover:bg-[#e9ebef] p-1 rounded-md duration-150 cursor-pointer"
      >
        <Menu className="size-4" />
      </button>
      {createPortal(
        <aside
          className={cn(
            "fixed top-0 start-0 h-full w-72 bg-white z-110 shadow-lg transition-transform duration-200",
            open
              ? "translate-x-0"
              : locale === "ar"
                ? "translate-x-full"
                : "-translate-x-full",
          )}
        >
          {/* header */}
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="text-lg font-bold">{t("menu")}</h2>
            <button onClick={() => setOpen(false)}>
              <X />
            </button>
          </div>

          {/* nav */}
          <nav className="flex flex-col p-4 gap-3 text-lg">
            <Link
              href={`/`}
              onClick={() => setOpen(false)}
              className="hover:text-blue-600 transition"
            >
              {t ? t("home") : "Home"}
            </Link>

            <Link
              href={`/about`}
              onClick={() => setOpen(false)}
              className="hover:text-blue-600 transition"
            >
              {t ? t("about") : "About"}
            </Link>

            <Link
              href={`/contact`}
              onClick={() => setOpen(false)}
              className="hover:text-blue-600 transition"
            >
              {t ? t("contact") : "Contact"}
            </Link>
          </nav>
        </aside>,
        document.body,
      )}
    </div>
  );
}
