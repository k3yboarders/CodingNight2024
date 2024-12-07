'use client';

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { DocumentCheckIcon } from "@heroicons/react/24/outline";
import { DairySchema } from "@/schemas/dairy";
import { updateNote } from "@/actions/notes";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

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
        console.log(data, id);
        updateNote(
            data,
            id
        ).then(() => {
            router.push("/app/dairy");
        });
    };

    const variants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
    };

    return (
        <motion.form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4"
            initial="hidden"
            animate="visible"
            transition={{ staggerChildren: 0.2 }}
        >
            <motion.div variants={variants}>
                <input
                    {...register("title")}
                    className="w-full bg-gray-400/5 p-4 rounded-xl focus:ring-2 focus:ring-gradient-1/50 focus:outline-none"
                    placeholder="Tytuł"
                />
                {errors.title && (
                    <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
                )}
            </motion.div>

            <motion.div variants={variants}>
                <textarea
                    {...register("content")}
                    className="w-full bg-gray-400/5 p-4 rounded-xl resize-none focus:ring-2 focus:ring-gradient-1/50 focus:outline-none"
                    rows={15}
                    placeholder="Mój dzień rozpoczął się świetnie..."
                />
                {errors.content && (
                    <p className="text-red-500 text-sm mt-1">{errors.content.message}</p>
                )}
            </motion.div>

            <motion.button
                type="submit"
                className="w-full bg-gradient-1/70 text-white py-2 px-4 rounded-xl hover:bg-gradient-1/80 flex items-center justify-center space-x-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            >
                <DocumentCheckIcon className="w-6 h-6" />
                <span className="font-semibold">Zapisz zmiany</span>
            </motion.button>
        </motion.form>
    );
};
