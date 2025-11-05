import { PrismaClient } from "../client/prisma-client";
import { Prisma } from "../generated/prisma";
import { TagService } from "./tag.service";
import { TagControllerContract } from "./tag.types";


export const TagController: TagControllerContract = {
    getAllTags: async(req, res) => {
        const take = Number(req.query.take);
        const skip = Number(req.query.skip);

        try {
            const result = await TagService.getAllTags(take, skip);
            res.status(200).json(result);
        } catch (error) {
            console.error(error);
            res.status(500).json("Server Error");
        }
    },
    getTagById: async (req, res) => {
        const tagId = +req.params.id;
        if (isNaN(tagId)) {
            res.status(400).json("TagId must be a number");
            return;
        }
        const tag = await TagService.getTagById(tagId);

        if (!tag) {
            res.status(404).json("No tag with such id");
            return;
        }  
        res.status(200).json(tag);

}
}
