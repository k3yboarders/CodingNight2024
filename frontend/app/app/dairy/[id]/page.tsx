import { getNote } from "@/actions/notes";
import PageContent from "./page-content";

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

    return <PageContent dairy={dairy} id={id} formattedDate={formattedDate} />;
    
};

export default DisplayDairyPage;
