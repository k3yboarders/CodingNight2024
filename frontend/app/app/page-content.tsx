import { HomeCard } from "@/components/app/home-card";
import { Quote } from "@/types";
import { BookOpenIcon, FireIcon, MoonIcon, StarIcon } from "@heroicons/react/24/outline";

const PageContent = ({ quote }: { quote: Quote }) => {
    const sleepData = {
        hours: 6,
        expectedHours: 8,
    };
    const filledPercentage = Math.min((sleepData.hours / sleepData.expectedHours) * 100, 100).toFixed(0); // Cap at 100%
    const unfilledPercentage = (100 - +filledPercentage).toFixed(0);
    return (
        <div className="w-full flex flex-col items-center justify-center gap-4">
            <HomeCard title="Cytat na dzisiaj" icon={
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
                </svg>
            }>

                <div className="flex mt-3">
                    <p className=" text-white/90">{quote.content}</p>
                </div>
                <p className=" text-white/80">- {quote.author}</p>
            </HomeCard>
            <HomeCard title="Sen" icon={
                <MoonIcon className="size-6" />
            }>
                <p className=" text-white/90">Dzisiaj spałeś {sleepData.hours} godzin.</p>
                <div className="flex">
                    <div
                        className="bg-gradient-1/70 p-3 mt-3 rounded-l-lg"
                        style={{ width: `${filledPercentage}%` }}
                    ></div>
                    <div
                        className="bg-gradient-1/20 p-3 mt-3 rounded-r-lg"
                        style={{ width: `${unfilledPercentage}%` }}
                    ></div>
                </div>
            </HomeCard>
            <HomeCard title="Pamiętnik" icon={<BookOpenIcon className="size-6" />} endItem={
                <div className="flex gap-2  items-center mb-2">
                    <FireIcon className=" text-orange-600 size-10" />
                    <p className=" text-white/90">9 dni</p>
                </div>
            }>
                <div className="flex flex-col gap-2 items-center mb-2">
                    <p className="text-white/90">Już od 9 dni konsekwentnie prowadzisz swój pamietnik.</p>
                    <button className="bg-gradient-1/70 text-white py-2 px-4 w-full rounded-xl hover:bg-gradient-1/80">Opisz swój dzień!</button>
                </div>
            </HomeCard>
            <HomeCard title="Wyzwanie dnia" icon={<StarIcon className="size-6" />} endItem={
                <div className="flex gap-2  items-center mb-2">
                    <FireIcon className=" text-orange-600 size-10" />
                    <p className=" text-white/90">9 dni</p>
                </div>
            }>
                <div className="flex flex-col gap-2 items-center mb-2">
                    <p className="text-white/90">Już od 9 dni konsekwentnie bierzesz udział w dziennych wyzwaniach.</p>
                    <button className="bg-gradient-1/70 text-white py-2 px-4 w-full rounded-xl hover:bg-gradient-1/80">Weź udział!</button>
                </div>
            </HomeCard>
        </div>
    );
};

export default PageContent;