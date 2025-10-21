import path from "path"
import fs from "fs";
import fsPromises from "fs/promises";
import { Post, PostServiceContract } from "./posts.types";


const postsPath = path.join(__dirname, "posts.json");
let posts: Post[] = JSON.parse(fs.readFileSync(postsPath, 'utf-8'));


export const PostService: PostServiceContract = {
    getAllPosts: (take?, skip?) => {
        if (!skip && !take){
            return posts
        }

        if (skip && !take){
            return posts.slice(skip)
        } 
        if (!skip && take){
            return posts.slice(0, take)
        }
        return posts.slice(take, (skip || 0) + (take || 0))
    },

    getPostById: (PostId:number) => {
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
    },

    updatePost: async(id, data) => {
        const findedPost = PostService.getPostById(id);
        if (!findedPost) {
            return null;
        }
        try {
            const updatedPost = {...findedPost, ...data}
            posts.splice(id - 1, 1, updatedPost)
            await fsPromises.writeFile(postsPath, JSON.stringify(posts, null, 4))
            return updatedPost
            
        } catch (error) {
            console.log(error)
            return null
        }
        
    }
};


