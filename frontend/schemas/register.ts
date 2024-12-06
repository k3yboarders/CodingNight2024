import * as z from "zod";

export const RegisterSchema = z.object({
    email: z.string().email("Nieprawidłowy adres email"),
    username: z.string().min(3, "Nazwa użytkownika musi mieć co najmniej 3 znaki"),
    password: z.string().min(6, "Hasło musi mieć co najmniej 6 znaków"),
});