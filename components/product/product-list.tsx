import { IProduct } from "@/lib/product/types";
import ProductCard from "./product-card";

async function ProductList({ products }: { products?: IProduct[] }) {
  const renderedProducts =  products || (await import("@/lib/product/data.json")).default

  if (renderedProducts?.length === 0) return null;

  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 lg:gap-6 my-8">
      {renderedProducts.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}

export default ProductList