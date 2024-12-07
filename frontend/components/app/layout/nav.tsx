'use client'

import { BookOpenIcon, HomeIcon, NewspaperIcon, StarIcon, UserCircleIcon, MoonIcon } from "@heroicons/react/24/outline";
import { NavItem } from "@/components/app/layout/nav-item";

const navItems = [
    { href: "/app", Icon: HomeIcon },
    { href: "/app/dairy", Icon: BookOpenIcon },
    { href: "/app/sleep-tracker", Icon: MoonIcon },
    { href: "/", Icon: StarIcon },
    { href: "/app/articles", Icon: NewspaperIcon },
    { href: "/app/profile", Icon: UserCircleIcon },
]

export const Nav = () => {
    return (
        <div className="fixed flex p-5 bottom-2 w-full items-center justify-center">
            <nav className="bg-[#1f1f28] p-2 rounded-full max-w-screen-sm flex space-x-2">
                {navItems.map(({ href, Icon }, index) => (
                    <NavItem href={href} Icon={Icon} key={index} />
                ))}
            </nav>
        </div>
    )
}