import { Suspense } from "react";
import ProductList from "../product/product-list"
import ProductListSekeleton from "../product/skeleton/product-list-skeleton";
import { useTranslations } from "next-intl";

function Products() {
  const t = useTranslations("home");

  return (
    <section className="mycontainer my-8 py-3">
      <h2 className="text-foreground text-3xl mb-3 font-semibold text-center">
        {t("products.title")}
      </h2>
      <p className="text-muted-foreground text-center">
        {t("products.desc")}
      </p>
      <Suspense fallback={<ProductListSekeleton />}>
        <ProductList />
      </Suspense>
    </section>
  );
}

export default Products;
