import z from "zod";

export const contactSchema = z.object({
  name: z.string().min(2, "name"),
  email: z.string().email("email"),
  message: z.string().min(10, "message")
});

export type ContactFormValues = z.infer<typeof contactSchema>;