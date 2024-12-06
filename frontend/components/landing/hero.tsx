import { GradientLink } from "@/components/landing/ui/gradient-link";

export const Hero = () => {
    return (
        <div className="flex flex-col items-center text-center pt-14 pb-8">
            <h1 className="text-5xl md:text-6xl leading-tight font-bold text-center">
                Transformuj swoje emocje w wewnętrzny
                <span className="bg-gradient-to-r from-gradient-1 to-gradient-2 bg-clip-text text-transparent"> spokój i rozwój</span>
            </h1>
            <p className="text-xl mt-8 md:w-2/3">
                Przekształć codzienne refleksje w siłę napędową swojego rozwoju.
                GrowCalmly automatycznie śledzi Twoje emocje, organizuje je i dostarcza spersonalizowane wskazówki, pomagając Ci budować pozytywne nawyki i osiągnąć harmonię mentalną.
            </p>
            <div className="mt-8 flex space-x-10">
                <GradientLink href="/app">Rozpocznij swoją przygodę</GradientLink>
                <GradientLink href="https://google.com" external>Wspieraj nas</GradientLink>
            </div>
        </div>
    );
}
