import { Request, Response } from "express";
import { PostService } from "./posts.service";
import { PostControllerContract } from "./posts.types";

export const PostController: PostControllerContract = {
    getAllPosts: async(req, res) => {
        const take = Number(req.query.take);
        const skip = Number(req.query.skip);

        try {
            const result = await PostService.getAllPosts(take, skip);
            res.status(200).json(result);
        } catch (error) {
            console.error(error);
            res.status(500).json("Server Error");
        }
    },

    // В url приходит "id" - string. 
    getPostById: async (req, res) => {
        // Преобразование в число("5" -> 5)
        const PostId = +req.params.id;

        if (isNaN(PostId)) {
            res.status(400).json("PostId must be a number");
            return;
        }

        const post = await PostService.getPostById(PostId);

        if (!post) {
            res.status(404).json("No post with such id");
            return;
        }

        res.status(200).json(post);
    },

    createPost: async (req, res) => {
        const body = req.body;

        if (!body) {
            res.status(422).json("Body?");
            return;
        }

        if (!body.name) {
            res.status(422).json("Name is required.");
            return;
        }

        if (!body.description) {
            res.status(422).json("Description is required.");
            return;
        }

        if (!body.image) {
            res.status(422).json("Image is required.");
            return;
        }

        try {
            const UserPost = await PostService.createPost(body);

            if (!UserPost) {
                res.status(500).json("Creation failed");
                return;
            }

            res.status(201).json(UserPost);

        } catch (error) {
            console.error(error);
            res.status(500).json("Server Error");
        }
    
    },

    // Объясняла почему сделала именно так в 19 строке. 
    updatePost: async (req, res) => {
        const PostId = +req.params.id;
        const body = req.body;

        if (!req.params.id) {
            res.status(400).json("Id is validation error");
            return;
        }

        if (isNaN(PostId)) {
            res.status(400).json("PostId must be a number");
            return;
        }

        if (!body || typeof body !== 'object') {    
            res.status(422).json("Body?");
            return;
        }

        if (!body.name || typeof body.name !== 'string') {
            res.status(422).json("Name is required.");
            return;
        }

        if (!body.description || typeof body.description !== 'string') {
            res.status(422).json("Description is required.");
            return;
        }

        if (!body.image || typeof body.image !== 'string') {
            res.status(422).json("Image is required.");
            return;
        }

        const findedPost = PostService.getPostById(PostId);
        if (!findedPost) {
            res.status(404).json("No post with such id");
            return;
        }

        const updatedPost = await PostService.updatePost(PostId, body);
        if (!updatedPost) {
            res.status(500).json("Update failed");
            return;
        }

        res.status(200).json('Post updated successfully');
    },

    deletePost: async (req, res) => {
        const PostId = +req.params.id;
        if (isNaN(PostId)) {
            res.status(400).json("PostId must be a number");
            return;
        }
        const findedPost = PostService.getPostById(PostId);
        if (!findedPost) {
            res.status(404).json("No post with such id");
            return;
        }
        const deletedPost = await PostService.deletePost(PostId);
        if (!deletedPost) {
            res.status(500).json("Delete failed");
            return;
        }
        res.status(200).json('Post deleted successfully');
    }
}