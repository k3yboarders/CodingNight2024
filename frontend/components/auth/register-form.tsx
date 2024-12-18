'use client';

import * as z from "zod";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerUser } from "@/actions/auth";
import { RegisterSchema } from "@/schemas/register";
import Link from "next/link";
import { redirect } from "next/navigation";
import { motion } from "framer-motion";

export const RegisterForm = () => {
    const [error, setError] = useState<string | null>("");
    const [success, setSuccess] = useState<string | null>("");
    const [isPending, startTransition] = useTransition();

    const form = useForm<z.infer<typeof RegisterSchema>>({
        resolver: zodResolver(RegisterSchema),
        defaultValues: {
            email: "",
            username: "",
            password: "",
        },
    });

    const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
        setError("");
        setSuccess("");

        startTransition(() => {
            registerUser(values)
                .then((data) => {
                    if (data.error) {
                        setError(data.error);
                    } else {
                        setSuccess("Rejestracja zakończona sukcesem");
                        setTimeout(() => {
                            redirect("/login");
                        }, 1000);
                    }
                })
                .catch(() => {
                    setError("Coś poszło nie tak! Spróbuj ponownie później.");
                });
        });
    };

    return (
        <motion.div
            className="rounded-[3rem] max-w-md p-[2px]"
            initial={{opacity: 0, y: 50}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.5}}
        >
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6 p-6 shadow-md bg-background rounded-[calc(3rem-2px)] sm:p-10"
            >
                <h1 className="text-center text-3xl">Dołącz do GrowCalmly</h1>
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
                        className="mt-2 block w-full px-4 py-2 border border-gradient-1 rounded-xl shadow-sm sm:text-sm bg-transparent focus:outline-none focus:border-2 focus:ring-2 focus:ring-gradient-1"
                    />
                    {form.formState.errors.email && (
                        <p className="text-red-500 text-sm mt-1">
                            {form.formState.errors.email.message}
                        </p>
                    )}
                </div>

                <div className="mb-4">
                    <label
                        htmlFor="username"
                        className="block text-sm font-medium text-white"
                    >
                        Nazwa użytkownika
                    </label>
                    <input
                        {...form.register("username")}
                        disabled={isPending}
                        placeholder="janekkowalski"
                        type="text"
                        id="username"
                        className="mt-2 block w-full px-4 py-2 border border-gradient-1 rounded-xl shadow-sm sm:text-sm bg-transparent focus:outline-none focus:border-2 focus:ring-2 focus:ring-gradient-1"
                    />
                    {form.formState.errors.username && (
                        <p className="text-red-500 text-sm mt-1">
                            {form.formState.errors.username.message}
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
                        className="mt-2 block w-full px-4 py-2 border border-gradient-1 rounded-xl shadow-sm sm:text-sm bg-transparent focus:outline-none focus:border-2 focus:ring-2 focus:ring-gradient-1"
                    />
                    {form.formState.errors.password && (
                        <p className="text-red-500 text-sm mt-2">
                            {form.formState.errors.password.message}
                        </p>
                    )}
                </div>

                {error && (
                    <motion.div
                        className="text-red-500 text-sm mb-4 text-center rounded"
                        initial={{opacity: 0}}
                        animate={{opacity: 1}}
                        transition={{duration: 0.3}}
                    >
                        {error}
                    </motion.div>
                )}
                {success && (
                    <motion.div
                        className="text-green-500 text-sm mb-4 text-center rounded"
                        initial={{opacity: 0}}
                        animate={{opacity: 1}}
                        transition={{duration: 0.3}}
                    >
                        {success}
                    </motion.div>
                )}

                <button
                    type="submit"
                    className="w-full rounded-[3rem] p-[2px] bg-gradient-to-r from-gradient-2 to-gradient-1"
                    disabled={isPending}
                >
                    <div className="p-2 bg-background rounded-[calc(3rem-2px)]">
                        {isPending ? "Rejestracja..." : "Zarejestruj się"}
                    </div>
                </button>

    <motion.div
        className="text-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                >
                    <Link href="/login" className="block">
                        Masz już konto?
                        <span className="font-semibold"> Zaloguj się</span>
                    </Link>
                </motion.div>
            </form>
        </motion.div>
    );
};
