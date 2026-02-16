"use client";
import { useCartStore } from "@/store/cart-store";
import CartItem from "./cart-item";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

function CartItems({ className = "" }: { className: string }) {
  const items = useCartStore(state => state.items)
  const t = useTranslations("cart")
  return (
    <section className={cn("my-5", className)}>
      <h3 className="text-primary/90 font-lg mb-3 font-semibold">{t("title")}</h3>
      <div className="space-y-4">
        {items.length ? (
          items.map((item) => <CartItem key={item.id} item={item} />)
        ) : (
          <div className="flex md:block justify-center flex-col min-h-75">
            <p className="text-xl text-center p-2 md:py-4 bg-muted/20 text-muted-foreground rounded-xl border border-muted">
              {t("empty")}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

export default CartItems;
