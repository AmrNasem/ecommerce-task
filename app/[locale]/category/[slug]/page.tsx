import ProductList from "@/components/product/product-list";
import products from "@/lib/product/data.json";
import { getTranslations } from "next-intl/server";

async function page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const filteredProducts = products.filter(product => product.category === slug)
  const t = await getTranslations()

  return (
    <main className="mycontainer my-10">
      <h1 className="text-3xl text-primary">
        <span className="font-semibold me-2">
          {t("category.title")}:
        </span>
        {slug}</h1>
      {
        filteredProducts.length ?
        <ProductList products={filteredProducts} />
          :
          <div className="flex md:block justify-center flex-col min-h-75 my-6">
            <p className="text-xl text-center p-2 md:py-4 bg-muted/20 text-muted-foreground rounded-xl border border-muted">
              {t("category.empty")}
            </p>
          </div>
      }
    </main>
  )
}

export default page