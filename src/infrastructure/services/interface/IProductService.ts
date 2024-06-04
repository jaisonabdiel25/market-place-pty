import { Product } from "@prisma/client";
import { CreateProducts } from "../../../domain/models/products";
import { IncomingHttpHeaders } from 'http';

export abstract class IProductService {
    abstract createProduct(products: CreateProducts, headers: IncomingHttpHeaders): Promise<void>;
    abstract getProducts(): Promise<Product[]>;
}