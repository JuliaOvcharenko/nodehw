import {Router} from 'express';
import { PostController } from './posts.controller';
export const PostRouter = Router();


PostRouter.get('/posts', PostController.getAllPosts)

PostRouter.get('/posts/:id', PostController.getPostById)

PostRouter.post('/posts', PostController.createPost)
