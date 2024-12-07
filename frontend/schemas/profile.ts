import * as z from "zod";

export const changeNameSchema = z.object({
    username: z.string().min(3, 'Nazwa użytkownika musi mieć co najmniej 3 znaki'),
});

export const changeSleepHoursSchema = z.object({
    sleepHours: z
        .string()
        .refine((value) => {
            const num = Number(value);
            return num >= 1 && num <= 24;
        }, 'Liczba godzin musi być w zakresie 1-24'),
});

export const changePasswordSchema = z.object({
    oldPassword: z.string().min(6, 'Hasło musi mieć co najmniej 6 znaków'),
    newPassword: z.string().min(6, 'Hasło musi mieć co najmniej 6 znaków'),
});

export const changeEmailSchema = z.object({
    email: z.string().email('Podaj prawidłowy adres email'),
});