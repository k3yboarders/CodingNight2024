"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { DocumentCheckIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion"; // Import framer-motion
import { SleepRecordSchema } from "@/schemas/sleep-record";

const getYesterdayAt2300 = () => {
    const now = new Date();
    const yesterday = new Date(now);
    yesterday.setDate(now.getDate() - 1);
    yesterday.setHours(22, 0, 0, 0);
    return yesterday;
};

const getTodayAt0700 = () => {
    const today = new Date();
    today.setHours(8, 0, 0, 0);
    return today;
};

export const NewForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<z.infer<typeof SleepRecordSchema>>({
        resolver: zodResolver(SleepRecordSchema),
    });

    const onSubmit = (data: z.infer<typeof SleepRecordSchema>) => {
        console.log("Form data:", data);
    };

    // Animacja wejścia poszczególnych elementów
    const fadeInUp = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
        >
            <motion.form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-4"
                initial="initial"
                animate="animate"
            >
                <motion.div {...fadeInUp}>
                    <p className="text-white/90 mb-2">Spałem od</p>
                    <input
                        type="datetime-local"
                        {...register("from")}
                        defaultValue={getYesterdayAt2300().toISOString().slice(0, 16)}
                        className="w-full bg-gray-400/5 p-4 rounded-xl focus:ring-2 focus:ring-gradient-1/50 focus:outline-none"
                    />
                    {errors.from && (
                        <p className="text-red-500 text-sm mt-1">{errors.from.message}</p>
                    )}
                </motion.div>

                <motion.div {...fadeInUp}>
                    <p className="text-white/90 mb-2">Spałem do</p>
                    <input
                        type="datetime-local"
                        {...register("to")}
                        defaultValue={getTodayAt0700().toISOString().slice(0, 16)}
                        className="w-full bg-gray-400/5 p-4 rounded-xl focus:ring-2 focus:ring-gradient-1/50 focus:outline-none"
                    />
                    {errors.to && (
                        <p className="text-red-500 text-sm mt-1">{errors.to.message}</p>
                    )}
                </motion.div>

                <motion.div {...fadeInUp}>
                    <p className="text-white/90 mb-2">Jak Ci się spało?</p>
                    <textarea
                        {...register("content")}
                        className="w-full bg-gray-400/5 p-4 rounded-xl resize-none focus:ring-2 focus:ring-gradient-1/50 focus:outline-none"
                        rows={10}
                        placeholder="Miałem dzisiaj świetny sen..."
                    />
                    {errors.content && (
                        <p className="text-red-500 text-sm mt-1">{errors.content.message}</p>
                    )}
                </motion.div>

                <motion.div {...fadeInUp}>
                    <button
                        type="submit"
                        className="w-full bg-gradient-1/70 text-white py-2 px-4 rounded-xl hover:bg-gradient-1/80 flex items-center justify-center space-x-2"
                    >
                        <DocumentCheckIcon className="w-6 h-6" />
                        <span className="font-semibold">Dodaj wpis</span>
                    </button>
                </motion.div>
            </motion.form>
        </motion.div>
    );
};
