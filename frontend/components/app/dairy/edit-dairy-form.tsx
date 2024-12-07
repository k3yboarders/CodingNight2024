'use client';

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { DocumentCheckIcon } from "@heroicons/react/24/outline";
import { DairySchema } from "@/schemas/dairy";
import { updateNote } from "@/actions/notes";
import { useRouter } from "next/navigation";

export const EditDairyForm = ({ initialData, id }: { initialData: z.infer<typeof DairySchema>, id: string }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<z.infer<typeof DairySchema>>({
        resolver: zodResolver(DairySchema),
        defaultValues: initialData,
    });

    const router = useRouter();

    const onSubmit = (data: z.infer<typeof DairySchema>) => {
        console.log(data,   id);
        updateNote(
            data,
            id
        ).then(() => {
            router.push("/app/dairy");
        });
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
                <input
                    {...register("title")}
                    className="w-full bg-gray-400/5 p-4 rounded-xl focus:ring-2 focus:ring-gradient-1/50 focus:outline-none"
                    placeholder="Tytuł"
                />
                {errors.title && (
                    <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
                )}
            </div>

            <div>
                <textarea
                    {...register("content")}
                    className="w-full bg-gray-400/5 p-4 rounded-xl resize-none focus:ring-2 focus:ring-gradient-1/50 focus:outline-none"
                    rows={15}
                    placeholder="Mój dzień rozpoczął się świetnie..."
                />
                {errors.content && (
                    <p className="text-red-500 text-sm mt-1">{errors.content.message}</p>
                )}
            </div>

            <button
                type="submit"
                className="w-full bg-gradient-1/70 text-white py-2 px-4 rounded-xl hover:bg-gradient-1/80 flex items-center justify-center space-x-2"
            >
                <DocumentCheckIcon className="w-6 h-6" />
                <span className="font-semibold">Zapisz zmiany</span>
            </button>
        </form>
    );
};
