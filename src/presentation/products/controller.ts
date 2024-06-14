import { Request, Response } from 'express';
import { CustomError } from '../../config/errors';
import { PreconditionValidation } from '../../config/PreconditionValidation';
import { IProductService } from '../../infrastructure/services/interface/IProductService';


export class ProductController {

    constructor(
        private readonly _productService: IProductService
    ) { }

    createProduct = async (req: Request, res: Response) => {

        try {
            await this._productService.createProduct(req.body, req.headers);
            res.status(201).json({ message: 'Product created' })
        } catch (error) {
            if (error instanceof PreconditionValidation) {
                PreconditionValidation.handleErrors(error, res);
            }
            CustomError.handleErrors(error, res);
        }
    }

    getProducts = async (req: Request, res: Response) => {

        try {
            const products = await this._productService.getProducts();
            res.status(200).json(products);

        } catch (error) {
            if (error instanceof PreconditionValidation) {
                PreconditionValidation.handleErrors(error, res);
            }
            CustomError.handleErrors(error, res);
        }
    }

    updateProduct = async (req: Request, res: Response) => {

        try {
            await this._productService.updateProduct(req.params.id, req.body, req.headers);
            res.status(200).json({ message: 'Product updated' });

        } catch (error) {
            if (error instanceof PreconditionValidation) {
                PreconditionValidation.handleErrors(error, res);
            }
            CustomError.handleErrors(error, res);
        }
    }
}