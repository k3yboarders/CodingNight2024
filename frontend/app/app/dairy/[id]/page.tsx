import { getNote } from "@/actions/notes";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import { AlertDialogWrapper } from "@/components/app/dairy/alert-dialog-wrapper";
import Link from "next/link";
import { SparklesIcon } from "@heroicons/react/24/solid";

interface DisplayDairyPageProps {
    params: {
        id: string;
    }
}

const DisplayDairyPage = async ({ params }: DisplayDairyPageProps) => {
    const { id } = await params;
    const dairy = await getNote(id);

    const formattedDate = new Intl.DateTimeFormat('pl-PL', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    }).format(new Date(dairy.day));

    return (
        <div className="w-full space-y-6 mb-24">
            <div className="relative w-full">
                <Link href="/app/dairy">
                    <ArrowLeftIcon className="absolute left-1 top-1/2 transform -translate-y-1/2 size-9 cursor-pointer hover:bg-gradient-1 rounded-full p-1" />
                </Link>
                <h1 className="text-center text-3xl">Twój wpis</h1>
                <div className="absolute right-1 top-1/2 transform -translate-y-1/2 flex space-x-2">
                    <AlertDialogWrapper id={id} />
                </div>
            </div>

            <div className="space-y-2">
                <h2 className="text-center text-2xl">{dairy.title}</h2>
                <p className="text-center text-white/90">{formattedDate}</p>
            </div>

            <div className="flex items-center justify-center space-x-2 py-2 px-4 rounded-xl bg-gradient-1/70">
                <SparklesIcon className="size-6 text-yellow-500" />
                <p>Zbadaj swój dzień</p>
                <SparklesIcon className="size-6 text-yellow-500" />
            </div>

            <Link href={`/app/dairy/edit/${id}`} className="flex flex-col items-center justify-center space-y-1 py-2 px-4 rounded-xl bg-gradient-1/70">
                Edytuj wpis
            </Link>

            <div className="w-full bg-gray-400/5 p-4 rounded-xl">
                {dairy.content}
            </div>
        </div>
    );
};

export default DisplayDairyPage;
