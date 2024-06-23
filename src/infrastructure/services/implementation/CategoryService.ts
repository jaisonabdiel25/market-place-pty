import { Category } from "@prisma/client";
import { ICategoryService } from "../interface/ICategoryService";
import { ICategoryRepository } from "../../repositories";
import { CustomError } from "../../../config/errors";
import { PreconditionValidation } from "../../../config/PreconditionValidation";


export class CategoryService implements ICategoryService {

    constructor(
        private readonly _categoryRepository: ICategoryRepository
    ) { }

    async getCategories(): Promise<Category[]> {

        try {
            return await this._categoryRepository.getCategories();

        } catch (error) {
            if (error instanceof CustomError) throw error;
            if (error instanceof PreconditionValidation) throw error;
            throw CustomError.internal();
        }
    }
}