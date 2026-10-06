import { z } from "zod";

export const loginSchema = z.object({
    phone_number: z.string().regex(/^\d{9}$/, "Введите действительный номер телефона."),
    password: z.string().min(6, "Не менее 6 символов")
});

export const registerSchema = loginSchema
    .extend({
        first_name: z.string("Имя не может быть пустым").trim().min(2, "Не менее 2 символов"),
        last_name: z.string("Фамилия не может быть пустой").min(2, "Не менее 2 символов"),
        email: z.email("Введите действительную почту")
    })

export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;