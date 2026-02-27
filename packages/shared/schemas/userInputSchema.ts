import { z } from "zod";

export const userInputSchema = z.object({
  fullName: z.string().min(3, "fullName precisa ter ao menos 3 caracteres"),
  email: z.string().email("email inválido"),
  tenantSlug: z
    .string()
    .min(3, "tenantSlug precisa ter ao menos 3 caracteres")
    .regex(/^[a-z0-9-]+$/, "tenantSlug deve conter apenas minúsculas, números e hífen")
});

export type UserInput = z.infer<typeof userInputSchema>;
