"use client";

import { useCartStore } from "@/store/cart-store";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";

function CartNavigator() {
  const items = useCartStore(state => state.items);
  const cartBadge = items.reduce((acc, item) => acc + item.quantity, 0)

  return <Link href="/cart" className="hover:bg-[#e9ebef] p-1 rounded-md duration-150 cursor-pointer relative">
    <div className="absolute rounded-full size-5 flex items-center justify-center bg-primary text-white bottom-full end-full -translate-x-3 translate-y-3 text-[12px]">{cartBadge}</div>
    <ShoppingCart className="size-4 text-foreground" />
  </Link>
}

export default CartNavigator