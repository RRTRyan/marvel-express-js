import { useEffect, useState } from "react"
import CardList from "./components/CardList";
import SidePanel from "./components/SidePanel";
import Notification from "./components/Notification";

export default function App() {

    const SERVER_URL = "http://127.0.0.1:9000"

    const [charactersList, setCharactersList] = useState(null);
    const [needReload, setNeedReload] = useState(false)
    const [isModifying, setIsModifying] = useState(false)
    const [notificationContent, setNotificationContent] = useState('')
    
    useEffect(() => {
        setTimeout(() => setNotificationContent(''), 5000)        
    }, [notificationContent])

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
        <div className="flex flex-row justify-evenly p-2">
            <Notification>{notificationContent}</Notification>
            <CardList characters={charactersList} pageReload={pageReload} setIsModifying={setIsModifying} setNotificationContent={setNotificationContent}/>
            <SidePanel pageReload={pageReload} setCharactersList={setCharactersList} isModifying={isModifying} setIsModifying={setIsModifying} setNotificationContent={setNotificationContent}/>
        </div>
    )
}