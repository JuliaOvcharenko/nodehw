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
import express from 'express'
import moment from 'moment'
import {PostRouter} from './posts/posts.router'

let getTime = () => {
    return moment().format('HH:mm:ss')
}

const app = express()
app.use(express.json())
app.use(PostRouter);

const HOST = "localhost"
const PORT = 8002

app.use('/', PostRouter)

app.get('/timestamp', (req, res) => {
    res.json(getTime())
})

app.listen(PORT, HOST, () => {
    console.log(`Cerver is running on http://localhost:8002`)
})
