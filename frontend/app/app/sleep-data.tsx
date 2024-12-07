import { SleepData } from "@/types";
import Link from "next/link";

const SleepDataComponent = ({ sleepData }: { sleepData: SleepData }) => {
    if (sleepData && sleepData.hours > 0) {
        const filledPercentage = sleepData.hours > sleepData.expectedSleepTime ? 100 : (sleepData.hours / sleepData.expectedSleepTime) * 100;
        const unfilledPercentage = (100 - +filledPercentage).toFixed(0);
        return (
            <>
                <p className=" text-white/90">Dzisiaj spałeś {sleepData.hours} godzin.</p>
                <div className="flex">
                    <div
                        className="bg-gradient-1/70 p-3 mt-3 rounded-l-lg"
                        style={{ width: `${filledPercentage}%` }}
                    ></div>
                    {+unfilledPercentage > 0 && (
                        <div
                            className="bg-gradient-1/20 p-3 mt-3 rounded-r-lg"
                            style={{ width: `${unfilledPercentage}%` }}
                        ></div>
                    )}
                </div>
            </>
        );
    } else {
        return (
            <>
                <Link className="bg-gradient-1/70 text-white py-2 px-4 w-full rounded-xl hover:bg-gradient-1/80" href="/app/sleep-tracker/add">Opisz swój dzisiejszy sen!</Link>
            </>
        );
    };
};

export default SleepDataComponent;