'use client';

import * as AlertDialog from "@radix-ui/react-alert-dialog";
import { useState } from "react";

interface AlertDialogProps {
    children: React.ReactNode;
    title: string;
    content: string;
    cancelText: string;
    confirmText: string;
    onConfirm: () => void;
    confirmColor?: string;
}

export const AlertDialogComponent = ({
                                         children,
                                         title,
                                         content,
                                         cancelText,
                                         confirmText,
                                         onConfirm,
                                         confirmColor = "bg-red-600",
                                     }: AlertDialogProps) => {
    const [open, setOpen] = useState(false);

    const handleConfirm = () => {
        onConfirm();
        setOpen(false);
    };

    return (
        <AlertDialog.Root open={open} onOpenChange={setOpen}>
            <AlertDialog.Trigger asChild className="cursor-pointer">
                {children}
            </AlertDialog.Trigger>
            <AlertDialog.Portal>
                <AlertDialog.Overlay className="fixed inset-0 bg-black bg-opacity-50" />
                <AlertDialog.Content
                    className="fixed top-1/2 left-1/2 w-full max-w-md -translate-x-1/2 -translate-y-1/2 bg-background p-6 rounded-lg shadow-lg space-y-4"
                >
                    <AlertDialog.Title className="text-lg font-semibold text-white">
                        {title}
                    </AlertDialog.Title>
                    <AlertDialog.Description className="text-sm text-white">
                        {content}
                    </AlertDialog.Description>
                    <div className="flex justify-end gap-4">
                        <AlertDialog.Cancel asChild>
                            <button
                                onClick={() => setOpen(false)}
                                className="px-4 py-2 text-sm font-medium text-white rounded-lg focus:outline-none hover:font-semibold"
                            >
                                {cancelText}
                            </button>
                        </AlertDialog.Cancel>
                        <AlertDialog.Action asChild>
                            <button
                                onClick={handleConfirm}
                                className={`px-4 py-2 text-sm font-medium text-white rounded-lg hover:brightness-110 focus:outline-none ${confirmColor}`}
                            >
                                {confirmText}
                            </button>
                        </AlertDialog.Action>
                    </div>
                </AlertDialog.Content>
            </AlertDialog.Portal>
        </AlertDialog.Root>
    );
};
