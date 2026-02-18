"use client";

import { cn } from "@/lib/utils";
import { useCartStore } from "@/store/cart-store";
import { ShoppingCart } from "lucide-react";
import { useLocale } from "next-intl";
import Link from "next/link";

function CartNavigator() {
  const items = useCartStore(state => state.items);
  const cartBadge = items.reduce((acc, item) => acc + item.quantity, 0);
  const locale = useLocale();

  return (
    <Link
      href="/cart"
      className="hover:bg-[#e9ebef] p-1 rounded-md duration-150 cursor-pointer relative"
    >
      <div
        className={cn(
          "absolute rounded-full size-5 flex items-center justify-center bg-primary text-white bottom-full -translate-x-3 translate-y-3 text-[12px]",
          locale === "ar" ? "end-full" : "start-full",
        )}
      >
        {cartBadge}
      </div>
      <ShoppingCart className="size-4 text-foreground" />
    </Link>
  );
}

export default CartNavigator