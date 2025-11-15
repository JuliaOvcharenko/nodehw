import { UserRepositoryContract } from "./user.types";
import { PrismaClient } from "../client/prisma-client"



export const UserRepository: UserRepositoryContract = {
    async findUserByEmail(email){
        try {
            const user = await PrismaClient.user.findUnique({
                where: { 
                    email 
                },
            });
            return user;

        } catch (error) {
            console.error(error);
            throw error;
        }
    },
    async createUser(dataFromUser){
        try {
            const createUser = await PrismaClient.user.create({
                data: dataFromUser
            });
            return createUser
        }
        catch(error){
            console.error(error);
            throw error;
        }
    }, 
    async getUserWithoutPasswordById(id){
        try{
            const userWithoutPasswordById = await PrismaClient.user.findUnique({
                omit: {
                    password: true
                }, 
                where: {id}
            })
            return userWithoutPasswordById
        }
        catch(error){
            console.error(error);
            throw error
        }
    }

}

