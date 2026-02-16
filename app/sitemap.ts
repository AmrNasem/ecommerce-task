// app/sitemap.ts
import { IProduct } from "@/lib/product/types";
import { MetadataRoute } from "next";

async function getProducts() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/products`);
  return res.json();
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const products: IProduct[] = await getProducts();

  const productUrls = products.map((p) => ({
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/en/product/${p.id}`,
    lastModified: new Date(),
  }));

  return [
    {
      url: `${process.env.NEXT_PUBLIC_BASE_URL}`,
      lastModified: new Date(),
    },
    {
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/shop`,
      lastModified: new Date(),
    },
    ...productUrls,
  ];
}
