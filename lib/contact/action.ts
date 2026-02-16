"use server";

import { ContactFormValues, contactSchema } from "./validation";

export async function submitContact(data: ContactFormValues) {

  const parsed = contactSchema.safeParse(data);

  if (!parsed.success) {
    return {
      error: parsed.error.flatten().fieldErrors
    };
  }

  // simulate sending email / saving db
  console.log("CONTACT:", parsed.data);

  return { success: true };
}
