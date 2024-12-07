"use client";;
import { PlusIcon, ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import BarChart from "./bar-chart";
import Link from "next/link";

const PageContent = () => {
    const data = [8.5, 7, 4, 6, 5, 8, 7.5];
    const labels = ['2/12', '3/12', '4/12', '5/12', '6/12', '7/12', '8/12'];

    return (
        <div className="w-full">
            <div className="relative w-full flex items-center justify-center">
                <h1 className="text-center text-3xl">Monitor snu</h1>
                <PlusIcon className="absolute right-1 top-1 size-8 cursor-pointer rounded-full hover:bg-gradient-1" />
            </div>

            <div className="text-center mt-5 text-white/90 flex justify-between items-center">
                <ArrowLeftIcon className="size-8" />
                <p><span className="font-bold">02.12.2024 - 08.12.2024 </span></p>
                <ArrowRightIcon className="size-8" />
            </div>
            <div className="mt-8">
                <div>
                    <BarChart data={data} labels={labels} />
                </div>
            </div>
            <div className="flex justify-center mt-5">
                <Link
                    className={'flex flex-col items-center justify-center space-y-1 py-2 px-4 rounded-full bg-gradient-1/70'}
                    href="/app/sleep-tracker/add">
                    Dodaj nowy wpis
                </Link>
            </div>
            <div>
                TODO: Opis tygodnia
            </div>
        </div>
    )
};

export default PageContent;