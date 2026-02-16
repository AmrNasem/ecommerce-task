import { Metadata } from "next";
import { useTranslations } from "next-intl";
import Image from "next/image";

export const metadata: Metadata = {
  title: "About us",
  description: "Learn more about our store and mission"
};

export default function AboutPage() {
  const t = useTranslations("about");

  return (
    <div className="max-w-4xl mx-auto py-16 px-6">
      <div className="aspect-video relative w-full mb-4">
        <Image src={"/about.jpg"} alt="About us"
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          priority
          className="object-cover block w-full h-full grow rounded-2xl"
        />
      </div>
      <h1 className="text-3xl font-bold mb-6">{t("title")}</h1>
      <p className="text-lg text-muted-foreground leading-8">{t("description")}</p>
      <div className="mt-8 space-y-4">
        {
          t.raw("tips").map((tip: string, i: number) =>
            <p key={i}>✔ {tip}</p>
          )
        }
      </div>
    </div>
  );
}
