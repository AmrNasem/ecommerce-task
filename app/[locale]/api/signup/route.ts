import users from "@/lib/user/data.json";
import { NextResponse } from "next/server";
import { cookies, headers } from "next/headers";
import { getTranslations } from "@/i18n/get-translations";

export async function POST(req: Request) {
  const { username: name, email, password, rePassword } = await req.json();

  // check if exists
  const existingUser = users.find((u) => u.email === email);

  const locale = (await headers()).get("x-next-intl-locale") || "en";
  const t = await getTranslations(locale);

  if (existingUser) {
    return NextResponse.json(
      { error: t("api.email_exists") },
      { status: 400 }
    );
  }

  if (password.trim() !== rePassword.trim()) {
    return NextResponse.json(
      { error: t("api.password_not_match") },
      { status: 400 }
    );
  }

  // create fake new user
  const newUser = {
    id: crypto.randomUUID(),
    name,
    email,
    image: `https://i.pravatar.cc/150?u=${email}`
  };

  // create session cookie (login immediately)
  (await cookies()).set("user", JSON.stringify({
    id: newUser.id,
    name: newUser.name,
    email: newUser.email,
    image: newUser.image
  }), {
    httpOnly: false,
    path: "/"
  });

  return NextResponse.json({ user: newUser });
}
