import path from "path"
import fs from "fs";
import fsPromises from "fs/promises";
import { Post } from "./posts.types";

const postsPath = path.join(__dirname, "posts.json");
let posts: Post[] = JSON.parse(fs.readFileSync(postsPath, 'utf-8'));


export const PostService = {
    getAllPosts: (skip:number, take?:number) => {
        if (!skip && !take){
            return posts
        }

        if (skip && !take){
            return posts.slice(skip)
        } 
        if (!skip && take){
            return posts.slice(0, take)
        }
        
        return posts.slice(skip, take ? skip + take : undefined);
    },

    getPostById: (PostId:number) => {
        return posts.find((p) => p.id === PostId);
    },

    createPost: async (data: Post) => {
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


