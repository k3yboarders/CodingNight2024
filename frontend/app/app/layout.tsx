import { Nav } from "@/components/app/layout/nav";

export default function AppLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
    return (
        <>
            <main className="mx-auto p-6 max-w-screen-xl w-full">
                {children}
            </main>
            <Nav />
        </>
    );
}
