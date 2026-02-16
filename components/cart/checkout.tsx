"use client";

import { Percent } from "lucide-react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { useCartStore } from "@/store/cart-store";
import { useTranslations } from "next-intl";

function Checkout({ className = "" }) {
  const t = useTranslations("cart.checkout");
  const items = useCartStore((s) => s.items);
  const subtotal = items.reduce((acc, i) => acc + i.product.price * i.quantity, 0);
  const tax = subtotal * 0.05;
  const total = subtotal + tax;

  return (
    <div className={cn("my-5", className)}>
      <h3 className="text-primary/90 font-lg mb-3 md:text-end font-semibold">
        {t("title")}
      </h3>
      <form action="" className="border border-muted rounded-md shadow-md">
        <div className="p-4 space-y-2">
          <h3 className="text-primary mb-4">{t("summary")}</h3>
          <div className="flex items-center duration-150 gap-1 px-2 py-1 border border-muted has-[input:focus]:border-primary/80 rounded-md">
            <Percent className="size-4" />
            <input
              type="text"
              name="coupon"
              id="coupon"
              className="outline-none text-sm p-1 w-full grow"
              placeholder={t("coupon")}
            />
          </div>
          <div className="flex items-center gap-1 justify-between">
            <h4 className="text-sm text-muted-foreground">{t("subtotal")}</h4>
            <span className="font-semibold text-primary/80">{subtotal.toFixed(2)}$</span>
          </div>
          <div className="flex items-center gap-1 justify-between">
            <h4 className="text-sm text-muted-foreground">{t("shipping")}</h4>
            <span className="font-semibold text-green-600">Free</span>
          </div>
          <div className="flex items-center gap-1 justify-between">
            <h4 className="text-sm text-muted-foreground">{t("tax")}</h4>
            <span className="font-semibold text-primary/80">{tax.toFixed(2)}$</span>
          </div>
        </div>
        <div className="border-t border-b border-muted flex items-center gap-1 justify-between p-4 text-lg">
          <h4 className="text-primary">{t("total")}</h4>
          <span className="font-semibold text-primary/80">{total.toFixed(2)}$</span>
        </div>
        <div className="p-4 space-y-4">
          <Button disabled={!subtotal} className="w-full block cursor-pointer">
            {t("submit")}
          </Button>
          <Button className="w-full block" variant="outline">
          {t("cancel")}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default Checkout;
