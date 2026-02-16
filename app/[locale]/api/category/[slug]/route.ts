import { NextResponse } from "next/server";
import products from "@/lib/product/data.json"; // mock data
import categories from "@/lib/category/data.json"; // mock data
import { IProduct } from "@/lib/product/types";
import { headers } from "next/headers";
import { getTranslations } from "@/i18n/get-translations";

export async function GET(req: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const url = new URL(req.url);
  const sort = url.searchParams.get("sort"); // "price_asc" | "price_desc"

  const locale = (await headers()).get("x-next-intl-locale") || "en";
  const t = await getTranslations(locale);
  // filter by category
  const filtered: IProduct[] = products.filter(p => p.category === slug);
  const category = categories.find(cat => cat.slug === slug);

  if (!category) return NextResponse.json({error: t("api.category_not_exist")})

  // sort
  if (sort === "price_asc") {
    filtered.sort((a, b) => a.price - b.price);
  } else if (sort === "price_desc") {
    filtered.sort((a, b) => b.price - a.price);
  }

  return NextResponse.json({products: filtered, category});
}
