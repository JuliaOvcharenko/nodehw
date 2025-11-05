import { PostRepositoryContract} from "./posts.types";
import { PrismaClient } from "../client/prisma-client";
import { Prisma } from "../generated/prisma";


// 1. FindMany
export const PostRepository: PostRepositoryContract = {
    getAllPosts: async(take, skip) => {
        try {
            const posts = await PrismaClient.post.findMany({
                take: take || undefined,
                skip: skip || undefined,
            });
            return posts;
            
        } catch (error) {
            console.log(error)
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                    console.log('Failed to create relation between Product and Category')
                    throw new Error("Failed to create relation between Product and Category") 
                }
    throw error
        }
    },

    getPostById: async (id) => {
        try {
            const post = await PrismaClient.post.findUnique({
                where: { id },
            });
            return post; 

        } catch (error) {
            console.error(error);
            return null;
        }
    },

    createPost: async (data) => {
        try {
            const newPost = await PrismaClient.post.create({
                data: data
            });
            return newPost;

        } catch (error) {
            console.error(error);
            return null;
        }
    },

    updatePost: async(id, data) => {
        try {
            const updatedPost = await PrismaClient.post.update({
                where: { id },
                data: data
            });
            return updatedPost;

        } catch (error) {
            console.error(error);
            return null;
        }
    },

    deletePost: async(id) => {
        try {
            const deletedPost = await PrismaClient.post.delete({
                where: { id }
            });
            return deletedPost;

        } catch (error) {
            console.error(error);
            return null;
        }
}};