import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import { AlertDialogWrapper } from "@/components/app/dairy/alert-dialog-wrapper";
import Link from "next/link";
import { EditDairyForm } from "@/components/app/dairy/edit-dairy-form";
import { getNote } from "@/actions/notes";

interface EditDairyPageProps {
    params: {
        id: string;
    }
}

const EditDairyPage = async ({ params }: EditDairyPageProps) => {
    const { id } = await params;

    const dairy = await getNote(id);

    return (
        <div className="w-full space-y-6">
            <div className="relative w-full">
                <Link href={`/app/dairy/${id}`}>
                    <ArrowLeftIcon
                        className="absolute left-1 top-1/2 transform -translate-y-1/2 size-9 cursor-pointer hover:bg-gradient-1 rounded-full p-1"/>
                </Link>
                <h1 className="text-center text-3xl">Edytuj wpis</h1>
                <div className="absolute right-1 top-1/2 transform -translate-y-1/2 flex space-x-2">
                    <AlertDialogWrapper id={id} />
                </div>
            </div>

            <EditDairyForm initialData={dairy} id={id} />
        </div>
    );
}

export default EditDairyPage;