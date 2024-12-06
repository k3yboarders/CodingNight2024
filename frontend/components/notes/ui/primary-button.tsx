export const PrimaryButton = ({ children, label }: Readonly<{ children?: React.ReactNode, label?: string }>) => {
    return (
        <button className="scale-100 hover:scale-110 transition duration-200 ease-in-out flex flex-row from-gradient-1 to-gradient-2 bg-gradient-to-r p-2 rounded-full">
            {label !== undefined && <p className="px-3">{label}</p>}
            {children !== undefined && children}
        </button>
    )
}