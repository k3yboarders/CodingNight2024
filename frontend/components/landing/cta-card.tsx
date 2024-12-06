import Link from "next/link";
import { ArrowRightIcon } from "@heroicons/react/24/solid";

export const CtaCard = () => {
    return (
        <div className="flex space-x-4 py-8 mx-auto md:w-2/3">
            <div className="min-w-1.5 rounded-[22px] bg-gradient-to-b from-gradient-1 to-gradient-2" />
            <div className="flex flex-col space-y-2 py-2">
                <p className="text-gradient-1 uppercase text-sm font-semibold tracking-[.25rem]">Inteligentna platforma dla Twojego dobrostanu</p>
                <p className="leading-relaxed text-2xl">
                    <span>GrowCalmly</span> to Twoje centrum mentalnej harmonii.
                    <ul className="list-disc ml-8">
                        <li>Automatycznie kategoryzuje Twoje wpisy i emocje,</li>
                        <li>Oferuje spersonalizowane wyzwania do budowania zdrowych nawyków,</li>
                        <li>Wykorzystuje adaptacyjne modele AI, aby dostarczyć precyzyjne wskazówki, jak rozwijać siebie i lepiej radzić sobie ze stresem.</li>
                    </ul>
                </p>
                <Link href="/app" className="text-gradient-1 text-2xl font-semibold flex items-center space-x-2">
                    <span>Zacznij już dziś</span>
                    <ArrowRightIcon className="size-6" />
                </Link>
            </div>
        </div>
    )
}
