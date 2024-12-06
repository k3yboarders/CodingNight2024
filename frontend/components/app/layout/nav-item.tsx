'use client'

import Link from "next/link";
import { usePathname } from "next/navigation";

export interface NavItemProps {
    href: string;
    Icon: React.ElementType;
}

export const NavItem = ({ href, Icon }: Readonly<NavItemProps>) => {
    const pathname = usePathname();
    const isActive = pathname === href;

    return (
        <Link
            href={href}
            className={`flex flex-col items-center justify-center space-y-1 text-sm p-2 rounded-full ${
                isActive ? "bg-gradient-1" : "hover:bg-gradient-1/70"
            }`}
        >
            <Icon className="size-8" />
        </Link>

    )
}