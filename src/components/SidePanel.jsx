import CharacterInfoPanel from "./CharacterInfoPanel"

export default function SidePanel({ pageReload, setCharactersList, isModifying, setIsModifying }) {

    const SERVER_URL = "http://127.0.0.1:9000"

    let panelMode = ['Create', 'Modify']
    
    function handleSearch() {
        fetch(`${SERVER_URL}/characters/${document.getElementById('searchByID').value}`, { method: "GET" })
        .then((res) => res.json())
        .then(res => setCharactersList(res))
        .then(() => setIsModifying(false))
        .catch(() => pageReload())
    }

    return (
        <div className="lg:w-2/10 w-full h-min-[100px] h-fit py-5 my-5 bg-gray-200 rounded-[10px] flex flex-col gap-7 justify-center items-center">
            <div className="flex flex-row bg-white rounded-full text-xl">
                <input 
                type="text" 
                id="searchByID" 
                className="w-full h-[50px] bg-white rounded-l-full text-center outline-0 focus:outline-2 outline-gray-400 transition-all" 
                placeholder="Search By ID"
                />
                <button 
                type="button" 
                className="text-lg rounded-r-full p-3 border-l-2 border-gray-200"
                onClick={handleSearch}
                >Search</button>
            </div>
            <CharacterInfoPanel pageReload={pageReload} setIsModifying={setIsModifying}>{panelMode[Number(isModifying)]}</CharacterInfoPanel>
        </div>
    )
}