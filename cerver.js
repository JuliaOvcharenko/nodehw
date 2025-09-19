const express = require('express')
const moment = require('moment')

const app = express()

const HOST = "localhost"
const PORT = 8002

let getTime = () => {
    return moment().format('HH:mm:ss')
}


app.get('/timestamp', (req, res) => {
    res.json(getTime())
})

app.listen(PORT, HOST, () => {
    console.log(`Cerver is running on http://localhost:8002`)
})
