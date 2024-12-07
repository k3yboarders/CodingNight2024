import { getRandomQuote } from "@/actions/quotes";
import PageContent from "./page-content";

const AppPage = async () => {
    const quote = await getRandomQuote();
    return <PageContent quote={quote.data} />;
}

export default AppPage;