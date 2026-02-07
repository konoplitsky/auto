import { z } from "zod";

export const authFormSchema = z.object({
  role: z.union([z.literal(""), z.enum(["guest", "employee"])]),
  inn: z.string().optional(),
  login: z.string().optional(),
  password: z.string().optional(),
});

export type AuthFormValues = z.infer<typeof authFormSchema>;
