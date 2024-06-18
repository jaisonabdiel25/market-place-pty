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
            const files = req.files as Express.Multer.File[];
            const result = await this._productService.createProduct(req.body, files, req.headers);
            res.status(200).json({ message: 'Product created', data: result})
        } catch (error) {
            if (error instanceof PreconditionValidation) {
                PreconditionValidation.handleErrors(error, res);
            }
            CustomError.handleErrors(error, res);
        }
    }

    getProducts = async (req: Request, res: Response) => {

        try {
            const page = parseInt(req.query.page as string) || 1;
            const size = parseInt(req.query.size as string) || 10;

            const products = await this._productService.getProducts(page, size);
            res.status(200).json(products);

        } catch (error) {
            if (error instanceof PreconditionValidation) {
                PreconditionValidation.handleErrors(error, res);
            }
            CustomError.handleErrors(error, res);
        }
    }

    getProduct = async (req: Request, res: Response) => {

        try {
            const id =req.params.id;

            const product = await this._productService.getProduct(id);

            res.status(200).json(product);

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