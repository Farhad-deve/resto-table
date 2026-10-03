import { z } from "zod";

export const loginSchema = z.object({
    phoneNumber: z.string().regex(/^\d{9}$/, "Введите действительный номер телефона."),
    password: z.string().min(6, "Не менее 6 символов")
});

export const registerSchema = loginSchema
    .extend({
        name: z.string().min(2, "Не менее 2 символов")
    })

export type LoginForm = z.infer<typeof loginSchema>;
export type RegisterForm = z.infer<typeof registerSchema>;