"use client";

import { completeDailyChallenge } from "@/actions/daily-challenges";
import { StarIcon } from "@heroicons/react/16/solid";
import { FireIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

const PageContent = ({ streak, dailyChallenge }: any) => {
    const router = useRouter();
    const handleComplete = async () => {
        completeDailyChallenge(dailyChallenge.id).then(() => {
            router.refresh();
        });

    };
    return (
        <div className="w-full flex flex-col items-center justify-center gap-4">
            <motion.div className="flex flex-col items-center gap-2" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.3 }}>
                <FireIcon className="size-24 text-orange-500" />
                <h2 className="text-4xl font-bold text-white/90">{streak}</h2>
            </motion.div>
            <motion.div
                className="flex flex-col bg-gray-400/10 rounded-lg p-6 w-full mt-6"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
            >
                <div className="flex justify-between items-center mb-3">
                    <div className="flex gap-2 items-center">
                        <StarIcon className="size-8" />
                        <h2 className="text-2xl">Wyzwanie dnia</h2>
                    </div>
                </div>
                {dailyChallenge ? (
                    <div className="flex flex-col gap-4">
                        {!dailyChallenge.isCompleted ? (
                            <>
                                <p className="text-white/90 text-lg">{dailyChallenge.title}</p>
                                <p className="text-white/70">{dailyChallenge.description}</p>
                                <button
                                    onClick={handleComplete}
                                    className="bg-gradient-1/70 text-white py-2 px-4 rounded-xl hover:bg-gradient-1/80">
                                    Wykonałem wyzwanie
                                </button>
                            </>
                        ) : (
                            <p className="text-white/90 text-lg">Wykonałeś już dzisiejsze wyzwanie, zapraszamy jutro!</p>
                        )}

                    </div>
                ) : (
                    <p className="text-white/90 text-lg">Brak wyzwania na dzisiaj</p>
                )}
            </motion.div>
        </div>
    );
};

export default PageContent;