import { z } from "zod";

export const RegisterSchema = z.object({
    name: z.string().min(2, "O nome deve conter pelo menos 2 caracteres"),
    email: z.string().email("E-mail inválido"),
    password: z.string().min(8, "A senha deve conter pelo menos 8 caracteres"),
})

export type RegisterData = z.infer<typeof RegisterSchema>;

export const LoginSchema = z.object({
    email: z.string().email("E-mail inválido"),
    password: z.string().min(8, "A senha deve conter pelo menos 8 caracteres"),
})

export type LoginData = z.infer<typeof LoginSchema>;