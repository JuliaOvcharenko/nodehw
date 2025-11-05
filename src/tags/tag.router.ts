import {Router} from 'express';
import { TagController } from './tag.controller';
export const TagRouter = Router();


TagRouter.get('/', TagController.getAllTags)

TagRouter.get('/:id', TagController.getTagById)