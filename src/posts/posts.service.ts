import { PostRepository } from "./posts.repository";
import { PostServiceContract } from "./posts.types";


export const PostService: PostServiceContract = {
    getAllPosts: (take, skip) => {
        return PostRepository.getAllPosts(take, skip);
    },

    getPostById: (id) => {
        return PostRepository.getPostById(id);
    },

    createPost: (data) => {
        return PostRepository.createPost(data);
    },  
    updatePost: (id, data) => {
        return PostRepository.updatePost(id, data);
    },
    deletePost: (id) => {
        return PostRepository.deletePost(id);
    }   
}
