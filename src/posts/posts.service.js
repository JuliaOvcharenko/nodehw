const fs = require('fs');
const path = require('path');
const fsPromises = require('fs/promises');

const postsPath = path.join(__dirname, "posts.json");
let posts = JSON.parse(fs.readFileSync(postsPath, 'utf-8'));

const PostService = {
    getAllPosts: (skip, take) => {
        if (!skip && !take){
            return posts
        }

        if (skip && !take){
            return posts.slice(skip)
        } 
        if (!skip && take){
            return posts.slice(0, take)
        }
        return posts.slice(skip, skip + take);
    },

    getPostById: (PostId) => {
        return posts.find((p) => p.id === PostId);
    },

    createPost: async (data) => {
        try {
            const userProduct = { ...data, id: posts.length + 1 };
            posts.push(userProduct);
            await fsPromises.writeFile(postsPath, JSON.stringify(posts, null, 4));
            return userProduct;
            
        } catch (error) {
            console.log(error);
            return null;
        }
    }
};

module.exports = PostService;
