const PostService = require("./posts.service");

const PostController = {
    getAllPosts: (req, res) => {
        const take = Number(req.query.take);
        const skip = Number(req.query.skip);

        try {
            const result = PostService.getAllPosts(skip, take);
            res.status(200).json(result);
        } catch (error) {
            console.error(error);
            res.status(500).json("Server Error");
        }
    },

    getPostById: (req, res) => {
        const PostId = +req.params.id;

        if (isNaN(PostId)) {
            res.status(400).json("PostId must be a number");
            return;
        }

        const post = PostService.getPostById(PostId);

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
    }
};

module.exports = PostController;