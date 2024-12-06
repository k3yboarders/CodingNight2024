import { ArrowLeftIcon, ArrowRightIcon, PlusIcon } from "@heroicons/react/24/solid";

const DairyPage = () => {
    return (
        <div className="w-full space-y-6">
            <div className="relative w-full flex items-center justify-center">
                <h1 className="text-center text-3xl">Pamiętnik</h1>
                <PlusIcon className="absolute right-1 top-1 size-8 cursor-pointer rounded-full hover:bg-gradient-1"/>
            </div>

            <div className="text-center text-white/90 flex justify-between items-center">
                <ArrowLeftIcon className="size-8 cursor-pointer" />
                <p><span className="font-bold">Styczeń </span>2024</p>
                <ArrowRightIcon className="size-8 cursor-pointer" />
            </div>

            <div className="flex bg-gray-500 rounded-lg">
                <div className="flex flex-col items-center justify-center bg-gray-600 py-2 px-4 rounded-l-lg">
                    <p className="font-bold text-lg">30</p>
                    <p>PON</p>
                </div>

                <div className="p-3">
                    jakis tam tytul
                </div>
            </div>
        </div>
    )
}

export default DairyPage;