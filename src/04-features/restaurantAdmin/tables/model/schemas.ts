import { z } from 'zod';

export const tableSchema = z.object({
    number: z.string().trim().regex(/^[0-9]*$/, "Должно быть число").max(4, "Максимум 4 символа"),
    seats: z.number("Должно быть число").min(1, "Укажите число мест")
});

export type TableFormData = z.infer<typeof tableSchema>;