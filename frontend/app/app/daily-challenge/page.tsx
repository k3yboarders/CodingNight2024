import { getDailyChallenge, getDailyChallengeStreak } from "@/actions/daily-challenges";
import PageContent from "./page-content";

const Page = async () => {
    const dailyChallenge = await getDailyChallenge(new Date());
    const streak = await getDailyChallengeStreak();
    console.log(dailyChallenge, streak);
    return (
        <PageContent dailyChallenge={dailyChallenge} streak={streak.currentStreak} />
    );
};

export default Page;