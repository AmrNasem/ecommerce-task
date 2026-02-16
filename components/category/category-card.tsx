import { Locale } from "@/i18n/routing";
import { ICategory } from "@/lib/category/types";
import { useLocale } from "next-intl";
import Image from "next/image";
import Link from "next/link";

function CategoryCard({ category }: { category: ICategory }) {
  const locale = useLocale() as Locale;

  return (
    <article className="rounded-lg shadow-lg hover:shadow-xl duration-200 hover:-translate-y-1 block group h-full relative">
      <Link
        href={`/category/${category.slug}`}
        className="absolute inset-0 z-10 w-full h-full"
      />

      <figure className="relative h-48 overflow-hidden rounded-t-lg">
        <Image
          src={category.image}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
          alt={category[`name_${locale}`]}
          className="object-cover block group-hover:scale-[1.03] duration-150 -z-10"
        />
      </figure>
      <div className="p-4">
        <h3 className="text-primary font-semibold text-sm mb-2 line-clamp-2">
          <Link href={`/category/${category.slug}`}>{category[`name_${locale}`]}</Link>
        </h3>
      </div>
    </article>
  );
}

export default CategoryCard;
