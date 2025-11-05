import { Request, Response } from 'express'
import { Prisma } from '../generated/prisma';

type Tag = Prisma.TagGetPayload<{}>;

export interface TagControllerContract {
    getAllTags: (req: Request<void, Tag[] | string, void, {take?: string, skip?: string}>,  
        res: Response<Tag[] | string>) => void

    getTagById: (req: Request<{id: string}, Tag | string, void, void>,
        res: Response<Tag | string>) => void
}

export interface TagServiceContract {
    getAllTags: (take?: number, skip?: number) => Promise<Tag[]>
    getTagById: (id: number) => Promise<Tag | null>
}

export interface TagRepositoryContract {
    getAllTags: (take?: number, skip?: number) => Promise<Tag[]>
    getTagById: (id: number) => Promise<Tag | null>
}

