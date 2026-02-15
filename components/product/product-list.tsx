import ProductCard from "./product-card";

async function productList() {
  const products = (await import("@/lib/product/data.json")).default;
  
  if (products?.length === 0) return null;

  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 lg:gap-6 my-8">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}

export default productList