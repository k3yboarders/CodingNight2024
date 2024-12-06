import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import { TrashIcon } from "@heroicons/react/24/outline";
import { DairyForm } from "@/components/app/dairy/dairy-form";
import Link from "next/link";

const DairyNew = () => {
    const currentDate = new Intl.DateTimeFormat('pl-PL', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    }).format(new Date());

    return (
        <div className="w-full space-y-6">
            <div className="relative w-full">
                <Link href="/app/dairy">
                    <ArrowLeftIcon className="absolute left-1 top-1/2 transform -translate-y-1/2 size-9 cursor-pointer hover:bg-gradient-1 rounded-full p-1" />
                </Link>
                <h1 className="text-center text-3xl">Nowy wpis</h1>
                <div className="absolute right-1 top-1/2 transform -translate-y-1/2 flex space-x-2">
                    <Link href="/app/dairy">
                        <TrashIcon className="size-9 cursor-pointer rounded-full hover:bg-gradient-1 p-1" />
                    </Link>
                </div>
            </div>

            <h2 className="text-center">{currentDate}</h2>

            <DairyForm />
        </div>
    );
};

export default DairyNew;
