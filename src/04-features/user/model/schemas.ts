import { z } from "zod";

export const userSchema = z.object({
    first_name: z.string().trim().min(1, "Имя не может быть пустым"),
    last_name: z.string().trim().min(1, "Фамилия не может быть пустой"),
    phone_number: z.string().trim().min(1, "Телефон не может быть пустой").regex(/^\d{9}$/, "Введите 9 цифр."),
    email: z.email("Введите корректную почту").or(z.literal("")),
});

export const updatePasswordSchema = z.object({
    old_password: z.string().trim().min(8, "Не менее 8 символов"),
    new_password: z.string().trim().min(8, "Не менее 8 символов"),
});

export type UpdateUserFormData = z.infer<typeof userSchema>;
export type UpdatePasswordFormData = z.infer<typeof updatePasswordSchema>;
