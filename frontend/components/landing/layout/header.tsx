import Link from "next/link";

export const Header = () => {
    return (
        <header className="flex sticky space-x-2 items-center justify-between py-5 px-8 w-full lg:w-2/3 mx-auto">
            <div>
                <h1 className="text-3xl">GrowCalmly</h1>
            </div>
            <div className="flex items-center justify-center space-x-5 font-semibold text-center">
                <Link href="/login">Zaloguj się</Link>
                <Link href="/register" className="rounded-[10rem] p-[2px] bg-gradient-to-r from-gradient-1 to-gradient-2">
                    <div className="px-7 py-3 bg-background rounded-[calc(10rem-2px)]">
                        Utwórz konto
                    </div>
                </Link>
            </div>
        </header>
    )
}
