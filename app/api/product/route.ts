import products from "@/lib/product/data.json";

export async function GET() {
  return Response.json(products);
}
