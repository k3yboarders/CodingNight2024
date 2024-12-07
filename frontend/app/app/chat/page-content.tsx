"use client";

import { useState } from "react";
import { getPsychologist } from "@/actions/chat";
import { motion } from "framer-motion";

export default function FindPsychologist() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleFindPsychologist = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await getPsychologist();
            const { id } = response;
            if (id) {
                //router.push(`/app/chat/${id}`);
            } else {
                setError("Nie udało się znaleźć psychologa. Spróbuj ponownie później.");
            }
        } catch {
            setError("Wystąpił błąd podczas wyszukiwania psychologa.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <motion.div
            className="w-full flex flex-col items-center justify-center mt-24"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <motion.h1
                className="text-3xl font-bold text-center"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5 }}
            >
                Czat zaufania dla dzieci
            </motion.h1>
            <motion.p
                className="text-center text-white/90 mt-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.2 }}
            >
                Kliknij poniższy przycisk, aby rozpocząć rozmowę z psychologiem.
            </motion.p>
            <motion.button
                onClick={handleFindPsychologist}
                disabled={loading}
                className={`mt-8 py-3 px-6 rounded-full bg-gradient-1/70 text-white font-semibold ${loading ? "opacity-50 cursor-not-allowed" : "hover:bg-gradient-1/80"}`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
            >
                {loading ? "Ładowanie..." : "Znajdź psychologa"}
            </motion.button>
            {error && (
                <motion.p
                    className="text-red-500 mt-4 text-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    {error}
                </motion.p>
            )}
        </motion.div>
    );
}