import { Request, Response } from 'express'

export interface Post {
    id: number,
    name: string,
    description: string,
    image: string
}

export type CreatePostData = Omit<Post, 'id'>;

export type UpdatePostData = Partial<Omit<Post, 'id'>>;

export interface PostServiceContract {
    getAllPosts: (take?: number, skip?: number) => Post[]
    getPostById: (id: number) => Post | undefined
    createPost: (data: CreatePostData) => Promise<Post|null>
    updatePost: (id: number, data: UpdatePostData) => Promise<Post|null>
}

export interface PostControllerContract {
    // getAllPosts:
    // 1. нету динам. параметров
    // 2. Возвращает список постов или string(сообщение про ошибку)
    // 3. Нету body
    // 4. Есть query параметры take и skip
    
    getAllPosts: (req: Request<void, Post[] | string, void, {take?: string, skip?: string}>,  
        res: Response<Post[] | string>) => void
    
    // getPostById:
    // 1. есть динам. параметр id
    // 2. Возвращает пост или string(сообщение про ошибку)
    // 3. Нету body
    // 4. Нету query
    
    getPostById: (req: Request<{id: string}, Post | string, void, void>, 
        res: Response<Post | string>) => void

    // createPost:
    // 1. нету динам. параметров
    // 2. Возвращает созданный пост или string(сообщение про ошибку)
    // 3. Есть body с CreatePostData
    // 4. Нету query

    createPost: (req: Request<void, Post | string, CreatePostData, void>, 
        res: Response<Post | string>) => void
    
    // updatePost:
    // 1. есть динам. параметр id
    // 2. Возвращает обновленный пост или string(сообщение про ошибку)
    // 3. Есть body с UpdatePostData
    // 4. Нету query

    updatePost: (req: Request<{id: string}, Post | string, UpdatePostData, void>,
        res: Response<Post | string>) => void
}

