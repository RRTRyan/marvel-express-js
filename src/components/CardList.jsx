import ListCard from "./ListCard"

export default function CardList({ characters, pageReload }) {
    
    return (
        <div className="lg:w-7/10 w-full h-min-[100px] h-fit m-2 py-5 rounded-[10px] flex flex-row flex-wrap gap-5 justify-center items-center">
            {characters["characters"].map((character) => {
                return <ListCard character={character} pageReload={pageReload}/>
            })}
        </div>
    )
}