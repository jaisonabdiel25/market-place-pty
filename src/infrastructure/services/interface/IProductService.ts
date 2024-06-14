import { Product } from "@prisma/client";
import { CreateProducts } from "../../../domain/models/products";
import { IncomingHttpHeaders } from 'http';

export abstract class IProductService {
    abstract getProducts(): Promise<Product[]>;
    abstract createProduct(products: CreateProducts, headers: IncomingHttpHeaders): Promise<void>;
    abstract updateProduct(id: string, products: CreateProducts, headers: IncomingHttpHeaders): Promise<void>;
}