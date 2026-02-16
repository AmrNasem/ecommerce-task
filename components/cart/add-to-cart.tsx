"use client";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { useCallback, useTransition } from "react";
import { useCartStore } from "@/store/cart-store";
import { IProduct } from "@/lib/product/types";

function AddToCart({
  children,
  product,
  className = "",
}: {
  children: React.ReactNode;
  product: IProduct;
  className?: string;
}) {
  const [isPending, startTransition] = useTransition();
  const addToCart = useCartStore(state => state.addToCart)

  const handleAddToCart = useCallback(() => {
    startTransition(async () => {
      try {
        // Request Here
        addToCart(product)
      } catch (err) {
        console.log(err)
      }
    });
  }, [addToCart, product]);

  return (
    <Button
      disabled={isPending}
      onClick={handleAddToCart}
      className={cn("[&_svg]:size-4", className)}
    >
      {children}
    </Button>
  );
}

export default AddToCart;
