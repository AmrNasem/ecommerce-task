import Products from "@/components/homepage/products";
import { getTranslations } from "@/i18n/get-translations";
import { Locale } from "@/i18n/routing";
import { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale; }>}) {
  const { locale } = await params
  const t = await getTranslations(locale);
  return{
    title: t("home.metadata.title"),
    description: t("home.metadata.description"),
  }
}

export default function Home() {
  return (
    <main className="mycontainer">
      <Products />
    </main>
  );
}
