'use client';

import { useState } from "react";
import Link from "next/link";

export const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <header className="sticky top-0 z-50 bg-background py-5 px-8 w-full lg:w-2/3 mx-auto flex items-center justify-between">
            <div>
                <h1 className="text-3xl">GrowCalmly</h1>
            </div>
            <button
                className="lg:hidden focus:outline-none w-12 h-12 shadow-lg flex-col items-center justify-center flex rounded-[10rem] p-[2px] border-2 border-gradient-1 transition-all duration-300 hover:scale-105 active:scale-95"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
                <div className="w-6 h-0.5 bg-white mb-1"></div>
                <div className="w-6 h-0.5 bg-white mb-1"></div>
                <div className="w-6 h-0.5 bg-white"></div>
            </button>

            <nav className="hidden lg:flex items-center space-x-5 font-semibold">
                <Link href="/login">Zaloguj się</Link>
                <Link href="/register" className="rounded-[10rem] p-[2px] bg-gradient-to-r from-gradient-1 to-gradient-2">
                    <div className="px-7 py-3 bg-background rounded-[calc(10rem-2px)]">
                        Utwórz konto
                    </div>
                </Link>
            </nav>
            {/* Mobile Menu */}
            <div
                className={`absolute top-full right-0 mt-4 bg-background shadow-lg rounded-lg transform transition-all duration-300 ${isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'
                    } lg:hidden`}
            >
                <div className="flex flex-col space-y-4 p-5 w-56">
                    <Link href="/login" onClick={() => setIsMenuOpen(false)} className="font-semibold text-center">
                        Zaloguj się
                    </Link>
                    <Link
                        href="/register"
                        onClick={() => setIsMenuOpen(false)}
                        className="rounded-[10rem] p-[2px] bg-gradient-to-r from-gradient-1 to-gradient-2 text-center"
                    >
                        <div className="px-7 py-3 bg-background rounded-[calc(10rem-2px)]">
                            Utwórz konto
                        </div>
                    </Link>
                </div>
            </div>
        </header>
    );
};
