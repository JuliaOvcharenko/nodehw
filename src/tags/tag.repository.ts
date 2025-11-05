import { PrismaClient } from "../client/prisma-client";
import { Prisma } from "../generated/prisma";
import { TagRepositoryContract } from "./tag.types";

export const TagRepository: TagRepositoryContract = {
    getAllTags: async(take, skip) => {
        try {
            const tags = await PrismaClient.tag.findMany({
                take: take || undefined,
                skip: skip || undefined,
            });
            return tags;
            
        } catch (error) {
            console.log(error)
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                    console.log('Failed to create relation between Product and Category')
                    throw new Error("Failed to create relation between Product and Category") 
                }
    throw error
        }
    },

    getTagById: async (id) => {
        try {
            const tag = await PrismaClient.tag.findUnique({
                where: { id },
            });
            return tag; 

        } catch (error) {
            console.error(error);
            return null;
        }
    }}
