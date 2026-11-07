import { z } from "zod";

export const createAdminSchema = z.object({
  first_name: z.string().trim().min(1, "Обязательное поле").max(100, "Не более 100 символов"),
  last_name: z.string().trim().min(1, "Обязательное поле").max(100, "Не более 100 символов"),
  phone_number: z.string().trim().min(1, "Обязательное поле").regex(/^\d{9}$/, "Введите 9 цифр."),
  password: z.string().trim().min(8, "Не менее 8 символов"),
  restaurant: z.number({
    error: (issue) => {
      if (issue.input === undefined) return "Выберите ресторан";
      return "Выберите ресторан";
    },
  }),
});

export const updateAdminSchema = z.object({
  first_name: z.string().trim().min(1, "Обязательное поле").max(100, "Не более 100 символов"),
  last_name: z.string().trim().min(1, "Обязательное поле").max(100, "Не более 100 символов"),
  phone_number: z.string().trim().min(1, "Обязательное поле").regex(/^\d{9}$/, "Введите 9 цифр."),
});

export const updatePasswordAdminSchema = z.object({
  password: z.string().trim().min(8, "Не менее 8 символов"),
});

export type CreateAdminFormData = z.infer<typeof createAdminSchema>;
export type UpdateAdminFormData = z.infer<typeof updateAdminSchema>;
export type UpdatePasswordAdminFormData = z.infer<typeof updatePasswordAdminSchema>;

