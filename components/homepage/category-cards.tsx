import Link from "next/link";
import categories from "@/lib/category/data.json";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import { Locale } from "@/i18n/routing";
import CategoryCard from "../category/category-card";

export default async function CategoryCards() {
  const t = await getTranslations("home.categories");
  return (
    <section className="py-12 max-w-6xl mx-auto px-4">
      <h2 className="text-2xl font-bold mb-6">{t("title")}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {categories.map((cat) => (<CategoryCard key={cat.slug} category={cat} />
        ))}
      </div>
    </section>
  );
}
