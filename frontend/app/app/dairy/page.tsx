'use client';

import { ArrowLeftIcon, ArrowRightIcon, PlusIcon, SparklesIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { useState, useEffect } from "react";
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
        <div className="w-full space-y-6">
            <div className="relative w-full flex items-center justify-center">
                <h1 className="text-center text-3xl">Pamiętnik</h1>
                <Link href="/app/dairy/new">
                    <PlusIcon className="absolute right-1 top-1 size-8 cursor-pointer rounded-full hover:bg-gradient-1" />
                </Link>
            </div>

            <div className="text-center text-white/90 flex justify-between items-center">
                <ArrowLeftIcon className="size-8 cursor-pointer" onClick={prevMonth} />
                <p>
                    <span className="font-bold capitalize">{month} </span>
                    {year}
                </p>
                <ArrowRightIcon className="size-8 cursor-pointer" onClick={nextMonth} />
            </div>

            <div className="space-y-4">
                {notes.length > 0 ? (
                    notes.map((note: {
                        id: string;
                        title: string;
                        day: Date;
                    }, index) => (
                        <Link href={`/app/dairy/${note.id}`} key={index} className="flex bg-gray-400/10 rounded-lg cursor-pointer" >
                            <div className="flex flex-col items-center justify-center bg-gradient-1/70 py-2 px-4 rounded-l-lg">
                                <p className="font-bold text-lg">{new Date(note.day).getDate()}</p>
                                <p className="uppercase">{new Date(note.day).toLocaleString('pl-PL', { weekday: 'short' })}</p>
                            </div>
                            <div className="p-3">{note.title}</div>
                        </Link>
                    ))
                ) : (
                    <p className="text-center text-white/70">Brak wpisów na ten miesiąc.</p>
                )}
            </div>
                </div>

            {notes.length > 0 && (
                <div className="fixed flex p-5 bottom-24 w-full items-center justify-center -ml-5">
                    <CheckMonthDialog date={date}>
                        <div
                            className="flex items-center justify-center space-x-2 py-2 px-4 rounded-xl bg-gradient-1/70">
                            <SparklesIcon className="size-6 text-yellow-500"/>
                            <p>Zbadaj swój miesiąc</p>
                            <SparklesIcon className="size-6 text-yellow-500"/>
                        </div>
                    </CheckMonthDialog>
                </div>
            )}
        </>
            );
            };

            export default DairyPage;
