import { Product } from "@prisma/client";
import { CreateProductDto } from "../../../domain/dtos/createProduct.dto";
import { IncomingHttpHeaders } from 'http';

export abstract class IProductRepository {
    abstract getProducts(): Promise<Product[]>;
    abstract createProduct(product: CreateProductDto, headers: IncomingHttpHeaders): Promise<Product>;
    abstract updateProduct(id: string, product: CreateProductDto): Promise<Product>;
}