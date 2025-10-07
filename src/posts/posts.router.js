const express = require('express');
const PostController = require('./posts.controller');

const router = express.Router();

router.get('/posts', PostController.getAllPosts)

router.get('/posts/:id', PostController.getPostById)

router.post('/posts', PostController.createPost)

module.exports = router;