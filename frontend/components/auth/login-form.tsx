'use client';

import * as z from "zod";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { login } from "@/actions/auth";

const LoginSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
});

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
                })
                .catch(() => {
                    setError("Something went wrong!");
                });
        });
    };

    return (
        <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 bg-gray-50 p-6 rounded-lg shadow-md max-w-md mx-auto border border-transparent bg-clip-padding"
            style={{
                borderImageSource: "linear-gradient(to right, #6a11cb, #2575fc)",
                borderImageSlice: 1,
            }}
        >
            <div className="mb-4">
                <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                >
                    Email
                </label>
                <input
                    {...form.register("email")}
                    disabled={isPending}
                    placeholder="example@example.com"
                    type="email"
                    id="email"
                    className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    style={{
                        border: "2px solid transparent",
                        backgroundClip: "padding-box",
                        borderImageSource: "linear-gradient(to right, #6a11cb, #2575fc)",
                        borderImageSlice: 1,
                    }}
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
                    className="block text-sm font-medium text-gray-700"
                >
                    Password
                </label>
                <input
                    {...form.register("password")}
                    disabled={isPending}
                    placeholder="******"
                    type="password"
                    id="password"
                    className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    style={{
                        border: "2px solid transparent",
                        backgroundClip: "padding-box",
                        borderImageSource: "linear-gradient(to right, #6a11cb, #2575fc)",
                        borderImageSlice: 1,
                    }}
                />
                {form.formState.errors.password && (
                    <p className="text-red-500 text-sm mt-1">
                        {form.formState.errors.password.message}
                    </p>
                )}
            </div>

            {error && (
                <div className="text-red-500 text-sm mb-4 bg-red-50 p-3 rounded">
                    {error}
                </div>
            )}
            {success && (
                <div className="text-green-500 text-sm mb-4 bg-green-50 p-3 rounded">
                    {success}
                </div>
            )}

            <button
                type="submit"
                className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md shadow-sm font-medium focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 focus:outline-none"
                disabled={isPending}
            >
                Login
            </button>
        </form>
    );
};
