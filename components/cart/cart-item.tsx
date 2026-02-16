"use client";

import Image from "next/image";
import Link from "next/link";
import Counter from "./counter";
import { memo, useCallback, useTransition } from "react";
import { Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { ICartItem } from "@/lib/cart/types";
import { useLocale } from "next-intl";
import { Locale } from "@/i18n/routing";
import { useCartStore } from "@/store/cart-store";

function CartItem({ item }: { item: ICartItem }) {
  const removeFromCart = useCartStore(state => state.removeFromCart)
  const updateQuantity = useCartStore(state => state.updateQuantity);

  const [isPending, startTransition] = useTransition();
  const locale = useLocale() as Locale;
  const action = useCallback(
    async (quantity: number) => {
      try {
        // Request Here;
        updateQuantity(item.product.id, quantity)
      } catch { }
    },
    [item, updateQuantity],
  );

  const handleRemoveFromCart = useCallback(() => {
    startTransition(async () => {
      try {
        // Request Here
        removeFromCart(item.product.id)
      } catch (err) {
        console.log(err)
      }
    });
  }, [item.product.id, removeFromCart]);

  return (
    <article
      className={cn(
        "flex gap-2 p-2 border border-muted rounded-lg relative",
        isPending ? "pointer-events-none opacity-50" : "",
      )}
    >
      <Link
        href={`/product/${item.product.id}`}
        className="absolute inset-0 z-10 w-full h-full"
      />
      <figure className="relative min-w-35 aspect-square overflow-hidden rounded-t-lg">
        <Image
          src={item.product.image}
          fill
          sizes=""
          alt={item.product[`name_${locale}`]}
          className="object-cover block group-hover:scale-[1.03] duration-150 -z-10"
        />
      </figure>
      <div className="p-4 grow">
        <h3 className="text-primary font-semibold text-sm mb-2 line-clamp-2">
          <Link href={`/product/${item.product.id}`}>
            {item.product[`name_${locale}`]}
          </Link>
        </h3>
        <p className="line-clamp-1 text-muted-foreground text-[12px] my-2">
          {locale === "ar" ? "وصف لهذا المنتج" : "Description for this product"}
        </p>
        <div className="flex text-xl my-2 items-center justify-between flex-wrap gap-3">
          <div className="flex gap-1 items-end">
            <span className="text-primary font-semibold">
              ${item.product.price}
            </span>
          </div>
          <Counter action={action} value={item.quantity} className="z-10" />
          <Button
            disabled={isPending}
            onClick={handleRemoveFromCart}
            variant="outline"
            size="sm"
            className="z-10 cursor-pointer p-2"
          >
            <Trash2 className="size-3.5" />
          </Button>
        </div>
      </div>
    </article>
  );
}

export default memo(CartItem);
