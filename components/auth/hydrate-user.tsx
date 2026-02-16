"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/store/user-store";
import { IUser } from "@/lib/user/types";

export default function HydrateUser({ user }: { user: IUser }) {
  const setUser = useAuthStore((s) => s.setUser);

  useEffect(() => {
    console.log("HYRD: ", user)
    setUser(user);
  }, [user, setUser]);

  return null;
}
