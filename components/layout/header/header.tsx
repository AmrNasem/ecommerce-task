import { Menu, Search } from "lucide-react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu";
// import LogoutButton from "../auth/logout-button";
import { IUser } from "@/lib/user/types";
import { useLocale, useTranslations } from "next-intl";
import LangSwitcher from "./lang-switcher";
import LogoutButton from "@/components/auth/logout-button";
import CartNavigator from "./cart-navigator";

const links = [
  {
    key: "home",
    href: "/",
  },
  {
    key: "about",
    href: "/about",
  },
  {
    key: "contact",
    href: "/contact",
  },
];

function Header({ user }: { user: IUser | null }) {
  console.log(user);
  const t = useTranslations("header");
  const locale = useLocale();
  const align = locale === "ar" ? "start" : "end"

  return (
    <header className="py-3 border-b z-100 border-gray-200 sticky top-0 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <nav className="mycontainer flex justify-between gap-2 items-center">
        <div className="flex gap-2 items-center">
          <button className="md:hidden hover:bg-[#e9ebef] p-1 rounded-md duration-150 cursor-pointer">
            <Menu className="size-4" />
          </button>
          <Link href="/" className="flex gap-1 items-center">

            <h4 className="font-semibold text-nowrap">Ecommerce Task</h4>
          </Link>
        </div>

        <div className="hidden md:flex items-center gap-4">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="hover:text-foreground duration-150 text-muted-foreground text-sm"
            >
              {t(link.key)}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <form
            action=""
            className="text-sm hidden text-muted-foreground sm:flex gap-1 bg-[#ececf0] p-1 rounded-md has-[input#search:focus]:ring-2 ring-[#a1a1a15e] border border-transparent has-[input#search:focus]:border-[#a1a1a1] duration-200"
          >
            <button className="p-px">
              <Search className="size-4" />
            </button>
            <input
              type="text"
              name="search"
              id="search"
              className="p-1 outline-none"
              placeholder={t("search")}
            />
          </form>
          <LangSwitcher />

          <CartNavigator />
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger
                className="rounded-full border border-black/5 p-0 flex items-center justify-center"
              >
                <Avatar className="h-7 w-7">
                  <AvatarImage src={user.image} alt={user.name} />
                  <AvatarFallback>
                    {user.name
                      .split(" ")
                      .slice(0, 2)
                      .map((name) => name[0].toUpperCase())}
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align={align} className="z-100">
                <DropdownMenuLabel className="flex flex-col">
                  <span className="text-xs font-medium">{user.name}</span>
                  <span className="text-[11px] text-muted-foreground">
                    {user.email}
                  </span>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-xs">
                  {t("auth.settings")}
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <LogoutButton className="block w-full">
                  <DropdownMenuItem className="text-xs text-destructive focus:bg-destructive/10 cursor-pointer">
                    {t("auth.logout")}
                  </DropdownMenuItem>
                </LogoutButton>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link
              href="/login"
              className="group font-semibold text-nowrap text-[12px] py-1 px-2 cursor-pointer rounded-md text-white bg-primary duration-150 hover:bg-primary/85"
            >
              {t("auth.login")}
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Header;
