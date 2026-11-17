import { z } from "zod";

export const restaurantSchema = z.object({
  name: z.string().trim().min(1, "Обязательное поле").max(100, "Не более 100 символов"),
  address: z.string().trim().min(1, "Обязательное поле").max(150, "Не более 150 символов"),
  phone: z.string().trim().min(1, "Обязательное поле").regex(/^\d{9}$/, "Введите 9 цифр."),
  start_time: z.string().trim().min(1, "Обязательное поле").regex(/^\d{2}:\d{2}$/, "Введите время в формате HH:MM"),
  end_time: z.string().trim().min(1, "Обязательное поле").regex(/^\d{2}:\d{2}$/, "Введите время в формате HH:MM"),
});

export type RestaurantFormData = z.infer<typeof restaurantSchema>;
