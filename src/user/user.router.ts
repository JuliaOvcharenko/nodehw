import { Router } from 'express';
import { UserController } from './user.controller';
export const UserRouter = Router();


UserRouter.get('/me', UserController.me)
UserRouter.post('/login', UserController.login)
UserRouter.post('/register', UserController.register)