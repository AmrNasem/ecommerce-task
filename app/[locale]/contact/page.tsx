"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ContactFormValues, contactSchema } from "@/lib/contact/validation";
import { submitContact } from "@/lib/contact/action";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";

export default function ContactPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful: success },
    reset
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema)
  });
  const t = useTranslations("contact")

  const onSubmit: SubmitHandler<ContactFormValues> = async (data) => {
    const res = await submitContact(data);

    if (res?.error) {
      return;
    }

    reset();
  };

  return (
    <div className="max-w-xl mx-auto py-16 px-6">
      <h1 className="text-3xl font-bold mb-8">{t("title")}</h1>

      {success && (
        <div className="bg-green-100 text-green-700 p-3 rounded mb-4">
          {t("successMessage")} 🚀
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* name */}
        <div>
          <input
            {...register("name")}
            placeholder={t("name")}
            className={`w-full px-4 py-2 mt-1 text-gray-900 bg-gray-100 border rounded-md focus:border-primary/80 duration-150 border-gray-300`}

          />
          {errors.name && (
            <p className="text-red-500 text-sm">{t(`validation.${errors.name.message}`)}</p>
          )}
        </div>

        {/* email */}
        <div>
          <input
            {...register("email")}
            placeholder={t("email")}
            className={`w-full px-4 py-2 mt-1 text-gray-900 bg-gray-100 border rounded-md focus:border-primary/80 duration-150 border-gray-300`}
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{t(`validation.${errors.email.message}`)}</p>
          )}
        </div>

        {/* message */}
        <div>
          <textarea
            {...register("message")}
            placeholder={t("message")}
            rows={5}
            className={`w-full px-4 py-2 mt-1 text-gray-900 bg-gray-100 border rounded-md focus:border-primary/80 duration-150 border-gray-300`}

          />
          {errors.message && (
            <p className="text-red-500 text-sm">{t(`validation.${errors.message.message}`)}</p>
          )}
        </div>

        <Button
          disabled={isSubmitting}
          className="w-full block cursor-pointer"
        >
          {isSubmitting ? t("loading") : t("submit")}
        </Button>
      </form>
    </div>
  );
}
