import createMiddleware from "next-intl/middleware";
import { locales, defaultLocale } from "./i18n/routing";
import { NextRequest, NextResponse } from "next/server";

const intlMiddleware = createMiddleware({
  locales,
  defaultLocale,
  localePrefix: "always" // مهم للـ SEO
});


export default async function middleware(req: NextRequest) {
  const response = intlMiddleware(req);

  const userCookie = req.cookies.get("user"); // mock auth cookie
  const isLoggedIn = !!userCookie;

  const pathname = req.nextUrl.pathname;

  // detect auth pages
  const isAuthPage =
    pathname.includes("/login") || pathname.includes("/signup");

  // if logged in → block auth pages
  if (isLoggedIn && isAuthPage) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return response;
}

export const config = {
  matcher: [
    "/",
    `/(en|ar)/:path*`,
    "/((?!_next|_vercel|.*\\..*).*)"
  ]
};