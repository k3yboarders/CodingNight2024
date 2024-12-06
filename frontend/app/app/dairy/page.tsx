import { ArrowLeftIcon, ArrowRightIcon, PlusIcon } from "@heroicons/react/24/solid";

const DairyPage = () => {
    return (
        <div className="w-full">
            <div className="relative w-full flex items-center justify-center">
                <h1 className="text-center text-3xl">Pamiętnik</h1>
                <PlusIcon className="absolute right-1 top-1 size-8 cursor-pointer rounded-full hover:bg-gradient-1"/>
            </div>

            <div className="text-center mt-5 text-white/90 flex justify-between items-center">
                <ArrowLeftIcon className="size-8" />
                <p><span className="font-bold">Styczeń </span>2024</p>
                <ArrowRightIcon className="size-8" />
            </div>

            <div className="flex">
                <div>

                </div>
            </div>
        </div>
    )
}

export default DairyPage;