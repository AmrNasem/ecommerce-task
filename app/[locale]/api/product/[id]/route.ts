import { NextResponse } from "next/server";
import products from "@/lib/product/data.json";
import { headers } from "next/headers";
import { getTranslations } from "@/i18n/get-translations";

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const locale = (await headers()).get("x-next-intl-locale") || "en";
  const t = await getTranslations(locale);

  // find product
  const product = products.find((p) => p.id === id);

  if (!product) {
    return NextResponse.json(
      { error: t("api.product_not_found") || "Product not found" },
      { status: 404 }
    );
  }

  return NextResponse.json({ product });
}
