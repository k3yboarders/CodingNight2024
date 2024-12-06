import React from "react"

export const IconButton = ({ icon }: Readonly<{ icon: React.ReactElement }>) => {
    const modifiedIcon = React.cloneElement(icon, { className: "size-6 text-foreground" })
    return (
        <button className="scale-100 hover:scale-125 transition duration-200 ease-in-out">
            {modifiedIcon}
        </button>
    )
}