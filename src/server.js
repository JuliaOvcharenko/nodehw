// const fsPromises = require('fs/promises')
// const fsPromises = require('fs/promises')
// const fsPromises = require('fs/promises')
// const fsPromises = require('fs/promises')
// const fsPromises = require('fs/promises')
// const fsPromises = require('fs/promises')
// const fsPromises = require('fs/promises')
// const fsPromises = require('fs/promises')
// const fsPromises = require('fs/promises')
// const fsPromises = require('fs/promises')
const express = require('express')
const PostRouter = require('./posts/posts.router')

let getTime = () => {
    return moment().format('HH:mm:ss')
}

const app = express()
app.use(express.json())

const HOST = "localhost"
const PORT = 8002

app.use('/', PostRouter)

app.get('/timestamp', (req, res) => {
    res.json(getTime())
})

app.listen(PORT, HOST, () => {
    console.log(`Cerver is running on http://localhost:8002`)
})
