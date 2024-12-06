import * as z from "zod";

export const SleepRecordSchema = z.object({
    content: z.string().min(10, "Treść musi mieć co najmniej 10 znaków"),
    from: z.string(),
    to: z.string(),
});