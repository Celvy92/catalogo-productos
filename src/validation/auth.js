import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string({ required_error: "El correo es obligatorio" })
    .email({ message: "Correo inválido" }),
  password: z
    .string({ required_error: "La contraseña es obligatoria" })
    .min(4, { message: "La contraseña debe tener al menos 4 caracteres" }),
});
