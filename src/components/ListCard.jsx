export default function ListCard({ character, pageReload }) {

    const currentCardCharacterID = character["id"]
    const SERVER_URL = "http://127.0.0.1:9000"

    function handleCardDelete() {
        fetch(`${SERVER_URL}/characters/${currentCardCharacterID}`, { method: "DELETE" })
        pageReload()
    }

    return (
        <div className="relative text-xl min-w-[280px] h-min-[150px] h-[180px] py-2 px-4 bg-gray-200 shadow-xl rounded-[30px] flex flex-col gap-3 justify-center hover:scale-102 transition-transform">
            <i
                className="fa-solid fa-trash-can absolute p-2 text-red-600 top-6 right-5 rounded-lg hover:bg-red-200 transition-all duration-300"
                onClick={handleCardDelete}
            ></i>
            <p className="font-medium text-xl"><span className="text-lg font-normal">ID:</span> {character["id"]}</p>
            <p className="font-medium text-xl"><span className="text-lg font-normal">Name:</span> {character["name"]}</p>
            <p className="font-medium text-xl"><span className="text-lg font-normal">Real Name:</span> {character["realName"]}</p>
            <p className="font-medium text-xl"><span className="text-lg font-normal">Universe:</span> {character["universe"]}</p>
        </div>
    )
}