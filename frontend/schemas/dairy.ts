import * as z from "zod";

export const DairySchema = z.object({
    title: z.string().min(1, "Tytuł jest wymagany"),
    content: z.string().min(10, "Treść musi mieć co najmniej 10 znaków"),
});