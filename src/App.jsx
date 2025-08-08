import { useEffect, useState } from "react"
import CardList from "./components/CardList";

export default function App() {

    const SERVER_URL = "http://127.0.0.1:9000"

    const [charactersList, setCharactersList] = useState(null);
    const [needReload, setNeedReload] = useState(false)

    function pageReload() {
        setNeedReload(true)
    }

    useEffect(() => {
        fetch(`${SERVER_URL}/characters`, { method: "GET" })
            .then(res => res.json())
            .then(res => setCharactersList(res))
            .catch(rej => console.log("Failed to fetch the charachters list " + rej))
        setNeedReload(false)
    }, [needReload])

    if (charactersList) return (
        <div>
            <CardList characters={charactersList} pageReload={pageReload} />
        </div>
    )
}