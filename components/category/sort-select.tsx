"use client";

import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import { useSearchParams, useRouter } from "next/navigation";

export default function SortSelect({ className }: { className?: string; }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const t = useTranslations("category.sort")

  const currentSort = searchParams.get("sort") || "";

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const sort = e.target.value;

    // build new query params
    const params = new URLSearchParams(Array.from(searchParams.entries()));
    if (sort) params.set("sort", sort);
    else params.delete("sort");

    // push new URL (triggers SSR page reload)
    router.push(`${window.location.pathname}?${params.toString()}`);
  };

  return (
    <div className={cn("mb-6 flex items-center gap-2", className)}>
      <label htmlFor="sort" className="font-medium text-sm">
        {t("label")}
      </label>
      <select
        id="sort"
        value={currentSort}
        onChange={handleChange}
        className={`px-4 py-2 mt-1 text-gray-900 bg-gray-100 border rounded-md focus:border-primary/80 duration-150 border-gray-300`}
        
      >
        <option value="">{t("default")}</option>
        <option value="price_asc">{t("lower_price")}</option>
        <option value="price_desc">{t("higher_price")}</option>
      </select>
    </div>
  );
}
