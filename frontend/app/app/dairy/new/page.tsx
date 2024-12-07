'use client'

import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import { TrashIcon } from "@heroicons/react/24/outline";
import { DairyForm } from "@/components/app/dairy/dairy-form";
import { AlertDialogComponent } from "@/components/alert-dialog";
import { redirect } from "next/navigation";

const DairyNew = () => {
    const currentDate = new Intl.DateTimeFormat('pl-PL', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    }).format(new Date());

    return (
        <div className="w-full space-y-6 mb-24">
            <div className="relative w-full">
                <AlertDialogComponent title="Wyjście" content="Czy jesteś wyjść bez zapisywania?" cancelText="Wróć do wpisu" confirmText="Wyjdź" onConfirm={() => redirect("/app/dairy")} >
                    <ArrowLeftIcon className="absolute left-1 top-1/2 transform -translate-y-1/2 size-9 cursor-pointer hover:bg-gradient-1 rounded-full p-1" />
                </AlertDialogComponent>
                <h1 className="text-center text-3xl">Nowy wpis</h1>
                <div className="absolute right-1 top-1/2 transform -translate-y-1/2 flex space-x-2">
                    <AlertDialogComponent title="Usuń wpis" content="Czy jesteś pewien/a usunięcia wpisu?" cancelText="Wróć do wpisu" confirmText="Usuń" onConfirm={() => redirect("/app/dairy")} >
                        <TrashIcon className="size-9 cursor-pointer rounded-full hover:bg-gradient-1 p-1" />
                    </AlertDialogComponent>
                </div>
            </div>

            <h2 className="text-center">{currentDate}</h2>

            <DairyForm />
        </div>
    );
};

export default DairyNew;
