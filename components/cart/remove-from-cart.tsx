"use client";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { useCallback, useTransition } from "react";
import { useCartStore } from "@/store/cart-store";

function RemoveFromCart({
  children,
  productId,
  className = "",
  ...props
}: {
  children: React.ReactNode;
  productId: string;
  className?: string;
}) {
  const [isPending, startTransition] = useTransition();
  const removeFromCart = useCartStore(state => state.removeFromCart);

  const handleRemoveFromCart = useCallback(() => {
    startTransition(async () => {
      try {
        // Request Here
        removeFromCart(productId);
      } catch (err) {
        console.log(err)
      }
    });
  }, [productId, removeFromCart]);

  return (
    <Button
      disabled={isPending}
      onClick={handleRemoveFromCart}
      variant="outline"
      className={cn("[&_svg]:size-4", className)}
      {...props}
    >
      {children}
    </Button>
  );
}

export default RemoveFromCart;
