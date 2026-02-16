import SortSelect from "@/components/category/sort-select";
import ProductList from "@/components/product/product-list";
import { Locale } from "@/i18n/routing";
import { getTranslations } from "next-intl/server";

async function getProducts(category: string, sort: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/category/${category}?sort=${sort}`);
  return res.json();
}


async function page({ params, searchParams }: { params: Promise<{ slug: string, locale: Locale }>, searchParams: Promise<{ sort: string }> }) {
  const { slug, locale } = await params;
  const { sort } = await searchParams;

  const { products, category } = await getProducts(slug, sort || "");
  const t = await getTranslations()

  return (
    <main className="mycontainer my-10">
      <h1 className="text-3xl text-primary">
        <span className="font-semibold me-2">
          {t("category.title")}:
        </span>
        {category[`name_${locale}`]}
      </h1>
      {
        products.length ?
          <div>
            <SortSelect className="my-6" />
            <ProductList products={products} />
          </div>
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