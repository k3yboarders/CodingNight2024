import { getRandomQuote } from "@/actions/quotes";
import PageContent from "./page-content";
import { getSleepDataByDay } from "@/actions/sleep-tracker";

const AppPage = async () => {
    const quote = await getRandomQuote();
    const sleepData = await getSleepDataByDay({
        date: new Date(),
    });
    return <PageContent quote={quote.data} sleepData={sleepData.data} />;
}

export default AppPage;