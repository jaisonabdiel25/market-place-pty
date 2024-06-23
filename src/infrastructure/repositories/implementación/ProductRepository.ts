import { Product } from "@prisma/client";
import { prisma } from "../../../client";
import { CustomError } from "../../../config/errors";
import { CreateProductDto } from "../../../domain/dtos/createProduct.dto";
import { IProductRepository } from "../interface/IProductRepository"
import { jwtAdapter } from "../../../config/jwt";
import { IncomingHttpHeaders } from 'http';
import { GlobalData, TokenDecoded } from "../../../domain/models/global";
import { UpdateProductDto } from "../../../domain/dtos/updateProduct.dto";


export class ProductRepository implements IProductRepository {
    constructor() { }

    async getProducts(skip: number, take: number): Promise<Product[]> {
        try {
            return await prisma.product.findMany({ skip, take , include: { images: true},  orderBy: { createAt: 'desc'}});
        } catch (error) {
            if (error instanceof CustomError) throw error;
            throw CustomError.internal();
        }
    }

    async createProduct(product: CreateProductDto, headers: IncomingHttpHeaders): Promise<Product> {
        try {
            const decodedToken = await jwtAdapter.decodeToken<GlobalData<TokenDecoded>>(headers);

            return await prisma.product.create({ data: { ...product, createById: decodedToken!.data.id }, include: {images: true, category: true, createBy: true} });
        } catch (error) {
            if (error instanceof CustomError) throw error;
            throw CustomError.internal();
        }
    }

    async updateProduct(id: string, product: UpdateProductDto): Promise<Product> {
        try {

            return await prisma.product.update({
                where: { id },
                data: { ...product }
            });
        } catch (error) {
            if (error instanceof CustomError) throw error;
            throw CustomError.internal();
        }
    }

    async getProduct(id: string): Promise<Product | null> {
        try {
            return await prisma.product.findFirst({ where: { id }, include: { createBy: true, category: true, images: true}});
        } catch (error) {
            if (error instanceof CustomError) throw error;
            throw CustomError.internal();
        }
    }


}