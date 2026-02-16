import CartItems from "@/components/cart/cart-items";
import Checkout from "@/components/cart/checkout";
import { getTranslations } from "@/i18n/get-translations";
import { Locale } from "@/i18n/routing";
import { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale; }>}) {
  const { locale } = await params
  const t = await getTranslations(locale);
  return{
    title: t("cart.metadata.title"),
  }
}

function page() {
  return (
    <main className="mycontainer grid md:grid-cols-3 gap-4">
      <CartItems className="col-span-2" />
      <Checkout className="col-span-2 md:col-span-1 sticky top-21 self-start" />
    </main>
  );
}

export default page;
