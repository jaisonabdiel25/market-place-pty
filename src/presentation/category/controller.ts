import { Request, Response } from 'express';
import { PreconditionValidation } from '../../config/PreconditionValidation';
import { CustomError } from '../../config/errors';
import { ICategoryService } from '../../infrastructure/services';

export class CategoryController {
    constructor(
        private readonly _categoryService: ICategoryService
    ) { }

    getCategories = async (req: Request, res: Response) => {
        try {
            const categories = await this._categoryService.getCategories();
            res.status(200).json({ data: categories });
        } catch (error) {
            if (error instanceof PreconditionValidation) {
                PreconditionValidation.handleErrors(error, res);
            }
            CustomError.handleErrors(error, res);
        }
    }
}