"use client";;
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import BarChart from "./bar-chart";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState, useEffect, useCallback } from "react";
import { getSleepAnalysis, getSleepRecords } from "@/actions/sleep-tracker";
import { SleepAnalysis } from "@/types";

const PageContent = () => {
    const labels = ['Pon', 'Wt', 'Śr', 'Czw', 'Pt', 'Sob', 'Niedz'];

    const [records, setRecords] = useState([]);
    const [data, setData] = useState([]);
    const [from, setFrom] = useState(new Date());
    const [to, setTo] = useState(new Date());
    const [analysis, setAnalysis] = useState<SleepAnalysis | null>(null);

    const fetchRecords = useCallback(async (romDate: Date, toDate: Date) => {
        try {
            const response = await getSleepRecords();
            console.log(response);
            const filtered = response.filter((record) => {
                const recordDateTo = new Date(record.to);
                return recordDateTo >= from && recordDateTo <= to;
            });
            const data1 = [];
            for (let i = 0; i < 7; i++) {
                const existingRecord = filtered.find((record) => {
                    const recordDate = new Date(record.to);
                    return recordDate.getDay() === i;
                });
                console.log(i, existingRecord);
                if (existingRecord) {
                    const difference = new Date(existingRecord.to).getTime() - new Date(existingRecord.from).getTime();
                    data1.push((difference / 1000 / 60 / 60).toFixed(2));
                } else {
                    data1.push(0);
                }
            }
            console.log(data1);
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
                className="flex flex-col bg-gray-400/10 rounded-lg p-6 w-full mt-5 gap-2"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
            >
                <h1 className="text-2xl text-center">Analiza snu</h1>
                <p className="text-white/90 text-center">
                    {analysis?.generatedAnalysis}
                </p>
                {!analysis && (
                    <button className="w-full bg-gradient-1/70 text-white py-2 px-4 rounded-xl hover:bg-gradient-1/80 flex items-center justify-center space-x-2" onClick={() => fetchAnalysis(true)}>
                        Wygeneruj analizę snu
                    </button>
                )}

            </motion.div>
        </div>
    )
};

export default PageContent;