import { StringValue } from 'ms'
import { sign } from "jsonwebtoken";
import { UserRepository } from "./user.repository";
import { UserServiceContract } from "./user.types";
import { ENV } from "../config/env";

// USER_EXISTS -> пользователь существует
// NOT_FOUND -> Не найден(пользователь). 404 HTTP STATUS CODE
// WRONG_CREDENTIALS -> неправильные данные для входа 


export const UserService: UserServiceContract = {
    async login(credentials){
        const user = await UserRepository.findUserByEmail(credentials.email)

        if (!user){
            throw new Error("NOT_FOUND")
        }

        if (user.password != credentials.password){
            throw new Error("WRONG_CREDENTIALS")
        }

        // 1 параметр - данные, которые нужно записать в токен в виде объекта.
        // 2 параметр - secret key.
        // 3 параметр - options, хедеры. expiresIn - это время жизни токена.

        const JWT_token = sign(
            {id: user.id},
            ENV.SECRET_KEY, 
            {expiresIn: ENV.EXPIRES_IN as StringValue}
        )
        return JWT_token
    },

    async register(credentials){
        const user = await UserRepository.findUserByEmail(credentials.email)

        if (user){
            throw new Error("USER_EXISTS")
        }

        const newUser = await UserRepository.createUser(credentials)

        const JWT_token = sign(
            {id: newUser.id},
            ENV.SECRET_KEY, 
            {expiresIn: ENV.EXPIRES_IN as StringValue}
        )
        return JWT_token
    }, 

    async me(userId){
        const user = await UserRepository.getUserWithoutPasswordById(userId)

        if(!user){
            throw new Error("NOT_FOUND")
        }

        return user
    }
}

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNzYzMjM3Nzg5LCJleHAiOjE3NjM4NDI1ODl9.HYIOHWmuAp0NnB_EXqF3ilVRjrQOGfnB-FyARKjrSXM