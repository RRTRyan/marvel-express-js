import ListCard from "./ListCard"

export default function CardList({ characters, pageReload }) {

    console.log(typeof (characters))

    if (typeof (characters) == 'string') return (
        <div className="lg:w-7/10 w-full h-min-[100px] h-fit py-5 flex flex-row flex-wrap gap-5 justify-center items-center">
            <div className="w-fit px-10 py-5 bg-red-200 text-2xl rounded-2xl font-medium">
                <p>{characters}</p>
            </div>
        </div>
    )

    if ("characters" in characters) return (
        <div className="lg:w-7/10 w-full h-min-[100px] h-fit py-5 flex flex-row flex-wrap gap-5 justify-center items-center">
            {characters["characters"].map((character) => {
                return <ListCard character={character} pageReload={pageReload} />
            })}
        </div>
    )

    return (
        <div className="lg:w-7/10 w-full h-min-[100px] h-fit py-5 flex flex-row flex-wrap gap-5 justify-center items-center">
            <ListCard character={characters} pageReload={pageReload} />
        </div>
    )
}