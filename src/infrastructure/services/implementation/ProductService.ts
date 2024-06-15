import { Product, User } from "@prisma/client";
import { PreconditionValidation } from "../../../config/PreconditionValidation";
import { CustomError } from "../../../config/errors";
import { CreateProductDto } from "../../../domain/dtos/createProduct.dto";
import { CreateProducts } from "../../../domain/models/products";
import { IProductRepository } from "../../repositories";
import { IProductService } from "../interface/IProductService";
import { IncomingHttpHeaders } from 'http';
import { UpdateProductDto } from "../../../domain/dtos/updateProduct.dto";
import { UserEntity } from "../../../domain/entity/UserEntity";

export class ProductService implements IProductService {

    constructor(
        private readonly _productRepository: IProductRepository
    ) { }

    async createProduct(products: CreateProducts, headers: IncomingHttpHeaders): Promise<Product> {

        try {
            const [error, productsDto] = CreateProductDto.CreateProduct(products);

            if (error.length > 0) throw PreconditionValidation.PreconditionsFailed(error);

            return await this._productRepository.createProduct(productsDto!, headers);

        } catch (error) {
            if (error instanceof CustomError) throw error;
            if (error instanceof PreconditionValidation) throw error;
            throw CustomError.internal();
        }
    }

    async getProducts(page: number, size: number): Promise<Product[]> {

        try {
            const skip = (page - 1) * size;
            const take = size;
            return await this._productRepository.getProducts(skip, take);

        } catch (error) {
            if (error instanceof CustomError) throw error;
            if (error instanceof PreconditionValidation) throw error;
            throw CustomError.internal();
        }
    }

    async getProduct(id: string): Promise<Product | null> {

        try {
            const product = await this._productRepository.getProduct(id) as Product & { createBy: UserEntity };

            if (!product) throw CustomError.notFound('El producto no existe');

            const { password, ...createBy } = product.createBy;
            const { createById, categoryId, ...filteredProduct } = product;

            filteredProduct.createBy = createBy;

            return filteredProduct as Product & { createBy: User };

        } catch (error) {
            if (error instanceof CustomError) throw error;
            if (error instanceof PreconditionValidation) throw error;
            throw CustomError.internal();
        }
    }

    async updateProduct(id: string, products: CreateProducts, headers: IncomingHttpHeaders): Promise<void> {

        try {

            const product = await this.getProduct(id);

            if (!product) throw CustomError.notFound('El producto no existe');

            const [error, updateProductsDto] = UpdateProductDto.UpdateProduct(products);

            if (error.length > 0) throw PreconditionValidation.PreconditionsFailed(error);

            await this._productRepository.updateProduct(id, updateProductsDto!);

        } catch (error) {
            if (error instanceof CustomError) throw error;
            if (error instanceof PreconditionValidation) throw error;
            throw CustomError.internal();
        }
    }
}