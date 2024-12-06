import { NewForm } from "@/components/app/sleep-tracker/new";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export default function AddSleepRecordPage() {
    return (
        <div className="w-full space-y-6">
        <div className="relative w-full">
            <Link href="/app/sleep-tracker">
                <ArrowLeftIcon className="absolute left-1 top-1/2 transform -translate-y-1/2 size-9 cursor-pointer hover:bg-gradient-1 rounded-full p-1" />
            </Link>
            <h1 className="text-center text-2xl">Podziel się swoim snem</h1>
        </div>


        <NewForm />
    </div>
    )
};
