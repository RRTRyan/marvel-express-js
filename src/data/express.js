import express from 'express'
import { readFile } from 'fs'
import cors from 'cors'
import { json } from 'stream/consumers'
const app = express()

app.use(cors())
app.listen(9000, '127.0.0.1')

let charactersList

function fetchCharactersList() {
    readFile('./src/data/user.json', 'utf-8', (err, data) => {
        if (err) {
            return json("Failed to read characters file")
        }
        try {
            charactersList = JSON.parse(data)
        } catch {
            return json("Failed to parse data from characters file")
        }
    })
}

fetchCharactersList()

// GET /characters ==> Get all characters
// POST /characters ==> Create a new character
// GET /characters/:id ==> Get a character by ID
// PUT /characters/:id ==> Update a character by ID
// DELETE /characters/:id ==> Delete a character by ID

app.get('/characters', (req, res) => {
    if (!charactersList) fetchCharactersList()
    try {
        const characters = charactersList
        res.status(200).json(characters)
    } catch {
        res.status(500).json("Failed to parse data from characters file")
    }
})

app.get('/characters/:id', (req, res) => {
    if (!charactersList) fetchCharactersList()
    try {
        const characters = charactersList
        for (const character of characters["characters"]) {
            if (character["id"] == req.params["id"]) {
                return res.status(200).json(character)
            }
        }
        res.status(400).json("No such character")
    } catch {
        res.status(500).json("Failed to parse data from characters file")
    }
})

app.post('/characters', (req, res) => {
    const requiredCharacterField = ["id", "name", "realName", "universe"]

    for (const requiredField of requiredCharacterField) {
        let isValid = false
        for (const field in req.query) {
            if (field == requiredField) {
                isValid = true
                break
            }
        };
        if (!isValid) return res.status(400).json("Invalid character information")
    }

    if (!charactersList) fetchCharactersList()
    try {
        const characters = charactersList
        for (const characterID of characters['characters']) {
            if (characterID["id"] == req.query["id"]) return res.status(400).json("Character ID already exists")
        }
        characters['characters'].push(req.query)
        charactersList = characters
        res.status(201).json(characters)
    } catch {
        res.status(500).json("Failed to parse data from characters file")
    }
})

app.put('/characters/:id', (req, res) => {
    if (!charactersList) fetchCharactersList()
    try {
        const characters = charactersList
        for (const character of characters["characters"]) {
            if (character["id"] == req.params["id"]) {
                let newData = Object.keys(req.query)
                newData.forEach(field => {
                    if (field in character) {
                        character[field] = req.query[field]
                    }
                })
                charactersList = characters
                return res.status(200).json(character)
            }
        }
        res.status(400).json("Specified character not existing")
    } catch {
        res.status(500).json("Failed to parse data from characters file")
    }
})

app.delete('/characters/:id', (req, res) => {
    if (!charactersList) fetchCharactersList()
    try {
        const characters = charactersList
        for (let i = 0; i < characters["characters"].length; i++) {
            if (characters["characters"][i]["id"] == req.params["id"]) {
                characters["characters"].splice(i, 1)
                charactersList = characters
                return res.status(200).json(characters)
            }
        }
        res.status(400).json("Specified character not existing")
    } catch {
        res.status(500).json("Failed to parse data from characters file")
    }
})
