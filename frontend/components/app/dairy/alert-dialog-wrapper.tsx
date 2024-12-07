'use client';

import { AlertDialogComponent } from "@/components/alert-dialog";
import { TrashIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import { deleteNote } from "@/actions/notes";

export const AlertDialogWrapper = ({ id }: { id: string }) => {
    const router = useRouter();

    const handleConfirm = () => {
        deleteNote(id).catch((error) => {
            console.error("Error deleting note:", error);
        });
        router.push("/app/dairy");
    };

    return (
        <AlertDialogComponent
            title="Usuń wpis"
            content="Czy jesteś pewien/a usunięcia wpisu?"
            cancelText="Wróć do wpisu"
            confirmText="Usuń"
            onConfirm={handleConfirm}
        >
            <TrashIcon className="size-9 cursor-pointer rounded-full hover:bg-gradient-1 p-1" />
        </AlertDialogComponent>
    );
};
