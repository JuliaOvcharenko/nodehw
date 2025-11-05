import {Router} from 'express';
import { PostController } from './posts.controller';
export const PostRouter = Router();


PostRouter.get('/', PostController.getAllPosts)

PostRouter.get('/:id', PostController.getPostById)

PostRouter.post('/', PostController.createPost)

PostRouter.patch('/:id', PostController.updatePost)

PostRouter.delete('/:id', PostController.deletePost)