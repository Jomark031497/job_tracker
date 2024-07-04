import { z } from "zod";

export const authSchema = z.object({
  username: z.string().min(3).max(150),
  password: z.string().min(6).max(150),
  email: z.string().email().max(150),
});

export type SignUpInputs = z.infer<typeof authSchema>;
export type LoginInputs = Omit<SignUpInputs, "email">;
