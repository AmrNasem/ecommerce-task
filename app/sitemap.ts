// app/sitemap.ts
import { MetadataRoute } from "next";
import categories from "@/lib/category/data.json"
import products from "@/lib/product/data.json"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {

  const productUrls = products.map((p) => ({
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/product/${p.id}`,
    lastModified: new Date(),
  }));

  const categoryUrls = categories.map((cat) => ({
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/category/${cat.slug}`,
    lastModified: new Date(),
  }));

  return [
    {
      url: `${process.env.NEXT_PUBLIC_BASE_URL}`,
      lastModified: new Date(),
    },
    {
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/cart`,
      lastModified: new Date(),
    },
    ...productUrls,
    ...categoryUrls
  ];
}
