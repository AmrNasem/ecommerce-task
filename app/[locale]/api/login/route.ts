import { getTranslations } from "@/i18n/get-translations";
import users from "@/lib/user/data.json";
import { IUser } from "@/lib/user/types";
import { cookies, headers } from "next/headers";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  const user = users.find(
    (u) => u.email === email && u.password === password
  ) as IUser;


  const locale = (await headers()).get("x-next-intl-locale") || "en";
  const t = await getTranslations(locale);

  if (!user) {
    return Response.json(
      { error: t("api.invalid_credentials") },
      { status: 401 }
    );
  }
  // create session cookie (login immediately)
  (await cookies()).set("user", JSON.stringify({
    id: user.id,
    name: user.name,
    email: user.email,
    image: user.image
  }), {
    httpOnly: false,
    path: "/"
  });

  return Response.json({
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      image: user.image
    }
  });
}
