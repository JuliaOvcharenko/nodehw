const express = require('express')
const fs = require('fs')
const path = require('path')
const moment = require('moment')
const fsPromises = require('fs/promises')

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

let getTime = () => {
    return moment().format('HH:mm:ss')
}

const app = express()
app.use(express.json())

const HOST = "localhost"
const PORT = 8002

const postsPath = path.join(__dirname, "posts.json") 
const posts = JSON.parse(fs.readFileSync(postsPath, 'utf-8'))

app.get('/timestamp', (req, res) => {
    res.json(getTime())
})

app.get('/posts', (req, res) => {
    take = Number(req.query.take)
    skip = Number(req.query.skip)

    if(!take && !skip){
        res.status(200).json(posts)
        return
    }

    if ((take && isNaN(+take)) || (skip && isNaN(+skip))){
        res.status(400).json("take and skip must be a number")
        return
    }

    if (take < 0 || skip < 0){
        res.status(400).json("take and skip must be a positive number")
        return
    }
    if (skip >= posts.length){
        res.status(200).json([])
        return
    }
    
    if (!take){
        res.status(200).json(posts.slice(skip))
        return
    }
    if (!skip){
        res.status(200).json(posts.slice(0, take))
        return
    }
    res.status(200).json(posts.slice(skip, skip + take))

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


app.post('/posts', async (req, res) => {
    const body = req.body
    const userProduct = {...body, id: posts.length + 1}

    if(!body){
        res.status(422).json("Body?")
        return
    }
    if(!userProduct.name){
        res.status(422).json("Name is required.")
        return
    }

    if(!userProduct.description){
        res.status(422).json("Description is required.")
        return
    }

    if(!userProduct.image){
        res.status(422).json("Image is required.")
        return
    }

    posts.push(userProduct)
    try {
        await fsPromises.writeFile(postsPath, JSON.stringify(posts, null, 4))
        res.status(201).json('Product created')
    } catch (error) {
        console.log(error)
        res.status(500).json("Creation failed")
    }

})


app.listen(PORT, HOST, () => {
    console.log(`Cerver is running on http://localhost:8002`)
})
