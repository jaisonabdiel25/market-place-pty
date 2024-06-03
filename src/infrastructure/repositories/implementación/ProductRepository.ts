import { Product } from "@prisma/client";
import { prisma } from "../../../client";
import { CustomError } from "../../../config/errors";
import { CreateProductDto } from "../../../domain/dtos/createProduct.dto";
import { IProductRepository } from "../interface/IProductRepository"


export class ProductRepository implements IProductRepository {
    constructor() { }

    async getProducts(): Promise<Product[]> {
        try {
            return await prisma.product.findMany();
        } catch (error) {
            if (error instanceof CustomError) throw error;
            throw CustomError.internal();
        }
    }

    async createProduct(product: CreateProductDto): Promise<Product> {
        try {
            return await prisma.product.create({ data: { ...product, createById: '137fc694-9d1c-419a-952a-88a8aee68dd4' } })
        } catch (error) {
            if (error instanceof CustomError) throw error;
            throw CustomError.internal();
        }
    }
}