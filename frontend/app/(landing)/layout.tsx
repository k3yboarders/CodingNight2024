import { Header } from "@/components/landing/layout/header";

export default function LandingLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
    return (
        <>
            <Header />
            <main className="mx-auto px-6 max-w-screen-xl w-full">
                {children}
            </main>
        </>
    );
}
