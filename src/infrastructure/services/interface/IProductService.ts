import { Product } from "@prisma/client";
import { CreateProducts } from "../../../domain/models/products";
import { IncomingHttpHeaders } from 'http';

export abstract class IProductService {
    abstract getProducts(page: number, size: number): Promise<Product[]>;
    abstract getProduct(id: string): Promise<Product | null>;
    abstract createProduct(products: CreateProducts, headers: IncomingHttpHeaders): Promise<Product>;
    abstract updateProduct(id: string, products: CreateProducts, headers: IncomingHttpHeaders): Promise<void>;
}