import { InformationCircleIcon, PencilIcon } from "@heroicons/react/24/solid"
import { IconButton } from "./ui/icon-button"

export const NoteCard = (props: Readonly<{ content: string }>) => {
    return (
        <div className="from-gradient-1 to-gradient-2 bg-gradient-to-b p-1 rounded-xl">
            <div className="flex flex-col justify-between text-center bg-background-secondary rounded-xl h-full">
                <p className="m-3">
                    {props.content}
                </p>
                <div className="flex flex-row justify-between w-full p-3">
                    <IconButton icon={<InformationCircleIcon/>}/>
                    <IconButton icon={<PencilIcon/>}/>
                </div>
            </div>
        </div>

    )
}