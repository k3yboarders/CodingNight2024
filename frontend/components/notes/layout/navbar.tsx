import { Divider } from "@/components/landing/ui/divider";
import Link from "next/link";

export const Navbar = () => {
    return (
        <>
        <header className="flex sticky space-x-2 items-center justify-between py-5 px-8 w-full lg:w-2/3 mx-auto">
            <div>
                <h1 className="text-3xl">GrowCalmly</h1>
            </div>
            <div className="flex items-center justify-center space-x-5 font-semibold text-center">
                <Link href="/app/notes">Notatki</Link>
                <Link href="/profile" className="rounded-[10rem] p-[2px] bg-gradient-to-r from-gradient-1 to-gradient-2">
                    <div className="px-3 py-3 bg-background rounded-[calc(10rem-2px)]">
                    </div>
                </Link>
            </div>
        </header>
        <Divider/>
        </>
    )
}
