export interface Post {
    id: number,
    name: string,
    description: string,
    image: string
}

export type CreatePostData = Omit<Post, 'id'>;

export type UpdatePostData = Partial<Omit<Post, 'id'>>;

