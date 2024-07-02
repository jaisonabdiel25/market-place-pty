import { Product } from "@prisma/client";
import { CreateProductDto } from "../../../domain/dtos/createProduct.dto";
import { IncomingHttpHeaders } from 'http';

export abstract class IProductRepository {
    abstract getProducts(skip: number, take: number): Promise<[Product[], number]>;
    abstract getProduct(id: string): Promise<Product | null>;
    abstract createProduct(product: CreateProductDto, headers: IncomingHttpHeaders): Promise<Product>;
    abstract updateProduct(id: string, product: CreateProductDto): Promise<Product>;
    abstract getProductByListIds(ids: string[]): Promise<Product[]>;
}