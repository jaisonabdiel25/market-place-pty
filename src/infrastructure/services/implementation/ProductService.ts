import { Product } from "@prisma/client";
import { PreconditionValidation } from "../../../config/PreconditionValidation";
import { CustomError } from "../../../config/errors";
import { CreateProductDto } from "../../../domain/dtos/createProduct.dto";
import { CreateProducts } from "../../../domain/models/products";
import { IProductRepository } from "../../repositories";
import { IProductService } from "../interface/IProductService";
import { IncomingHttpHeaders } from 'http';

export class ProductService implements IProductService {

    constructor(
        private readonly _productRepository: IProductRepository
    ) { }

    async createProduct(products: CreateProducts, headers: IncomingHttpHeaders): Promise<void> {

        try {
            const [error, productsDto] = CreateProductDto.CreateProduct(products);

            if (error.length > 0) throw PreconditionValidation.PreconditionsFailed(error);

            await this._productRepository.createProduct(productsDto!, headers);

        } catch (error) {
            if (error instanceof CustomError) throw error;
            if (error instanceof PreconditionValidation) throw error;
            throw CustomError.internal();
        }
    }

    async getProducts(): Promise<Product[]> {
            
            try {
                return await this._productRepository.getProducts();
    
            } catch (error) {
                if (error instanceof CustomError) throw error;
                if (error instanceof PreconditionValidation) throw error;
                throw CustomError.internal();
            }
    }
}