import { NextResponse } from "next/server";
import products from "@/lib/product/data.json"; // mock data
import { IProduct } from "@/lib/product/types";

export async function GET(req: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const url = new URL(req.url);
  const sort = url.searchParams.get("sort"); // "price_asc" | "price_desc"

  // filter by category
  const filtered: IProduct[] = products.filter(p => p.category === slug);

  // sort
  if (sort === "price_asc") {
    filtered.sort((a, b) => a.price - b.price);
  } else if (sort === "price_desc") {
    filtered.sort((a, b) => b.price - a.price);
  }

  return NextResponse.json(filtered);
}
