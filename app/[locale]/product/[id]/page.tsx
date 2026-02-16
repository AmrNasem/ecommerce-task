// import Thumbnails from "@/components/product/single-product/thumbnails";
import ProductInfo from "@/components/product/product-info";
import { getLocale } from "next-intl/server";
import { notFound } from "next/navigation";

const getProductById = async (productId: string) => {
  try {
    const res = await fetch(`http://localhost:3000/api/product/${productId}`)
    const product = await res.json()
    console.log(product)
    return product.product;
  } catch (err) {
    console.log(err);
    notFound();
  }
}

async function SingleProduct({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = (await params);
  const product = await getProductById(id);

  return (
    <main className="mycontainer my-10">
      <div className="my-6 px-2 space-y-12 max-w-[800px] mx-auto">
        <ProductInfo product={product} />
      </div>
    </main>
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const locale = await getLocale();
  const product = await getProductById(id);

  return {
    title: `${product[`name_${locale}`]} | Ecommerce Task`,
    description: product[`description_${locale}`],
    openGraph: {
      title: product[`name_${locale}`],
      description: product[`description_${locale}`],
      images: [product.image],
      url: `/product/${id}`,
    },
    robots: { index: true, follow: true },
  };
}

export default SingleProduct;
