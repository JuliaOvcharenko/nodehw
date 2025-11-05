import { TagRepository } from "./tag.repository";
import { TagServiceContract } from "./tag.types";


export const TagService: TagServiceContract = {
    getAllTags: (take, skip) => {
        return TagRepository.getAllTags(take, skip);
    },

    getTagById: (id) => {
        return TagRepository.getTagById(id);
    },
}
