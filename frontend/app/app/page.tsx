import { getRandomQuote } from "@/actions/quotes";
import PageContent from "./page-content";
import { getSleepDataByDay } from "@/actions/sleep-tracker";
import { getStreak } from "@/actions/notes";
import { isUserLoggedIn } from "@/actions/auth";
import {redirect} from 'next/navigation';

const AppPage = async () => {

    if (!await isUserLoggedIn())
        redirect('/login');

    const quote = await getRandomQuote();
    const sleepData = await getSleepDataByDay({
        date: new Date(),
    });
    const diaryStreak = await getStreak();
    console.log(sleepData)
    return <PageContent quote={quote.data} sleepData={sleepData.data} diaryStreak={diaryStreak.currentStreak} />;
}

export default AppPage;