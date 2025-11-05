import { Request, Response } from 'express'
import { Prisma } from '../generated/prisma';


export type Post = Prisma.PostGetPayload<{}>;

export type PostWithTags = Prisma.PostGetPayload<{
    include: { tags: true }
}>

export type CreatePost = Prisma.PostUncheckedCreateInput
export type CreatePostChecked = Prisma.PostCreateInput
export type UpdatePost = Prisma.PostUncheckedUpdateInput
export type UpdatePostChecked = Prisma.PostUpdateInput


export interface PostServiceContract {
    getAllPosts: (take?: number, skip?: number) => Promise<Post[]>
    getPostById: (id: number) => Promise<Post | null>
    createPost: (data: CreatePost) => Promise<Post | null>
    updatePost: (id: number, data: UpdatePost) => Promise<Post | null>
    deletePost: (id: number) => Promise<Post | null>
}

export interface PostRepositoryContract {
    getAllPosts: (take?: number, skip?: number) => Promise<Post[]>
    getPostById: (id: number) => Promise<Post | null>
    createPost: (data: CreatePost) => Promise<Post | null>
    updatePost: (id: number, data: UpdatePost) => Promise<Post | null>
    deletePost: (id: number) => Promise<Post | null>
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

    createPost: (req: Request<void, Post | string, CreatePost, void>, 
        res: Response<Post | string>) => void
    
    // updatePost:
    // 1. есть динам. параметр id
    // 2. Возвращает обновленный пост или string(сообщение про ошибку)
    // 3. Есть body с UpdatePostData
    // 4. Нету query

    updatePost: (req: Request<{id: string}, Post | string, UpdatePost, void>,
        res: Response<Post | string>) => void

    // deletePost:
    // 1. есть динам. параметр id
    // 2. Возвращает удаленный пост или string(сообщение про ошибку)
    // 3. Нету body
    // 4. Нету query

    deletePost: (req: Request<{id: string}, Post | string, void, void>,
        res: Response<Post | string>) => void
}