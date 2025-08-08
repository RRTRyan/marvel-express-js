export default function Notification( {children} ) {
    if (children) return (
        <div className="p-3 text-center border-2 border-red-600 shadow-lg text-lg bg-red-300 font-medium absolute bottom-10 right-10 rounded-[10px] flex gap-3 items-center justify-center">
            <i class="fa-solid fa-triangle-exclamation text-3xl"/>{children}
        </div>
    )
}