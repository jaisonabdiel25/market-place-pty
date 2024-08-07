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

    async getProducts(skip: number, take: number, search: string): Promise<[Product[], number]> {
        try {

            if (search) {
                const total = await prisma.product.count({
                    where: {
                        active: true,
                        OR: [
                            {
                                name: {
                                    contains: search,
                                    mode: 'insensitive', // Para búsqueda no sensible a mayúsculas
                                },
                            },
                            {
                                description: {
                                    contains: search,
                                    mode: 'insensitive', // Para búsqueda no sensible a mayúsculas
                                },
                            },
                        ],
                    },
                });

                const result = await prisma.product.findMany({
                    skip,
                    take,
                    include: { images: true },
                    where: {
                        active: true,
                        OR: [
                            {
                                name: {
                                    contains: search,
                                    mode: 'insensitive', // Para búsqueda no sensible a mayúsculas
                                },
                            },
                            {
                                description: {
                                    contains: search,
                                    mode: 'insensitive', // Para búsqueda no sensible a mayúsculas
                                },
                            },
                        ],
                    },
                });
                return [result, total];
            } else {
                const total = await prisma.product.count({ where: { active: true } });
                const result = await prisma.product.findMany({ skip, take, include: { images: true }, where: { active: true } });
                return [result, total];
            }



        } catch (error) {
            if (error instanceof CustomError) throw error;
            throw CustomError.internal();
        }
    }

    async createProduct(product: CreateProductDto, headers: IncomingHttpHeaders): Promise<Product> {
        try {
            const decodedToken = await jwtAdapter.decodeToken<GlobalData<TokenDecoded>>(headers);

            return await prisma.product.create({ data: { ...product, createById: decodedToken!.data.id }, include: { images: true, category: true, createBy: true } });
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
            return await prisma.product.findFirst({ where: { id }, include: { createBy: true, category: true, images: true } });
        } catch (error) {
            if (error instanceof CustomError) throw error;
            throw CustomError.internal();
        }
    }

    async getProductByListIds(ids: string[]): Promise<Product[]> {
        try {
            return await prisma.product.findMany({ where: { id: { in: ids } } });
        } catch (error) {
            if (error instanceof CustomError) throw error;
            throw CustomError.internal();
        }
    }

    async getProductByCategory(id: string, skip: number, take: number): Promise<Product[]>{
        try {
            return await prisma.product.findMany({skip, take, where: { categoryId: id, active: true }, include: {images: true} });
        } catch (error) {
            if (error instanceof CustomError) throw error;
            throw CustomError.internal();
        }
    }
}