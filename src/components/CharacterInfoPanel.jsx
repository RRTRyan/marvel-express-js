import { useState } from "react"

export default function ({ children, pageReload, setIsModifying }) {

    const SERVER_URL = "http://127.0.0.1:9000"

    const [idValue, setIdValue] = useState('')
    const [nameValue, setNameValue] = useState('')
    const [realNameValue, setRealNameValue] = useState('')
    const [universeValue, setUniverseValue] = useState('')

    function handleSubmit() {
        if (children.toLowerCase() == 'create') {
            fetch(`${SERVER_URL}/characters?id=${idValue}&name=${nameValue}&realName=${realNameValue}&universe=${universeValue}`, { method: "POST" })
        }
        if (children.toLowerCase() == 'modify') {
            let query = ''
            const possibleField = { "name": nameValue, "realName": realNameValue, "universe": universeValue }
            for (const field in possibleField) {
                if (possibleField[field] != "") {
                    query += `&${field}=${possibleField[field]}`
                }
            }
            fetch(`${SERVER_URL}/characters/${idValue}?${query}`, { method: "PUT" })
        }
        pageReload()
    }


    return (
        <div className="w-full p-2 flex flex-col gap-3 items-center text-center">

            <div className="flex flex-row gap-3 text-xl rounded-full border-1 p-1">
                <i
                    class="fa-solid fa-plus p-2 rounded-full hover:bg-green-600 hover:text-white transition-all duration-300"
                    onClick={() => setIsModifying(false)}
                ></i>
                <i
                    class="fa-solid fa-pencil p-2 rounded-full hover:bg-gray-300 transition-all duration-300"
                    onClick={() => setIsModifying(true)}
                ></i>
            </div>
            <h3 className="text-xl font-bold">{children} your character here</h3>
            <div className="w-2/3">
                <p className="text-lg font-medium">ID</p>
                <input
                    value={idValue}
                    id="idCreateInput"
                    type="text"
                    onChange={e => setIdValue(e.target.value)}
                    className="w-full h-[35px] bg-white rounded-lg text-center outline-0 focus:outline-2 outline-gray-400 transition-all"
                    placeholder="Please enter an ID" />
            </div>
            <div className="w-2/3">
                <p className="text-lg font-medium">Name</p>
                <input
                    value={nameValue}
                    type="text"
                    onChange={e => setNameValue(e.target.value)}
                    className="w-full h-[35px] bg-white rounded-lg text-center outline-0 focus:outline-2 outline-gray-400 transition-all"
                    placeholder="Please enter a name" />
            </div>
            <div className="w-2/3">
                <p className="text-lg font-medium">Real Name</p>
                <input
                    value={realNameValue}
                    type="text"
                    onChange={e => setRealNameValue(e.target.value)}
                    className="w-full h-[35px] bg-white rounded-lg text-center outline-0 focus:outline-2 outline-gray-400 transition-all"
                    placeholder="Please enter a real name" />
            </div>
            <div className="w-2/3">
                <p className="text-lg font-medium">Universe</p>
                <input
                    value={universeValue}
                    type="text"
                    onChange={e => setUniverseValue(e.target.value)}
                    className="w-full h-[35px] bg-white rounded-lg text-center outline-0 focus:outline-2 outline-gray-400 transition-all"
                    placeholder="Please enter an universe" />
            </div>
            <div className="flex flex-row gap-2">
                <button onClick={() => setIsModifying(false)} type="button" className="py-2 px-4 text-white font-bold rounded-lg bg-gray-500 hover:scale-103 duration-50 transition-transform">Cancel</button>
                <button onClick={handleSubmit} type="button" className="py-2 px-4 text-white font-bold rounded-lg bg-green-600 hover:scale-103 duration-50 transition-transform">{children}</button>
            </div>
        </div>
    )
} 