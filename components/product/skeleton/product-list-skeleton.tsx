import { ProductCardSkeleton } from "./product-card-skeleton"

function ProductListSekeleton() {
  return (
    <section className="mycontainer grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 lg:gap-6 my-8">
      <ProductCardSkeleton />
      <ProductCardSkeleton />
      <ProductCardSkeleton />
    </section>
  )
}

export default ProductListSekeleton