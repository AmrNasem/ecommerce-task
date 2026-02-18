// import Thumbnails from "@/components/product/single-product/thumbnails";
import ProductInfo from "@/components/product/product-info";
import { Locale } from "@/i18n/routing";
import { getLocale } from "next-intl/server";
import { notFound } from "next/navigation";

const getProductById = async (productId: string) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/product/${productId}`)
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
      <div className="my-6 px-2 space-y-12 max-w-200 mx-auto">
        <ProductInfo product={product} />
      </div>
    </main>
  );
}

export async function generateMetadata({ params }: { params: Promise<{ id: string; locale: Locale }> }) {
  const { id, locale } = await params;
  const product = await getProductById(id);

  const title = product[`name_${locale}`];
  const description = product[`description_${locale}`];

  return {
    title,
    description,

    openGraph: {
      title,
      description,
      images: [product.image],
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/${locale}/product/${id}`,
    },

    twitter: {
      title,
      description,
      images: [product.image],
    },

    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/${locale}/product/${id}`,
      languages: {
        en: `${process.env.NEXT_PUBLIC_BASE_URL}/en/product/${id}`,
        ar: `${process.env.NEXT_PUBLIC_BASE_URL}/ar/product/${id}`,
      },
    },
  };
}

export default SingleProduct;
