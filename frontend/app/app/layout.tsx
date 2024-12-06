import { Navbar } from "@/components/notes/layout/navbar";

export default function AppLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
    return (
        <>
            <Navbar />
            <main className="mx-auto px-6 max-w-screen-xl w-full">
                {children}
            </main>
        </>
    );
}
