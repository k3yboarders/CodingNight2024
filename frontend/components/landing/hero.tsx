'use client';

import { motion } from 'framer-motion';
import { GradientLink } from "@/components/landing/ui/gradient-link";
import { Quote } from '@/types';

export const Hero = ({ quote }: { quote: Quote }) => {
    const fadeIn = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
    };

    const staggerContainer = {
        hidden: {},
        visible: { transition: { staggerChildren: 0.2 } },
    };

    return (
        <motion.div
            className="flex flex-col items-center text-center pt-12 pb-6 px-4 md:pt-14 md:pb-8"
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
        >
            <motion.h1
                className="text-4xl md:text-5xl lg:text-6xl leading-snug md:leading-tight font-bold"
                variants={fadeIn}
            >
                Transformuj swoje emocje w wewnętrzny
                <span className="ml-2 bg-gradient-to-r from-gradient-1 to-gradient-2 bg-clip-text text-transparent">
                    spokój i rozwój
                </span>
            </motion.h1>
            <motion.p
                className="text-base md:text-lg lg:text-xl mt-6 md:mt-8 max-w-md md:max-w-2xl"
                variants={fadeIn}
            >
                Przekształć codzienne refleksje w siłę napędową swojego rozwoju.
                GrowCalmly automatycznie śledzi Twoje emocje, organizuje je i dostarcza spersonalizowane wskazówki, pomagając Ci budować pozytywne nawyki i osiągnąć harmonię mentalną.
            </motion.p>
            <motion.div
                className="mt-6 md:mt-8 flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-6"
                variants={fadeIn}
            >
                <GradientLink href="/app">
                    Rozpocznij swoją przygodę
                </GradientLink>
                <GradientLink href="https://github.com/k3yboarders" external>
                    Wspieraj nas
                </GradientLink>
            </motion.div>
            <motion.div
                className="mt-6 md:mt-8 text-sm md:text-lg lg:text-xl"
                variants={fadeIn}
            >
                <p className="italic">&quot;{quote.content}&quot;</p>
                <p className="font-semibold mt-2">- {quote.author}</p>
            </motion.div>
        </motion.div>
    );
};
