export default function ListCard({ character, pageReload }) {

    const currentCardCharacterID = character["id"]
    const SERVER_URL = "http://127.0.0.1:9000"

    function handleCardDelete() {
        fetch(`${SERVER_URL}/characters/${currentCardCharacterID}`, { method: "DELETE" })
        pageReload()
    }

    return (
        <div className="relative text-xl min-w-[280px] h-min-[150px] h-[180px] py-2 px-4 bg-slate-200 shadow-xl rounded-[30px] flex flex-col gap-3 justify-center hover:scale-102 transition-transform">
            <i
                className="fa-solid fa-trash-can absolute p-2 text-red-600 top-6 right-5 rounded-lg hover:bg-red-200 transition-all duration-300"
                onClick={handleCardDelete}
            ></i>
            <p><span className="text-lg font-medium">ID:</span> {character["id"]}</p>
            <p><span className="text-lg font-medium">Name:</span> {character["name"]}</p>
            <p><span className="text-lg font-medium">Real Name:</span> {character["realName"]}</p>
            <p><span className="text-lg font-medium">Universe:</span> {character["universe"]}</p>
        </div>
    )
}