"use client";

import { motion } from "framer-motion";
import { AlertDialogWrapper } from "@/components/app/dairy/alert-dialog-wrapper";
import { ArrowLeftIcon, SparklesIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { CheckDayDialog } from "../../check-day-dialog";

const PageContent = ({
    dairy,
    id,
    formattedDate
}: {
    dairy: {
        title: string;
        content: string;
        day: string;
    };
    id: string;
    formattedDate: string;
}) => {
    return (
        <motion.div
            className="w-full space-y-6 mb-24"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
        >
            <div className="relative w-full">
                <Link href="/app/dairy">
                    <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: 0.1 }}
                    >
                        <ArrowLeftIcon className="absolute left-1 top-1/2 transform -translate-y-1/2 size-9 cursor-pointer hover:bg-gradient-1 rounded-full p-1" />
                    </motion.div>
                </Link>
                <motion.h1
                    className="text-center text-3xl"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    Twój wpis
                </motion.h1>
                <motion.div
                    className="absolute right-1 top-1/2 transform -translate-y-1/2 flex space-x-2"
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                >
                    <AlertDialogWrapper id={id} />
                </motion.div>

            </div>
            <motion.div
                className="space-y-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.2 }}
            >
                <h2 className="text-center text-2xl">{dairy.title}</h2>
                <p className="text-center text-white/90">{formattedDate}</p>
            </motion.div>

            <CheckDayDialog id={id}>
                <motion.div
                    className="flex items-center justify-center space-x-2 mb-5 py-2 px-4 rounded-xl bg-gradient-1/70"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <SparklesIcon className="size-6 text-yellow-500" />
                    <p>Zbadaj swój dzień</p>
                    <SparklesIcon className="size-6 text-yellow-500" />
                </motion.div>
            </CheckDayDialog>

            <Link href={`/app/dairy/edit/${id}`}>
                <motion.div
                    className="flex flex-col items-center justify-center space-y-1 mt-3 py-2 px-4 rounded-xl bg-gradient-1/70"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    Edytuj wpis
                </motion.div>
            </Link>

            <motion.div
                className="w-full bg-gray-400/5 p-4 rounded-xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.3 }}
            >
                {dairy.content}
            </motion.div>
        </motion.div>
    );
};

export default PageContent;