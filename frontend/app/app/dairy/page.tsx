'use client';

import { ArrowLeftIcon, ArrowRightIcon, PlusIcon, SparklesIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { getNotesByMonth } from "@/actions/notes";
import { CheckMonthDialog } from "@/app/app/check-month-dialog";

const DairyPage = () => {
    const currentDate = new Date();
    const [date, setDate] = useState(currentDate);
    const [notes, setNotes] = useState([]);

    const month = date.toLocaleString('pl-PL', { month: 'long' });
    const year = date.getFullYear();

    const fetchNotes = async (selectedDate: Date) => {
        try {
            const response = await getNotesByMonth(selectedDate);
            setNotes(response);
        } catch (error) {
            console.error("Error fetching notes:", error);
        }
    };

    const nextMonth = () => {
        setDate((prevDate) => new Date(prevDate.getFullYear(), prevDate.getMonth() + 1, 1));
    };

    const prevMonth = () => {
        setDate((prevDate) => new Date(prevDate.getFullYear(), prevDate.getMonth() - 1, 1));
    };

    useEffect(() => {
        fetchNotes(date);
    }, [date]);

    return (
        <>
        <motion.div 
            className="w-full space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="relative w-full flex items-center justify-center">
                <motion.h1 
                    className="text-center text-3xl"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    Pamiętnik
                </motion.h1>
                <Link href="/app/dairy/new">
                    <PlusIcon className="absolute right-1 top-1 size-8 cursor-pointer rounded-full hover:bg-gradient-1" />
                </Link>
            </div>

            <motion.div 
                className="text-center text-white/90 flex justify-between items-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
            >
                <ArrowLeftIcon className="size-8 cursor-pointer" onClick={prevMonth} />
                <p>
                    <span className="font-bold capitalize">{month} </span>
                    {year}
                </p>
                <ArrowRightIcon className="size-8 cursor-pointer" onClick={nextMonth} />
            </motion.div>

            <motion.div 
                className="space-y-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
            >
                {notes.length > 0 ? (
                    notes.map((note: {
                        id: string;
                        title: string;
                        day: Date;
                    }, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1, duration: 0.3 }}
                        >
                            <Link href={`/app/dairy/${note.id}`} className="flex bg-gray-400/10 rounded-lg cursor-pointer" >
                                <div className="flex flex-col items-center justify-center bg-gradient-1/70 py-2 px-4 rounded-l-lg">
                                    <p className="font-bold text-lg">{new Date(note.day).getDate()}</p>
                                    <p className="uppercase">{new Date(note.day).toLocaleString('pl-PL', { weekday: 'short' })}</p>
                                </div>
                                <div className="p-3">{note.title}</div>
                            </Link>
                        </motion.div>
                    ))
                ) : (
                    <motion.p
                        className="text-center text-white/70"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5, duration: 0.5 }}
                    >
                        Brak wpisów na ten miesiąc.
                    </motion.p>
                )}
            </motion.div>
        </motion.div>

        {notes.length > 0 && (
            <motion.div 
                className="fixed flex p-5 bottom-24 w-full items-center justify-center -ml-5"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
            >
                <CheckMonthDialog date={date}>
                    <div
                        className="flex items-center justify-center space-x-2 py-2 px-4 rounded-xl bg-gradient-1/70">
                        <SparklesIcon className="size-6 text-yellow-500"/>
                        <p>Zbadaj swój miesiąc</p>
                        <SparklesIcon className="size-6 text-yellow-500"/>
                    </div>
                </CheckMonthDialog>
            </motion.div>
        )}
        </>
    );
};

export default DairyPage;
