import { Heart, ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
// import RemoveFromCart from "../cart/remove-from-cart";
// import AddToCart from "../cart/add.to-cart";
import { IProduct } from "@/lib/product/types";
import { useLocale, useTranslations } from "next-intl";
import { Locale } from "@/i18n/routing";
import AddToCart from "../cart/add-to-cart";

function ProductCard({ product }: { product: IProduct }) {
  const locale = useLocale() as Locale;
  const t = useTranslations("product");
  return (
    <article className="rounded-lg shadow-lg hover:shadow-xl duration-200 hover:-translate-y-1 block group h-full relative">
      <Link
        href={`/product/${product.id}`}
        className="absolute inset-0 z-10 w-full h-full"
      />

      <figure className="relative h-48 overflow-hidden rounded-t-lg">
        <button className="z-20 md:opacity-0 group-hover:opacity-100 absolute end-2 top-2 w-7 h-7 flex items-center justify-center rounded-full bg-secondary hover:bg-secondary/80 duration-150 cursor-pointer">
          <Heart className="size-4 text-muted-primary" />
        </button>
        <Image
          src={product.image}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
          alt={product[`name_${locale}`]}
          className="object-cover block group-hover:scale-[1.03] duration-150 -z-10"
        />
        <div className="z-20 md:opacity-0 group-hover:opacity-100 md:translate-y-1 group-hover:translate-y-0 absolute bottom-0 start-0 h-[22%] mx-auto w-full bg-linear-to-b from-transparent px-2 to-foreground duration-150">
          <AddToCart product={product} className="bg-primary hover:bg-primary/80 duration-200 text-white flex gap-2 items-center justify-center w-full text-sm p-1 rounded-md cursor-pointer">
            <ShoppingCart className="size-4" />
            <span>{t("add-to-cart")}</span>
          </AddToCart>
        </div>
      </figure>
      <div className="p-4">
        <h3 className="text-primary font-semibold text-sm mb-2 line-clamp-2">
          <Link href={`/product/${product.id}`}>{product[`name_${locale}`]}</Link>
        </h3>
        <div className="flex gap-1 items-end">
          <span className="text-primary font-semibold">${product.price}</span>
        </div>
      </div>
    </article>
  );
}

export default ProductCard;
