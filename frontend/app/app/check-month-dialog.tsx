'use client';

import animationData from '@/public/ai-generating.json';
import * as Dialog from "@radix-ui/react-dialog";
import { useEffect, useState } from "react";
import { LottieAnimation } from "@/components/lottie-animation";

export const CheckMonthDialog = ({ date, children }: { date: Date; children: React.ReactNode }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [data, setData] = useState<{ rating: number; description: string } | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (!isOpen) {
            setData(null);
            return;
        }

        (async () => {
            setIsLoading(true);
            // const { data } = await partnershipCompatibility(id);
            // setData(data ?? null);
            // setIsLoading(false);
        })();
    }, [isOpen, date]);

    return (
        <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
            <Dialog.Trigger asChild className="cursor-pointer">{children}</Dialog.Trigger>
            <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-50" />
                <Dialog.Content
                    className="fixed top-1/2 left-1/2 w-11/12 max-w-lg -translate-x-1/2 -translate-y-1/2 bg-background p-6 rounded-lg shadow-lg space-y-4"
                >
                    <Dialog.Title className="text-lg font-bold">Sprawdzanie twojego miesiąca</Dialog.Title>
                    <Dialog.Description className="text-sm text-gray-400">
                        Sprawdź w jakim stopniu Twój miesiąc był produktywny
                    </Dialog.Description>

                    {isLoading ? (
                        <div className="flex items-center space-x-2">
                            <LottieAnimation animationData={animationData} loop={true} autoplay={true} size={4} />
                            <p>Oczekiwanie na odpowiedź sztucznej inteligencji...</p>
                        </div>
                    ) : (
                        <>
                            <p className="text-justify">{data?.description}</p>
                            <div className="flex justify-between items-center w-full">
                                <div className="flex flex-col space-y-1">
                                    <p className="text-sm font-light">
                                        Szacowana ocena AI nie zawsze musi być wiarygodna
                                    </p>
                                </div>
                                <button
                                    className="px-2 py-2 bg-gradient-1/60 text-white text-sm rounded-lg hover:bg-gradient-1/70"
                                    onClick={() => setIsOpen(false)}
                                >
                                    Wróć do wpisów
                                </button>
                            </div>
                        </>
                    )}
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
};
