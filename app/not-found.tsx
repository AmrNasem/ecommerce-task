import Link from "next/link";
import { getTranslations } from "next-intl/server";
import "./globals.css"

export default async function NotFound() {
  const t = await getTranslations("notFound");

  return (
    <main className="min-h-dvh flex items-center justify-center px-4">
      <div className="text-center max-w-lg">
        {/* big 404 */}
        <h1 className="text-7xl font-extrabold text-primary tracking-tight">
          404
        </h1>

        {/* title */}
        <h2 className="mt-4 text-2xl font-semibold">
          {t("title")}
        </h2>

        {/* description */}
        <p className="mt-3 text-muted-foreground text-sm leading-relaxed">
          {t("description")}
        </p>

        {/* actions */}
        <div className="mt-8 flex items-center justify-center gap-3">
          <Link
            href="/"
            className="px-5 py-2 rounded-lg bg-primary text-white text-sm font-medium hover:bg-primary/90 transition"
          >
            {t("backHome")}
          </Link>
          {/* 
          <Link
            href="/shop"
            className="px-5 py-2 rounded-lg border text-sm font-medium hover:bg-muted transition"
          >
            {t("continueShopping")}
          </Link> */}
        </div>

        {/* subtle illustration */}
        <div className="mt-12 opacity-70">
          <div className="text-6xl">🛒</div>
        </div>
      </div>
    </main>
  );
}
