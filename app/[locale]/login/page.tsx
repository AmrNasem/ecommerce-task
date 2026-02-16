"use client";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import z from "zod";

const Schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});
type Fields = z.infer<typeof Schema>;

function Login() {
  const t = useTranslations("login");
  const tAuth = useTranslations("auth");
  const {
    handleSubmit,
    register,
    formState: { isSubmitting: isPending, errors },
    setError,
  } = useForm<Fields>({
    defaultValues: {
      email: "amr@example.com",
      password: "12345678"
    }, resolver: zodResolver(Schema)
  });
  const router = useRouter();

  const onSubmit: SubmitHandler<Fields> = async (data) => {
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const user = await res.json();
      if (user.error) throw new Error(user.error);
      router.refresh();
      router.replace("/");
    } catch (err) {
      console.log(err);
      setError("root", {
        message: err instanceof Error ? err.message : "Something went wrong",
      });
    }
  };
  return (
    <div className="flex items-center justify-center min-h-[calc(100dvh-62.4px)] bg-gray-50">
      <div className="w-full max-w-md">
        <div className="p-8 bg-white rounded-lg shadow-md border border-gray-300 -translate-y-20">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
            {t("title")}
          </h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                {tAuth("email.label")}
              </label>
              <input
                id="email"
                autoFocus
                {...register("email")}
                className={`w-full px-4 py-2 mt-1 text-gray-900 bg-gray-100 border rounded-md focus:border-primary/80 duration-150 border-gray-300`}
              />
              {errors.email?.message && (
                <p className="text-sm text-red-500 mt-1">
                  {tAuth(`email.errMessage`)}{" "}
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                {tAuth("password.label")}
              </label>
              <input
                id="password"
                type="password"
                {...register("password")}
                className={`w-full px-4 py-2 mt-1 text-gray-900 bg-gray-100 border rounded-md focus:border-primary/80 duration-150 border-gray-300`}
              />
              {errors.password?.message && (
                <p className="text-sm text-red-500 mt-1">
                  {tAuth(`password.errMessage`, { min: 8 })}
                </p>
              )}
            </div>

            <Button
              type="submit"
              disabled={isPending}
              className={`w-full px-4 py-2 text-white rounded-md focus:outline-none ${isPending ? "cursor-not-allowed opacity-50" : "cursor-pointer"
                }`}
            >
              {isPending ? t("submit.loading") : t("submit.label")}
            </Button>
            {errors.root && (
              <p className="text-sm text-red-500 mt-1 text-center">{errors.root.message}</p>
            )}
          </form>
          <p className="mt-4 text-sm text-center text-gray-600">
            {t("guidance.label")}
            <Link
              href="/signup"
              className="text-primary font-semibold hover:underline"
            >
              {t("guidance.link")}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
