'use client';

import * as z from "zod";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { login } from "@/actions/auth";
import { LoginSchema } from "@/schemas/login";
import Link from "next/link";
import { redirect } from "next/navigation";

export const LoginForm = () => {
    const [error, setError] = useState<string | null>("");
    const [success, setSuccess] = useState<string | null>("");
    const [isPending, startTransition] = useTransition();

    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit = (values: z.infer<typeof LoginSchema>) => {
        setError("");
        setSuccess("");

        startTransition(() => {
            login(values)
                .then((data) => {
                    setError(data.error);
                    setSuccess(data.success);
                    setTimeout(() => {
                        redirect("/app");
                    }, 1000);
                })
                .catch(() => {
                    setError("Cos poszło nie tak!");
                });
        });
    };

    return (
        <div className="rounded-[3rem] max-w-md p-[2px] bg-gradient-to-r from-gradient-1 to-gradient-2">
        <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 p-10 shadow-md bg-background rounded-[calc(3rem-2px)]"
        >
            <h1 className="text-center text-3xl">Zaloguj się do GrowCalmly</h1>
            <div className="mb-4">
                <label
                    htmlFor="email"
                    className="block text-sm font-medium text-white"
                >
                    E-mail
                </label>
                <input
                    {...form.register("email")}
                    disabled={isPending}
                    placeholder="example@example.com"
                    type="email"
                    id="email"
                    className="mt-2 block w-full px-4 py-2 border border-gradient-1 rounded-xl shadow-sm sm:text-sm bg-transparent focus:outline-none focus:border-2"
                />
                {form.formState.errors.email && (
                    <p className="text-red-500 text-sm mt-1">
                        {form.formState.errors.email.message}
                    </p>
                )}
            </div>

            <div className="mb-4">
                <label
                    htmlFor="password"
                    className="block text-sm font-medium text-white"
                >
                    Hasło
                </label>
                <input
                    {...form.register("password")}
                    disabled={isPending}
                    placeholder="******"
                    type="password"
                    id="password"
                    className="mt-2 block w-full px-4 py-2 border border-gradient-1 rounded-xl shadow-sm sm:text-sm bg-transparent focus:outline-none focus:border-2"
                />
                {form.formState.errors.password && (
                    <p className="text-red-500 text-sm mt-2">
                        {form.formState.errors.password.message}
                    </p>
                )}
            </div>

            {error && (
                <div className="text-red-500 text-sm mb-4 text-center rounded">
                    {error}
                </div>
            )}
            {success && (
                <div className="text-green-500 text-sm mb-4 text-center rounded">
                    {success}
                </div>
            )}

            <button
                type="submit"
                className="w-full rounded-[3rem] p-[2px] bg-gradient-to-r from-gradient-2 to-gradient-1"
                disabled={isPending}
            >
                <div className="p-2 bg-background rounded-[calc(3rem-2px)]">
                    {isPending ? "Logowanie..." : "Zaloguj się"}
                </div>
            </button>

            <div className="text-center space-y-2">
                <Link href="/register" className="block">
                    Nie masz konta?
                    <span className="font-semibold"> Zarejestruj się</span>
                </Link>
                <Link href="/reset-password" className="block">
                    Zapomniałeś/aś hasła?
                    <span className="font-semibold"> Zresetuj je</span>
                </Link>
            </div>
        </form>
        </div>
    );
};
