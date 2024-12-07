"use client";
import { SparklesIcon } from "@heroicons/react/24/solid";

;
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import BarChart from "./bar-chart";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState, useEffect, useCallback } from "react";
import { getSleepAnalysis, getSleepRecords,  } from "@/actions/sleep-tracker";
import { SleepAnalysis } from "@/types";

const PageContent = () => {
    const labels = ['Pon', 'Wt', 'Śr', 'Czw', 'Pt', 'Sob', 'Niedz'];

    const getFirstDayOfWeek = (date: Date) => {
        const day = date.getDay();
        const diff = date.getDate() - day + (day === 0 ? -6 : 1);
        date.setDate(diff);
        date.setHours(0, 0, 0, 0);
        return date;
    }

    const getLastDayOfWeek = (date: Date) => {
        const day = date.getDay();
        const diff = date.getDate() - day + (day === 0 ? 0 : 6);
        date.setDate(diff);
        date.setHours(0,0,0,0);
        return date;
    }

    const [records, setRecords] = useState([]);
    const [data, setData] = useState([]);
    const [from, setFrom] = useState(getFirstDayOfWeek(new Date()));
    const [to, setTo] = useState(getLastDayOfWeek(new Date()));
    const [analysis, setAnalysis] = useState<SleepAnalysis | null>(null);
    


    const fetchRecords = useCallback(async (fromDate: Date, toDate: Date) => {
        try {
            const response = await getSleepRecords();
            const filtered = response.filter((record: { from: Date; to: Date; comment: string; }) => {
                const recordDate = new Date(record.to);
                return recordDate >= fromDate && recordDate <= toDate;
            })
            const data1 = Array(7).fill(0);
            filtered.forEach((record: { from: Date; to: Date; comment: string; }) => {
                const dateTo = new Date(record.to);
                const dateFrom = new Date(record.from);

                const diff = dateTo.getTime() - dateFrom.getTime();
                console.log(dateTo.toISOString(), diff);
                const index = (dateTo.getUTCDay() == 0)? 6: dateTo.getUTCDay() - 1;
               data1[index] = (diff / 1000 / 60 / 60).toFixed(2);
            })
            setData(data1);

            setRecords(filtered);
        } catch (error) {
            console.error("Error fetching notes:", error);
        }
    }, [from, to]);

    const fetchAnalysis = useCallback(async (generate: boolean) => {
        try {
            const fromDate = new Date(from);
            fromDate.setHours(0, 0, 0, 0);
            const toDate = new Date(to);
            toDate.setHours(23, 59, 59, 999);
            const response = await getSleepAnalysis({ from: fromDate.toISOString(), to: toDate.toISOString(), generate });
            console.log(response);
            setAnalysis(response[0]);
        } catch (error) {
            console.error("Error fetching notes:", error);
        }
    }, [from, to]);

    const nextWeek = () => {
        const nextFrom = new Date(from);
        nextFrom.setDate(from.getDate() + 7);
        setFrom(nextFrom);
        const nextTo = new Date(to);
        nextTo.setDate(to.getDate() + 7);
        setTo(nextTo);
        setData([]);
        fetchRecords(nextFrom, nextTo);
    };

    const prevWeek = () => {
        const prevFrom = new Date(from);
        prevFrom.setDate(from.getDate() - 7);
        setFrom(prevFrom);
        const prevTo = new Date(to);
        prevTo.setDate(to.getDate() - 7);
        setTo(prevTo);
        setData([]);
        fetchRecords(prevFrom, prevTo);
    };

    useEffect(() => {
        const now = new Date();

        const dayOfWeek = now.getDay();

        const startOfWeek = new Date(now);
        startOfWeek.setDate(now.getDate() - (dayOfWeek === 0 ? 6 : dayOfWeek - 1));
        startOfWeek.setHours(0, 0, 0, 0);

        const endOfWeek = new Date(now);
        endOfWeek.setDate(startOfWeek.getDate() + 6);
        endOfWeek.setHours(23, 59, 59, 999);

        setFrom(startOfWeek);
        setTo(endOfWeek);
    }, []);

    useEffect(() => {
        fetchRecords(from, to);
    }, [fetchRecords, from, to]);

    useEffect(() => {
        fetchAnalysis(false);
    }, [fetchAnalysis, from, to]);

    return (
        <div className="w-full mb-24">
            <div className="relative w-full flex items-center justify-center">
                <h1 className="text-center text-3xl">Monitor snu</h1>
            </div>

            <div className="text-center mt-5 text-white/90 flex justify-between items-center">
                <ArrowLeftIcon className="size-8 cursor-pointer" onClick={prevWeek} />
                <p><span className="font-bold">{from.toLocaleDateString()} - {to.toLocaleDateString()}</span></p>
                <ArrowRightIcon className="size-8 cursor-pointer" onClick={nextWeek} />
            </div>
            <div className="mt-8">
                <div>
                    <BarChart data={data} labels={labels} />
                </div>
            </div>
            <motion.div className="flex justify-center mt-5"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
            >
                <Link
                    className={'flex flex-col items-center justify-center space-y-1 py-2 px-4 rounded-full bg-gradient-1/70'}
                    href="/app/sleep-tracker/add">
                    Dodaj nowy wpis
                </Link>
            </motion.div>
            <motion.div
                className="flex flex-col bg-gray-400/10 rounded-lg p-6 w-full mt-8 gap-2"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
            >
                <h1 className="text-2xl text-center">Analiza snu</h1>
                <p className="text-white/90 text-center">
                    {analysis?.generatedAnalysis}
                </p>
                {!analysis && (
                    <button className="w-full bg-gradient-1/70 text-white py-2 px-4 rounded-xl hover:bg-gradient-1/80 flex items-center justify-center space-x-2 flex" onClick={() => fetchAnalysis(true)}>
                        <SparklesIcon className="size-6 text-yellow-500" />
                       <p>Wygeneruj analizę snu</p>
                        <SparklesIcon className="size-6 text-yellow-500" />
                    </button>
                )}

            </motion.div>
        </div>
    )
};

export default PageContent;