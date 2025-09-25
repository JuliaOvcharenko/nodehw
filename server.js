const express = require('express')
const fs = require('fs')
const path = require('path')
const moment = require('moment')

let getTime = () => {
    return moment().format('HH:mm:ss')
}

const app = express()

const HOST = "localhost"
const PORT = 8002

const postsPath = path.join(__dirname, "posts.json") 
const posts = JSON.parse(fs.readFileSync(postsPath, 'utf-8'))

app.get('/timestamp', (req, res) => {
    res.json(getTime())
})

app.get('/posts', (req, res) => {
    res.status(200).json(posts)
})

app.get('/posts/:id', (req, res) => {
    const PostId = +req.params.id
    // console.log(PostId)

    if (isNaN(PostId)){
        res.status(400).json("PostId must be a number")
        return
    }

    const post = posts.find((p) => { 
        return p.id === PostId
    }) 
    if (!post) {
        res.status(404).json("No one post with such id")
        return
    }
    res.status(200).json(post)
})

app.listen(PORT, HOST, () => {
    console.log(`Cerver is running on http://localhost:8002`)
})
