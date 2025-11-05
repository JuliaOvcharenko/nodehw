import express from 'express'
import moment from 'moment'
import {PostRouter} from './posts/posts.router'
import { TagRouter } from "./tags/tag.router";

const app = express()
app.use(express.json())

let getTime = () => {
    return moment().format('HH:mm:ss')
}

app.use("/posts", PostRouter);
app.use("/tags", TagRouter);


app.get('/timestamp', (req, res) => {
    res.json(getTime())
})

const HOST = "localhost"
const PORT = 8002

app.listen(PORT, HOST, () => {
    console.log(`Cerver is running on http://localhost:8002`)
})
