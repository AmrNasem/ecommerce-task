import categories from "@/lib/category/data.json";

export async function GET() {
  return Response.json(categories);
}
