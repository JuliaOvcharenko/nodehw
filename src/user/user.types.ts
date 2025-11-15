import { Prisma } from "../generated/prisma"
import { Request, Response } from "express";


export type User = Prisma.UserGetPayload<{}>;

export type UserWithoutPassword = Prisma.UserGetPayload<{omit: {password: true}}>;

export type LoginCredentials = {
    email: string
    password: string
}
export type RegisterCredentials = {
    email: string
    password: string
    firstName: string
    secondName: string
    avatar?: string
}

export interface UserAuthenticationResponse{
    token: string
}

export interface ErrorResponse{
    message?: string
}

export type UserCreate = Prisma.UserUncheckedCreateInput

export interface UserControllerContract {
    login(req: Request<object, ErrorResponse | UserAuthenticationResponse, LoginCredentials>, res: Response<ErrorResponse | UserAuthenticationResponse>): Promise<void>;
    register(req: Request<object, ErrorResponse | UserAuthenticationResponse, RegisterCredentials>, res: Response<ErrorResponse | UserAuthenticationResponse>): Promise<void>;
    me(req: Request<object, ErrorResponse | UserWithoutPassword>, res: Response<ErrorResponse | UserWithoutPassword>): Promise<void>
}

export interface UserServiceContract {
    login(credentials: LoginCredentials): Promise<string>;
    register(credentials: RegisterCredentials): Promise<string>;
    me(userId: number): Promise<UserWithoutPassword>
}

export interface UserRepositoryContract {
    findUserByEmail(email: string): Promise<User | null>
    createUser(dataFromUser: UserCreate): Promise<User>
    getUserWithoutPasswordById(id: number): Promise<UserWithoutPassword | null>
}