import { IProduct } from "@/lib/product/types";
import { Heart, ShoppingCart } from "lucide-react";
import AddToCart from "../cart/add-to-cart";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { Locale } from "@/i18n/routing";
import { Badge } from "../ui/badge";
import Link from "next/link";

function ProductInfo({
  product,
}: {
  product: IProduct;
  }) {
  const locale = useLocale() as Locale;
  const t = useTranslations("product")
  return (
    <section>
      <div className="flex gap-3 justify-between my-3">
        <h2 className="text-3xl font-semibold">{product[`name_${locale}`]}</h2>
        <button className="size-7 min-w-7 min-h-7 flex items-center justify-center rounded-full bg-secondary hover:bg-secondary/80 duration-150 cursor-pointer">
          {/* {product.isWishList ? (
            <Heart fill="red" color="red" className={`size-4`} />
          ) : ( */}
          <Heart className={`size-4 text-muted-primary`} />
          {/* )} */}
        </button>
      </div>
      <div className="mb-2 relative p-2 h-[calc(3*100dvh/5)] w-full block">
        <Image
          src={product.image}
          fill
          sizes="(max-width: 768px) 100vw, 600px"
          priority
          className="object-cover rounded-lg"
          alt=""
        />
      </div>

      <div className="flex items-start gap-2 justify-between text-muted-foreground">
        <p className="font-semibold text-[13px]">{product[`description_${locale}`]}</p>
      <Link href={`/category/${product.category}`} className="bg-primary text-white text-[13px] font-semibold rounded-md px-2 py-1 my-2">
        {product.category}
      </Link>
      </div>
      {
        !product.inStock ?
          <Badge>{t("in-stock")}</Badge>
        : <Badge className="text-destructive border-destructive bg-red-50 font-semibold my-2">{t("out-of-stock")}</Badge>
      }
      <div className="flex gap-2 flex-wrap justify-between items-center my-5">
        <div className="flex gap-2 items-end font-semibold">
          <span className="text-3xl text-primary">{product.price}$</span>
        </div>

      </div>
      <AddToCart
        product={product}
        className="flex gap-2 items-center justify-center cursor-pointer w-full my-6"
      >
        <ShoppingCart className="size-4" />
        <span>{t("add-to-cart")}</span>
      </AddToCart>
    </section>
  );
}

export default ProductInfo;
