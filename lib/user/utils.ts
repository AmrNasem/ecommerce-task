import {cookies} from "next/headers";

export async function getUserFromCookie() {
  const cookie = (await cookies()).get("user")?.value;
  if (!cookie) return null;

  try {
    return JSON.parse(cookie);
  } catch {
    return null;
  }
}
