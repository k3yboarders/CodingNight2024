import { PlusIcon } from "@heroicons/react/24/solid"
import Link from "next/link"
import { PrimaryButton } from "./ui/primary-button"

export const FloatingButton = (props: Readonly<{label: string}>) => {
    return (
        <div className="fixed right-5 bottom-5">
            <Link href="/app/notes/new">
            <PrimaryButton>
                <PlusIcon className="size-6 text-foreground" />
                <p className="ml-2">
                    {props.label}
                </p>
            </PrimaryButton>
            </Link>
        </div>
    )
}