const express = require('express')
const fs = require('fs')
const path = require('path')

const app = express()

const HOST = "localhost"
const PORT = 8002

const postsPath = path.join(__dirname, "posts.json") 
const posts = JSON.parse(fs.readFileSync(postsPath, 'utf-8'))

app.get('/posts', (req, res) => {
    res.status(200).json(posts)
})

app.listen(PORT, HOST, () => {
    console.log(`Cerver is running on http://localhost:8002`)
})
