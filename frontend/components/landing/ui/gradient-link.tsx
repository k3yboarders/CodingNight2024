import Link from "next/link";

interface GradientLinkProps {
    href: string;
    external?: boolean;
    children: React.ReactNode;
}

export const GradientLink = ({ href, external, children }: Readonly<GradientLinkProps>) => {
    return external ? (
        <a href={href} target="_blank" className="rounded-[10rem] p-[2px] bg-gradient-to-r from-gradient-1 to-gradient-2">
            <div className="px-7 py-3 font-semibold bg-background rounded-[calc(10rem-2px)]">
                {children}
            </div>
        </a>
    ) : (
        <Link href={href} className="rounded-[10rem] p-[2px] bg-gradient-to-r from-gradient-1 to-gradient-2">
            <div className="px-7 py-3 font-semibold bg-background rounded-[calc(10rem-2px)]">
                {children}
            </div>
        </Link>
    )
};
