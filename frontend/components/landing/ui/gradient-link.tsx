import Link from "next/link";
import { motion } from "framer-motion";

interface GradientLinkProps {
    href: string;
    external?: boolean;
    children: React.ReactNode;
}

export const GradientLink = ({ href, external, children }: Readonly<GradientLinkProps>) => {
    return external ? (
        <motion.a
            href={href}
            target="_blank"
            initial={{ scale: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="rounded-[10rem] p-[2px] bg-gradient-to-r from-gradient-1 to-gradient-2 transition-all duration-300 hover:scale-105 hover:bg-gradient-to-l hover:from-gradient-2 hover:to-gradient-1 active:scale-95"
        >
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="px-7 py-3 font-semibold bg-background rounded-[calc(10rem-2px)]"
            >
                {children}
            </motion.div>
        </motion.a>
    ) : (
        <Link
            href={href}
            className="rounded-[10rem] p-[2px] bg-gradient-to-r from-gradient-1 to-gradient-2 transition-all duration-300 hover:scale-105 hover:bg-gradient-to-l hover:from-gradient-2 hover:to-gradient-1 active:scale-95"
        >
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="px-7 py-3 font-semibold bg-background rounded-[calc(10rem-2px)]"
            >
                {children}
            </motion.div>
        </Link>
    );
};
