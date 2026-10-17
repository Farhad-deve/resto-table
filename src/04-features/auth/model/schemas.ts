import { z } from "zod";

export const loginSchema = z.object({
  phone_number: z.string("Телефон не может быть пустой").regex(/^\d{9}$/, "Введите действительный номер телефона."),
  password: z.string("Пароль не может быть пустой").min(8, "Не менее 8 символов"),
});

export const registerSchema = loginSchema.extend({
  first_name: z.string("Имя не может быть пустым").trim().min(2, "Не менее 2 символов"),
  last_name: z.string("Фамилия не может быть пустой").min(2, "Не менее 2 символов"),
});

export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
